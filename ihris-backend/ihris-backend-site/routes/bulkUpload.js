const express = require("express");
const router = express.Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const XLSX = require("xlsx");
const ihrissmartrequire = require('ihrissmartrequire')
const fhirAxios = ihrissmartrequire("modules/fhirAxios");
const logger = require('../../winston')
const outcomes = ihrissmartrequire('config/operationOutcomes')
const bulkRegistration = ihrissmartrequire("bulkRegistration")
const utils = ihrissmartrequire("utils")
const fs = require("fs");
const { nanoid } = require("nanoid");

const trimObjValues = (obj) => {
  return Object.keys(obj).reduce((acc, curr) => {
    acc[curr] = typeof obj[curr] == "string" ? obj[curr].trim() : obj[curr];
    return acc;
  }, {});
};

router.get("/csvTemplate", (req, res) => {
  let p = path.join(__dirname, "../", "file/sampleInput.xlsx");
  res.download(p);
});

router.post("/bulkRegistration", async (req, res) => {
  if (!req.body) {
    return res.status(400).end();
  } else {
    try {
      await utils.setUserdata(req).then(async (userResults) => {
          if (userResults.length > 0) {
            await bulkRegistration(userResults)
              .then(async (response) => {
                if (response.isValid) {
                  await fhirAxios.create(response.data.bundle).then((results) => {
                      return res.status(201).json(results);
                    })
                    .catch((err) => {
                      logger.error(err);
                      // console.log(JSON.stringify(err,null,2))
                      return res.status(500).json(err);
                    });
                } else {
                  return res.json(response);
                }
              })
              .catch((err) => {
                logger.error(err.message);
              });
          }
        })
        .catch((err) => {
          // console.log(JSON.stringify(err, null, 2));
          logger.error(err);
        });
    } catch (e) {
      console.log(e);
    }
  }
});

module.exports = router;