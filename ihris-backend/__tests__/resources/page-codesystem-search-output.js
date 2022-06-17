module.exports =     {
  template: '<ihris-search-code :key="$route.params.page" page="test-codesystem" label="iHRIS Test CodeSystem" :fields="fields" :terms="terms" resource="CodeSystem" profile="//ihris.org/fhir/CodeSystem/ihris-test-codesystem">\n' +
  '</ihris-search-code>\n',
  data: {
    addLink: null,
    fields: [ [ 'Property One', 'prop1', null ], [ 'Property Two', 'prop2', null ] ],
  }
}
