module.exports =     {
  template: `<ihris-codesystem :fhir-id="fhirId" :edit="isEdit" v-on:set-edit="setEdit($event)" profile="//ihris.org/fhir/CodeSystem/ihris-test-codesystem" :key="$route.params.page+($route.params.id || '')" page="test-codesystem" field="CodeSystem" title="Test CodeSystem"><template #default="slotProps">\n` +
  '<ihris-section :slotProps="slotProps" :edit="isEdit" name="CodeSystem" title="Test CodeSystem" description="Code system details" :secondary="false">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-string :slotProps="slotProps" :edit="isEdit" id="CodeSystem.code" field="code" min="1" max="1" base-min="1" base-max="1" label="Code" path="CodeSystem.code">\n' +
  '</fhir-string>\n' +
  '<fhir-string :slotProps="slotProps" :edit="isEdit" id="CodeSystem.definition" field="definition" min="0" max="1" base-min="0" base-max="1" label="Definition" path="CodeSystem.definition">\n' +
  '</fhir-string>\n' +
  '<fhir-string :slotProps="slotProps" :edit="isEdit" id="CodeSystem.display" field="display" min="1" max="1" base-min="1" base-max="1" label="Display" path="CodeSystem.display">\n' +
  '</fhir-string>\n' +
  '<fhir-coding :slotProps="slotProps" :edit="isEdit" id="CodeSystem.property.prop2" field="prop2" min="0" max="1" base-min="0" base-max="1" label="Second Property" path="CodeSystem.property.prop2" binding="http://ihris.org/fhir/ValueSet/test">\n' +
  '</fhir-coding>\n' +
  '<fhir-string :slotProps="slotProps" :edit="isEdit" id="CodeSystem.property.prop1" field="prop1" min="0" max="1" base-min="0" base-max="1" label="First Property" path="CodeSystem.property.prop1">\n' +
  '</fhir-string>\n' +
  '</template></ihris-section>\n' +
  '</template></ihris-codesystem>\n',
  data: {
    subFields: {},
    columns: {},
    actions: {}
  }
}
