const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const fhirpath = require('fhirpath')

router.get("/", (req, res, next) => {
  res.status(200).json( { user: req.user } )
} )

router.get("/:resource?/:id?", (req, res) => {
  res.status(200).json( { user: req.user, resource: req.params.resource, id: req.params.id } )
} )

module.exports = router;
