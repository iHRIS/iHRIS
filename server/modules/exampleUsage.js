const env = process.env.NODE_ENV || 'development';
var config = require(`${__dirname}/../config/config_${env}.json`);
const {CacheFhirToES} = require('./reports')

let caching = new CacheFhirToES({
  ESBaseURL: config.elastic.baseURL,
  ESUsername: config.elastic.username,
  ESPassword: config.elastic.password,
  ESMaxCompilationRate: config.elastic.max_compilations_rate,
  FHIRBaseURL: config.macm.baseURL,
  FHIRUsername: config.macm.username,
  FHIRPassword: config.macm.password
})
caching.cache()