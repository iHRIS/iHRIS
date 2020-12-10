var express = require("express");
var router = express.Router();
const async = require("async");
const axios = require("axios");
const winston = require("winston");
const lodash = require("lodash")
const URI = require("urijs");
const es = require("../modules/es")
const nconf = require('../modules/config')
const fhirReports = require('../modules/fhirReports')
const fhirAxios = nconf.fhirAxios

/**
 * Send message
 */
router.post("/send-message", function (req, res) {
  winston.info('Sending mhero message')
  let errorOccured = false
  let data = req.body
  let practitioners = []
  let preparePractitioners = new Promise((resolve) => {
    if(!data.sendToMatchingTerms) {
      practitioners = data.practitioners
      return resolve()
    }
    let terms = buildTerms(data.terms, data.reportData.filters)
    es.getData({
      indexName: data.reportData.indexName,
      searchQuery: terms
    }, (err, practs) => {
      if(err) {
        errorOccured = true
        return resolve()
      }
      if(!practs.hits || !practs.hits.hits || !Array.isArray(practs.hits.hits) || practs.hits.hits.length === 0) {
        errorOccured = true
        return resolve()
      }
      practitioners = practs.hits.hits
      resolve()
    })
  })

  preparePractitioners.then(() => {
    if(errorOccured) {
      return res.status(500).send()
    }
    let payload = []
    if (data.workflow) {
      payload.push({
        contentReference: {
          reference: 'Basic/' + data.workflow
        }
      })
    } else if (data.sms) {
      payload.push({
        contentString: data.sms
      })
    }
    let communicationReq = {
      payload,
      recipient: [],
      resourceType: "CommunicationRequest"
    };
    if(data.frequency === 'recurring' || (data.frequency === 'once' && data.sendTimeCategory === 'later')) {
      if(!communicationReq.meta) {
        communicationReq.meta = {}
      }
      if(!communicationReq.meta.profile) {
        communicationReq.meta.profile = []
      }
      if(!communicationReq.extension) {
        communicationReq.extension = []
      }
      communicationReq.meta.profile.push("http://mhero.org/fhir/StructureDefinition/mhero-communication-request")
      let extension = []
      let freq = {
        url: 'frequency',
        valueString: data.frequency
      }
      extension.push(freq)
      if(data.sendTimeCategory) {
        extension.push({
          url: 'sendCategory',
          valueString: data.sendTimeCategory
        })
      }
      extension.push({
        url: 'cronExpression',
        valueString: data.cronExpression
      })
      communicationReq.extension.push({
        url: "http://mhero.org/fhir/StructureDefinition/sms-cron-expression-schedule",
        extension
      })
    }

    let recipients = [];
    async.each(practitioners, (practitioner, nxt) => {
      if(data.sendToMatchingTerms) {
        practitioner = practitioner._source[data.reportData.indexName].split('/')
        if(practitioner.length === 2) {
          practitioner = practitioner[1]
        } else {
          practitioner = practitioner._source[data.reportData.indexName]
        }
      }
      recipients.push({
        reference: "Practitioner/" + practitioner
      });
      if(recipients.length > 10000) {
        let tmpRecipients = lodash.cloneDeep(recipients)
        communicationReq.recipient = tmpRecipients
        recipients = []
        let url = URI(nconf.get("emnutt:base")).segment('CommunicationRequest');
        axios.post(url.toString(), communicationReq, {
          withCredentials: true,
          auth: {
            username: nconf.get("emnutt:username"),
            password: nconf.get("emnutt:password")
          }
        }).then(() => {
          return nxt()
        }).catch(err => {
          winston.error(err.message)
          errorOccured = true
          return nxt()
        });
      } else {
        return nxt()
      }
    }, () => {
      if(recipients.length > 0) {
        communicationReq.recipient = recipients
        let url = URI(nconf.get("emnutt:base")).segment('CommunicationRequest');
        axios.post(url.toString(), communicationReq, {
          withCredentials: true,
          auth: {
            username: nconf.get("emnutt:username"),
            password: nconf.get("emnutt:password")
          }
        }).then((response) => {
          if(errorOccured) {
            return res.status(500).send(errorOccured)
          }
          res.status(201).json(response.data);
        }).catch(err => {
          winston.error(err.message)
          return res.status(500).send(errorOccured)
        });
      } else {
        if(errorOccured) {
          return res.status(500).send(errorOccured)
        }
        res.status(201).json(response.data);
      }
    })
  })

  function buildTerms(terms, termsMetaData) {
    let body = {
      query: {
        bool: {
          must: []
        }
      }
    }
    if(Object.keys(terms).length > 0) {
      for(let sTerm in terms) {
        if(!terms[sTerm] || terms[sTerm].length === 0) {
          continue;
        }
        let sTermDet = termsMetaData && termsMetaData.find((filter) => {
          return filter.field === sTerm
        })
        if(!sTermDet.isDropDown) {
          terms[sTerm] = terms[sTerm].replace(/\s+/g, ' ').trim()
        }
        let esFieldName
        if(sTermDet.isDropDown) {
          esFieldName = sTerm + '.keyword'
        } else {
          esFieldName = sTerm
        }
        if(Array.isArray(terms[sTerm])) {
          let tms = {
            terms: {}
          }
          tms.terms[esFieldName] = []
          for(let value of terms[sTerm]) {
            tms.terms[esFieldName].push(value)
          }
          body.query.bool.must.push(tms)
        } else {
          if(!sTermDet.isDropDown) {
            let termArr = terms[sTerm].split(' ')
            for(let tm of termArr) {
              let wildCard = {
                wildcard: {}
              }
              wildCard.wildcard[esFieldName] = tm + '*'
              body.query.bool.must.push(wildCard)
            }
          } else {
            let tms = {
              terms: {}
            }
            tms.terms[esFieldName] = [terms[sTerm]]
            body.query.bool.must.push(tms)
          }
        }
      }
    }
    return body
  }
});

