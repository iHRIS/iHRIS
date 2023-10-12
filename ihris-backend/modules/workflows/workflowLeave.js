const nconf = require("../config");
const logger = require("winston");
const differenceInBusinessDays = require("date-fns/differenceInBusinessDays");
const fhirAxios = nconf.fhirAxios;

const workflowLeave = {
  process: (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        let resource;
        let bundle = {
          resourceType: "Bundle",
          type: "transaction",
          entry: [],
        };
        /*if (resource.active == false) {
          resolve(await workflowLeave.outcome("This practitioner is not currently active"));
        }*/
        fhirAxios
          .read("Practitioner", req.query.practitioner)
          .then(async (resource) => {
            if (
                req.body &&
                req.body.item &&
                req.body.item &&
                req.body.item[0].linkId === "Basic" &&
                req.body.item[0].item &&
                req.body.item[0].item[0].linkId ===
                "Basic.extension[0].extension[0]" &&
                req.body.item[0].item[0].answer &&
                req.body.item[0].item[0].answer[0] &&
                req.body.item[0].item[0].answer[0].valueCoding
            ) {
              if (req.query.practitioner) {
                req.body.subject = {
                  reference: "Practitioner/" + req.query.practitioner,
                };
              }
              let extensions = [];
              if (resource.resourceType === "Practitioner") {
                extensions.push({
                  url: "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference",
                  valueReference: {
                    reference: "Practitioner/" + req.query.practitioner,
                  },
                });
              }

              let complexExt = [];
              if (
                  req.body.item[0].item[0].linkId ===
                  "Basic.extension[0].extension[0]" &&
                  req.body.item[0].item[0].answer &&
                  req.body.item[0].item[0].answer[0] &&
                  req.body.item[0].item[0].answer[0].valueCoding
              ) {
                complexExt.push({
                  url: "leave-type",
                  valueCoding: req.body.item[0].item[0].answer[0].valueCoding,
                });
              }
              if (
                  (req.body.item[0].item[1].linkId ===
                      "Basic.extension[0].extension[1]" &&
                      req.body.item[0].item[1].answer &&
                      req.body.item[0].item[1].answer[0] &&
                      req.body.item[0].item[1].answer[0].valueDateTime) ||
                  (req.body.item[0].item[2].linkId ===
                      "Basic.extension[0].extension[2]" &&
                      req.body.item[0].item[2].answer &&
                      req.body.item[0].item[2].answer[0] &&
                      req.body.item[0].item[2].answer[0].valueDateTime)
              ) {
                complexExt.push({
                  url: "period",
                  valuePeriod: {
                    start: req.body.item[0].item[1].answer[0].valueDateTime,
                    end: req.body.item[0].item[2].answer[0].valueDateTime,
                  },
                });

                let requestedDays = differenceInBusinessDays(
                    new Date(req.body.item[0].item[2].answer[0].valueDateTime),
                    new Date(req.body.item[0].item[1].answer[0].valueDateTime)
                );
                complexExt.push({
                  url: "daysRequested",
                  valueInteger: requestedDays,
                });
              }
              /*if ( req.body.item[0].item[3].linkId === "Basic.extension[0].extension[3]"
                && req.body.item[0].item[3].answer
                && req.body.item[0].item[3].answer[0]
                && req.body.item[0].item[3].answer[0].valueInteger){
                complexExt.push({ url: "daysRequested",
                valueInteger:req.body.item[0].item[3].answer[0].valueInteger })
                logger.info(JSON.stringify(complexExt,null,2))
            } */
              if (
                  req.body.item[0].item[3].linkId ===
                  "Basic.extension[0].extension[3]" &&
                  req.body.item[0].item[3].answer &&
                  req.body.item[0].item[3].answer[0] &&
                  req.body.item[0].item[3].answer[0].valueDate
              ) {
                complexExt.push({
                  url: "dateRequested",
                  valueDate: req.body.item[0].item[3].answer[0].valueDate,
                });
              }
              if (complexExt) {
                extensions.push({
                  url: "http://ihris.org/fhir/StructureDefinition/ihris-leave",
                  extension: complexExt,
                });
              }
              let newLeave = {
                resourceType: "Basic",
                meta: {
                  profile: [
                    "http://ihris.org/fhir/StructureDefinition/ihris-basic-leave",
                  ],
                },
                extension: extensions,
              };

              bundle.entry.push({
                resource: newLeave,
                request: {
                  method: "POST",
                  url: "Basic",
                },
              });
              resolve(bundle);
            } else {
              resolve(await workflowLeave.outcome("No Leave Type provided"));
            }
          }).catch((err)=>console.log("hello",JSON.stringify(err,null,2)));
      } catch (err) {
        console.log(JSON.stringify(err,null,2))
        //winston.error(err);
        reject(err);
      }
    });
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
      logger.info(JSON.stringify(outcomeBundle, null, 2));
      resolve(outcomeBundle);
    });
  },
};

module.exports = workflowLeave;
