var express = require("express");
var router = express.Router();
const async = require("async");
const axios = require("axios")
const URI = require("urijs");
const url = require('url');
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios

/**
 * Send message
 */
router.post("/send-message", function (req, res, next) {
  let data = req.body

  let recipients = [];

  data.practitioners.forEach(practitioner => {
    recipients.push({
      reference: "Practitioner/" + practitioner
    });
  });
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
    recipient: recipients,
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
  let url = URI(nconf.get("emnutt:base")).segment('CommunicationRequest');
  axios.post(url.toString(), communicationReq, {
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
  async.eachSeries(subscriptionsData.groups, (groupID, nxtSubscr) => {
    fhirAxios.read('Group', groupID).then((groupResource) => {
      for(let memberID of subscriptionsData.members) {
        let exist = groupResource.member.find((member) => {
          return member.entity.reference === memberID
        })
        if(!exist) {
          groupResource.member.push({
            entity: {
              reference: memberID
            }
          })
        }
      }
      fhirAxios.update(groupResource).then((response) => {
        return nxtSubscr();
      })
    })
  }, () => {
    return res.status(200).send()
  })
})

router.post('/add-group', (req, res) => {
  let name = req.body.name
  let resource = {
    resourceType: 'Group',
    name,
  }
  fhirAxios.create(resource).then(() => {
    return res.status(201).send()
  }).catch((err) => {
    console.log(err);
    return res.status(500).send()
  })
})

router.post('/unsubscribe-contact-groups', (req, res) => {
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
      })
    })
  }, () => {
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
      workflow = data.resource.extension.find((ext) => {
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