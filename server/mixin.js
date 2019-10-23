var axios = require("axios");
const URI = require('urijs');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

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