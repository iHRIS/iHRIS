"use strict";
const axios = require('axios');
const async = require('async');
const URI = require('urijs');
const _ = require('lodash');
const Fhir = require('fhir').Fhir;

const fhir = new Fhir();
class CacheFhirToES {
  constructor({
    ESBaseURL,
    ESUsername,
    ESPassword,
    ESMaxCompilationRate,
    FHIRBaseURL,
    FHIRUsername,
    FHIRPassword
  }) {
    this.ESBaseURL = ESBaseURL
    this.ESUsername = ESUsername
    this.ESPassword = ESPassword
    this.ESMaxCompilationRate = ESMaxCompilationRate
    this.FHIRBaseURL = FHIRBaseURL
    this.FHIRUsername = FHIRUsername
    this.FHIRPassword = FHIRPassword
  }

  flattenComplex (extension) {
    let results = {};
    for (let ext of extension) {
      let value = '';
      for (let key of Object.keys(ext)) {
        if (key !== 'url') {
          value = ext[key];
        }
      }
      if (results[ext.url]) {
        if (Array.isArray(results[ext.url])) {
          results[ext.url].push(value);
        } else {
          results[ext.url] = [results[ext.url], value];
        }
      } else {
        if (Array.isArray(value)) {
          results[ext.url] = [value];
        } else {
          results[ext.url] = value;
        }
      }
    }
    return results;
  };

  /**
   *
   * @param {relativeURL} reference //reference must be a relative url i.e Practioner/10
   */
  getResourceFromReference (reference) {
    return new Promise((resolve) => {
      let url = URI(this.FHIRBaseURL)
        .segment(reference)
        .toString()
      axios.get(url, {
        withCredentials: true,
        auth: {
          username: this.FHIRUsername,
          password: this.FHIRPassword
        },
      }).then(response => {
        console.log('sending back response');
        return resolve(response.data)
      }).catch((err) => {
        console.log('Error occured while getting resource reference');
        console.log(err);
        return resolve()
      })
    }).catch((err) => {
      console.log('Error occured while getting resource reference');
      console.log(err);
    })
  }

  /**
   *
   * @param {Array} extension
   * @param {String} element
   */
  getElementValFromExtension (extension, element) {
    return new Promise((resolve) => {
      let elementValue = ''
      async.each(extension, (ext, nxtExt) => {
        let value
        for (let key of Object.keys(ext)) {
          if (key !== 'url') {
            value = ext[key];
          }
        }
        if (ext.url === element) {
          elementValue = value
        }
        (async () => {
          if (Array.isArray(value)) {
            let val = await this.getElementValFromExtension(value, element)
            if (val) {
              elementValue = val
            }
            return nxtExt()
          } else {
            return nxtExt()
          }
        })();
      }, () => {
        resolve(elementValue)
      })
    }).catch((err) => {
      console.log('Error occured while geting Element value from extension');
      console.log(err);
    })
  }

  getImmediateLinks (orderedResources, links, callback) {
    if (orderedResources.length - 1 === links.length) {
      return callback(orderedResources);
    }
    let promises = [];
    for (let link of links) {
      promises.push(
        new Promise((resolve, reject) => {
          link = this.flattenComplex(link.extension);
          let parentOrdered = orderedResources.find(orderedResource => {
            let linkToResource = link.linkTo.split('.').shift()
            return orderedResource.name === linkToResource;
          });
          let exists = orderedResources.find(orderedResource => {
            return JSON.stringify(orderedResource) === JSON.stringify(link);
          });
          if (parentOrdered && !exists) {
            orderedResources.push(link);
          }
          resolve();
        })
      );
    }
    Promise.all(promises).then(() => {
      if (orderedResources.length - 1 !== links.length) {
        this.getImmediateLinks(orderedResources, links, orderedResources => {
          return callback(orderedResources);
        });
      } else {
        return callback(orderedResources);
      }
    });
  };

  getReportRelationship (callback) {
    let url = URI(this.FHIRBaseURL)
      .segment('Basic');
    url.addQuery('code', 'iHRISRelationship');
    url = url.toString();
    axios
      .get(url, {
        withCredentials: true,
        auth: {
          username: this.FHIRUsername,
          password: this.FHIRPassword,
        },
      })
      .then(relationships => {
        return callback(false, relationships.data);
      })
      .catch(err => {
        console.error(err);
        return callback(err, false);
      });
  };

