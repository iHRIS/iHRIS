const express = require("express");
const router = express.Router();
const path = require("path");
const ihrissmartrequire = require('ihrissmartrequire')
const fhirAxios = ihrissmartrequire("modules/fhirAxios");
const logger = require('../../winston')
const outcomes = ihrissmartrequire('config/operationOutcomes')
const employeeCv = ihrissmartrequire("employeeCvPrintout");
const fs = require("fs");

router.get("/employeeCv/:id", async (req, res) => {
  if (req.params.id) {
      const userData = {};
      userData.id = req.params.id;
      const educationData = [];
      const workExperiences = [];
      const languages = [];
      try {
          const data = await fhirAxios.search(`/Basic`, {
              practitioner: req.params.id,
              _profile:
                  "http://ihris.org/fhir/StructureDefinition/ihris-basic-employment-history",
          });
          if (data && data.entry && data.entry.length > 0) {
              data.entry.map((expr) => {
                  let employmentHistory = expr.resource.extension.find(x => x.url === "http://ihris.org/fhir/StructureDefinition/ihris-employment-history")
                  let workExperience = {};
                  workExperience.organization = employmentHistory.extension.find(x => x.url === "organization")?.valueString
                  workExperience.address = employmentHistory.extension.find(x => x.url === "address")?.valueString
                  workExperience.startingPosition = employmentHistory.extension.find(x => x.url === "startingPosition")?.valueString
                  workExperience.period = employmentHistory.extension.find(x => x.url === "period")?.valuePeriod
                  workExperiences.push(workExperience);
              });
          }
      } catch (e) {
          logger.error(e.message)
      }

      try {
          let data = await fhirAxios.search("PractitionerRole", {
              _profile:
                  "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role",
              practitioner: req.params.id,
          });

          let role = data.entry
              ? data.entry[0].resource.code[0].coding[0].display
              : "";
          userData.position = role ? role : "";
      } catch (e) {
        logger.error(e.message)
      }
      try {
          const data = await fhirAxios.search(`/Basic`, {
              practitioner: req.params.id,
              _profile:
                  "http://ihris.org/fhir/StructureDefinition/ihris-basic-education-history",
          });
          if (data && data.entry && data.entry.length > 0) {
              data.entry.map((data) => {
                  let educationInfo = {};
                  let educationHistory = data.resource.extension.find(x => x.url === "http://ihris.org/fhir/StructureDefinition/ihris-education-history")
                  educationInfo.institution = educationHistory.extension.find(x => x.url === "institution")?.valueCoding?.display;
                  educationInfo.level = educationHistory.extension.find(x => x.url === "level")?.valueCoding?.display
                  educationInfo.educationalMajor = educationHistory.extension.find(x => x.url === "educationalMajor")?.valueCoding?.display
                  educationInfo.year = educationHistory.extension.find(x => x.url === "year")?.valueDate
                  educationData.push(educationInfo);
              });
          }
      } catch (e) {
        logger.error(e.message)
      }
      try {
          const user = await fhirAxios.read("/Practitioner", req.params.id);
          userData.fullName = `${user.name[0].prefix[0]} ${user.name[0].given[0]} ${user.name[0].family}`

          userData.gender = user.gender;
          userData.photo = user.photo;
          userData.phone = user.telecom.find(x => x.system === "phone")?.value;
          userData.email = user.telecom.find(x => x.system === "email")?.value

          userData.education = educationData;

          if (user.communication && user.communication.length > 0) {
              user.communication.map((lang) => {

                  languages.push(lang.coding[0].display);
              });
          }
          userData.languages = languages;
          userData.workExperiences = workExperiences;
      } catch (e) {
        logger.error(e.message)
      }
      let fileName = `${userData.id}_cv.pdf`;
      let p = path.join(__dirname, "../tmp/", fileName);
      employeeCv(userData).then((_) => {
              res.download(p);
          }).catch(e){
            logger.error(e.message)
          }
  }
});

module.exports = router