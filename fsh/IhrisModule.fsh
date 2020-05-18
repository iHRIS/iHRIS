Profile:          IhrisModule
Parent:           Library
Id:               ihris-module
Title:            "iHRIS Module"
Description:      "iHRIS profile of Library resource to manage modules."
* name 1..1
* title 1..1
* author 1..*
* content 2..2
* type = #logic-library
* content ^slicing.discriminator.type = #pattern
* content ^slicing.discriminator.path = "title"
* content ^slicing.rules = #open
* content contains 
      Signature 1..1 and
      Javascript 1..1
* content[Signature].contentType = #text/x-sig
* content[Signature].language 0..0
* content[Signature].data 1..1
* content[Signature].url 0..0
* content[Signature].title = "module-signature"
* content[Javascript].contentType = #application/javascript
* content[Javascript].language 0..0
* content[Javascript].data 1..1
* content[Javascript].url 0..0
* content[Javascript].title = "module-code"

Instance:         ihris-module-example
InstanceOf:       IhrisModule
Title:            "iHRIS Module Example"
Usage:            #example
* status = #active
* name = "ihris-example"
* title = "iHRIS Example Module"
* author[0].name = "Test Author"
* author[0].telecom[0].system = #email
* author[0].telecom[0].value = "test@ihris.org"
* content[Signature].data = "TEST"
* content[Signature].contentType = #text/x-sig
* content[Javascript].data = "TEST"
* content[Javascript].contentType = #application/javascript