  updateESCompilationsRate (callback) {
    console.log('Setting maximum compilation rate');
    let url = URI(this.ESBaseURL).segment('_cluster').segment('settings').toString();
    let body = {
      "transient": {
        "script.max_compilations_rate": this.ESMaxCompilationRate
      }
    };
    axios({
        method: 'PUT',
        url,
        auth: {
          username: this.ESUsername,
          password: this.ESPassword,
        },
        data: body
      })
      .then(response => {
        if (response.status > 199 && response.status < 299) {
          console.log('maximum compilation rate updated successfully');
          return callback(false)
        } else {
          console.error('An error has occured while setting max compilation rate')
          return callback(true)
        }
      }).catch((err) => {
        console.error('An error has occured while setting max compilation rate')
        callback(err)
        throw err
      })
  }

  createESIndex (name, IDFields, callback) {
    console.info('Checking if index ' + name + ' exists');
    let url = URI(this.ESBaseURL)
      .segment(name.toString().toLowerCase())
      .toString();
    axios({
        method: 'head',
        url,
        auth: {
          username: this.ESUsername,
          password: this.ESPassword,
        },
      })
      .then(response => {
        if (response.status === 200) {
          console.info('Index ' + name + ' exist, not creating');
          return callback(false);
        } else {
          return callback(true);
        }
      })
      .catch(err => {
        if (err.response && err.response.status && err.response.status === 404) {
          console.info('Index not found, creating index ' + name);
          let mappings = {
            mappings: {
              properties: {},
            },
          };
          for (let IDField of IDFields) {
            mappings.mappings.properties[IDField] = {};
            mappings.mappings.properties[IDField].type = 'keyword';
          }
          axios({
              method: 'put',
              url: url,
              data: mappings,
              auth: {
                username: this.ESUsername,
                password: this.ESPassword,
              },
            })
            .then(response => {
              if (response.status !== 200) {
                console.error('Something went wrong and index was not created');
                console.error(response.data);
                return callback(true);
              } else {
                console.info('Index ' + name + ' created successfully');
                return callback(false);
              }
            })
            .catch(err => {
              console.error(err);
              return callback(true);
            });
        } else {
          console.log('Error occured while creating ES index');
          console.log(err);
        }
      });
  };

  updateESDocument (body, record, index, orderedResource, resourceId, callback) {
    let url = URI(this.ESBaseURL).segment(index).segment('_update_by_query').toString();
    axios({
      method: 'post',
      url,
      data: body,
      auth: {
        username: this.ESUsername,
        password: this.ESPassword,
      },
    }).then(response => {
      // if nothing was updated and its from the primary (top) resource then create as new
      if (response.data.updated == 0 && !orderedResource.hasOwnProperty('linkElement')) {
        console.info('No record with id ' + resourceId + ' found on elastic search, creating new');
        let url = URI(this.ESBaseURL)
          .segment(index)
          .segment('_doc')
          .toString();
        axios({
            method: 'post',
            url,
            data: record,
            auth: {
              username: this.ESUsername,
              password: this.ESPassword,
            },
          })
          .then(response => {
            return callback();
          })
          .catch(err => {
            console.log('Error occured while saving document into ES');
            console.log(err);
            return callback();
          });
      } else {
        return callback();
      }
    }).catch(err => {
      if (err.response && (err.response.statusText === 'Conflict' || err.response.status === 409)) {
        console.log('Conflict occured, rerunning this request');
        setTimeout(() => {
          this.updateESDocument(body, record, index, orderedResource, resourceId, () => {
            return callback()
          })
        }, 2000)
      } else {
        console.log('Error Occured while creating ES document');
        if (err.response && err.response.data) {
          console.error(err.response.data);
        }
        if (err.error) {
          console.error(err.error);
        }
        if (!err.response) {
          console.log(err);
        }
        return callback();
      }
    });
  }

