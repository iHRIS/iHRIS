const axios = require('axios')
const URI = require('urijs');
const async = require('async')
const os = require('os')
const fs = require('fs')
const { nanoid } = require('nanoid')
const express = require('express')
const router = express.Router()
const ihrissmartrequire = require('ihrissmartrequire')
const mixin = require('../mixin/generalMixin')
const logger = require('../winston')
const es = require('../modules/es')
const nconf = require('../modules/config')
const fhirAxios = require('../modules/fhir/fhirAxios')
const outcomes = ihrissmartrequire('config/operationOutcomes')

router.get('/indices', (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let relationships = []
  searchRels().then(() => {
    let indices = []
    let promises = []
    for(let rel of relationships) {
      promises.push(new Promise((resolve) => {
        let details = rel.resource.extension.find(ext => ext.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails');
        let display = details.extension && details.extension.find((ext) => {
          return ext.url === 'label'
        })?.valueString
        let index = details.extension && details.extension.find((ext) => {
          return ext.url === 'name'
        })?.valueString
        if(index) {
          let url = URI(nconf.get('elasticsearch:base')).segment(index)
          url = url.toString()
          axios({
            method: 'GET',
            url,
            auth: {
              username: nconf.get('elasticsearch:username'),
              password: nconf.get('elasticsearch:password'),
            }
          }).then(() => {
            indices.push({
              name: index,
              display,
              id: rel.resource.id
            })
            resolve()
          }).catch(() => {
            resolve()
          })
        } else {
          resolve()
        }
      }))
    }
    Promise.all(promises).then(() => {
      return res.json(indices)
    }).catch(() => {
      res.status(500).send()
    })
  }).catch(() => {
    return res.status(500).send()
  })

  function searchRels() {
    return new Promise((resolve, reject) => {
      fhirAxios.search('Basic', {code: 'iHRISRelationship'}).then((rels) => {
        relationships = relationships.concat(rels.entry)
        if(rels.link) {
          let next = rels.link.find((link) => {
            return link.relation === 'next'
          })
          if(next) {
            followLinks(next.url).then(() => {
              return resolve()
            }).catch(() => {
              return reject()
            })
          } else {
            return resolve()
          }
        } else {
          return resolve()
        }
      }).catch((err) => {
        console.log(err);
        return reject()
      })
    })
  }

  function followLinks(link) {
    return new Promise((resolve, reject) => {
      let params = link.split('?')[1]
      let url = fhirAxios.baseUrl.href
      url += '?' + params
      fhirAxios.searchLink(url).then((rels) => {
        relationships = relationships.concat(rels.entry)
        if(rels.link) {
          let next = rels.link.find((link) => {
            return link.relation === 'next'
          })
          if(next) {
            followLinks(next.url).then(() => {
              return resolve()
            }).catch((err) => {
              console.log(err);
              return reject()
            })
          } else {
            return resolve()
          }
        } else {
          return resolve()
        }
      }).catch((err) => {
        console.log(err);
        return reject()
      })
    })
  }
})

router.get('/listFields/:index', (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let id = req.query.id
  let index = req.params.index
  let relationship = {}
  let mappings = {}
  let fields = []
  async.parallel({
    rel: (callback) => {
      fhirAxios.read('Basic', id).then((response) => {
        relationship = response
        return callback(null)
      }).catch(() => {
        return callback(true)
      })
    },
    es: (callback) => {
      es.mappings(index).then((response) => {
        mappings = response
        return callback(null)
      }).catch(() => {
        return callback(true)
      })
    }
  }, (err) => {
    if(err) {
      return res.status(500).send()
    }
    let details = relationship.extension.find(ext => ext.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails');
    let links = relationship.extension.filter(ext => ext.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportLink');
    details = mixin.flattenComplex(details.extension)
    let elements = details['http://ihris.org/fhir/StructureDefinition/iHRISReportElement']
    if(links.length > 0) {
      for(let link of links) {
        let flattenedLink = mixin.flattenComplex(link.extension);
        if(flattenedLink['http://ihris.org/fhir/StructureDefinition/iHRISReportElement']) {
          elements = elements.concat(flattenedLink['http://ihris.org/fhir/StructureDefinition/iHRISReportElement'])
        }
      }
    }
    if(elements.length > 0) {
      for(let element of elements) {
        let name = element.find((el) => {
          return el.url === 'label'
        })?.valueString
        let display = element.find((el) => {
          return el.url === 'display'
        })?.valueString
        if(!display || !name) {
          continue
        }
        for(let mapping in mappings) {
          if(mapping === name) {
            fields.push({
              name,
              display,
              type: mappings[mapping].type
            })
          }
        }
      }
    }
    return res.json(fields)
  })
})

router.post("/export/:format/:index", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let searchQry = req.body.query;
  let headers = req.body.headers;
  let label = req.body.label;
  let isSelected = req.body.selected;

  if (isSelected && isSelected.length > 0) {
    let rows = "";
    for (let header of headers) {
      if (!rows) {
        rows = header.text;
      } else {
        rows += "," + header.text;
      }
    }
    rows += os.EOL;
    for (let doc of isSelected) {
      let row;
      for (let header of headers) {
        if (row === undefined) {
          if (doc[header.value] === null || doc[header.value] === undefined) {
            console.log("doc: ", doc, "header", header);
            row = " ";
          } else {
            row = '"' + doc[header.value] + '"';
          }
        } else {
          if (doc[header.value] === null || doc[header.value] === undefined) {
            row += ",";
          } else {
            row += "," + '"' + doc[header.value] + '"';
          }
        }
      }
      rows += row + os.EOL;
    }
    if (!fs.existsSync(`${__dirname}/../tmp`)) {
      fs.mkdirSync(`${__dirname}/../tmp`);
    }
    let fileName = `${__dirname}/../tmp/${label}-${nanoid(10)}.csv`;
    fs.writeFileSync(fileName, rows);
    if (fs.existsSync(fileName)) {
      res.download(fileName);
      setTimeout(() => {
        fs.unlinkSync(fileName);
      }, 240000);
      // res.send(fileName.replace(`${__dirname}/..`, ""));
    }
  } else {
    es.getData(
        { indexName: req.params.index, searchQuery: searchQry },
        (err, documents) => {
          if (err) {
            return res.status(500).send();
          }
          let rows = "";
          for (let header of headers) {
            if (!rows) {
              rows = header.text;
            } else {
              rows += "," + header.text;
            }
          }
          rows += os.EOL;
          for (let doc of documents) {
            let row;
            for (let header of headers) {
              if (row === undefined) {
                if (
                    doc._source[header.value] === null ||
                    doc._source[header.value] === undefined
                ) {
                  row = " ";
                } else {
                  row = '"' + doc._source[header.value] + '"';
                }
              } else {
                if (
                    doc._source[header.value] === null ||
                    doc._source[header.value] === undefined
                ) {
                  row += ",";
                } else {
                  row += "," + '"' + doc._source[header.value] + '"';
                }
              }
            }
            rows += row + os.EOL;
          }
          if (!fs.existsSync(`${__dirname}/../tmp`)) {
            fs.mkdirSync(`${__dirname}/../tmp`);
          }
          let fileName = `${__dirname}/../tmp/${label}-${nanoid(10)}.csv`;
          fs.writeFileSync(fileName, rows);
          if (fs.existsSync(fileName)) {
            res.download(fileName);
            setTimeout(() => {
              fs.unlinkSync(fileName);
            }, 240000);
            // res.send(fileName.replace(`${__dirname}/..`, ""));
          }
          //remove the file after 4 minutes
        }
    );
  }
});

router.get('/:index/:operation?', (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let indexName = req.params.index
  let operation = req.params.operation
  let from = req.query.from
  let size = req.query.size
  let url = URI(nconf.get('elasticsearch:base')).segment(indexName)
  if(operation) {
    url = url.segment(operation)
  }
  if(from) {
    url = url.addQuery('from', from)
  }
  if(size) {
    url = url.addQuery('size', size)
  }
  url = url.toString()
  axios({
    method: 'GET',
    url,
    auth: {
      username: nconf.get('elasticsearch:username'),
      password: nconf.get('elasticsearch:password'),
    }
  }).then((response) => {
    res.status(200).json(response.data)
  }).catch((err) => {
    logger.error(err.message);
    return res.status(500).send()
  })
})

router.post('/:index/:operation?', (req, res) => {
  if (!req.user) {
    return res.status(401).json(outcomes.NOTLOGGEDIN)
  }
  let indexName = req.params.index
  let operation = req.params.operation
  let reportOptions = req.body.reportOptions
  delete req.body.reportOptions
  let body = req.body
  if(reportOptions.locationBasedConstraint) {
    let userLocExt = req.user.resource.extension && req.user.resource.extension.find((ext) => {
      return ext.url === 'http://ihris.org/fhir/StructureDefinition/ihris-user-location'
    })
    if(userLocExt) {
      let userLoc = userLocExt.valueReference.reference
      if(userLoc) {
        body.query.bool.must.push({
          script: {
            script: {
              source: `if(doc['ihris-related-group.keyword'].size() != 0) {if(doc['ihris-related-group.keyword'].value.contains('${userLoc}')){return true}}`,
              lang: "painless"
            }
          }
        })
      }
    }
  }
  let url = URI(nconf.get('elasticsearch:base')).segment(indexName)
  if(operation) {
    url = url.segment(operation)
  }
  if(req.query) {
    for (let query in req.query) {
      url = url.addQuery(query, req.query[query])
    }
  }
  url = url.toString()
  axios({
    method: 'GET',
    url,
    auth: {
      username: nconf.get('elasticsearch:username'),
      password: nconf.get('elasticsearch:password'),
    },
    data: body
  }).then((response) => {
    res.status(200).json(response.data)
  }).catch((err) => {
    logger.error(err.message);
    return res.status(500).send()
  })
})

router.get('/populateFilter/:index/:field', (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let indexName = req.params.index
  let field = req.params.field
  const dataType = req.query.dataType

  if(dataType === 'text') {
    field = `${field}.keyword`
  }
  let body = {
    size: 0,
    aggs: {
      uniq_values: {
        composite: {
          sources: [
            { value: { terms: { field: field } } }
          ]
        }
      }
    }
  }
  let url = URI(nconf.get('elasticsearch:base')).segment(indexName).segment('_search').toString()
  let next = true
  let buckets = []
  async.whilst(
    callback1 => {
      return callback1(null, next !== false);
    },
    callback => {
      let options = {
        method: 'GET',
        url,
        auth: {
          username: nconf.get('elasticsearch:username'),
          password: nconf.get('elasticsearch:password'),
        },
        data: body
      };
      next = false;
      axios(options).then((response) => {
        buckets = buckets.concat(response.data.aggregations.uniq_values.buckets)
        if(response.data.aggregations.uniq_values.buckets.length > 0) {
          body.aggs.uniq_values.composite.after = {}
          body.aggs.uniq_values.composite.after.value = response.data.aggregations.uniq_values.after_key.value
          next = true
        }
        return callback(null, next);
      }).catch((err) => {
        logger.error(err.message);
        return res.status(500).send()
      })
    }, () => {
      return res.status(200).json(buckets)
    }
  );
  // //get filter data type
  // let url = URI(nconf.get('elasticsearch:base')).segment(indexName).segment('_mapping').toString()
  // const options = {
  //   method: 'GET',
  //   url,
  //   auth: {
  //     username: nconf.get('elasticsearch:username'),
  //     password: nconf.get('elasticsearch:password'),
  //   }
  // };
  // axios(options).then((mappings) => {
  //   let dataType = mappings.data[indexName].mappings.properties[field].type
    
  // }).catch((err) => {
  //   logger.error(err.message);
  //   return res.status(500).send()
  // })
})

module.exports = router
