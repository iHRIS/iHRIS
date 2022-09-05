# iHRIS Customization

iHRIS is a **customizable** system, which provides various ways for developers and implementers to customize the product for their specific use cases.

There are 3 ways of customizing iHRIS:

1. Editing fsh files
2. Creating custom iHRIS components- Used to add entire menus in iHRIS
3. iHRIS Apps- This is used  for complex use cases, more specifically for enhancing iHRIS/ adding plugins.

## Editing fsh files

When using this option for customization, developers need to edit the fsh files and upload them onto hapi server.

## Creating custom components

This option of customization allows developers to create their own logic for all the changes to be included.

This can be used to add an entire menu/menus on the iHRIS menu page. The process is to:
Open the iHRIS configuration file,in the resources folder.
Parameters-ihris-config.json is the file name
All iHRIS menus are defined by this file, including the title, site logo etc
This file defines menus.
TO add a component under the existing menu,
Edit the new line, give it a name.
Each menu has text, url and icon to be defined.
E.g. the name which will be displayed on the UI i.e. if order is 1, it will be on the top of the menu 2, second , 3 third and so on.
Define the icon to be used for the menu item.
The required ones are text and url.
There’s a specific syntax for the url to be input on the component customization page.
All custom components must be stored in the site folder under iHRIS components. You can add a folder containing the components to be added
.E.g. create a folder called components, and define the component file called ‘Performance Management.vue’

The url is as follows:
“/custom/name of the folder within the site FOLDER/name of the file”
DO NOT SPECIFIC SITE, it will be added automatically.
DO NOT SPECIFY THE EXTENSION.
The path must be relative to iHRIS site.
Once customized, upload it to hapi fhir, and the menu will be added and you can include the logic in the component file created.

3. Using iHRIS Apps
If you have a complex use case. This is used for enhancing iHRIS/ adding plugins
This allows the development of iHRIS  web applications on the dev’s preferred language .
You only need to observe some standards.
Example- Dictionary app- Pulls all text in the system, and allows users to add translation for the text.

CUSTOMIZATION OF COMPONENTS

iHRIS APPS
Any programming language can be used, with the standards being observed.
Pre-requisites for an iHRIS app- The manifest.webapp.
Define the meta-data for the app.
The file manifest.webapp should be customized.
Define the name of the app,
Define the launch path of the app
Define the icons to be used for the app.
Developer details are optional
Once the app is developed, it needs to be zipped.
The app, the icons, the files should be at the top level of the folder for the app to run.
Avoid zipping the folder and having the contents in the 2nd level.
To zip properly, open the app, select the files and zip the files. This way, the files are on the parent level of the zip file, no folder is created on level 1.

Once the app is developed, then install the app. To install,
Under iHRIS apps, on iHRIS, Browse for the folder containing the app.
Select the file to be uploaded and click on ‘Upload’
Once installed, the app is available for use by iHRIS users

Uninstalling an app.
Click the minus sign, select the app to be removed and click on it.

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
