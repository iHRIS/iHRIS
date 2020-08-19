# ToDo

* Create tests for fhirAxios:lookup and route/fhir CodeSystem/$lookup
* setup reference lookup to be configurable (in fhir-reference.vue, hard coded to name)
* Create audit module and tests
 * Save audit messages for activity
  * login/logout
  * save/update resource
* Internationalization
* add additional fields to resource display
 * defaultValue[x]
 * fixed[x]
 * pattern[x]
 * minValue[x]
 * maxValue[x]
 * constraint
* add mixin for fhir elements in frontend
* add tests for frontend
* change coding valueset lookup to search based on URL instead of by ID
* fix valueset expansion lookup to work better on edge cases
* cache valuesets in $store object instead of hitting them all the time
* fix issue with valuesets selecting first item
 * autocomplete?
* questionnaire data entry
* add form validation and required fields
* add required fields
* allow readonly fields (like code for codesystem edit, but not add)
* change $short-name operation to allow searches and results of the shortname and update fhir-reference component to use that
* set up all components to work like fhir-reference for presets (disable element on add page when preset)
* set up "static" FHIR resource (documentreference?) for images (logos, etc.)

# Notes

* Search bundles can be filtered with the same constraints as the resource by making it be on entry.where(resource.CONSTRAINT) and replacing entry with the results
 * entry.where(resource.name.where(family = 'Duncan'))
 * select(entry.where(resource.name.where(family = 'Duncan')))
