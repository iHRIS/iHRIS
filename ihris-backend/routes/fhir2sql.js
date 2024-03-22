const axios = require('axios')
const URI = require('urijs');
const os = require('os')
const fs = require('fs')
const { nanoid } = require('nanoid')
const express = require('express')
const router = express.Router()
const ihrissmartrequire = require('ihrissmartrequire')
const { Sequelize } = require('sequelize');
const pluralize = require('pluralize')
const sqlstring = require('sqlstring');
const mixin = require('../mixin/generalMixin')
const logger = require('../winston')
const es = require('../modules/es')
const nconf = require('../modules/config')
const fhirAxios = require('../modules/fhir/fhirAxios')
const outcomes = ihrissmartrequire('config/operationOutcomes')
const sequelize = new Sequelize(nconf.get("database:name"), nconf.get("database:username"), nconf.get("database:password"), {
  host: 'localhost',
  dialect: nconf.get("database:dialect")
});

router.post('/run-sql', (req, res) => {
  sequelize.query(req.body.query).then((response) => {
    res.json(response[0])
  }).catch((err) => {
    logger.error(err);
    return res.status(500).send()
  })
})

router.get('/reports-list', (req, res) => {
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
              name: pluralize(index),
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
  let fields = []
  fhirAxios.read('Basic', req.query.id).then((relationship) => {
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
          return el.url === 'name'
        })?.valueString
        let type = element.find((el) => {
          return el.url === 'type'
        })?.valueString
        if(!type) {
          type = "string"
        }
        let display = element.find((el) => {
          return el.url === 'display'
        })?.valueString
        if(!display || !name) {
          continue
        }
        name = mixin.formatSQLColumn(name)
        fields.push({
          name,
          display,
          type
        })
      }
    }
    return res.json(fields)
  }).catch(() => {
    return res.status(500).send()
  })
})

router.post("/export/:format/:index", (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
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
    let sorts = req.body.sort
    let sql = `select * from ${req.params.index}`
    let where = buildFilters(req.body.query)
    if(where) {
      sql += ` where ${where}`
    }
    if(sorts && sorts.length) {
      sql += ` ORDER BY`
      for(let sort of sorts) {
        let col = Object.keys(sort)[0]
        sql += ` ${col} ${sort[col]}`
      }
    }
    sequelize.query(sql, "SELECT").then((response) => {
      let documents = response[0]
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
                doc[header.value] === null ||
                doc[header.value] === undefined
            ) {
              row = " ";
            } else {
              row = '"' + doc[header.value] + '"';
            }
          } else {
            if (
                doc[header.value] === null ||
                doc[header.value] === undefined
            ) {
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
      //remove the file after 4 minutes
    }).catch((err) => {
      logger.error(err);
      return res.status(500).send()
    })
  }
});

router.post('/reportData/:table/:operation?', (req, res) => {
  let limit = req.body.limit
  let offset = req.body.offset
  let sorts = req.body.sort
  let sql = `select * from ${req.params.table}`
  if(req.params.operation == "count") {
    sql = `select count(*) from ${req.params.table}`
  }
  let where = buildFilters(req.body)
  if(where) {
    sql += ` where ${where}`
  }
  if(req.body.reportOptions && req.body.reportOptions.locationBasedConstraint) {
    let userLocExt = req.user.resource.extension && req.user.resource.extension.find((ext) => {
      return ext.url === 'http://ihris.org/fhir/StructureDefinition/ihris-user-location'
    })
    if(userLocExt) {
      let userLoc = userLocExt.valueReference.reference
      let locationRestriction = `(ihris_ihris_related_group like '%${userLoc},%' or ihris_ihris_related_group like '%${userLoc}')`
      if(!where) {
        sql += ` where ${locationRestriction}`
      } else {
        sql += ` and ${locationRestriction}`
      }
    }
  }
  if(sorts && sorts.length) {
    sql += ` ORDER BY`
    for(let sort of sorts) {
      let col = Object.keys(sort)[0]
      sql += ` ${col} ${sort[col]}`
    }
  }
  if(limit) {
    sql += ` limit ${limit}`
    if(offset) {
      sql += ` offset ${offset}`
    }
  }
  sequelize.query(sql, "SELECT").then((response) => {
    res.json(response[0])
  }).catch((err) => {
    logger.error(err);
    return res.status(500).send()
  })
})

router.get('/populateFilter/:table/:field', (req, res) => {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let table = pluralize(req.params.table)
  let sql = `select distinct ${req.params.field} from ${table}`
  sequelize.query(sql, "SELECT").then((response) => {
    res.json(response[0])
  }).catch((err) => {
    logger.error(err);
    return res.status(500).send()
  })
})

function buildFilters(data) {
  let where = ""
  if(data.must.length) {
    for(let must of data.must) {
      let keys = Object.keys(must)
      let column = keys.find((ky) => {
        return ky != "type"
      })
      let value = must[column]
      let thisWhere = ""
      if(where) {
        thisWhere += " and"
      }
      if(must.type && must.type === 'date') {
        thisWhere += ` ${column}=${sqlstring.escape(value)}`
      } else if(must.type) {
        thisWhere += ` ${column} like ${sqlstring.escape('%' + value + '%')}`
      } else if(Array.isArray(value)) {
        thisWhere += " ("
        for(let index in value) {
          let val = sqlstring.escape(value[index])
          if(index > 0) {
            thisWhere += " or"
          }
          thisWhere += ` ${column}=${val}`
        }
        thisWhere += ")"
      }
      where += thisWhere
    }
  }
  if(data.must_not.length) {
    for(let must_not of data.must_not) {
      let column = Object.keys(must_not)[0]
      let value = must_not[column]
      let thisWhere = ""
      if(where) {
        thisWhere += " and"
      }
      if(Array.isArray(value)) {
        thisWhere += " ("
        for(let index in value) {
          let val = sqlstring.escape(value[index])
          if(index > 0) {
            thisWhere += " and"
          }
          thisWhere += ` ${column}!=${val}`
        }
        thisWhere += ")"
      }
      where += thisWhere
    }
  }

  if(data.ranges.length) {
    for(let range of data.ranges) {
      let thisWhere = ""
      if(where) {
        thisWhere += " and"
      }
      let column = Object.keys(range)[0]
      let rangeConditions = Object.keys(range[column])
      for(let index in rangeConditions) {
        let rangeCondition = rangeConditions[index]
        let value = sqlstring.escape(range[column][rangeCondition])
        if(index > 0) {
          thisWhere += " and"
        }
        if(rangeCondition === "gte") {
          thisWhere += ` ${column}>=${value}`
        } else if(rangeCondition === "gt") {
          thisWhere += ` ${column}>${value}`
        } else if(rangeCondition === "lte") {
          thisWhere += ` ${column}<=${value}`
        } else if(rangeCondition === "lt") {
          thisWhere += ` ${column}<${value}`
        } else if(rangeCondition === "=") {
          thisWhere += ` ${column}=${value}`
        }
      }
      where += thisWhere
    }
  }
  return where
}

module.exports = router
