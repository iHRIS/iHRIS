var express = require('express');
const models = require('../models');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
  let data = req.body;

  models.User.build(data).validate().then( () => {
    models.User.upsert(data).then( (patient) => {
      res.status(201).json({ok:1})
    }).catch(err => {
      console.log("ERROR")
      console.log(err)
    })
  }).catch(err => { console.log(err); res.status(400).json({ ok: 0, error: err }); })
  res.send('success');
});

module.exports = router;
