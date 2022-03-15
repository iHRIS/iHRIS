const nconf = require("./config");
const winston = require("winston");
const fhirAxios = nconf.fhirAxios;

const workflowSalary = {
  process: (req) => {
    return new Promise((resolve, reject) => {
      let resource;
      let bundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: [],
      };
      //winston.info(JSON.stringify( req.body,null,2))
      resource = await fhirAxios.read("Practitioner", req.query.practitioner);

      if (resource) {
        try {
          if (
            req.body &&
            req.body.item &&
            req.body.item &&
            req.body.item[0].linkId === "Basic" &&
            req.body.item[0].item &&
            req.body.item[0].item[0].linkId ===
              "Basic.extension[0].extension[0]" &&
            req.body.item[0].item[0].answer &&
            req.body.item[0].item[0].answer[0]
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
            //let total = ""
            if (
              req.body.item[0].item[0].linkId ===
                "Basic.extension[0].extension[0]" &&
              req.body.item[0].item[0].answer &&
              req.body.item[0].item[0].answer[0] &&
              req.body.item[0].item[0].answer[0].valueCoding
            ) {
              complexExt.push({
                url: "salaryScale",
                valueCoding: req.body.item[0].item[0].answer[0].valueCoding,
              });
            }
            if (
              req.body.item[0].item[1].linkId ===
                "Basic.extension[0].extension[1]" &&
              req.body.item[0].item[1].answer &&
              req.body.item[0].item[1].answer[0] &&
              req.body.item[0].item[1].answer[0].valueString
            ) {
              complexExt.push({
                url: "bsalary",
                valueString: req.body.item[0].item[1].answer[0].valueString,
              });
              //total = total + parseInt(req.body.item[0].item[1].answer[0].valueString)
            }
            if (
              req.body.item[0].item[2].linkId ===
                "Basic.extension[0].extension[2]" &&
              req.body.item[0].item[2].answer &&
              req.body.item[0].item[2].answer[0] &&
              req.body.item[0].item[2].answer[0].valueString
            ) {
              complexExt.push({
                url: "allowance",
                valueString: req.body.item[0].item[2].answer[0].valueString,
              });
              //total = total + parseInt(req.body.item[0].item[4].answer[0].valueString)
            }
            if (
              req.body.item[0].item[3].linkId ===
                "Basic.extension[0].extension[3]" &&
              req.body.item[0].item[3].answer &&
              req.body.item[0].item[3].answer[0] &&
              req.body.item[0].item[3].answer[0].valueString
            ) {
              complexExt.push({
                url: "benefits",
                valueString: req.body.item[0].item[3].answer[0].valueString,
              });
              //total = total + parseInt(req.body.item[0].item[5].answer[0].valueString)
            }
            /*if (total != ''){
                complexExt.push({ url: "total",
                valueString: (total + '') })
            }*/
            if (
              (req.body.item[0].item[4].linkId ===
                "Basic.extension[0].extension[4]" &&
                req.body.item[0].item[4].answer &&
                req.body.item[0].item[4].answer[0] &&
                req.body.item[0].item[4].answer[0].valueDate) ||
              (req.body.item[0].item[5].linkId ===
                "Basic.extension[0].extension[5]" &&
                req.body.item[0].item[5].answer &&
                req.body.item[0].item[5].answer[0] &&
                req.body.item[0].item[5].answer[0].valueDate)
            ) {
              complexExt.push({
                url: "period",
                valuePeriod: {
                  start: req.body.item[0].item[5].answer[0].valueDate,
                  end: req.body.item[0].item[5].answer[0].valueDate,
                },
              });
            }
            if (
              req.body.item[0].item[6].linkId ===
                "Basic.extension[0].extension[6]" &&
              req.body.item[0].item[6].answer &&
              req.body.item[0].item[6].answer[0] &&
              req.body.item[0].item[6].answer[0].valueText
            ) {
              complexExt.push({
                url: "remark",
                valueString: req.body.item[0].item[6].answer[0].valueText,
              });
            }
            if (
              req.body.item[0].item[7].linkId ===
                "Basic.extension[0].extension[7]" &&
              req.body.item[0].item[7].answer &&
              req.body.item[0].item[7].answer[0] &&
              req.body.item[0].item[7].answer[0].valueCoding
            ) {
              complexExt.push({
                url: "salarySource",
                valueCoding: req.body.item[0].item[7].answer[0].valueCoding,
              });
            }
            if (
              req.body.item[0].item[8].linkId ===
                "Basic.extension[0].extension[8]" &&
              req.body.item[0].item[8].answer &&
              req.body.item[0].item[8].answer[0] &&
              req.body.item[0].item[8].answer[0].valueCoding
            ) {
              complexExt.push({
                url: "frequency",
                valueCoding: req.body.item[0].item[8].answer[0].valueCoding,
              });
            }
            if (
              req.body.item[0].item[9].linkId ===
                "Basic.extension[0].extension[9]" &&
              req.body.item[0].item[9].answer &&
              req.body.item[0].item[9].answer[0] &&
              req.body.item[0].item[9].answer[0].valueBoolean
            ) {
              complexExt.push({
                url: "current",
                valueBoolean: req.body.item[0].item[9].answer[0].valueBoolean,
              });
            }
            if (complexExt) {
              extensions.push({
                url: "http://ihris.org/fhir/StructureDefinition/ihris-salary",
                extension: complexExt,
              });
            }
            let newSalary = {
              resourceType: "Basic",
              meta: {
                profile: [
                  "http://ihris.org/fhir/StructureDefinition/ihris-basic-salary",
                ],
              },
              extension: extensions,
            };

            bundle.entry.push({
              resource: newSalary,
              request: {
                method: "POST",
                url: "Basic",
              },
            });
            resolve(bundle);
          } else {
            resolve(await workflowSalary.outcome("No Salary Scale provided"));
          }
        } catch (err) {
          logger.error(err);
          resolve(await workflowSalary.outcome(err.message));
        }
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
      winston.info(JSON.stringify(outcomeBundle, null, 2));
      resolve(outcomeBundle);
    });
  },
};

module.exports = workflowSalary;
