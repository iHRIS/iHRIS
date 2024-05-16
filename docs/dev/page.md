# Creating data display page

Pages define how a resource is displayed by default and how it is edited.  You can control
the sections displayed as well as the order of fields.  Any fields that are defined in
the profile as "must support" will appear in the first section if not included elsewhere.

The page defines the search terms that can be used on a search page for the resource.

The page defines any secondary resources that are linked to this resource and you can display
those in a table on the page.  You can include links to modify or create these secondary resources.

<https://github.com/iHRIS/iHRIS/blob/master/fsh/IhrisPage.fsh>

A single iHRIS page defines a search page and data display page all together. Below is the profile of the iHRIS Page that we are going to discuss

```
Profile:        IhrisPage
Parent:         Basic
Id:             ihris-page
Title:          "iHRIS Page"
Description:    "iHRIS Profile of the Basic resource to manage pages."
* code = IhrisResourceCodeSystem#page
* extension contains
      IhrisPageDisplay named display 1..1 MS and
      IhrisPageSection named section 0..* MS
```
