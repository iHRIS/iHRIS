## Create a Profile / Structure Definition

You can profile existing FHIR resources and create extensions to add new or edit existing data fields. This inherits and an existing profile from which your new profile is created. The example below inherits the profile "Practitioner" to create "ExamplePractitioner"

```
Profile:      ExamplePractitioner
Parent:       Practitioner
Id:           example-practitioner
Title:        "Example Practitioner"
Description:  "Example Practitioner for iHRIS"
```

### Cardinality and Must Support
Any fields you want to show up on the page for the resource need the must support (==MS==) flag set.
Cardinalities have to be specified as well. For example

```
* name 1..1 MS
```
This specifies the name to have a one to one relationship making is a mandatory parameter.

```
* photo 0..1 MS
```
This specifies the photo to have a zero to one relationship making the photo not mandatory and the same time only have a maximum value of one photo at a time.

You also have option of ==(1..*)== and ==(0..*)== which specifies a one to many and zero to many relationships to allow for multiple entries 

### Labels
You can also set the label to display for the field

```
* gender 1..1 MS
* gender ^label = "Gender"
```

### Constraints
You can define validation constraints. Constraint keys must begin with "ihris-" to be processed.  If the expression
is the same, the key can be reused.

```
Invariant:      ihris-age-18
Description:    "birthDate must be more than 18 years ago."
Expression:     "birthDate < today() - 18 years"
Severity:       #error
```

In the profile this is how the constraint is applied
```
* birthDate obeys ihris-age-18
```

### Extensions
Extension are used to define additional data elements that do not otherwise exist on the default profile or data fields.
Here is an example for adding nationality to the profile:

Add this extension to the end of your profile
```
* extension contains
    IhrisPractitionerNationality named nationality 0..1
```

The the extension definition is added separately
```
Extension:      IhrisPractitionerNationality
Id:             ihris-practitioner-nationality
Title:          "iHRIS Practitioner Nationality"
Description:    "iHRIS extension for Practitioner nationality."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Nationality"
* valueCoding from http://hl7.org/fhir/ValueSet/iso3166-1-2 (required)
```

### ValueSets and CodeSystems / Coding
You can define custom lists(valueset&Codings) for certain fields. Lets use the nationality example above. One can define there own list of values for nationality like this:
```
CodeSystem:      IhrisNationalityCodesystem
Id:              ihris-nationality-codesystem
Title:           "Nationality"
* ^date = "2022-10-29T08:41:04.362Z"
* ^version = "0.3.0"
* #UG "Uganda" "Ugandan"
* #TZ "Tanzania" "Tanzanian"
* #SA "South Africa" "South African"

ValueSet:         IhrisNationalityValueSet
Id:               ihris-nationality-valueset
Title:            "iHRIS Nationality ValueSet"
* ^date = "2022-10-29T08:41:04.362Z"
* ^version = "0.3.0"
* codes from system IhrisNationalityCodesystem
```
Now the valueCoding in the Nationality extension definition changes to this.
```
* valueCoding from IhrisNationalityValueSet (required)
```

### Example
The following is a simple example of a Practitioner profile.

```
Profile:      ExamplePractitioner
Parent:       Practitioner
Id:           example-practitioner
Title:        "Example Practitioner"
Description:  "Example Practitioner for iHRIS"
* name 1..1 MS
* name ^label = "Name"
* name.family 1..1 MS
* name.family ^label = "Surname"
* name.family ^constraint[0].key = "ihris-name-check"
* name.family ^constraint[0].severity = #error
* name.family ^constraint[0].expression = "matches('^[A-Za-z ]*$')"
* name.family ^constraint[0].human = "Name must be only text."
* name.given 1..* MS
* name.given ^label = "Given Name"
* gender 1..1 MS
* gender ^label = "Gender"
* birthDate MS
* birthDate ^label = "Birth Date"
* birthDate obeys ihris-age-18
* birthDate ^minValueQuantity.system = "http://unitsofmeasure.org/"
* birthDate ^minValueQuantity.code = #a
* birthDate ^minValueQuantity.value = 100
* birthDate ^maxValueQuantity.system = "http://unitsofmeasure.org/"
* birthDate ^maxValueQuantity.code = #a
* birthDate ^maxValueQuantity.value = -18
* photo 0..1 MS
* photo ^label = "Photo"
* extension contains
    IhrisPractitionerNationality named nationality 0..1

Extension:      IhrisPractitionerNationality
Id:             ihris-practitioner-nationality
Title:          "iHRIS Practitioner Nationality"
Description:    "iHRIS extension for Practitioner nationality."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Nationality"
* valueCoding from http://hl7.org/fhir/ValueSet/iso3166-1-2 (required)

Invariant:      ihris-age-18
Description:    "birthDate must be more than 18 years ago."
Expression:     "birthDate < today() - 18 years"
Severity:       #error

Extension:      IhrisPractitionerNationality
Id:             ihris-practitioner-nationality
Title:          "iHRIS Practitioner Nationality"
Description:    "iHRIS extension for Practitioner nationality."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Nationality"
* valueCoding from IhrisNationalityValueSet (required)

CodeSystem:      IhrisNationalityCodesystem
Id:              ihris-nationality-codesystem
Title:           "Nationality"
* ^date = "2022-10-29T08:41:04.362Z"
* ^version = "0.3.0"
* #UG "Uganda" "Ugandan"
* #TZ "Tanzania" "Tanzanian"
* #SA "South Africa" "South African"

ValueSet:         IhrisNationalityValueSet
Id:               ihris-nationality-valueset
Title:            "iHRIS Nationality ValueSet"
* ^date = "2022-10-29T08:41:04.362Z"
* ^version = "0.3.0"
* codes from system IhrisNationalityCodesystem
```