router.post('/cancel-message-schedule', (req, res) => {
  let schedules = req.body.schedules
  let url = URI(nconf.get("emnutt:base")).segment('cancelMessageSchedule');
  axios.post(url.toString(), {schedules}, {
    withCredentials: true,
    auth: {
      username: nconf.get("emnutt:username"),
      password: nconf.get("emnutt:password")
    }
  }).then(response => {
    res.status(201).json(response.data);
  }).catch(err => {
    res.status(500).send(err);
  });
})

router.post('/subscribe-contact-groups', (req, res) => {
  let subscriptionsData = req.body
  let errorOccured = false
  async.eachSeries(subscriptionsData.groups, (groupID, nxtSubscr) => {
    fhirAxios.read('Group', groupID).then((groupResource) => {
      for(let memberID of subscriptionsData.members) {
        let exist = groupResource.member && groupResource.member.find((member) => {
          return member.entity.reference === memberID
        })
        if(!exist) {
          if(!groupResource.member) {
            groupResource.member = []
          }
          groupResource.member.push({
            entity: {
              reference: memberID
            }
          })
        }
      }
      fhirAxios.update(groupResource).then((response) => {
        return nxtSubscr();
      }).catch(() => {
        errorOccured = true
        return nxtSubscr();
      })
    })
  }, () => {
    if(errorOccured) {
      return res.status(500).send()
    }
    fhirReports.setup().then(() => {
      fhirReports.runReports()
    }).catch((err) => {
      winston.error( err.message )
    })
    return res.status(200).send()
  })
})

router.post('/add-group', (req, res) => {
  let name = req.body.name
  let resource = {
    resourceType: 'Group',
    name,
  }
  fhirAxios.create(resource).then(async() => {
    try {
      let reportsRunning = await fhirReports.setup()
      if ( reportsRunning ) {
        fhirReports.runReports()
      } else {
        winston.error("Failed to start up reports to ElasticSearch.")
      }
    } catch( err ) {
      winston.error( err.message )
    }
    return res.status(201).send()
  }).catch((err) => {
    winston.error(err.message);
    return res.status(500).send()
  })
})

router.post('/unsubscribe-contact-groups', (req, res) => {
  let errorOccured = false
  let subscriptionsData = req.body
  async.eachSeries(subscriptionsData.groups, (groupID, nxtSubscr) => {
    fhirAxios.read('Group', groupID).then((groupResource) => {
      for(let memberID of subscriptionsData.members) {
        for(let index in groupResource.member) {
          if(groupResource.member[index].entity.reference === memberID) {
            groupResource.member.splice(index, 1)
          }
        }
      }
      fhirAxios.update(groupResource).then((response) => {
        return nxtSubscr();
      }).catch(() => {
        errorOccured = true
      })
    })
  }, () => {
    if(errorOccured) {
      return res.status(500).send()
    }
    fhirReports.setup().then(() => {
      fhirReports.runReports()
    }).catch((err) => {
      winston.error( err.message )
    })
    return res.status(200).send()
  })
})

/**
 * Get all workflows
 */
router.get("/workflows", function (req, res, next) {
  let queries = {
    '_profile': 'http://mhero.org/fhir/StructureDefinition/mhero-workflows'
  }
  let resourceType = 'Basic'
  let resourceData = []
  async.whilst(callback => {
    return callback(null, Object.keys(queries).length > 0);
  }, callback => {
    fhirAxios.search(resourceType, queries).then((searchBundle) => {
      resourceData = resourceData.concat(searchBundle.entry)
      queries = {}
      const next = searchBundle.link && searchBundle.link.find(link => link.relation === 'next');
      if (next) {
        let urlObj = new URL(next.url)
        urlObj.searchParams.forEach((value, name) => {
          queries[name] = value
        })
        resourceType = ''
      }
      return callback(null, queries)
    })
  }, (err) => {
    if (err) {
      return res.status(500).send();
    }
    let workflows = []
    for (let data of resourceData) {
      workflow = data.resource && data.resource.extension && data.resource.extension.find((ext) => {
        return ext.url === "http://mhero.org/fhir/StructureDefinition/mhero-workflows-details"
      })
      if (workflow) {
        let name = workflow.extension.find((ext) => {
          return ext.url === "name"
        })
        workflows.push({
          text: name.valueString,
          id: data.resource.id
        })
      }
    }
    return res.status(200).json(workflows);
  })
});

module.exports = router;
