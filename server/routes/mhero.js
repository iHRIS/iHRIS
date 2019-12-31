var express = require("express");
var router = express.Router();
var axios = require("axios");
const URI = require("urijs");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

/**
 * Get all dashboards
 */
router.get("/workflows", function (req, res, next) {
  let url = URI(config.fhir.server).segment('fhir').segment('Basic');
  url.addQuery('_profile', config.mhero + "/mHeroWorkflows");
  url = url.toString();

  axios.get(url, {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(response => {
    res.status(201).json(response.data);
  }).catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;
