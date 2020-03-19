var express = require("express");
var router = express.Router();
var axios = require("axios");
const URI = require('urijs');
const fs = require('fs')
const mixin = require("../mixin");
const env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/../config/config.json')[env];
if(env === "production") {
  config = JSON.parse(fs.readFileSync(`/run/secrets/server_config`, 'utf8'))[env];
}

router.post("/add/work-history", function (req, res, next) {
  let data = req.body;
  data["resourceType"] = "PractitionerRole";

  let url = URI(config.fhir.server).segment('fhir').segment('PractitionerRole').toString()
  axios.post(url, data, {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(response => {
    res.status(201).json(response.data);
  }).catch(err => {
    res.status(400).json(err);
  });
});

/**
 * Delete a work history element
 */
router.post("/delete/work-history", function (req, res, next) {
  let data = req.body;

  let url = URI(config.fhir.server).segment('fhir').segment('PractitionerRole').segment(data.id).toString()
  axios.delete(url, {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(response => {
    res.status(201).json(response.data);
  }).catch(err => {
    res.status(400).json(err);
  });
});

router.get("/describe/page", function (req, res, next) {
  let practitionerPage = config.definitions.practitionerPage;

  if (!practitionerPage) {
    return res.status(400).json("No practitioner page definition found.");
  }

  let url = URI(config.fhir.server).segment('fhir').segment(practitionerPage).toString()
  axios.get(url, {
    params: {},
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(response => {
    res.status(201).json(response.data);
  }).catch(err => {
    res.status(400).json(err);
  });
});

router.get("/describe/definition/:definition", function (req, res, next) {
  mixin.getDefinition("StructureDefinition", req.params.definition, (err, definition) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(definition);
    }
  })
});

/**
 * Get a specific practitioner
 */
router.get("/view/:id", function (req, res, next) {
  let id = req.params.id;

  let url = URI(config.fhir.server).segment('fhir').segment('Practitioner');
  url.addQuery('_id', id);
  url = url.toString();

  let credentials = {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  };

  axios.get(url, credentials).then(data => {
    if (data === null) {
      res.status(400).json("No practitioner found.");
    } else {
      // get the practitioner roles (ie, work history)
      let url = URI(config.fhir.server).segment('fhir').segment('PractitionerRole');
      url.addQuery('practitioner', id);
      url = url.toString();

      axios.get(url, credentials).then(response => {
        let practitioner = data.data;

        if (response.data.entry) {
          let workHistory = [];
          response.data.entry.forEach(job => {
            workHistory.push(job.resource);
          });

          practitioner.entry[0].resource.workHistory = workHistory;
        }

        res.status(201).json(practitioner);
      });
    }
  });
});

/**
 * Add a new practitioner
 */
router.post("/add", function (req, res, next) {
  let data = req.body;
  data["resourceType"] = "Practitioner";

  let url = URI(config.fhir.server).segment('fhir').segment('Practitioner').toString()
  axios.post(url, data, {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(response => {
    res.status(201).json(response.data);
  }).catch(err => {
    res.status(400).json(err);
  });
});

/**
 * Edit an existing practitioner
 */
router.post("/edit", function (req, res, next) {
  let data = req.body;
  data["resourceType"] = "Practitioner";
  let url = URI(config.fhir.server).segment('fhir').segment('Practitioner').segment(data.id).toString()
  axios.put(url, data, {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(response => {
    res.status(201).json(response.data);
  }).catch(err => {
    res.status(400).json(err);
  });
});

/**
 * Edit a practitioner's work history
 */
router.post("/edit/work-history", function (req, res, next) {
  let data = req.body;
  data["resourceType"] = "PractitionerRole";

  let url = URI(config.fhir.server).segment('fhir').segment('PractitionerRole').segment(data.id).toString();

  axios.put(url, data, {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(response => {
    res.status(201).json(response.data);
  }).catch(err => {
    res.status(400).json(err);
  });
});

/**
 * Search for practitioners
 */
router.get("/search", async function (req, res, next) {
  let url = URI(config.fhir.server).segment('fhir').segment('Practitioner').toString();
  url += req._parsedUrl.search;

  let credentials = {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  };

  let response = await axios.get(url, credentials);
  if(response === null){
    res.status(400).json(err);
    return;
  }
  let practitioners_data = response.data;
  let promises = [];
  //get work history
  for(let i = 0; i < practitioners_data.entry.length; i++){
    practitioner = practitioners_data.entry[i].resource;
    let url = URI(config.fhir.server).segment('fhir').segment('PractitionerRole');
    url.addQuery('practitioner', practitioner.id);
    url = url.toString();
    promises[i] = await axios.get(url, credentials).then(practitionerRoleResponse => {
      if (practitionerRoleResponse.data.entry) {
        let workHistory = [];
        practitionerRoleResponse.data.entry.forEach(job => {
          if(!workHistory.length) {
            workHistory.push({
              job_title: job.resource.code[0].text,
              // position_title:
              facility: job.resource.location[0].reference,
              employee_status: job.resource.active ? "In Service" : "Retired",
              start_date: job.resource.period.start
            });
          } else {
            if(workHistory[0].start_date < job.resource.period.start) {
              workHistory.pop();
              workHistory.push({
                job_title: job.resource.code[0].text,
                // position_title:
                facility: job.resource.location[0].reference,
                employee_status: job.resource.active ? "In Service" : "Retired",
                start_date: job.resource.period.start
              });
            }
          }
          
        });

        practitioners_data.entry[i].resource.workHistory = workHistory;
      };
    });
  }
  await Promise.all(promises);
  // get facility names
  for(let practitioner = 0; practitioner < practitioners_data.entry.length; practitioner++) {
    const facility = await getFacilityName(practitioners_data.entry[practitioner].resource.workHistory[0].facility);
    practitioners_data.entry[practitioner].resource.workHistory[0].facility = facility;
  }
  res.status(201).json(practitioners_data);
});

async function getFacilityName(reference) {
  let id = reference.substring(reference.lastIndexOf("/") + 1);
  let url = URI(config.fhir.server).segment('fhir').segment("Location").segment(id).toString();
  let result = await axios.get(
    url, {
      params: {},
      withCredentials: true,
      auth: {
        username: config.fhir.username,
        password: config.fhir.password
      }
    }
  );

  return result.data.name;
}
module.exports = router;
