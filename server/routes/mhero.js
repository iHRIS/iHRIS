var express = require("express");
var router = express.Router();
var axios = require("axios");
const URI = require("urijs");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

/**
 * Send message
 */
router.post("/send-message", function (req, res, next) {
  let url = URI(config.emNutt.server).segment('fhir').segment('CommunicationRequest');
  let data = req.body;

  let recipients = [];

  data.practitioners.forEach(practitioner => {
    recipients.push({
      reference: "Practitioner/" + practitioner
    });
  });

  let payload = {
    payload: [
      {
        contentAttachment: {
          url: data.workflow
        }
      }
    ],
    recipient: recipients,
    resourceType: "CommunicationRequest",
    workflow: data.workflow
  };

  axios.post(url.toString(), payload, {
    withCredentials: true,
    auth: {
      username: config.emNutt.username,
      password: config.emNutt.password
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
  let url = URI(config.emNutt.server).segment('fhir').segment('Basic');
  url.addQuery('_profile', config.mhero + "/mHeroWorkflows");
  url = url.toString();

  axios.get(url, {
    withCredentials: true,
    auth: {
      username: config.emNutt.username,
      password: config.emNutt.password
    }
  }).then(response => {
    res.status(201).json(response.data);
  }).catch(err => {
    res.status(201).json(err);
  });
});

module.exports = router;
