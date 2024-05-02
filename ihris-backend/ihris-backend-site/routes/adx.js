const express = require('express')
const router = express.Router()
const ihrissmartrequire = require('ihrissmartrequire')
ihrissmartrequire.ignore("*node_modules")
const logger = ihrissmartrequire('winston')
const fhirAdx = ihrissmartrequire("fhirAdx")
const outcomes = ihrissmartrequire('config/operationOutcomes')

router.get("/:location/:period", async (req, res) => {
  if (!req.user) {
    return res.status(401).json(outcomes.NOTLOGGEDIN)
  } 
  if (!req.params.location || !req.params.period) {
    return res.status(400).end();
  } else {
    let location = req.params.location
    let period = req.params.period
    try {
      await fhirAdx.getAdxSummary(period, location)
        .then(async (response) => {
          if (response) {
            return res.status(201).json(response);
          } else {
            return res.json(response);
          }
        })
        .catch((err) => {
          logger.error(err.message);
        });
    } catch (e) {
      console.log(e);
    }
  }
});
module.exports = router