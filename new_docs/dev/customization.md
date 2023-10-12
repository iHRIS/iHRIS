# iHRIS Customization

iHRIS is a **customizable** system, which provides various ways for developers and implementers to customize the product for their specific use cases.

Below are various ways you may use to customize iHRIS based on your needs

1. Editing FSH files
2. [Creating custom iHRIS components](custom_components.md)
3. [iHRIS Apps](ihris_apps.md)
4. [Tasks And Roles](tasks_roles.md)
5. Creating and editing Menu
6. [Creating custom nodeJS routes](custom_routes.md)
7. Creating custom nodeJS modules --- pending

## `Editing fsh files`

When using this option for customization, developers need to edit the fsh files and upload them onto hapi server.

## Using FHIR

Customizations can be used with FHIR Shorthand to define resources.

<https://build.fhir.org/ig/HL7/fhir-shorthand/>

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

## Creating pages

Pages define how a resource is displayed by default and how it is edited.  You can control
the sections displayed as well as the order of fields.  Any fields that are defined in
the profile as "must support" will appear in the first section if not included elsewhere.

The page defines the search terms that can be used on a search page for the resource.

The page defines any secondary resources that are linked to this resource and you can display
those in a table on the page.  You can include links to modify or create these secondary resources.

<https://github.com/iHRIS/iHRIS/blob/master/fsh/IhrisPage.fsh>

## Creating single data entry pages

Single data entry pages can be created using a FHIR Questionnaire.  The linkId must refer
to a path in a FHIR resource where the field will be populated and the definition
should refer to the field in your customized StructureDefinition.

See <https://github.com/iHRIS/iHRIS/blob/master/fsh/IhrisPractitioner.fsh#L187>

## Creating a workflow

Similar to single data entry pages, you can also create a questionnaire
for custom workflows where you want to update multiple resources.

The workflow is custom Node JS code stored in a FHIR Library.  The library must be signed to be sure
that the code is allowed to be run by the server.  For example, promoting
a practitioner is done with a workflow.  An example Library is
here:  <https://github.com/iHRIS/iHRIS/blob/master/resources/Library-ihris-workflow-promotion.json>

The code was created using the createModule.js tool from this source
code:  <https://github.com/iHRIS/iHRIS/blob/master/resources/moduleCode/workflowPromotion.js>
