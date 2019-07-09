var express = require("express");
const models = require("../models");
var router = express.Router();
var axios = require("axios");
const mixin = require("../mixin");
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
  mixin.getDefinition("StructureDefinition", req.params.definition, (err, definition) => {
    if(err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(definition);
    }
  })
  // axios.get(config.fhir.server + "/fhir/StructureDefinition/" + req.params.definition, {
  //   params: {},
  //   withCredentials: true,
  //   auth: {
  //     username: config.fhir.username,
  //     password: config.fhir.password
  //   }
  // }).then(response => {
  //   res.status(201).json(response.data);
  // }).catch(err => {
  //   res.status(400).json(err);
  // });
});

/**
 * Get a specific practitioner
 */
router.get("/view/:id", function(req, res, next) {
  let id = req.params.id;

  axios.get(config.fhir.server + "/fhir/Practitioner?_id=" + id, {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(practitioner => {
    if (practitioner === null) {
      res.status(400).json("No practitioner found.");
    } else {
      res.status(201).json(practitioner.data);
    }
  });
});

/**
 * Add a new practitioner
 */
router.post("/add", function(req, res, next) {
  let data = req.body;
  data["resourceType"] = "Practitioner";

  axios.post(config.fhir.server + "/fhir/Practitioner", data, {
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
