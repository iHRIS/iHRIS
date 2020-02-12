var express = require("express");
var router = express.Router();
var axios = require("axios");
const URI = require("urijs");
const fs = require('fs')
const env = process.env.NODE_ENV || "development";

var config = require(__dirname + '/../config/config.json')[env];
if(env === "production") {
  config = JSON.parse(fs.readFileSync(`/run/secrets/server_config`, 'utf8'))[env];
}

/**
 * Get all dashboards
 */
router.get("/all", function (req, res, next) {
  let url = config.kibana + "/api/saved_objects/_find?type=dashboard";

  axios.get(url, {
    headers: {
      "kbn-xsrf": "kibana"
    },
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(response => {
    res.status(201).json(response.data);
  }).catch(err => {
    res.status(200).json(err);
  });
});

module.exports = router;
