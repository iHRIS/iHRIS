const express = require("express");
const router = express.Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const XLSX = require("xlsx");
const ihrissmartrequire = require('ihrissmartrequire')
const fhirAxios = ihrissmartrequire("modules/fhirAxios");
const logger = require('../../winston')
const outcomes = ihrissmartrequire('config/operationOutcomes')
const fs = require("fs");
const { nanoid } = require("nanoid");

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

module.exports = router