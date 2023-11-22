const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const ihrissmartrequire = require('ihrissmartrequire')
const fhirAxios = ihrissmartrequire("modules/fhir/fhirAxios");
const logger = require('../../winston')
const outcomes = ihrissmartrequire('config/operationOutcomes')

const getCodeSystem = (value, valueSet) => {
  return new Promise((resolve, reject) => {
    let valuecoding = {};
    fhirAxios.expand(valueSet, true, true)
      .then((expansion) => {
        try {
          valuecoding = expansion.expansion.contains.find(
            (element) => element.display === value
          );
          resolve(valuecoding);
        } catch (error) {
          console.log(error);
          logger.error(error);
          reject(error);
        }
      })
      .catch((err) => {
        console.log(err);
        logger.error(err.message);
        reject(err);
      });
  });
};

const getReferences = (resourceType, resource) => {
  return new Promise((resolve, reject) => {
    let params = { "name:exact": resource };
    fhirAxios.search(resourceType, params).then((result) => {
        try {
          let references = [];
          if (result.entry && result.entry.length > 0) {
            references = result.entry.map((entry) => entry.resource.id);
          }
          if (references.length > 0) {
            resolve(references[0]);
          } else {
            resolve(undefined);
          }
        } catch (error) {
          console.log(error);
          logger.error(error);
          reject(error);
        }
      })
      .catch((err) => {
        console.log(err);
        logger.error(err.message);
        reject(err);
      });
  });
};

const getLocationReferences = (id) => {
  return new Promise((resolve, reject) => {
    fhirAxios.read("Location", id).then((result) => {
        try {
          if (result?.id) {
            resolve(result.id);
          } else {
            resolve(undefined);
          }
        } catch (error) {
          console.log(error);
          logger.error(error);
          reject(error);
        }
      })
      .catch((err) => {
        console.log(err);
        logger.error(err.message);
        reject(err);
      });
  });
};

const getRelatedLocation = (id) => {
  return new Promise((resolve, reject) => {
    let partOf = [];
    let params = {
      _id: id,
      status: "active",
      "_include:iterate": "Location:partof",
    };

    fhirAxios.search("Location", params).then((result) => {
        try {
          if (result.entry.length > 0) {
            for (let entry of result.entry) {
              partOf.push({
                url: "location",
                valueString: `Location/${entry.resource.id}`,
              });
            }
            resolve(partOf);
          } else {
            resolve(partOf);
          }
        } catch (error) {
          logger.error(error);
          reject(error);
        }
      })
      .catch((err) => {
        logger.error(err.message);
        reject(err);
      });
  });
};

const searchLocationReference = async (location, region, district, subdistrict) => {
  let partOfLocation = [];
  partOfLocation.push(location);
  if (region) {
      let regionBundle = await fhirAxios.search("Location", {
          name: region.trim(),
          partof: location.split("/").pop(),
      });

      if (regionBundle && regionBundle.entry && regionBundle.entry.length > 0) {
          partOfLocation.push(`Location/${regionBundle.entry[0].resource.id}`);
          location = `Location/${regionBundle.entry[0].resource.id}`;
          if (district) {
              let districtBundle = await fhirAxios.search("Location", {
                  name: district.trim(),
                  partof: `${regionBundle.entry[0].resource.id}`,
              });
              if (districtBundle && districtBundle.entry && districtBundle.entry.length > 0) {
                  partOfLocation.push(`Location/${districtBundle.entry[0].resource.id}`);
                  location = `Location/${districtBundle.entry[0].resource.id}`;
                  if (subdistrict) {
                      let subdistrictBundle = await fhirAxios.search("Location", {
                          name: subdistrict.trim(),
                          partof: `${districtBundle.entry[0].resource.id}`,
                      });
                      if (
                          subdistrictBundle &&
                          subdistrictBundle.entry &&
                          subdistrictBundle.entry.length > 0
                      ) {
                          partOfLocation.push(
                              `Location/${subdistrictBundle.entry[0].resource.id}`
                          );
                          location = `Location/${subdistrictBundle.entry[0].resource.id}`;
                      } else {
                          location = `Location/${districtBundle.entry[0].resource.id}`;
                      }
                  } else {
                      location = `Location/${districtBundle.entry[0].resource.id}`;
                  }
              }
          } else {
              location = `Location/${regionBundle.entry[0].resource.id}`;
          }
      }
  }

  return {location, partOfLocation};
};

