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
const employeeId = ihrissmartrequire("mployeeIdPrintout");
const employeeCv = ihrissmartrequire("employeeCvPrintout");
const fs = require("fs");
const { nanoid } = require("nanoid");

const getCodeSystem = (value, valueSet) => {
  return new Promise((resolve, reject) => {
    let valuecoding = {};
    fhirAxios
      .expand(valueSet, true, true)
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
/*
const setUserdata = async (req) => {
  let usersInput = req.body;
  const usersData = usersInput.map((obj) => trimObjValues(obj));
  let userLocation = req.user.resource.extension.find(
    (x) =>
      x.url === "http://ihris.org/fhir/StructureDefinition/ihris-user-location"
  ).valueReference.reference;
  let data = [];
  try {
    if (usersData.length > 0) {
      for (let i = 0; i < usersData.length; i++) {
        
        await getCodeSystem(usersData[i]["Qualification of Public Health"], "ihris-public-health-valueset")
          .then((response) => {
            usersData[i].qualificationCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });
        if (usersData[i]["Sex"]) {
          await getCodeSystem(
            usersData[i]["Sex"].charAt(0).toUpperCase() +
              usersData[i]["Sex"].slice(1),
            "administrative-gender"
          )
            .then((response) => {
              usersData[i].genderCoding = response;
            })
            .catch((err) => {
              console.log(err);
              logger.error(err.message);
            });
        }

        await getCodeSystem(
          usersData[i]["Education Background"],
          "ihris-educational-background-valueset"
        )
          .then((response) => {
            usersData[i].educationalbackgroundCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });
        
        await getCodeSystem(
          usersData[i]["Profession"],
          "ihris-profession-valueset"
        )
          .then((response) => {
            usersData[i].professionCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

        await getCodeSystem(
          usersData[i]["Profession by PENSS"],
          "ihris-profession-valueset"
        )
          .then((response) => {
            usersData[i].professionByPENSSCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

        await getCodeSystem(
            usersData[i]["Profession by KSP"],
            "ihris-profession-valueset"
          ).then((response) => {
              usersData[i].professionByKSPCoding = response;
        }).catch((err) => {
            console.log(err);
            logger.error(err.message);
        });

        await getCodeSystem(
            usersData[i]["Std KSP"],
            "ihris-profession-valueset"
            ).then((response) => {
                usersData[i].stdKSPPHCMCoding = response;
        }).catch((err) => {
            console.log(err);
            logger.error(err.message);
        });

        await getCodeSystem(
            usersData[i]["Std KSP Hospital"],
            "ihris-profession-valueset"
        )
        .then((response) => {
            usersData[i].stdKSPPHCHCoding = response;
        })
        .catch((err) => {
            console.log(err);
            logger.error(err.message);
        });

        await getCodeSystem(
            usersData[i]["Compound Allies"],
            "ihris-profession-valueset"
        )
        .then((response) => {
            usersData[i].compoundAlliesCoding = response;
        })
        .catch((err) => {
            console.log(err);
            logger.error(err.message);
        });

        await getCodeSystem(
          usersData[i]["Special Regime  General Regime"],
          "ihris-regime-valueset"
        )
          .then((response) => {
            usersData[i].regimeCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

          await getCodeSystem(
            usersData[i]["Special Regime Grade"],
            "ihris-regime-grade-valueset"
          )
            .then((response) => {
              usersData[i].regimeGradeCoding = response;
            })
            .catch((err) => {
              console.log(err);
              logger.error(err.message);
            });

        await getCodeSystem(usersData[i]["Position"], "ihris-job-Timor")
          .then((response) => {
            usersData[i].positionCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });
        
        
        
        if (!isEmpty(usersData[i]["Workplace"])) {
          await getReferences(usersData[i]["Workplace"])
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
};*/

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
        
        await getCodeSystem(usersData[i]["Qualification of Public Health"], "ihris-public-health-valueset")
          .then((response) => {
            usersData[i].qualificationCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });
        if (usersData[i]["Sex"]) {
          await getCodeSystem(usersData[i]["Sex"].charAt(0).toUpperCase() + usersData[i]["Sex"].slice(1),"administrative-gender")
            .then((response) => {
              usersData[i].genderCoding = response;
            })
            .catch((err) => {
              console.log(err);
              logger.error(err.message);
            });
        }

        await getCodeSystem(usersData[i]["Education Background"],"ihris-educational-background-valueset")
          .then((response) => {
            usersData[i].educationalbackgroundCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });
        
        await getCodeSystem(usersData[i]["Profession"],"ihris-profession-valueset")
          .then((response) => {
            usersData[i].professionCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

        await getCodeSystem(usersData[i]["Profession by PENSS"],"ihris-profession-valueset")
          .then((response) => {
            usersData[i].professionByPENSSCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

        await getCodeSystem(usersData[i]["Profession by KSP"],"ihris-profession-valueset").then((response) => {
              usersData[i].professionByKSPCoding = response;
        }).catch((err) => {
            console.log(err);
            logger.error(err.message);
        });

        await getCodeSystem(usersData[i]["Std KSP Municipality"],"ihris-profession-valueset").then((response) => {
                usersData[i].stdKSPPHCMCoding = response;
        }).catch((err) => {
            console.log(err);
            logger.error(err.message);
        });

        await getCodeSystem(usersData[i]["Std KSP Hospital"],"ihris-profession-valueset")
        .then((response) => {
            usersData[i].stdKSPPHCHCoding = response;
        })
        .catch((err) => {
            console.log(err);
            logger.error(err.message);
        });

        await getCodeSystem(usersData[i]["Compound Allies"],"ihris-profession-valueset")
        .then((response) => {
            usersData[i].compoundAlliesCoding = response;
        })
        .catch((err) => {
            console.log(err);
            logger.error(err.message);
        });

        await getCodeSystem(usersData[i]["Special Regime  General Regime"],"ihris-regime-valueset")
          .then((response) => {
            usersData[i].regimeCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });

        await getCodeSystem(usersData[i]["Regime Grade"], "ihris-regime-grade-valueset")
            .then((response) => {
              usersData[i].regimeGradeCoding = response;
            })
            .catch((err) => {
              console.log(err);
              logger.error(err.message);
            });

        await getCodeSystem(usersData[i]["Position"], "ihris-job-timor")
          .then((response) => {
            usersData[i].positionCoding = response;
          })
          .catch((err) => {
            console.log(err);
            logger.error(err.message);
          });
        

        if ((usersData[i]["Workplace"] != null)) {
          await getReferences("Location",usersData[i]["Workplace"])
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