var express = require("express");
var router = express.Router();
var axios = require("axios");

const URI = require('urijs');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

router.get("/all/:definition", async function (req, res, next) {
  let previousUrl = null;
  let url = URI(config.fhir.server).segment('fhir').segment(req.params.definition);
  let results = [];

  url.addQuery("_count", 500);
  url = url.toString();

  do {
    previousUrl = url;

    let response = await axios.get(url, {
      params: {},
      withCredentials: true,
      auth: {
        username: config.fhir.username,
        password: config.fhir.password
      }
    });

    if (response.data.link) {
      for (var i in response.data.link) {
        let link = response.data.link[i];

        if (link.relation === "next") {
          url = link.url;
        }
      }
    }

    results = results.concat(response.data.entry);
  } while (url !== previousUrl);


  res.status(201).json(results);
});

/**
 * Save a new structure definition
 */
router.post("/add", function (req, res, next) {
  let data = req.body;

  let url = URI(config.fhir.server).segment('fhir').segment(data["resourceType"]).toString()
  axios.post(url, data, {
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
