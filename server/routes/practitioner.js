var express = require("express");
var router = express.Router();
var axios = require("axios");
const URI = require('urijs');
const fs = require('fs')
const mixin = require("../mixin");
const env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/../config/config.json')[env];
if(env === "production") {
  config = JSON.parse(fs.readFileSync(`/run/secrets/server_config`, 'utf8'))[env];
}

router.post("/add/work-history", function (req, res, next) {
  let data = req.body;
  data["resourceType"] = "PractitionerRole";

  let url = URI(config.fhir.server).segment('fhir').segment('PractitionerRole').toString()
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

router.get("/describe/page", function (req, res, next) {
  let practitionerPage = config.definitions.practitionerPage;

  if (!practitionerPage) {
    return res.status(400).json("No practitioner page definition found.");
  }

  let url = URI(config.fhir.server).segment('fhir').segment(practitionerPage).toString()
  axios.get(url, {
    params: {},
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

router.get("/describe/definition/:definition", function (req, res, next) {
  mixin.getDefinition("StructureDefinition", req.params.definition, (err, definition) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(definition);
    }
  })
});

/**
 * Get a specific practitioner
 */
router.get("/view/:id", function (req, res, next) {
  let id = req.params.id;

  let url = URI(config.fhir.server).segment('fhir').segment('Practitioner');
  url.addQuery('_id', id);
  url = url.toString();

  let credentials = {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  };

  axios.get(url, credentials).then(data => {
    if (data === null) {
      res.status(400).json("No practitioner found.");
    } else {
      // get the practitioner roles (ie, work history)
      let url = URI(config.fhir.server).segment('fhir').segment('PractitionerRole');
      url.addQuery('practitioner', id);
      url = url.toString();

      axios.get(url, credentials).then(response => {
        let practitioner = data.data;
        let workHistory = [];

        response.data.entry.forEach(job => {
          workHistory.push(job.resource);
        });

        practitioner.entry[0].resource.workHistory = workHistory;

        res.status(201).json(practitioner);
      });
    }
  });
});

/**
 * Add a new practitioner
 */
router.post("/add", function (req, res, next) {
  let data = req.body;
  data["resourceType"] = "Practitioner";

  let url = URI(config.fhir.server).segment('fhir').segment('Practitioner').toString()
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

/**
 * Edit an existing practitioner
 */
router.post("/edit", function (req, res, next) {
  let data = req.body;
  data["resourceType"] = "Practitioner";

  let url = URI(config.fhir.server).segment('fhir').segment('Practitioner').segment(data.id).toString()
  axios.put(url, data, {
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

/**
 * Search for practitioners
 */
router.get("/search", function (req, res, next) {
  let url = URI(config.fhir.server).segment('fhir').segment('Practitioner').toString();
  url += req._parsedUrl.search;

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
