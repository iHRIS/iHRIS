# Customization

Customizations can be used with FHIR Shorthand to define resources.

https://build.fhir.org/ig/HL7/fhir-shorthand/

This will be better defined in the future, but for now, you can create the files
in the fsh/ directory of the repository.  You should use the same prefix for your
files and various names that won't conflict with default iHRIS configurations.

## Create a Profile / Structure Definition

You can profile existing FHIR resources and create extensions for to add fields.  Any fields 
you want to show up on the default iHRIS page for the resource need the must support flag set.

You can also set the label to display for the field as well as define validation constraints and
valuesets to be used.  Constraint keys must begin with "ihris-" to be processed.  If the expression
is the same, the key can be reused.

Complete examples can be found in the fsh/ directory.

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
* name.family ^ label = "Surname"
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
```
