const express = require('express')
const router = express.Router()
const ihrissmartrequire = require('ihrissmartrequire')
ihrissmartrequire.ignore("*node_modules")
const nconf = ihrissmartrequire('modules/config')
const fhirAxios = nconf.fhirAxios
const outcomes = ihrissmartrequire('config/operationOutcomes')
const logger = ihrissmartrequire('winston')
const bulkRegistration = ihrissmartrequire("bulkRegistration")
const utils = ihrissmartrequire("utils")

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
                    console.log("I have Valid Response")
                    await fhirAxios.create(response.data.bundle).then((results) => {
                        return res.status(201).json(results);
                      })
                      .catch((err) => {
                        logger.error(err);
                        // console.log(JSON.stringify(err,null,2))
                        return res.status(500).json(err);
                      });
                  } else {
                    console.log("I Don't have Valid Response")
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

module.exports = router