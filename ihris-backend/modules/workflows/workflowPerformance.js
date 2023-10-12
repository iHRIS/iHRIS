const winston = require('winston')
const ihrissmartrequire = require("ihrissmartrequire")
const fhirQuestionnaire = ihrissmartrequire('modules/fhir/fhirQuestionnaire')

const workflowPerformance = {
  process: ( req ) => {
    return new Promise(async (resolve, reject) => {
      try {
        fhirQuestionnaire.processQuestionnaire( req.body ).then( (bundle) => {
          let practitioner = req.query.practitioner
          let performanceIndex = bundle.entry && bundle.entry.findIndex(entry => entry.resource.resourceType === 'Basic' && entry.resource.meta && entry.resource.meta.profile.includes('http://ihris.org/fhir/StructureDefinition/ihris-basic-performance'))
          let performance = bundle.entry[performanceIndex]
            performance.resource.extension.push({
            url: 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference',
            valueReference: {
              reference: 'Practitioner/' + practitioner
            }
          })
          return resolve(bundle)
        })
      } catch (err) {
        resolve(await workflowPerformance.outcome("Error Processing Module: " + err.message));
      }
    } )
  },
  postProcess: (req, results) => {
    return new Promise((resolve, reject) => {
      if (
        results.entry &&
        results.entry.length > 0 &&
        results.entry[0].response.location
      ) {
        if (!req.body.meta) req.body.meta = {};
        if (!req.body.meta.tag) req.body.meta.tag = [];
        req.body.meta.tag.push({
          system: "http://ihris.org/fhir/tags/resource",
          code: results.entry[0].response.location,
        });
        resolve(req);
      }
    });
  },
  outcome: (message) => {
    return new Promise((resolve, reject) => {
      let outcomeBundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: [
          {
            resource: {
              resourceType: "OperationOutcome",
              issue: [
                {
                  severity: "error",
                  code: "exception",
                  diagnostics: message,
                },
              ],
            },
            request: {
              method: "POST",
              url: "OperationOutcome",
            },
          },
        ],
      };
      winston.info(JSON.stringify(outcomeBundle, null, 2));
      resolve(outcomeBundle);
    });
  },
};

module.exports = workflowPerformance;
