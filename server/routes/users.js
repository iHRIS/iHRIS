var express = require('express');
const models = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
  let data = req.body;

  models.User.build(data).validate().then(() => {
    models.User.create(data).then((patient) => {
      res.status(201).json(patient);
    }).catch(err => {
      res.status(400).json(err);
    })
  }).catch(err => {
    res.status(400).json(err);
  });
});

module.exports = router;
