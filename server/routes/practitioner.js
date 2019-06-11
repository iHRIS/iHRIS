var express = require("express");
const models = require("../models");
var router = express.Router();
var axios = require("axios");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

router.get("/describe/page", function(req, res, next) {
  let practitionerPage = config.definitions.practitionerPage;

  if (!practitionerPage) {
    return res.status(400).json("No practitioner page definition found.");
  }

  axios.get(config.fhir.server + "/fhir/" + practitionerPage, {
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

router.get("/describe/definition/:definition", function(req, res, next) {
  axios.get(config.fhir.server + "/fhir/StructureDefinition/" + req.params.definition, {
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

/**
 * Get a specific practitioner
 */
router.get("/view/:id", function(req, res, next) {
  let id = req.params.id;

  models.Practitioner.findOne({
    where: {
      id: id
    }
  }).then(practitioner => {
    if (practitioner === null) {
      res.status(400).json("No practitioner found.");
    } else {
      res.status(201).json(practitioner);
    }
  });
});

/**
 * Add a new practitioner
 */
router.post("/add", function(req, res, next) {
  let data = req.body;

  models.Practitioner.build(data).validate().then(() => {
    models.Practitioner.create(data).then((practitioner) => {
      res.status(201).json(practitioner);
    }).catch(err => {
      res.status(400).json(err);
    })
  }).catch(err => {
    res.status(400).json(err);
  });
});

/**
 * Edit an existing practitioner
 */
router.post("/edit", function(req, res, next) {
  let data = req.body;

  models.Practitioner.findOne({
    where: {
      id: data.id
    }
  }).then(practitioner => {
    if (practitioner === null) {
      res.status(400).json("No practitioner found.");
    } else {
      practitioner.update(data).then(() => {
        res.status(201).json(practitioner);
      }).catch(err => {
        res.status(400).json(err);
      });
    }
  }).catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;
