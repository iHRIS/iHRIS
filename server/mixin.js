var axios = require("axios");
const URI = require('urijs');
const fs = require('fs')
const env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/config/config.json')[env];
if(env === "production") {
  config = JSON.parse(fs.readFileSync(`/run/secrets/server_config`, 'utf8'))[env];
}

module.exports = {
  getDefinition: (resourceType, resourceId, callback) => {
    let url = URI(config.fhir.server).segment('fhir').segment(resourceType).segment(resourceId).toString()
    axios.get(url, {
      params: {},
      withCredentials: true,
      auth: {
        username: config.fhir.username,
        password: config.fhir.password
      }
    }).then(response => {
      return callback(false, response.data)
    }).catch(err => {
      return callback(err, false)
    });
  }
}