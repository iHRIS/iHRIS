var express = require("express");
var router = express.Router();
var axios = require("axios");
const URI = require("urijs");
const mixin = require("../mixin");
const env = process.env.NODE_ENV || "development";
const fs = require('fs')
const crypto = require("crypto");

var config = require(__dirname + '/../config/config.json')[env];
if(env === "production") {
  config = JSON.parse(fs.readFileSync(`/run/secrets/server_config`, 'utf8'))[env];
}

/**
 * Add a new user
 */
router.post("/add", function (req, res, next) {
  let data = req.body;
  let now = new Date();
  data.salt = crypto.randomBytes(16).toString('hex');
  data.password = crypto.pbkdf2Sync(
    data.password,
    data.salt,
    1000,
    64,
    "sha512").toString("hex");
  data.created = now.toISOString();

  let bundle = {
    resourceType: "Person",
    id: "user",
    extension: [
      {
        //use this domain which is the only valid for the search parameters
        url:config.profileUrlDomain + "/StructureDefinition/iHRISUserDetails",
        extension: [
          {
            url: "username",
            valueString: data.username
          },
          {
            url: "password",
            valueString: data.password
          },
          {
            url: "salt",
            valueString: data.salt
          },
          {
            url: "created",
            valueString: data.created
          },
          {
            url: "roles",
            valueCoding: {
              system: "http://terminology.hl7.org/CodeSystem/v2-0615",
              code:data.roles
            }
          }
        ]
      }
    ]
  };

  let url = URI(config.fhir.server).segment("fhir").segment("Person").toString();

  axios.post(url, bundle, {
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
 * Get all users
 */
router.get("/list", function (req, res, next) {
  let url = URI(config.fhir.server).segment('fhir').segment('Person');
  url.addSearch('_filter=username ge _');
  url=url.toString();
  console.log("url: "+url);

  axios.get(url, {
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
 * Get the iHRISUserDetails structure definition metadata
 */
router.get("/describe/definition/:definition", function (req, res, next) {
  
  mixin.getDefinition("StructureDefinition", req.params.definition, (err, definition) => {
    if (err) {
      res.status(400).json(err);
    } else {
      response=definition;
      rolesDefinition=null;
      response.differential.element.forEach(extension=>{
        if(extension.id=="Extension.extension:roles.value[x]")
        {
          rolesDefinition=extension;
        }
      });
      res.status(201).json(rolesDefinition);
    }
  })
});
/**
 * Check login credentials
 */
router.post("/login", function (req, res, next) {
  let url = URI(config.fhir.server).segment('fhir').segment('Person');
  url.addQuery('username:exact', req.body.username);
  url = url.toString();
  axios.get(url, {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(response => {
    let numMatches = response.data.total;
    if (numMatches == 0) {
      return res.status(400).json(response.data);
    } else {
      let user = response.data.entry[0].resource;
      let extensions = user.extension;

      for (var i in extensions) {
        if (extensions[i].url.includes("iHRISUserDetails")) {
          let userDetails = extensions[i].extension;
          let password = null;
          let salt = null;
          let roles = null;

          for (var j in userDetails) {
            if (userDetails[j].url == "password") {
              password = userDetails[j].valueString;
            }

            if (userDetails[j].url == "salt") {
              salt = userDetails[j].valueString;
            }
            if (userDetails[j].url == "roles") {
              roles = userDetails[j].valueCoding.code;
            }

          }

          let hash = crypto.pbkdf2Sync(
            req.body.password,
            salt,
            1000,
            64,
            "sha512"
          ).toString("hex");

          let packet = {
            userId: user.id,
            username: req.body.username,
            roles: roles
          };

          // matching password
          if (hash === password) {
            return res.status(201).json(packet);
          } else {
            return res.status(400).json({});
          }
        }
      }

      res.status(400).json({});
    }
  }).catch(err => {
    res.status(400).json(err);
  });
});

/**
 * Update a new user
 */
router.post("/update", function (req, res, next) {
  // first we need to get the user so we can get their salt
  let data = req.body;
  let url = URI(config.fhir.server).segment('fhir').segment('Person');
  url.addQuery('_id', data.id);
  url = url.toString();

  axios.get(url, {
    withCredentials: true,
    auth: {
      username: config.fhir.username,
      password: config.fhir.password
    }
  }).then(response => {
    let salt = null;
    let user = response.data.entry[0].resource;
    let extensions = user.extension;
    let extension = null;

    // first, make sure the user sent in the correct password
    for (var i in extensions) {
      if (extensions[i].url.includes("iHRISUserDetails")) {
        extension = extensions[i];

        let userDetails = extensions[i].extension;
        let password = null;

        for (var j in userDetails) {
          if (userDetails[j].url == "password") {
            password = userDetails[j].valueString;
          }

          if (userDetails[j].url == "salt") {
            salt = userDetails[j].valueString;
          }
        }

        let hash = crypto.pbkdf2Sync(
          req.body.password,
          salt,
          1000,
          64,
          "sha512"
        ).toString("hex");

        // matching password
        if (hash !== password) {
          return res.status(400).json({});
        }
      }
    }

    // make sure the salt is set so we can update to the new password
    if (salt === null) {
      return res.status(400).json({});
    }

    let newPassword = crypto.pbkdf2Sync(
      data.newPassword,
      salt,
      1000,
      64,
      "sha512").toString("hex");

    let bundle = {
      id: data.id,
      resourceType: "Person"
    };

    // we need to loop through extension again to find the password field
    for (var i in extension.extension) {
      let userField = extension.extension[i];

      if (userField.url === "password") {
        extension.extension[i].valueString = newPassword;
        break;
      }
    }

    bundle.extension = [extension];

    let url = URI(config.fhir.server).segment('fhir').segment('Person').segment(data.id).toString();

    axios.put(url, bundle, {
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
  }).catch(err => {
    res.status(400).json(err);
  });
});

/**
 * update user role
 */
router.post("/update-role", function (req, res, next) {
  let data = req.body;
  let url = URI(config.fhir.server).segment('fhir').segment('Person');
  url.addQuery('_id', data.id);
  url = url.toString();

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
module.exports = router;