  cache () {
    this.getReportRelationship((err, relationships) => {
      if (err) {
        return;
      }
      if (!relationships.entry || !Array.isArray(relationships.entry)) {
        console.error('invalid resource returned');
        return;
      }
      relationships.entry.forEach(relationship => {
        console.info('processing relationship ID ' + relationship.resource.id);
        relationship = relationship.resource;
        let details = relationship.extension.find(ext => ext.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails');
        let links = relationship.extension.filter(ext => ext.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportLink');
        let reportDetails = this.flattenComplex(details.extension);
        let IDFields = [];
        for (let linkIndex1 in links) {
          let link1 = links[linkIndex1];
          let flattenedLink1 = this.flattenComplex(link1.extension);
          let linkTo1 = flattenedLink1.linkTo.split('.')
          let linkToResource1 = linkTo1[0]
          if(linkToResource1 === reportDetails.name) {
            let name
            if(linkTo1.length === 1) {
              name = 'id'
            } else {
              linkTo1.splice(0,1)
              name = linkTo1.join('.')
            }
            details.extension.push({
              url: 'http://ihris.org/fhir/StructureDefinition/iHRISReportElement',
              extension: [{
                  url: 'label',
                  valueString: '__' + flattenedLink1.name + '_link',
                },
                {
                  url: 'name',
                  valueString: name,
                },
                {
                  url: 'autoGenerated',
                  valueBoolean: true
                }
              ],
            });
            IDFields.push('__' + flattenedLink1.name + '_link')
          }

          IDFields.push(flattenedLink1.name);
          for (let link2 of links) {
            let flattenedLink2 = this.flattenComplex(link2.extension);
            let linkTo2 = flattenedLink2.linkTo.split('.')
            let linkToResource2 = linkTo2[0]
            if (linkToResource2 === flattenedLink1.name) {
              let name
              if(linkTo2.length === 1) {
                name = 'id'
              } else {
                linkTo2.splice(0,1)
                name = linkTo2.join('.')
              }
              links[linkIndex1].extension.push({
                url: 'http://ihris.org/fhir/StructureDefinition/iHRISReportElement',
                extension: [{
                    url: 'label',
                    valueString: '__' + flattenedLink2.name + '_link',
                  },
                  {
                    url: 'name',
                    valueString: name,
                  },
                  {
                    url: 'autoGenerated',
                    valueBoolean: true
                  }
                ],
              });
              IDFields.push('__' + flattenedLink2.name + '_link')
            }
          }
        }
        reportDetails = this.flattenComplex(details.extension);
        let orderedResources = [];
        // reportDetails.resource = subject._type;
        orderedResources.push(reportDetails);
        IDFields.push(reportDetails.name);
        this.updateESCompilationsRate(() => {
          this.createESIndex(reportDetails.name, IDFields, err => {
            if (err) {
              console.error('Stop creating report due to error in creating index');
              return;
            }
            console.log('Done creating ES Index');
            this.getImmediateLinks(orderedResources, links, () => {
              async.eachSeries(orderedResources, (orderedResource, nxtResource) => {
                let url = URI(this.FHIRBaseURL)
                  .segment(orderedResource.resource)
                  .segment('_history');
                // url.addQuery('_count', 500);
                url = url.toString();
                let resourceData = [];
                console.info(`Getting data for resource ${orderedResource.name}`);
                async.whilst(
                  callback => {
                    return callback(null, url != false);
                  },
                  callback => {
                    axios.get(url, {
                      withCredentials: true,
                      auth: {
                        username: this.FHIRUsername,
                        password: this.FHIRPassword,
                      },
                    }).then(response => {
                      url = false;
                      const next = response.data.link.find(
                        link => link.relation === 'next'
                      );
                      if (next) {
                        url = next.url
                      }
                      if (response.data.total > 0 && response.data.entry && response.data.entry.length > 0) {
                        resourceData = resourceData.concat(response.data.entry);
                      }
                      // url = false;
                      return callback(null, url);
                    }).catch(err => {
                      console.log('Error occured while getting resource data');
                      console.log(err);
                    });
                  }, () => {
                    console.log('Done fetching data for resource ' + orderedResource.resource);
                    console.log('Writting resource data for resource ' + orderedResource.resource + ' into elastic search');
                    let processedRecords = []
                    let count = 1
                    async.eachSeries(resourceData, (data, next) => {
                      console.log('processing ' + count + '/' + resourceData.length + ' records of resource ' + orderedResource.resource);
                      count++
                      if (!data.resource || !data.resource.resourceType) {
                        return next()
                      }
                      let id = data.resource.resourceType + '/' + data.resource.id;
                      let processed = processedRecords.find((record) => {
                        return record === id
                      })
                      if (processed) {
                        return next();
                      } else {
                        processedRecords.push(id)
                      }
                      let queries = [];
                      // just in case there are multiple queries
                      if (orderedResource.query) {
                        queries = orderedResource.query.split('&');
                      }
                      for (let query of queries) {
                        let limits = query.split('=');
                        let limitParameters = limits[0];
                        let limitValue = limits[1];
                        if(!limitValue) {
                          limitValue = ''
                        }
                        let resourceValue = fhir.evaluate(data.resource, limitParameters);
                        if(Array.isArray(resourceValue) && !resourceValue.includes(limitValue)) {
                          return next()
                        } else if(limitValue && !resourceValue) {
                          return next()
                        } else if(resourceValue.toString() != limitValue.toString()) {
                          return next()
                        }
                      }
                      let record = {};
                      (async () => {
                        for (let element of orderedResource["http://ihris.org/fhir/StructureDefinition/iHRISReportElement"]) {
                          let fieldLabel
                          let fieldName
                          let fieldAutogenerated = false
                          for (let el of element) {
                            let value = '';
                            for (let key of Object.keys(el)) {
                              if (key !== 'url') {
                                value = el[key];
                              }
                            }
                            if (el.url === "label") {
                              let fleldChars = value.split(' ')
                              //if label has space then format it
                              if (fleldChars.length > 1) {
                                fieldLabel = value.toLowerCase().split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join('');
                              } else {
                                fieldLabel = value
                              }
                            } else if (el.url === "name") {
                              fieldName = value
                            } else if (el.url === "autoGenerated") {
                              fieldAutogenerated = value
                            }
                          }
                          let displayData = fhir.evaluate(data.resource, fieldName);
                          let value
                          if ((!displayData || (Array.isArray(displayData) && displayData.length === 1 && displayData[0] === undefined)) && data.resource.extension) {
                            value = await this.getElementValFromExtension(data.resource.extension, fieldName)
                          } else if (Array.isArray(displayData) && displayData.length === 1 && displayData[0] === undefined) {
                            value = undefined
                          } else if (Array.isArray(displayData)) {
                            value = displayData.pop();
                          } else {
                            value = displayData;
                          }
                          if (value || value === 0 || value === false) {
                            if (typeof value == 'object') {
                              if (value.reference && fieldAutogenerated) {
                                value = value.reference
                              } else if (value.reference && !fieldAutogenerated) {
                                let referencedResource = await this.getResourceFromReference(value.reference);
                                if (referencedResource) {
                                  value = referencedResource.name
                                }
                              } else {
                                value = JSON.stringify(value)
                              }
                            }
                            if(fieldName === 'id') {
                              value = data.resource.resourceType + '/' + value
                            }
                            record[fieldLabel] = value
                          }
                        }
                        record[orderedResource.name] = id
                        let match = {};
                        if (orderedResource.hasOwnProperty('linkElement')) {
                          let linkElement = orderedResource.linkElement.replace(orderedResource.resource + '.', '');
                          let linkTo = fhir.evaluate(data.resource, linkElement);
                          if(linkElement === 'id') {
                            linkTo = orderedResource.resource + '/' + linkTo
                          }
                          match['__' + orderedResource.name + '_link'] = linkTo;
                        } else {
                          match[orderedResource.name] = data.resource.resourceType + '/' + data.resource.id;
                        }
                        let ctx = '';
                        for (let field in record) {
                          ctx += 'ctx._source.' + field + "='" + record[field] + "';";
                        }

                        let body = {
                          script: {
                            lang: 'painless',
                            source: ctx
                          },
                          query: {
                            match,
                          },
                        };
                        this.updateESDocument(body, record, reportDetails.name, orderedResource, data.resource.id, () => {
                          return next()
                        })
                      })();
                    }, () => {
                      console.log('Done Writting resource data for resource ' + orderedResource.name + ' into elastic search');
                      return nxtResource()
                    });
                  }
                );
              });
            });
          });
        })
      });
    });
  }
}
module.exports = {
  CacheFhirToES
}