# iHRIS Tasks and Roles Management

iHRIS uses tasks to control what a user role can do. A task comprises of three attributes named permission, resource and instance.

## Tasks

A task is what iHRIS uses to control access to various resources.

### Tasks Attributes

<ul>
  <li>
    resource: This is the resource name that a task is trying to control access to it. the resource can be a FHIR resource or a non FHIR resource. An example of a FHIR resource are Practitioner, Basic, Location, PractitionerRole etc.
    By the time this documentation was written, iHRIS had two non FHIR resources below:
    <ol>
      <li>
        navigation: This control access to front end menus
      </li>
      <li>
        section: This control access to page sections i.e Practitioner section, Emergency Contact section etc
      </li>
    </ol>
  </li>
  <li>
    permission: This is the permission to control access to a resource. This has 6 options
    <ol>
      <li>
        *: All, Can do any task of a resource
      </li>
      <li>
        read: Can read the given resource
      </li>
      <li>
        write: Can write the given resource
      </li>
      <li>
        delete: Can delete the given resource
      </li>
      <li>
        filter: Search filter constraints
      </li>
      <li>
        special: Special non-resource permissions
      </li>
    </ol>
  </li>
  <li>
    instance: This is an instance of a resource a task is trying to limit access i.e ihris-page-person instance of the Basic resource
  </li>
</ul>

### Composite task

It is allowed to define a task that inherits other tasks,and these tasks are called composite task. i.e a task that writes to the Practitioner task may be defined to inherits a task that reads the Practitioner resource, for this case, a role that is assigneed a task to write Practitioner resource will automatically have a task to read a Practitioner resource.

### Navigation Resource Tasks

Navigation tasks must be created to control access to menus on the front end. Below is an example of how a navigation task can be created.
Suppose we want to control access to the change password menu. Looking at the IhrisParameters.fsh file, we see that the change password menu is defined as below

\* parameter[=].part[+].name = "site:nav:menu:password:text" <br>
\* parameter[=].part[=].valueString = "Change Password" <br>
\* parameter[=].part[+].name = "site:nav:menu:password:order" <br>
\* parameter[=].part[=].valueString = "12" <br>
\* parameter[=].part[+].name = "site:nav:menu:password:icon" <br>
\* parameter[=].part[=].valueString = "mdi-lock-reset" <br>
\* parameter[=].part[+].name = "site:nav:menu:password:url" <br>
Task attributes to control access to this menu will look as below <br>
resource: navigation <br>
permission: special <br>
instance: password <br>
The instance is generated from the key used define the menu i.e site:nav:menu:<b>password</b>:text

Lets a take a look at an example where a menu is nested <br>
\* parameter[=].part[+].name = "site:nav:menu:person:menu:person-add:text"<br>
\* parameter[=].part[=].valueString = "Add Person"<br>
\* parameter[=].part[+].name = "site:nav:menu:person:menu:person-add:url"<br>
\* parameter[=].part[=].valueString = "/questionnaire/ihris-practitioner/practitioner"<br>
Task attributes to control access to this menu will look as below <br>
resource: navigation <br>
permission: special <br>
instance: person.person-add <br>
and the name of task will be View Add Person Menu. The word Add Person is extracted from the menu text site:nav:menu:person:menu:person-add:text
!!! important "parameter name is limited to any combination of upper- or lower-case ASCII letters ('A'..'Z', and 'a'..'z', numerals ('0'..'9'), '-' and '.', with a length limit of 64 characters. Regex: [A-Za-z0-9\-\.]{1,64}"

### Page Viewing Tasks

Access to a menu isn't enough to grant access to a page. If a role only has a task to view a menu but no task to view a page, then a use will see a menu but clicking the menu will results into access denied. So a role must have both tasks for viewing a menu and a page.
Suppose you have a page defined with fsh as below <br>
Instance:       ihris-page-practitioner <br>
InstanceOf:     IhrisPage <br>
Title:          "Practitioner" <br>
Usage:          #example <br>

The task for viewing this page will look like this <br>
resource:   Basic <br>
permission: read <br>
instance:   ihris-page-practitioner <br>
The title of this task will be View Practitioner Page. The word Practitioner is extracted from the page title <br>
The resource is Basic simply because pages are defined using Basic resource

### Page Content Viewing/Writting Tasks

Having a view access to a page is not enough, you still need read access to various resources that make up a page
i.e if a page is displaying contents of the PractitionerRole resource, you will need a task that allows reading the respective resource, the task can be defined as below
resource:   PractitionerRole <br>
permission: read <br>
The name of the task will be Read Practitioner Role Resource <br>

similary for writting to PractitionerRole the task will look as below <br>
resource:   PractitionerRole <br>
permission: write <br>
Task name will be Write Practitioner Role Resource

Examples above gives read and write access respectively, for any instance of the respective resource.
You may as well limit resource access by resource id and not any instance of the resource i.e <br>
resource:   Questionnaire <br>
permission: read <br>
instance: ihris-person <br>
where ihris-person is an id of the questionnaire <br>

### Page Sections Viewing

An iHRIS view page is made up of atleast one section. in addition to the page view and resource read access, a user must have access to view the section. A task to view a section can be defined as follows: <br>
consider below section defined in a page <br>
\* extension[section][2].extension[title].valueString = "Contact Details" <br>
\* extension[section][2].extension[description].valueString = "Address, email, phone numbers" <br>
\* extension[section][2].extension[name].valueString = "contact" <br>
The task will be <br>
resource:   section <br>
permission: special <br>
instance: contact <br>
As you may see above, the instance is the section name. The task title will be View Contact Details Section.
