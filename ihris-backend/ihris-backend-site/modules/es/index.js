const moment = require("moment")

const index = {
  age: (fields) => {
    return new Promise((resolve, reject) => {
      let age = moment().diff(fields.dob, 'years');
      resolve(age)
    })
  }
}

module.exports = index
