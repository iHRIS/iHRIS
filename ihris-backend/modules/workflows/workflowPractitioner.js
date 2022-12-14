const nconf = require('../config')
const logger = require('../winston')
const fhirQuestionnaire = require('./fhirQuestionnaire')
const fhirAxios = nconf.fhirAxios

const workflowPractitioner = {
  process: ( req ) => {
    return new Promise( (resolve, reject) => {
      fhirQuestionnaire.processQuestionnaire( req.body ).then( (bundle) => {
        let practitioner = bundle.entry && bundle.entry.find(entry => entry.resource.resourceType === 'Practitioner')
        if(!practitioner) {
          return reject()
        }
        let phone = practitioner.resource.telecom && practitioner.resource.telecom.filter(telecom => telecom.system === 'phone')
        if(!Array.isArray(phone) || phone.length === 0) {
          return resolve(bundle)
        }
        let phoneQuery = ''
        let countrycode = nconf.get("mhero:countrycode")
        for(let ph of phone) {
          ph.value = ph.value.replace(/ /g,'')
          if(countrycode) {
            ph.value = ph.value.replace(countrycode, '')
          } else {
            ph.value = ph.value.replace('+', '')
          }
          if(ph.value.startsWith('0')) {
            ph.value = ph.value.replace('0', '')
          }
          if(!phoneQuery) {
            phoneQuery = ph.value
          } else {
            phoneQuery += ',' + ph.value
          }
        }
        if(!phoneQuery) {
          return esolve(bundle)
        }
        let params = {'phonenumber:contains': phoneQuery}
        fhirAxios.search( "Practitioner", params ).then( (resource) => {
          if(resource.entry && resource.entry.length > 0) {
            return reject("Record exist with this phone number")
          }
          return resolve(bundle)
        }).catch( (err) => {
          logger.error(err)
          reject(err)
        })
      })
    })
  }
}

module.exports = workflowPractitioner
