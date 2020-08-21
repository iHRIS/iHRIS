Profile:        IhrisDocument
Parent:         DocumentReference
Id:             ihris-document
Title:          "iHRIS Document"
Description:    "iHRIS Profile of the DocumentReference resource to manage static documents."
* subject 0..0
* type 0..0
* category 1..1 
* category from IhrisDocumentCategoryValueSet (required)
* subject 0..0
* content 1..1
* content.attachment.contentType 1..1
* content.attachment.data 1..1
* content.attachment.title 1..1
* content.attachment.url 0..0
* context 0..0

CodeSystem:     IhrisDocumentCategoryCodeSystem
Id:             ihris-document-category
Title:          "Code system for document categories."
* #open       "Open"          "Any one can access."
* #restricted "Restricted"    "Only certain users can view."

ValueSet:       IhrisDocumentCategoryValueSet
Id:             ihris-document-category
Title:          "Code system for document categories."
* codes from system IhrisDocumentCategoryCodeSystem

Instance:       page-about
InstanceOf:     IhrisDocument
Title:          "iHRIS About Page"
Usage:          #example
* status = #current
* docStatus = #final
* date = "2020-06-07T14:54:00Z"
* category = http://ihris.org/fhir/CodeSystem/ihris-document-category#open "Open Access"
* content[0].attachment.contentType = #text/markdown
* content[0].attachment.title = "About iHRIS"
* content[0].attachment.data = "IyBBYm91dCBpSFJJUwoKVGhpcyBpcyBhIHRlc3RpbmcgYWJvdXQgcGFnZS4K"
