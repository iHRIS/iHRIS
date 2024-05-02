const ihrissmartrequire = require('ihrissmartrequire');
const fhirAxios = ihrissmartrequire('modules/fhir/fhirAxios')

// Process and format the ADX data as needed
const formatAdxData = async (adxData, period, locationId) => {
  
  let parts = period.split('-');
  let newPeriod = ""+parts[0] + parts[1];
  console.log(newPeriod);
  // Initialize the ADX array with the ADX header
  const finalAdx = {
    dataSet: "staffing",
    completeDate: `${new Date().toISOString()}`,
    period: newPeriod,
    orgUnit: locationId,
    dataValues: []
  }; 
  let dataValues = [];

  for (const key in adxData) {
    let jobCode = key.split(':')[1] // Extract job code from key
    let gender = key.split(':')[2]
      // Prepare ADX group element with multiple dataValue elements
    dataValues.push(
      {
        dataElement: jobCode,
        categoryOptionCombo: gender,
        value: adxData[key].value
      })
    finalAdx.dataValues = dataValues
  }
  return finalAdx; // Return the formatted ADX
}
  
const getEndDate = (dateString, length) =>  {
  // Create a Date object from the string
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + length);
  // Set the day to the last day of the month (day 0 represents the last day)
  date.setDate(0);
  // Get the year, month, and day as padded strings
  let year = String(date.getFullYear()).padStart(4, '0');
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');

  // Return the formatted date string
  return `${year}-${month}-${day}`;
}

const getAdxSummary = async (period, location) => {
  return new Promise( (resolve, reject) => {
    if (!period || !location) {
      reject('Missing required parameters, period or location');
    } else {
      let adxData = {}; 
      let parts = period.split('P');
      let startDate = parts[0];
      let periodLength = parts[1].split('',2);
      let endDate = ""

      if(periodLength[1] === 'Y'){
        endDate = getEndDate(startDate,12);
      } else if(periodLength[1] === 'M' && periodLength[2] === '6'){
        endDate = getEndDate(startDate,6);
      } else if(periodLength[1] === 'M' && periodLength[2] === '3'){
        endDate = getEndDate(startDate,3);
      }
      /*let params = {
        date: "ge"+startDate,
        date: "le"+endDate,
        location: location
      }*/
      fhirAxios.search('PractitionerRole', { 
        date: "ge"+startDate, 
        date: "le"+endDate,
        location: location
      }).then( async (response) => {
        if (response.total === 0) {
          reject('No PractitionerRole resources found');
        } else {
          for (const practitionerRole of response.entry) {
            let role = practitionerRole.resource;
            // Extract location and code from PractitionerRole
            let locationId = role.location[0].reference.split('/')[1];
            let code = role.code[0].coding[0].code;
            // Reference to linked Practitioner resource
            let practitionerReference = role.practitioner.reference.split('/')[1];
            let adxKey = '';
            // Fetch the linked Practitioner resource
            await fhirAxios.read('Practitioner', practitionerReference).then((response) => {
              // Extract gender from Practitioner resource 
              let practitionerGender = response.gender || 'unknown';         
              //const practitionerGender = gender?.valueCodeableConcept?.coding?.[0]?.code;
              // Form the new unique combination (location, code, gender)
              adxKey = `${locationId}:${code}:${practitionerGender}`;

            }).catch((err) => {
              console.error(err.response.data);
            });
            // Initialize data for this key if not present
            if (!adxData[adxKey]) {
              adxData[adxKey] = { value: 0 }; // Initialize value to 0
            }
            adxData[adxKey].value++; // Increment count for this unique combination 
          } 
          let formattedData = formatAdxData(adxData, period , location )
          resolve(formattedData);
        }
      }).catch((err) => {
        reject(err);
      }); 
    }
  });
}
module.exports = {
  getAdxSummary
};
