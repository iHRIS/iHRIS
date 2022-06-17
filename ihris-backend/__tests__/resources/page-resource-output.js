module.exports = {
  template: `<ihris-resource :fhir-id="fhirId" :edit="isEdit" v-on:set-edit="setEdit($event)" profile="http://ihris.org/fhir/StructureDefinition/ihris-test-practitioner" :key="$route.params.page+($route.params.id || '')" page="test-practitioner" field="Practitioner" title="Health Worker" :section-menu='sectionMenu'><template #default="slotProps">\n` +
  '<ihris-section :slotProps="slotProps" :edit="isEdit" name="Practitioner" title="Health Worker" description="Primary demographic details" :secondary="false">\n' +
  '<template #default="slotProps">\n' +
  '<ihris-array :edit="isEdit" fieldType="human-name" :slotProps="slotProps" field="name" label="Name" min="1" max="*" id="Practitioner.name" path="Practitioner.name">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-human-name :slotProps="slotProps" :edit="isEdit" field="name" min="1" max="*" base-min="0" base-max="*" label="Name" path="Practitioner.name">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-code :slotProps="slotProps" :edit="isEdit" id="Practitioner.name.use" field="use" min="0" max="1" base-min="0" base-max="1" label="Use" path="Practitioner.name.use" binding="http://hl7.org/fhir/ValueSet/name-use|4.0.1">\n' +
  '</fhir-code>\n' +
  '<fhir-string :slotProps="slotProps" :edit="isEdit" id="Practitioner.name.family" field="family" min="0" max="1" base-min="0" base-max="1" label="Family" path="Practitioner.name.family">\n' +
  '</fhir-string>\n' +
  '<ihris-array :edit="isEdit" fieldType="string" :slotProps="slotProps" field="given" label="Given Name" min="0" max="*" id="Practitioner.name.given" path="Practitioner.name.given">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-string :slotProps="slotProps" :edit="isEdit" field="given" min="0" max="*" base-min="0" base-max="*" label="Given Name" path="Practitioner.name.given">\n' +
  '</fhir-string>\n' +
  '</template>\n' +
  '</ihris-array>\n' +
  '<ihris-array :edit="isEdit" fieldType="string" :slotProps="slotProps" field="prefix" label="Prefix" min="0" max="*" id="Practitioner.name.prefix" path="Practitioner.name.prefix">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-string :slotProps="slotProps" :edit="isEdit" field="prefix" min="0" max="*" base-min="0" base-max="*" label="Prefix" path="Practitioner.name.prefix">\n' +
  '</fhir-string>\n' +
  '</template>\n' +
  '</ihris-array>\n' +
  '<ihris-array :edit="isEdit" fieldType="string" :slotProps="slotProps" field="suffix" label="Suffix" min="0" max="*" id="Practitioner.name.suffix" path="Practitioner.name.suffix">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-string :slotProps="slotProps" :edit="isEdit" field="suffix" min="0" max="*" base-min="0" base-max="*" label="Suffix" path="Practitioner.name.suffix">\n' +
  '</fhir-string>\n' +
  '</template>\n' +
  '</ihris-array>\n' +
  '</template>\n' +
  '</fhir-human-name>\n' +
  '</template>\n' +
  '</ihris-array>\n' +
  '<fhir-date :slotProps="slotProps" :edit="isEdit" id="Practitioner.birthDate" field="birthDate" min="0" max="1" base-min="0" base-max="1" label="Birth Date" path="Practitioner.birthDate">\n' +
  '</fhir-date>\n' +
  '<fhir-code :slotProps="slotProps" :edit="isEdit" id="Practitioner.gender" field="gender" min="1" max="1" base-min="0" base-max="1" label="Gender" path="Practitioner.gender" binding="http://hl7.org/fhir/ValueSet/administrative-gender|4.0.1">\n' +
  '</fhir-code>\n' +
  '<fhir-extension :slotProps="slotProps" :edit="isEdit" id="Practitioner.extension:residence" field="extension:residence" sliceName="residence" profile="http://ihris.org/fhir/StructureDefinition/ihris-test-residence" min="0" max="1" base-min="0" base-max="*" path="Practitioner.extension">\n' +
  '<template #default="slotProps">\n' +
  `<fhir-reference :slotProps="slotProps" :edit="isEdit" id="Practitioner.extension:residence.value[x]:valueReference" field="value[x]:valueReference" sliceName="valueReference" targetProfile="http://hl7.org/fhir/StructureDefinition/Location" min="1" max="1" base-min="0" base-max="1" label="Residence" path="Practitioner.extension.value[x]" :sub-fields='subFields.__SUBFIELDS_TEST_REPLACE_0__'>\n` +
  '</fhir-reference>\n' +
  '</template>\n' +
  '</fhir-extension>\n' +
  '<ihris-array :edit="isEdit" fieldType="extension" :slotProps="slotProps" field="extension:dependent" label="Dependent Details" min="0" max="*" id="Practitioner.extension:dependent" path="Practitioner.extension" profile="http://ihris.org/fhir/StructureDefinition/ihris-test-dependent" sliceName="dependent">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-extension :slotProps="slotProps" :edit="isEdit" field="extension:dependent" sliceName="dependent" profile="http://ihris.org/fhir/StructureDefinition/ihris-test-dependent" min="0" max="*" base-min="0" base-max="*" label="Dependent Details" path="Practitioner.extension">\n' +
  '<template #default="slotProps">\n' +
  '<ihris-array :edit="isEdit" fieldType="extension" :slotProps="slotProps" field="extension:name" min="1" max="*" id="Practitioner.extension:dependent.extension:name" path="Practitioner.extension.extension" sliceName="name">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-extension :slotProps="slotProps" :edit="isEdit" field="extension:name" sliceName="name" min="1" max="*" base-min="0" base-max="*" path="Practitioner.extension.extension">\n' +
  '<template #default="slotProps">\n' +
  `<fhir-string :slotProps="slotProps" :edit="isEdit" id="Practitioner.extension:dependent.extension:name.value[x]:valueString" field="value[x]:valueString" sliceName="valueString" min="1" max="1" base-min="0" base-max="1" label="Dependent's Name" path="Practitioner.extension.extension.value[x]">\n` +
  '</fhir-string>\n' +
  '</template>\n' +
  '</fhir-extension>\n' +
  '</template>\n' +
  '</ihris-array>\n' +
  '<fhir-extension :slotProps="slotProps" :edit="isEdit" id="Practitioner.extension:dependent.extension:birthDate" field="extension:birthDate" sliceName="birthDate" min="1" max="1" base-min="0" base-max="*" path="Practitioner.extension.extension">\n' +
  '<template #default="slotProps">\n' +
  `<fhir-date :slotProps="slotProps" :edit="isEdit" id="Practitioner.extension:dependent.extension:birthDate.value[x]:valueDate" field="value[x]:valueDate" sliceName="valueDate" min="1" max="1" base-min="0" base-max="1" label="Dependent's Date of Birth" path="Practitioner.extension.extension.value[x]">\n` +
  '</fhir-date>\n' +
  '</template>\n' +
  '</fhir-extension>\n' +
  '<fhir-extension :slotProps="slotProps" :edit="isEdit" id="Practitioner.extension:dependent.extension:gender" field="extension:gender" sliceName="gender" min="1" max="1" base-min="0" base-max="*" path="Practitioner.extension.extension">\n' +
  '<template #default="slotProps">\n' +
  `<fhir-code :slotProps="slotProps" :edit="isEdit" id="Practitioner.extension:dependent.extension:gender.value[x]:valueCode" field="value[x]:valueCode" sliceName="valueCode" min="1" max="1" base-min="0" base-max="1" label="Dependent's Gender" path="Practitioner.extension.extension.value[x]" binding="http://hl7.org/fhir/ValueSet/administrative-gender">\n` +
  '</fhir-code>\n' +
  '</template>\n' +
  '</fhir-extension>\n' +
  '</template>\n' +
  '</fhir-extension>\n' +
  '</template>\n' +
  '</ihris-array>\n' +
  '</template></ihris-section>\n' +
  '<ihris-section :slotProps="slotProps" :edit="isEdit" name="identifiers" title="Identifiers" description="Personal identifiers" :secondary="false">\n' +
  '<template #default="slotProps">\n' +
  '<ihris-array :edit="isEdit" fieldType="identifier" :slotProps="slotProps" field="identifier" label="Identifier" min="0" max="*" id="Practitioner.identifier" path="Practitioner.identifier">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-identifier :slotProps="slotProps" :edit="isEdit" field="identifier" min="0" max="*" base-min="0" base-max="*" label="Identifier" path="Practitioner.identifier">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-code :slotProps="slotProps" :edit="isEdit" id="Practitioner.identifier.use" field="use" min="0" max="1" base-min="0" base-max="1" label="Use" path="Practitioner.identifier.use" binding="http://hl7.org/fhir/ValueSet/identifier-use|4.0.1">\n' +
  '</fhir-code>\n' +
  '<fhir-codeable-concept :slotProps="slotProps" :edit="isEdit" id="Practitioner.identifier.type" field="type" min="0" max="1" base-min="0" base-max="1" label="Type" path="Practitioner.identifier.type" binding="http://hl7.org/fhir/ValueSet/identifier-type">\n' +
  '<template #default="slotProps">\n' +
  '<fhir-coding :slotProps="slotProps" :edit="isEdit" id="Practitioner.identifier.type.coding" field="coding" min="1" max="1" base-min="0" base-max="*" path="Practitioner.identifier.type.coding">\n' +
  '</fhir-coding>\n' +
  '</template>\n' +
  '</fhir-codeable-concept>\n' +
  '<fhir-uri :slotProps="slotProps" :edit="isEdit" id="Practitioner.identifier.system" field="system" min="0" max="1" base-min="0" base-max="1" label="System" path="Practitioner.identifier.system">\n' +
  '</fhir-uri>\n' +
  '<fhir-string :slotProps="slotProps" :edit="isEdit" id="Practitioner.identifier.value" field="value" min="0" max="1" base-min="0" base-max="1" label="Value" path="Practitioner.identifier.value">\n' +
  '</fhir-string>\n' +
  '</template>\n' +
  '</fhir-identifier>\n' +
  '</template>\n' +
  '</ihris-array>\n' +
  '</template></ihris-section>\n' +
  '<ihris-section :slotProps="slotProps" :edit="isEdit" name="position" title="Position" description="Position the person holds" :secondary="true">\n' +
  '<template #default="slotProps">\n' +
  `<ihris-secondary :edit="isEdit" :link-id="fhirId" profile="http://ihris.org/fhir/StructureDefinition/ihris-test-practitioner-role" field="PractitionerRole" title="Position" link-field="PractitionerRole.practitioner" search-field="" :columns='columns.__COLUMNS_TEST_REPLACE_0__' :actions='actions.__ACTIONS_TEST_REPLACE_0__'><template #default="slotProps">\n` +
  '</template></ihris-secondary></template></ihris-section>\n' +
  '</template></ihris-resource>\n',
  data: {
    sectionMenu: [
      {
        name: "Practitioner",
        title: "Health Worker",
        desc: "Primary demographic details",
        secondary: false
      },
      {
        name: "identifiers",
        title: "Identifiers",
        desc: "Personal identifiers",
        secondary: false
      },
      {
        name: "position",
        title: "Position",
        desc: "Position the person holds",
        secondary: true
      }
    ],
    subFields: {
      TEST0: {
        reference: {
          id: "reference",
          path: "reference",
          label: "Location",
          min: 1,
          max: "1",
          "base-min": 0,
          "base-max": "1",
          code: "string"
        }
      }
    },
    columns: {
      TEST0: [
        {
          text: "Job",
          value: "PractitionerRole.code.coding[0]"
        },
        {
          text: "Start Date",
          value: "PractitionerRole.period.start"
        }
      ]
    },
    actions: {
      TEST0: [
        {
          link: "/resource/add/practitionerrole",
          text: "Add Role",
          row: "true",
          condition: "PractitionerRole.period.end.empty()",
          class: "accent"
        }
      ]
    }
  }
}
