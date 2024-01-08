# Creating data entry form with Questionnaire

iHRIS uses the [Questionnaire](https://hl7.org/fhir/questionnaire.html) resource to create a data entry form

- *id* - iHRIS Questionnaire must have a unique id i.e ihris-practitioner
- *url* - iHRIS Questionnaire must have a unique url, the recommended format is <http://ihris.org/fhir/Questionnaire/questionnaire-id> replace questionnaire id with a respective questionnaire id i.e <http://ihris.org/fhir/Questionnaire/ihris-practitioner>
- *name* - can be the same as id
- *title* - This is a human readable name about the questionnaire
- *description* - Any description about what the questionnaire is about
- *purpose* - The reason why the questionnaire is defined
- *status* - This is of type code and the value can either be #draft, #active, #retired or #unknown. In most cases for iHRiS we use #active
- *date* - This is the date the questionnaire was created
- *item* - This is where data fields and data fields grouping is happening. item is an indexed array to allow you to define multiple fields and multiple sections of fields. item has elements to help in defining your field or section as explained below:
  - *linkId* - this is unique id for the field in the questionnaire. For iHRIS, field path within the resource becomes a linkId i.e for birthDate of a practitioner, the linkId becomes Practitioner.birthDate. For array fields, the linkId will be an array as well i.e if we are defining a field for Practitioner surname, the linkId becomes Practitioner.name[0].family. It is very crucial to properly define linkId as it is used in converting the questionnaire into respective resources the questionnaire is collecting data for.
  - *definition* - This is where definition of your field can be found, and fields are defined in fhir profiles. Definition starts with the profile url and ends with the field path. So if you have a Practitioner profile with a url <http://ihris.org/fhir/StructureDefinition/ihris-practitioner> and the field you are defining on the questionnaire is Practitioner family name, then the definition will be <http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.name.family>. Note that profile url and field path are separated by #.
  - *text* - This is the display text for the section or a field.
  - *type* - This is the type of an item. If the item is a section or grouping of fields then the type is group, otherwise the type will depend on the field data type. If the field is of type string then the type becomes #string, if the field is a Coding or Code then the type becomes choice. refer to Questionnaire data types in [here](https://hl7.org/fhir/valueset-item-type.html)
  - *required* - Tells if an item is required or not. If an item is marked as required = true then iHRIS will add validation rules to ensure the field or section has values.
  - *repeats* - This is when you want to collect more that one value for a field or you want a section to be repeated for multiple responses of section fields. It applies array fields/sections.
  - *readOnly* - set this to true if you need a field to be read only. readOnly fields won't be displayed. If needed to display, use a display questionnaire item

- *answerOption* - This is used to set allowed value for the field, and it is normally used with readOnly since readOnly fields are hidden or cant be modified then you use answerOption to set their values. Refer [here](https://hl7.org/fhir/questionnaire.html) for more description
  - An example could be

```
  *item[0].item[0].item[0].readOnly = true
  *item[0].item[0].item[0].answerOption.valueCoding = http://hl7.org/fhir/name-use#official
  *item[0].item[0].item[0].answerOption.initialSelected = true
```

- *answerValueSet* - Use this with choice item types. It is used to define choice list to be used. The value is a url to the valueSet that has choice list. If the field is marital status and you have a value set of marital status with id marital-status-valueset then the value for answerValueSet will be <http://ihris.org/fhir/ValueSet/marital-status-valueset>. Below is a simple example

```
*item[0].item[4].linkId = "Practitioner.extension[1]"
*item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.extension:maritalStatus.value[x]:valueCoding"
*item[0].item[4].text = "Marital Status"
*item[0].item[4].type = #choice
*item[0].item[4].answerValueSet = "http://ihris.org/fhir/ValueSet/marital-status-valueset"
*item[0].item[4].required = false
*item[0].item[4].repeats = false
```

- *enableWhen*  - Is used to conditionally display fields based on the values of other fields. For example you may want to display the field are you pregnant if the gender value is female. Use linkId to refer to a question you want to use its value for condition. Below is a simple example

    ```
    *item[0].item[4].enableWhen[0].question = "PractitionerRole.extension[2]"
    *item[0].item[4].enableWhen[0].operator = #=
    *item[0].item[4].enableWhen[0].answerCoding = yes-no-codesystem#yes
    ```

    Refer to the [Questionnaire](https://hl7.org/fhir/questionnaire.html) documentation to get a list of all supported operators and answerType for enableWhen

- *initial* - Use this to define initial value to be set when the data entry form is displayed for the first time. below is an example

```
*item[0].item[4].linkId = "Basic.extension[0].extension[4]"
*item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/position-profile#Basic.extension:status.value[x]:valueCoding"
*item[0].item[4].text = "Status"
*item[0].item[4].type = #choice
*item[0].item[4].answerValueSet = "http://ihris.org/fhir/ValueSet/position-status-valueset"
*item[0].item[4].initial[0].valueCoding = http://ihris.org/fhir/CodeSystem/position-status-codesystem#open
*item[0].item[4].required = true
*item[0].item[4].repeats = false
```

- **The first item must always be a group**
- **Top level groups will be sections.**
- **Other groups will be combined in a card and can allow repeats**
- **use indexes when it is an array data type or when multiple resources would be created** i.e Basic[0].element[1].element or Practitioner.name[0].use
- **Ensure that indexes are in the correct order of number** i.e if you start with linkId Basic.extension[0].extension[0] then the next linkId should be Basic.extension[0].extension[1]

Below is an example that combines all above explanations

```
Instance:       IhrisPractitionerQuestionnaire
InstanceOf:     IhrisQuestionnaire
Usage:          #definition
* title = "iHRIS Practitioner Questionnaire"
* description = "iHRIS Practitioner initial data entry questionnaire."
* id = "ihris-practitioner"
* url = "http://ihris.org/fhir/Questionnaire/ihris-practitioner"
* name = "ihris-practitioner"
* status = #active
* date = 2020-06-22
* purpose = "Data entry page for practitioners."

* item[0].linkId = "Practitioner"
* item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner"
* item[0].text = "Health Worker|Primary demographic details"
* item[0].type = #group

* item[0].item[0].linkId = "Practitioner.name[0]"
* item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.name"
* item[0].item[0].text = "Name"
* item[0].item[0].type = #group

* item[0].item[0].item[0].linkId = "Practitioner.name[0].use"
* item[0].item[0].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.name.use"
* item[0].item[0].item[0].text = "Name Usage"
* item[0].item[0].item[0].type = #choice
* item[0].item[0].item[0].required = true
* item[0].item[0].item[0].repeats = false
* item[0].item[0].item[0].readOnly = true
* item[0].item[0].item[0].answerOption.valueCoding = http://hl7.org/fhir/name-use#official
* item[0].item[0].item[0].answerOption.initialSelected = true

* item[0].item[0].item[1].linkId = "Practitioner.name[0].family"
* item[0].item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.name.family"
* item[0].item[0].item[1].text = "Surname"
* item[0].item[0].item[1].type = #string
* item[0].item[0].item[1].required = true
* item[0].item[0].item[1].repeats = false

* item[0].item[0].item[2].linkId = "Practitioner.name[0].given[0]"
* item[0].item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.name.given"
* item[0].item[0].item[2].text = "Given Name(s)"
* item[0].item[0].item[2].type = #string
* item[0].item[0].item[2].required = true
* item[0].item[0].item[2].repeats = true

* item[0].item[0].item[3].linkId = "Practitioner.name[0].prefix[0]"
* item[0].item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.name.prefix"
* item[0].item[0].item[3].text = "Prefix"
* item[0].item[0].item[3].type = #string
* item[0].item[0].item[3].required = false
* item[0].item[0].item[3].repeats = true

* item[0].item[1].linkId = "Practitioner.extension[0]"
* item[0].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.extension:nationality.value[x]:valueCoding"
* item[0].item[1].text = "Nationality"
* item[0].item[1].type = #choice
* item[0].item[1].answerValueSet = "http://hl7.org/fhir/ValueSet/iso3166-1-2"
* item[0].item[1].required = true
* item[0].item[1].repeats = false

* item[0].item[2].linkId = "Practitioner.extension[1]"
* item[0].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.extension:permit.value[x]:valueString"
* item[0].item[2].text = "Work Permit"
* item[0].item[2].type = #string
* item[0].item[2].required = true
* item[0].item[2].repeats = false
* item[0].item[2].enableWhen[0].question = "Practitioner.extension[0]"
* item[0].item[2].enableWhen[0].operator = #!=
* item[0].item[2].enableWhen[0].answerCoding = urn:iso:std:iso:3166#NA

* item[0].item[3].linkId = "Practitioner.birthDate"
* item[0].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.birthDate"
* item[0].item[3].text = "Date of Birth"
* item[0].item[3].type = #date
* item[0].item[3].required = false
* item[0].item[3].repeats = false

* item[0].item[4].linkId = "Practitioner.extension[2]"
* item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.extension:maritalStatus.value[x]:valueCoding"
* item[0].item[4].text = "Marital Status"
* item[0].item[4].type = #choice
* item[0].item[4].answerValueSet = "http://ihris.org/fhir/ValueSet/marital-status-valueset"
* item[0].item[4].required = false
* item[0].item[4].repeats = false

* item[1].linkId = "Practitioner.telecom[0]"
* item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.telecom"
* item[1]..text = "Contact"
* item[1].type = #group
* item[1].required = true
* item[1].repeats = true

* item[1].item[0].linkId = "Practitioner.telecom[0].use"
* item[1].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.telecom.use"
* item[1].item[0].text = "Contact Use"
* item[1].item[0].type = #choice
* item[1].item[0].required = true
* item[1].item[0].repeats = false
* item[1].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/contact-use-valueset"

* item[1].item[1].linkId = "Practitioner.telecom[0].system"
* item[1].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.telecom.system"
* item[1].item[1].text = "Contact Type"
* item[1].item[1].type = #choice
* item[1].item[1].required = true
* item[1].item[1].repeats = false
* item[1].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/contact-type-valueset"

* item[1].item[2].linkId = "Practitioner.telecom[0].value"
* item[1].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.telecom.value"
* item[1].item[2].text = "Value"
* item[1].item[2].type = #string
* item[1].item[2].required = false
* item[1].item[2].repeats = false

* item[2].linkId = "Practitioner.identifier[0]"
* item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.identifier"
* item[2].text = "Identifiers|Identifiers for the practitioner"
* item[2].type = #group

* item[2].item[0].linkId = "Practitioner.identifier[0].value"
* item[2].item[0].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.identifier.value"
* item[2].item[0].text = "Identification Number"
* item[2].item[0].type = #string
* item[2].item[0].repeats = false
* item[2].item[0].required = true

* item[2].item[1].linkId = "Practitioner.identifier[0].type"
* item[2].item[1].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.identifier.type"
* item[2].item[1].text = "Identification Type"
* item[2].item[1].type = #choice
* item[2].item[1].answerValueSet = "http://ihris.org/fhir/ValueSet/na-id-type-valueset"
* item[2].item[1].initial[0].valueCoding = http://ihris.org/fhir/CodeSystem/na-id-type-codesystem#id_type|national_id
* item[2].item[1].repeats = false
* item[2].item[1].required = true

* item[2].item[2].linkId = "Practitioner.identifier[0].extension[0]"
* item[2].item[2].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.identifier.extension:issueDate.value[x]:valueDate"
* item[2].item[2].text = "Date of Issue"
* item[2].item[2].type = #date
* item[2].item[2].repeats = false
* item[2].item[2].required = false

* item[2].item[3].linkId = "Practitioner.identifier[0].extension[1]"
* item[2].item[3].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.identifier.extension:expireDate.value[x]:valueDate"
* item[2].item[3].text = "Date of Expiration"
* item[2].item[3].type = #date
* item[2].item[3].repeats = false
* item[2].item[3].required = false

* item[2].item[4].linkId = "Practitioner.identifier[0].extension[2]"
* item[2].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.identifier.extension:countryIssued.value[x]:valueCoding"
* item[2].item[4].text = "Country of Issue"
* item[2].item[4].type = #choice
* item[2].item[4].answerValueSet = "http://hl7.org/fhir/ValueSet/iso3166-1-2"
* item[2].item[4].repeats = false
* item[2].item[4].required = false

* item[3].linkId = "Basic[0]"
* item[3].definition = "http://ihris.org/fhir/StructureDefinition/grievance-profile"
* item[3].text = "Grievance"
* item[3].type = #group

* item[3].item[0].linkId = "Basic[0].extension[0]"
* item[3].item[0].definition = "http://ihris.org/fhir/StructureDefinition/grievance-profile#Basic.extension:grievance-date.value[x]:valueDate"
* item[3].item[0].text = "Grievance Date"
* item[3].item[0].type = #date
* item[3].item[0].required = true
* item[3].item[0].repeats = false

* item[3].item[1].linkId = "Basic[0].extension[1]"
* item[3].item[1].definition = "http://ihris.org/fhir/StructureDefinition/grievance-profile#Basic.extension:grievance-submission-date.value[x]:valueDate"
* item[3].item[1].text = "Submission Date to HR"
* item[3].item[1].type = #date
* item[3].item[1].required = true
* item[3].item[1].repeats = false

* item[3].item[2].linkId = "Basic[0].extension[2]"
* item[3].item[2].definition = "http://ihris.org/fhir/StructureDefinition/grievance-profile#Basic.extension:grievance-nature.value[x]:valueString"
* item[3].item[2].text = "Nature of Grievance"
* item[3].item[2].type = #text
* item[3].item[2].required = true
* item[3].item[2].repeats = false

* item[4].linkId = "Basic[1]"
* item[4].definition = "http://ihris.org/fhir/StructureDefinition/benefit-profile"
* item[4].text = "Benefit Information"
* item[4].type = #group

* item[4].item[0].linkId = "Basic[1].extension[0].extension[0]"
* item[4].item[0].definition = "http://ihris.org/fhir/StructureDefinition/benefit-profile#Basic.extension:benefit.extension:type.value[x]:valueCoding"
* item[4].item[0].text = "Benefit Type"
* item[4].item[0].type = #choice
* item[4].item[0].answerValueSet = "http://ihris.org/fhir/ValueSet/benefit-type-valueset"
* item[4].item[0].required = true
* item[4].item[0].repeats = false

* item[4].item[1].linkId = "Basic[1].extension[0].extension[1]"
* item[4].item[1].definition = "http://ihris.org/fhir/StructureDefinition/benefit-profile#Basic.extension:benefit.extension:amount.value[x]:valueDecimal"
* item[4].item[1].text = "Amount"
* item[4].item[1].type = #decimal
* item[4].item[1].required = false
* item[4].item[1].repeats = false

* item[4].item[2].linkId = "Basic[1].extension[0].extension[3]"
* item[4].item[2].definition = "http://ihris.org/fhir/StructureDefinition/benefit-profile#Basic.extension:benefit.extension:start-date.value[x]:valueDate"
* item[4].item[2].text = "Start Date"
* item[4].item[2].type = #date
* item[4].item[2].required = true
* item[4].item[2].repeats = false

* item[4].item[3].linkId = "Basic[1].extension[0].extension[4]"
* item[4].item[3].definition = "http://ihris.org/fhir/StructureDefinition/benefit-profile#Basic.extension:benefit.extension:end-date.value[x]:valueDate"
* item[4].item[3].text = "End Date"
* item[4].item[3].type = #date
* item[4].item[3].required = false
* item[4].item[3].repeats = false
```
