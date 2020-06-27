# Questionnaire notes

* definition is currently only used to determine binding for reference fields
 * Also used as the profile at the top grouping for a resource with the resource linkId (e.g. Practitioner)
* first level of items in questionnaire should all be type "group" for the sections
* anything that has repeats: true must have a linkId that ends with an array index (e.g. [0])
* linkId must be in the correct format to put things in the right place.  This only matters for 
  fields that have values
 * Resource.element.element
  * use indexes when it is an array data type or when multiple resources would be created
  * Resource[0].element[1].element
  * Practitioner.name[0].use
* readOnly fields won't be displayed.  If needed to display, use a display questionnaire item.
* for now, choice type will only work with valuesets, need to add code to support answerOptions
* top level groups will be sections.
 * other groups will be combined in a card and can allow repeats
 * repeats will increment the index given for the main grouping if allowed so use repeated groups last.
  * e.g. name[0] is use official, but additional names can be added without use set.  Still need 
    to work this out
* response object has link to the primary resource created in the subject field
