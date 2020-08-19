module.exports = {
  template: '<ihris-search :key="$route.params.page" page="test-practitioner" label="Health Worker" :fields="fields" :terms="terms" resource="Practitioner" profile="http://ihris.org/fhir/StructureDefinition/ihris-test-practitioner">\n' +
  '<ihris-search-term v-on:termChange="searchData" label="Name" expression="name:contains"></ihris-search-term>\n' +
  '<ihris-search-term v-on:termChange="searchData" label="Gender" expression="gender"></ihris-search-term>\n' +
  '</ihris-search>\n',
  data: {
    addLink: null,
    fields: [
      [ 'Surname', "name.where(use='official').family", null ],
      [ 'Given Name(s)', "name.where(use='official').given", null ],
      [ 'Birth Date', 'birthDate', null ],
      [ 'Gender', 'gender', null ]
    ]
  }
}
