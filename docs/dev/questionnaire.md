# Creating data entry form with Questionnaire

Data entry forms in iHRIS have three building blocks, the questionnaire, questionnaire workflow and the page.<br>

1. The questionnaire: Used to create fields of the form
2. The workflow: A nodejs module used to perform extra operations on a the questionnaire. The workflow is optional
3. The Page: Used for displaying the saved form.

## Questionnaire

### Questionnaire Elements

iHRIS uses the [Questionnaire](https://hl7.org/fhir/questionnaire.html) resource to create a data entry form. Below are the elements of the Questionnaire resource and how iHRIS uses them when defining fields of the data entry form:

- *id* - This the unique id of the iHRIS Questionnaire i.e ihris-practitioner
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

- *answerOption* - This is used to set allowed value for the field, and it is normally used with readOnly since readOnly fields are hidden or cant be modified then you use answerOption to set their values. Refer [here](https://hl7.org/fhir/questionnaire.html) for more description<br>
  An example could be:

```
  *item[0].item[0].item[0].readOnly = true
  *item[0].item[0].item[0].answerOption.valueCoding = http://hl7.org/fhir/name-use#official
  *item[0].item[0].item[0].answerOption.initialSelected = true
```

- *answerValueSet* - Use this with choice item types. It is used to define choice list to be used. The value is a url to the valueSet that has choice list. If the field is marital status and you have a value set of marital status with id marital-status-valueset then the value for answerValueSet will be <http://ihris.org/fhir/ValueSet/marital-status-valueset>.<br>
Below is a simple example:

```
*item[0].item[4].linkId = "Practitioner.extension[1]"
*item[0].item[4].definition = "http://ihris.org/fhir/StructureDefinition/ihris-practitioner#Practitioner.extension:maritalStatus.value[x]:valueCoding"
*item[0].item[4].text = "Marital Status"
*item[0].item[4].type = #choice
*item[0].item[4].answerValueSet = "http://ihris.org/fhir/ValueSet/marital-status-valueset"
*item[0].item[4].required = false
*item[0].item[4].repeats = false
```

- *enableWhen*  - Is used to conditionally display fields based on the values of other fields. For example you may want to display the field are you pregnant if the gender value is female. Use linkId to refer to a question you want to use its value for condition.<br>
Below is a simple example:

```
*item[0].item[4].enableBehavior = #any
*item[0].item[4].enableWhen[0].question = "PractitionerRole.extension[2]"
*item[0].item[4].enableWhen[0].operator = #=
*item[0].item[4].enableWhen[0].answerCoding = yes-no-codesystem#yes
```
  Ps: one can set multiple conditions for enableWhen

  Refer to the [Questionnaire](https://hl7.org/fhir/questionnaire.html) documentation to get a list of all supported operators and answerType for enableWhen and enableBehavior

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

### Informers

Informers are optional expressions appended to the linkId of the item using #. They are normally used to send some information about an item of the questionnaire. an example informer can be #tree i.e <br>```* item[0].item[0].item[4].linkId = "Basic.extension[3].extension[0]#tree"```<br>
Here is a list of all informers supported so far:

- tree: Used to inform that the field should be displayed as a tree of items
- text: Used to inform that the field should be displayed as a long text
- password: Used to inform that the field should be displayed as a password, in a way that the texts being typed are hidden
- year: Used to inform that the date field should only display year instead of a full date
- preloaded: This is used for reference fields. Normally with reference fields, values of a field are not loaded by default, they are loaded after a user type in the needed value. This can be changed by passing the <b>preloaded</b> informer to make all values 
available immediately after the page is loaded.

### Setting Attachment Types

The types is a string that describes a type of file that may be selected by the user in an  element of type file. Each unique file type specifier may take one of the following forms:

- A valid case-insensitive filename extension, starting with a period (".") character. For example: .jpg, .pdf, or .doc.
- A valid MIME type string, with no extensions.
- The string "audio/*"  meaning "any audio file".
- The string "video/*" meaning "any video file".
- The string "image/*" meaning "any image file".

You can set the attachment type as like this in the questionnaire

```
* item[0].item[4].code[0].system = "attachment-types"
* item[0].item[4].code[0].code = #.png
* item[0].item[4].code[1].system = "attachment-types"
* item[0].item[4].code[1].code = #.jpeg
* item[0].item[4].code[2].system = "attachment-types"
* item[0].item[4].code[2].code = #image/*
```

### Questionnaire Example

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
* date = 2020-06-22A valid case-insensitive filename extension, starting with a period (".") character. For example: .jpg, .pdf, or .doc.
A valid MIME type string, with no extensions.
The string audio/* meaning "any audio file".
The string video/* meaning "any video file".
The string image/* meaning "any image file".
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

* item[3].item[1].linkId = "Basic[0].extension[1]#year"
* item[3].item[1].definition = "http://ihris.org/fhir/StructureDefinition/grievance-profile#Basic.extension:grievance-submission-date.value[x]:valueDate"
* item[3].item[1].text = "Submission Year to HR"
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

## Questionnaire Workflow

A workflow is a javascript/nodejs module that can be written to perform any extra operations or data manipulation on questionnaire items. iHRIS has a predefined format for a workflow as described below:<br>

1. A workflow must be a nodejs module in below format

    <div style="background-color:#f2f2f2">
      const employmentHistoryWorkflow = {<br>
      <br>
      }<br>
      module.exports = employmentHistoryWorkflow
    </div>

2. The module must have two functions, process and postProcess. It may optionally contain the outcome function as well. Both of these functions must return a promise.

    - process: Accepts one parameter, the request object. It is called before the questionnaire is saved into the database.
      <div style="background-color:#f2f2f2">
      process: (req) => {<br>
        &nbsp;&nbsp;&nbsp;return new Promise((resolve, reject) => {<br>

        &nbsp;&nbsp;&nbsp;})<br>
      }
      </div>

    - postProcess: Accepts two parameters, the first parameter is the request object while the second parameter is response from fhir server after the questionnaire is saved. This function is called after the questionnaire is saved.
      <div style="background-color:#f2f2f2">
      postProcess: (req, results) => {<br>
        &nbsp;&nbsp;&nbsp;return new Promise( (resolve, reject) => {<br>

        &nbsp;&nbsp;&nbsp;})<br>
      }
      </div>

    - outcome: Used for building error messages

      <div style="background-color:#f2f2f2">
      outcome: (message) => {<br>
        &nbsp;&nbsp;&nbsp;return new Promise ((resolve, reject) => {<br>

        })
      }
      </div>

3. The module must resolve the questionnaire bundle under the process function

```js
process: (req) => {
  return new Promise((resolve, reject) => {
    fhirQuestionnaire.processQuestionnaire(req.body).then(async(bundle) => {
      return resolve(bundle)
    })
  })
}
```

**Finally**, you need to link the questionnaire and the workflow. This is done inside the IhrisParameters.fsh file by specifying the workflow file name and the questionnaire url as in below

```bash
* parameter[=].part[+].name = "workflow:processor:employment:file"
* parameter[=].part[=].valueString = "employmentWorkflow"
* parameter[=].part[+].name = "workflow:questionnaire:employment:url"
* parameter[=].part[=].valueString = "http://ihris.org/fhir/Questionnaire/ihris-employment-history"
```

This assumes that the workflow file name is called employmentWorkflow.js and the questionnaire url is <http://ihris.org/fhir/Questionnaire/ihris-employment-history>

!!! important
    Remember to build your fsh files and sign the IhrisParameters.fsh output after making changes to the IhrisParameters.fsh

!!! important
    ***To convert a Questionnaire bundle to a respective resource, use processQuestionnaire function of the fhirQuestionnaire module i.e fhirQuestionnaire.processQuestionnaire(req.body). The method will return a bundle of respective resources***

!!! important
    ***When rejecting, you may send a message to the user by returning an object with a message element and the corresponding message as the value i.e<br>return reject({message: "Start date and End date mismatch"})***

Here is a complete example of a workflow

```js
const winston = require('winston')
const ihrissmartrequire = require("ihrissmartrequire")
const fhirQuestionnaire = ihrissmartrequire('modules/fhir/fhirQuestionnaire')
const moment = require("moment")

const employmentHistoryWorkflow = {
  process: (req) => {
    return new Promise( (resolve, reject) => {
      if(!req.query.practitioner) {
        return reject({message: "Invalid request, no practitioner on the request"})
      }
      fhirQuestionnaire.processQuestionnaire(req.body).then(async(bundle) => {
        bundle.entry[0].resource.extension.push({
          url: 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference',
          valueReference: {
            reference: 'Practitioner/' + req.query.practitioner
          }
        })
        let today = moment().format("YYYY-MM-DD")
        let employment = bundle.entry[0].resource.extension.find((ext) => {
          return ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-employment-history"
        })
        let startDate = employment.extension.find((ext) => {
          return ext.url === "startDate"
        })
        let endDate = employment.extension.find((ext) => {
          return ext.url === "endDate"
        })
        if(moment(startDate.valueDate).isAfter(today)) {
          return reject({message: "Start date must be before today"})
        }
        if(endDate && endDate.valueDate && moment(endDate.valueDate).isAfter(today)) {
          return reject({message: "End date must be before today"})
        }
        if(endDate && endDate.valueDate && moment(startDate.valueDate).isAfter(endDate.valueDate)) {
          return reject({message: "End date must be after start date"})
        }
        return resolve(bundle)
      })
    } )
  },
  postProcess: (req, results) => {
    return new Promise((resolve, reject) => {
      if (!req.body.meta) req.body.meta = {}
      if (!req.body.meta.tag) req.body.meta.tag = []
      req.body.meta.tag.push({system: "http://ihris.org/fhir/tags/resource", code: results.entry[0].response.location})
      resolve(req)
    })
  },
  outcome: (message) => {
    return new Promise ((resolve, reject) => {
      let outcomeBundle = {
        resourceType: "Bundle",
        type: "transaction",
        entry: [{
          resource:{
            resourceType: "OperationOutcome",
            issue: [
            {
              severity: "error",
              code: "exception",
              diagnostics: message
            }]
          },
          request: {
            method: "POST",
            url: "OperationOutcome"
          }
        }]
      }
      winston.info(JSON.stringify(outcomeBundle,null,2))
      resolve(outcomeBundle)
    })
  }
}
 
module.exports = employmentHistoryWorkflow
```
