var express = require("express");
const models = require("../models");
var router = express.Router();

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
