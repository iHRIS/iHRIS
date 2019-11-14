var express = require("express");
var router = express.Router();
var axios = require("axios");
const URI = require("urijs");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

/**
 * Get all dashboards
 */
router.get("/all", function (req, res, next) {
  let url = "http://scratchpad.ihris.org/kibana/api/saved_objects/_find?type=dashboard";

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