const checkIfPractitionerExist = (employeeId, fileNumber) => {
  return new Promise((resolve, reject) => {
    let params = {
      /*"employeeid:exact": employeeId.toString().trim(),
      "filenumber:exact": fileNumber.toString().trim(),*/
    };
    fhirAxios.search("Practitioner", params).then((result) => {
        try {
          if (result.entry && result.entry.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (error) {
          logger.error(error);
          reject(error);
        }
      })
      .catch((err) => {
        logger.error(err.message);
        reject(err);
      });
  });
};

const checkIfPractitionerExistWithData = (employeeId, fileNumber) => {
  return new Promise((resolve, reject) => {
    let params = {
      /*"employeeid:exact": employeeId.toString().trim(),
      "filenumber:exact": fileNumber.toString().trim(),*/
    };
    fhirAxios.search("Practitioner", params).then((result) => {
        try {
          if (result.entry && result.entry.length > 0) {
            resolve(result.entry[0].resource.id);
          } else {
            resolve(false);
          }
        } catch (error) {
          logger.error(error);
          reject(error);
        }
      })
      .catch((err) => {
        logger.error(err.message);
        reject(err);
      });
  });
};

const checkIfPractitionerRoleDataIsExist = (location,practitioner) => {
  return new Promise((resolve, reject) => {
    let params = {
      location: location,
      practitioner: practitioner
    };
    fhirAxios.search("PractitionerRole", params).then((result) => {
        try {
          if (result.entry && result.entry.length > 0) {
            resolve(result.entry[0].resource.id);
          } else {
            resolve(false);
          }
        } catch (error) {
          logger.error(error);
          reject(error);
        }
      })
      .catch((err) => {
        logger.error(err.message);
        reject(err);
      });
  });
};

const checkVersion = (resourceType, id) => {
  return new Promise((resolve, reject) => {
    fhirAxios.read(resourceType, id).then((result) => {
        try {
          if (result) {
            resolve(result.meta.versionId);
          } else {
            resolve(false);
          }
        } catch (error) {
          logger.error(error);
          reject(error);
        }
      })
      .catch((err) => {
        logger.error(err.message);
        reject(err);
      });
  });
};

const trimObjValues = (obj) => {
  return Object.keys(obj).reduce((acc, curr) => {
    acc[curr] = typeof obj[curr] == "string" ? obj[curr].trim() : obj[curr];
    return acc;
  }, {});
};

const setUserdata = async (req) => {
  let usersInput = req.body;
  const usersData = usersInput.map((obj) => trimObjValues(obj));
  let userLocation = ""
  if (req.user.resource.id == "ihris-user-admin") {
      userLocation = ""
  } else {
      userLocation = req.user.resource.extension.find(
      (x) =>
          x.url === "http://ihris.org/fhir/StructureDefinition/ihris-user-location"
      ).valueReference.reference
  }
  let data = [];
  try {
    if (usersData.length > 0) {
      for (let i = 0; i < usersData.length; i++) {
        
        await getCodeSystem(usersData[i]["EducationLevel"], "ihris-education-level-valueset")
          .then((response) => {
            usersData[i].educationCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

          await getCodeSystem(usersData[i]["EducationMajor"], "ihris-educational-major-valueset")
          .then((response) => {
            usersData[i].majorCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

          await getCodeSystem(usersData[i]["Emergency_contact_relation"], "ihris-relation-valueset")
          .then((response) => {
            usersData[i].relationCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });
          
          await getCodeSystem(usersData[i]["ScoreAttained"], "ihris-performance-score-valueset")
          .then((response) => {
            usersData[i].scoreCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

          await getCodeSystem(usersData[i]["LeaveType"], "ihris-leave-type-valueset")
          .then((response) => {
            usersData[i].leaveCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

        if (usersData[i]["Gender"]) {
          await getCodeSystem(usersData[i]["Gender"].charAt(0).toUpperCase() + usersData[i]["Gender"].slice(1),"administrative-gender")
            .then((response) => {
              usersData[i].genderCoding = response;
            })
            .catch((err) => {
              console.log(err);
              logger.error(err.message);
            });
        }

        await getCodeSystem(usersData[i]["Nationality"],"iso3166-1-2")
          .then((response) => {
            usersData[i].nationalityCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });
  
        await getCodeSystem(usersData[i]["JobTitle"], "ihris-job-demo")
          .then((response) => {
            usersData[i].jobCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

          await getCodeSystem(usersData[i]["EmploymentTerms"], "ihris-employment-status-valueset")
          .then((response) => {
            usersData[i].employmentCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

          await getCodeSystem(usersData[i]["PayGrade"], "ihris-salary-grade")
          .then((response) => {
            usersData[i].gradeCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });
        
          await getReferences("Location",usersData[i]["Nationality"])
              .then(async (response) => {
                  usersData[i].nationalityId = response;
              })
              .catch((err) => {
                console.log(err);
                logger.error(err.message);
              });
        
        if ((usersData[i]["FacilityName"] != null)) {
          await getReferences("Location",usersData[i]["FacilityName"])
            .then(async (response) => {
              usersData[i].facilityId = response;
              if (response !== undefined) {
                await getRelatedLocation(response).then((data) => {
                  usersData[i].relatedGroup = data;
                });
              } else {
                await getRelatedLocation(userLocation.split("/").pop()).then(
                  (data) => {
                    usersData[i].relatedGroup = data;
                  }
                );
              }
            })
            .catch((err) => {
              console.log(err);
              logger.error(err.message);
            });
        } else {
          await getRelatedLocation(userLocation.split("/").pop()).then(
            (data) => {
              usersData[i].relatedGroup = data;
            }
          );
        }
        data.push(usersData[i]);
      }
      return data;
    } else {
      return "No data found";
    }
  } catch (e) {
    console.log("ERROR", e);
  }
};

module.exports = {
  setUserdata,
  checkVersion,
  checkIfPractitionerRoleDataIsExist,
  searchLocationReference,
  getRelatedLocation,
  getLocationReferences,
  getReferences,
  getCodeSystem
}