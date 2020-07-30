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
      contentAttachment: {
        url: data.workflow
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
    res.status(400).json(err);
  });
});

/**
 * Get all workflows
 */
router.get("/workflows", function (req, res, next) {
  let queries = {
    '_profile': 'http://mhero.org/fhir/StructureDefinition/mHeroWorkflows',
    '_count': 2
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
        return ext.url === "http://mhero.org/fhir/StructureDefinition/mHeroWorkflowsDetails"
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