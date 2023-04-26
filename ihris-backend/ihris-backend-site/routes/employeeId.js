const express = require("express");
const router = express.Router();
const path = require("path");
const ihrissmartrequire = require('ihrissmartrequire')
const fhirAxios = ihrissmartrequire("modules/fhirAxios");
const logger = require('../../winston')
const outcomes = ihrissmartrequire('config/operationOutcomes')
const employeeId = ihrissmartrequire("mployeeIdPrintout");

router.get("/employeeId/:id", (req, res) => {
  if (req.params.id) {
      fhirAxios.read("Practitioner", req.params.id).then(async (user) => {
          let userData = {};
          userData.id = req.params.id;

          userData.fullName = `${user.name[0].prefix[0]} ${user.name[0].given[0]} ${user.name[0].family}`

          userData.gender = user.gender;

          userData.photo = user.photo;

          userData.phone = user.telecom?.find(x => x.system === "phone")?.value;

          userData.employeeId = user.identifier?.find(x => x.type.coding[0].code = "EN")?.value;

          userData.residence = user.address[0]?.city;

          userData.nationality = user.address[0]?.country;

          userData.email = user.telecom?.find(x => x.system === "email")?.value

          let data = await fhirAxios.search("PractitionerRole", {
              _profile:
                  "http://ihris.org/fhir/StructureDefinition/ihris-practitioner-role",
              practitioner: req.params.id,
          });
          let facilityLocation =
              data.entry && data.entry.length > 0
                  ? data.entry[0].resource.location[0].reference.split("/")
                  : null;
          if (facilityLocation != null) {
              let facilityData = await fhirAxios.read(
                  facilityLocation[0],
                  facilityLocation[1]
              );

              let facilityInformation = facilityData?.extension?.find(x => x.url === "http://ihris.org/fhir/StructureDefinition/ihris-facility-information-details")

              let logo = facilityInformation?.extension?.find(x => x.url === "logo")?.valueAttachment

              let stamp = facilityInformation?.extension?.find(x => x.url === "stamp")?.valueAttachment

              let signature = facilityInformation?.extension?.find(x => x.url === "signature")?.valueAttachment

              userData.logo = logo;

              userData.signature = signature;

              userData.stamp = stamp;
          }
          let role = data.entry
              ? data.entry[0].resource.code[0].coding[0].display
              : "";
          userData.position = role ? role : "";

          let fileName = `${userData.id}_id.png`;
          let p = path.join(__dirname, "../tmp/", fileName);
          employeeId(userData).then(() => {
              res.download(p);
          });
      });
  }
});

module.exports = router