var express = require("express");
var router = express.Router();
var axios = require("axios");
const fs = require('fs')
const URI = require('urijs');
const env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/../config/config.json')[env];
if(env === "production") {
  config = JSON.parse(fs.readFileSync(`/run/secrets/server_config`, 'utf8'))[env];
}

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

module.exports = router;
