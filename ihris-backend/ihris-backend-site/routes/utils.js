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
            usersData[i]["Std KSP Municipality"],
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
            usersData[i]["Regime Grade"],
            "ihris-regime-grade-valueset"
          )
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

router.post("/exportExcel", (req, res) => {
  if (!req.user) {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  if (!req.body) {
    return res.status(400).end();
  }
  let data = req.body;
  const workbook = XLSX.utils.book_new();
  data.map((sheet) => {
    let tab = XLSX.utils.json_to_sheet(sheet.data);
    let headers = sheet.headers.map((x) => x.text);
    let width = sheet.headers.map((x) => ({ wch: x.text.length * 1.75 }));
    XLSX.utils.book_append_sheet(workbook, tab, sheet.name);
    XLSX.utils.sheet_add_aoa(tab, [headers], {
      origin: "A1",
    });
    tab["!cols"] = width;
  });

  if (!fs.existsSync(`${__dirname}/../tmp`)) {
    fs.mkdirSync(`${__dirname}/../tmp`);
  }
  let fileName = `${__dirname}/../tmp/${nanoid(10)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  if (fs.existsSync(fileName)) {
    res.download(fileName);
    setTimeout(() => {
      fs.unlinkSync(fileName);
    }, 240000);
  }
});

router.post("/exportJSON", async (req, res) => {
  if (!req.user) {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  if (!req.body) {
    return res.status(400).end();
  }
  let data = req.body;

  console.log(JSON.stringify(data, null, 2));

  let bundle = [];

  let jobPositionStock = [];
  let department = [];

  for (const resource of data) {
    for (const entry of resource.data) {
      let bundleEntry = {
        practitioner: {},
        data: [],
      };
      if (resource.resourceType === "Practitioner") {
        bundle.push({
          practitioner: await fhirAxios.read(resource.resourceType, entry.id),
        });
      } else if (resource.resourceType === "Organization") {
        department.push(await fhirAxios.read(resource.resourceType, entry.id));
      } else if (
        resource.resourceType === "Basic" &&
        resource._profile ===
          "http://ihris.org/fhir/StructureDefinition/ihris-manage-position"
      ) {
        jobPositionStock.push(
          await fhirAxios.read(resource.resourceType, entry.id)
        );
      } else {
        let response = bundle.find(
          (item) => item.practitioner.id === entry.practitionerId && item.data
        );
        if (response && response.data && response.data.length > 0) {
          bundle
            .find(
              (item) =>
                item.practitioner.id === entry.practitionerId && item.data
            )
            .data.push(await fhirAxios.read(resource.resourceType, entry.id));
        } else {
          if (resource.resourceType === "PractitionerRole") {
            let positionEntry = {};
            bundleEntry.practitioner = await fhirAxios.read(
              "Practitioner",
              entry.practitionerId
            );
            let role = await fhirAxios.read(resource.resourceType, entry.id);
            positionEntry.role = role;
            let deptID = role?.extension
              .find(
                (x) =>
                  x.url ===
                  "http://ihris.org/fhir/StructureDefinition/ihris-department"
              )
              ?.valueReference?.reference.split("/")
              .pop();

            let positionID = role?.extension
              .find(
                (x) =>
                  x.url ===
                  "http://ihris.org/fhir/StructureDefinition/ihris-job-position"
              )
              ?.valueReference?.reference.split("/")
              .pop();

            if (deptID) {
              positionEntry.department = await fhirAxios.read(
                "Organization",
                deptID
              );
            }
            if (positionID) {
              positionEntry.jobPosition = await fhirAxios.read(
                "Basic",
                positionID
              );
            }
            bundleEntry.data.push(positionEntry);
          } else {
            bundleEntry.practitioner = await fhirAxios.read(
              "Practitioner",
              entry.practitionerId
            );
            bundleEntry.data.push(
              await fhirAxios.read(resource.resourceType, entry.id)
            );
          }
          bundle.push(bundleEntry);
        }
      }
    }
  }
  if (department.length > 0) {
    bundle.push({ department });
  }
  if (jobPositionStock.length > 0) {
    bundle.push({ jobPositionStock });
  }
  await fhirAxios.read("Location", data.location);
  if (!fs.existsSync(`${__dirname}/../tmp`)) {
    fs.mkdirSync(`${__dirname}/../tmp`);
  }
  let fileName = `${__dirname}/../tmp/${nanoid(10)}.json`;
  fs.writeFileSync(fileName, JSON.stringify(bundle, null, 2), function (err) {
    if (err) {
      console.log(err);
    }
  });

  if (fs.existsSync(fileName)) {
    res.download(fileName);
    setTimeout(() => {
      fs.unlinkSync(fileName);
    }, 240000);
  }
});

router.post("/sendEmail", async (req, res) => {
  let { isEmail, address, subject, payload, templatePath } = req.body;
  if (!address || !subject || !payload || !templatePath) {
    res.status(400).send({ message: "required fields are messing!" });
  } else {
    let email = "";
    if (isEmail) {
      email = address;
    } else {
      try {
        let resource = await fhirAxios.read("Practitioner", address);
        email = ifEmailExistGet(resource);
      } catch (err) {
        res.status(404).send({ message: "User not found!" });
        console.log(err);
      }
    }
    if (email) {
      sendEmail(email, subject, payload, templatePath).then((r) =>
        res.status(200).send({ message: "Email Sent Success fully!" })
      );
    } else {
      res.status(400).send({ message: "Email not found!" });
    }
  }
});

router.get("/csvTemplate", (req, res) => {
  let p = path.join(__dirname, "../", "file/sampleInput.xlsx");
  res.download(p);
});

router.post("/bulkRegistration", async (req, res) => {
  if (!req.body) {
    return res.status(400).end();
  } else {
    try {
      await setUserdata(req).then(async (userResults) => {
          if (userResults.length > 0) {
            await bulkRegistration(userResults)
              .then(async (response) => {
                if (response.isValid) {
                  await fhirAxios
                    .create(response.data.bundle).then((results) => {
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
                console.log("There is an error", err);
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

router.post("/importData", async (req, res) => {
  if (!req.body) {
    return res.status(400).end();
  } else {
    await formatData(req.body)
      .then(async (result) => {
        await fhirAxios
          .create(result)
          .then((results) => {
            return res.status(201).json(results);
          })
          .catch((err) => {
            logger.error(err);
            return res.status(500).json(err);
          });
      })
      .catch((err) => {
        logger.error(err.message);
      });
  }
});

router.post("/customRole", async (req, res) => {
  if (!req.body) {
    return res.status(400).end();
  } else {
    let userLocation = req.user.resource.extension.find(
      (x) =>
        x.url ===
        "http://ihris.org/fhir/StructureDefinition/ihris-user-location"
    ).valueReference.reference;

    let data = req.body;
    let bundle = {
      resourceType: "Bundle",
      type: "transaction",
      entry: [],
    };
    let taskList = [];
    data.permissions.map((task) => {
      taskList = [...taskList, ...task.subTasks];
    });

    let taskListUnique = [...new Set(taskList)];

    let tasks = taskListUnique.map((task) => ({
      url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-task",
      valueReference: {
        reference: `Basic/${task}`,
      },
    }));

    let id = `ihris-custom-role-${data.name
      .replace(/\s/g, "")
      .replace(/[^a-zA-Z ]/g, "")
      .toLowerCase()}-${uuidv4()}`;
    bundle.entry = [
      {
        resource: {
          resourceType: "Basic",
          id: id,
          meta: {
            profile: ["http://ihris.org/fhir/StructureDefinition/ihris-role"],
          },
          extension: [
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-basic-name",
              valueString: data.name,
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-related-group",
              extension: [
                {
                  url: "location",
                  valueString: userLocation,
                },
              ],
            },
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-role-primary",
              valueBoolean: false,
            },
            ...tasks,
            {
              url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-role",
              valueReference: {
                reference: "Basic/ihris-role-open",
              },
            },
          ],
          code: {
            coding: [
              {
                system:
                  "http://ihris.org/fhir/CodeSystem/ihris-resource-codesystem",
                code: "role",
              },
            ],
          },
        },
        request: {
          method: "POST",
          url: `Basic/${id}`,
        },
      },
    ];
    await fhirAxios
      .create(bundle)
      .then((results) => {
        return res.status(201).json(results);
      })
      .catch((err) => {
        logger.error(err);
        return res.status(500).json(err);
      });
  }
});

router.post("/editCustomRole", async (req, res) => {
  if (!req.body) {
    return res.status(400).end();
  } else {
    let data = req.body;
    let response = await fhirAxios.read("Basic", data.id);
    response.extension.find(
      (x) =>
        x.url === "http://ihris.org/fhir/StructureDefinition/ihris-basic-name"
    ).valueString = data.name;

    // response.extension.find((x) => x.url === "http://ihris.org/fhir/StructureDefinition/ihris-role-primary").valueBoolean = false;

    response.extension = response.extension.filter(
      (x) =>
        x.url !== "http://ihris.org/fhir/StructureDefinition/ihris-assign-task"
    );
    let taskList = [];

    data.permissions.map((task) => {
      taskList = [...taskList, ...task.subTasks];
    });

    let taskListUnique = [...new Set(taskList)];

    let tasks = taskListUnique.map((task) => ({
      url: "http://ihris.org/fhir/StructureDefinition/ihris-assign-task",
      valueReference: {
        reference: `Basic/${task}`,
      },
    }));
    response.extension = [...response.extension, ...tasks];
    await fhirAxios
      .update(response)
      .then((results) => {
        return res.status(201).json(results);
      })
      .catch((err) => {
        logger.error(err);
        return res.status(500).json(err);
      });
  }
});

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
          console.log(e);
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
          console.log(e);
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
          console.log(e);
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
          console.log(e);
      }
      let fileName = `${userData.id}_cv.pdf`;
      let p = path.join(__dirname, "../tmp/", fileName);
      employeeCv(userData)
          .then((_) => {
              res.download(p);
          })
          .catch((e) => console.log(e));
  }
});

router.get("/employeeId/:id", (req, res) => {
  if (req.params.id) {
      fhirAxios.read("/Practitioner", req.params.id).then(async (user) => {
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
          let organizationLocation =
              data.entry && data.entry.length > 0
                  ? data.entry[0].resource.location[0].reference.split("/")
                  : null;
          if (organizationLocation != null) {
              let organizationData = await fhirAxios.read(
                  organizationLocation[0],
                  organizationLocation[1]
              );

              let organizationInformation = organizationData?.extension?.find(x => x.url === "http://ihris.org/fhir/StructureDefinition/ihris-facility-information-details")

              let logo = organizationInformation?.extension?.find(x => x.url === "logo")?.valueAttachment

              let stamp = organizationInformation?.extension?.find(x => x.url === "stamp")?.valueAttachment

              let signature = organizationInformation?.extension?.find(x => x.url === "signature")?.valueAttachment

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
          employeeId(userData).then((_) => {
              res.download(p);
          });
      });
  }
});

router.get("/csvTemplate", (req, res) => {
  let p = path.join(__dirname, "../", "file/sampleInput.xlsx");
  res.download(p);
});

router.post("/bulkRegistration", async (req, res) => {
    if (!req.body) {
        return res.status(400).end();
    } else {
        await setUserdata(req).then(async (userResults) => {
            if (userResults.length > 0) {
                await bulkRegistration(userResults).then(async response => {
                    console.log(JSON.stringify(response,null,2))
                    if (response.isValid) {
                        console.log(JSON.stringify(response.data.bundle, null, 2))
                        await fhirAxios.create(response.data.bundle)
                            .then((results) => {
                                return res.status(201).json(results);
                            }).catch((err) => {
                                logger.error(err);
                                return res.status(500).json(err);
                            })
                    } else {
                        return res.json(response);
                    }
                }).catch(err => {
                    console.log(err)
                    logger.error(err.message)
                })
            }
        }).catch((err) => {
            console.log(err)
            logger.error(err.message)
        })
    }
});

module.exports = router;