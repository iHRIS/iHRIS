const express = require('express')
const router = express.Router()
const ihrissmartrequire = require("ihrissmartrequire")
const nconf = ihrissmartrequire('modules/config')
const fhirAxios = nconf.fhirAxios
const outcomes = ihrissmartrequire('config/operationOutcomes')

router.post("/saveTask", async(req, res) => {
  if(req.user.resource && req.user.resource.id === 'ihris-user-loggedout') {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  if (!req.body) {
    return res.status(400).end();
  }else {
    fhirAxios.create(req.body).then((results) => {
      return res.status(201).json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
  }
})

router.post("/saveRole",(req,res) => {
  if(req.user.resource && req.user.resource.id === 'ihris-user-loggedout') {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  if (!req.body) {
    return res.status(400).end();
  }else {
    fhirAxios.create(req.body).then((results) => {
      return res.status(201).json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
  }
})

router.put("/updateRole",(req,res)=> {
  if(req.user.resource && req.user.resource.id === 'ihris-user-loggedout') {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  if (!req.body) {
    return res.status(400).end();
  }else {

    fhirAxios.update(req.body).then((results) => {
      return res.status(201).json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
  }
})

module.exports = router;
