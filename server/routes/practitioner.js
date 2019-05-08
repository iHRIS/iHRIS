var express = require('express');
const models = require('../models');
var router = express.Router();

/**
 * Add a new practitioner
 */
router.post('/add', function(req, res, next) {
  let data = req.body;

  models.Practitioner.build(data).validate().then(() => {
    models.Practitioner.create(data).then((patient) => {
      res.status(201).json(patient);
    }).catch(err => {
      res.status(400).json(err);
    })
  }).catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;
