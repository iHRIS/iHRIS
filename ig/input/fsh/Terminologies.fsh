CodeSystem: LocationStatus
Id: location-status
Title: "LocationStatus"
Description: "Indicates whether the location is still in use."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:14:24.960+03:00"
* ^meta.source = "#ofZ1t0pi6T7bA09X"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #trial-use
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 3
* ^url = "http://hl7.org/fhir/location-status"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.333"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/location-status"
* ^content = #complete
* #active "Active" "The location is operational."
* #suspended "Suspended" "The location is temporarily closed."
* #inactive "Inactive" "The location is no longer used."

ValueSet: LocationStatus
Id: location-status
Title: "LocationStatus"
Description: "Indicates whether the location is still in use."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:20.033+03:00"
* ^meta.source = "#alIIEQ5ESFa7oKuH"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #trial-use
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 3
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.332"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system LocationStatus

CodeSystem: LocationMode
Id: location-mode
Title: "LocationMode"
Description: "Indicates whether a resource instance represents a specific location or a class of locations."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:14:58.239+03:00"
* ^meta.source = "#ihvEM8PHESUikG5b"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #trial-use
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 3
* ^url = "http://hl7.org/fhir/location-mode"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.331"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/location-mode"
* ^content = #complete
* #instance "Instance" "The Location resource represents a specific instance of a location (e.g. Operating Theatre 1A)."
* #kind "Kind" "The Location represents a class of locations (e.g. Any Operating Theatre) although this class of locations could be constrained within a specific boundary (such as organization, or parent location, address etc.)."

ValueSet: LocationMode
Id: location-mode
Title: "LocationMode"
Description: "Indicates whether a resource instance represents a specific location or a class of locations."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:20.712+03:00"
* ^meta.source = "#xpbEBuBlirqG49PD"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #trial-use
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 3
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.330"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system LocationMode

Alias: $v3-RoleCode = http://terminology.hl7.org/CodeSystem/v3-RoleCode

ValueSet: V3_ServiceDeliveryLocationRoleType
Id: v3-ServiceDeliveryLocationRoleType
Title: "V3 Value SetServiceDeliveryLocationRoleType"
Description: " A role of a place that further classifies the setting (e.g., accident site, road side, work site, community location) in which services are delivered."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:16:12.009+03:00"
* ^meta.source = "#MRfemLMQj06Qpx2q"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #trial-use
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 3
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^url = "http://terminology.hl7.org/ValueSet/v3-ServiceDeliveryLocationRoleType"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.1.11.17660"
* ^version = "2014-03-26"
* ^status = #active
* ^experimental = false
* ^publisher = "HL7 v3"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://www.hl7.org"
* ^immutable = false
* include codes from system $v3-RoleCode where concept is-a #_ServiceDeliveryLocationRoleType
* exclude $v3-RoleCode#_ServiceDeliveryLocationRoleType

CodeSystem: ContactPointSystem
Id: contact-point-system
Title: "ContactPointSystem"
Description: "Telecommunications form for contact point."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:14:31.763+03:00"
* ^meta.source = "#OYYfgAEe5Uwd9zzw"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^url = "http://hl7.org/fhir/contact-point-system"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.72"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/contact-point-system"
* ^content = #complete
* #phone "Phone" "The value is a telephone number used for voice calls. Use of full international numbers starting with + is recommended to enable automatic dialing support but not required."
* #fax "Fax" "The value is a fax machine. Use of full international numbers starting with + is recommended to enable automatic dialing support but not required."
* #email "Email" "The value is an email address."
* #pager "Pager" "The value is a pager number. These may be local pager numbers that are only usable on a particular pager system."
* #url "URL" "A contact that is not a phone, fax, pager or email address and is expressed as a URL.  This is intended for various institutional or personal contacts including web sites, blogs, Skype, Twitter, Facebook, etc. Do not use for email addresses."
* #sms "SMS" "A contact that can be used for sending an sms message (e.g. mobile phones, some landlines)."
* #other "Other" "A contact that is not a phone, fax, page or email address and is not expressible as a URL.  E.g. Internal mail address.  This SHOULD NOT be used for contacts that are expressible as a URL (e.g. Skype, Twitter, Facebook, etc.)  Extensions may be used to distinguish \"other\" contact types."

ValueSet: ContactPointSystem
Id: contact-point-system
Title: "ContactPointSystem"
Description: "Telecommunications form for contact point."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:39.582+03:00"
* ^meta.source = "#9iRLytdDDmve46XQ"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.71"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system ContactPointSystem

CodeSystem: ContactPointUse
Id: contact-point-use
Title: "ContactPointUse"
Description: "Use of contact point."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:11.176+03:00"
* ^meta.source = "#jXMHyNVcUayicVHs"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^url = "http://hl7.org/fhir/contact-point-use"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.74"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/contact-point-use"
* ^content = #complete
* #home "Home" "A communication contact point at a home; attempted contacts for business purposes might intrude privacy and chances are one will contact family or other household members instead of the person one wishes to call. Typically used with urgent cases, or if no other contacts are available."
* #work "Work" "An office contact point. First choice for business related contacts during business hours."
* #temp "Temp" "A temporary contact point. The period can provide more detailed information."
* #old "Old" "This contact point is no longer in use (or was never correct, but retained for records)."
* #mobile "Mobile" "A telecommunication device that moves and stays with its owner. May have characteristics of all other use codes, suitable for urgent matters, not the first choice for routine business."

ValueSet: ContactPointUse
Id: contact-point-use
Title: "ContactPointUse"
Description: "Use of contact point."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:16:01.476+03:00"
* ^meta.source = "#2RubxHWVCzYRyOk4"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.73"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system ContactPointUse

CodeSystem: AddressUse
Id: address-use
Title: "AddressUse"
Description: "The use of an address."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:14:19.131+03:00"
* ^meta.source = "#p6zFoi9Jny2q0yPE"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^url = "http://hl7.org/fhir/address-use"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.68"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/address-use"
* ^content = #complete
* #home "Home" "A communication address at a home."
* #work "Work" "An office address. First choice for business related contacts during business hours."
* #temp "Temporary" "A temporary address. The period can provide more detailed information."
* #old "Old / Incorrect" "This address is no longer in use (or was never correct but retained for records)."
* #billing "Billing" "An address to be used to send bills, invoices, receipts etc."

ValueSet: AddressUse
Id: address-use
Title: "AddressUse"
Description: "The use of an address."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:16:04.857+03:00"
* ^meta.source = "#ucaERMlfEkIRJbHY"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.67"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system AddressUse

CodeSystem: AddressType
Id: address-type
Title: "AddressType"
Description: "The type of an address (physical / postal)."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:14:38.526+03:00"
* ^meta.source = "#wbAXcC4IHcxqM3qA"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^url = "http://hl7.org/fhir/address-type"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.70"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/address-type"
* ^content = #complete
* #postal "Postal" "Mailing addresses - PO Boxes and care-of addresses."
* #physical "Physical" "A physical address that can be visited."
* #both "Postal & Physical" "An address that is both physical and postal."

ValueSet: AddressType
Id: address-type
Title: "AddressType"
Description: "The type of an address (physical / postal)."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:46.062+03:00"
* ^meta.source = "#bHhtF5WHjDDRAvI7"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.69"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system AddressType

CodeSystem: LocationType
Id: location-physical-type
Title: "Location type"
Description: "This example value set defines a set of codes that can be used to indicate the physical form of the Location."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:14:20.522+03:00"
* ^meta.source = "#gVSzyaw7vrYD2zWC"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablecodesystem"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^url = "http://terminology.hl7.org/CodeSystem/location-physical-type"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.1108"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^publisher = "FHIR Project team"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/location-physical-type"
* ^content = #complete
* #si "Site" "A collection of buildings or other locations such as a site or a campus."
* #bu "Building" "Any Building or structure. This may contain rooms, corridors, wings, etc. It might not have walls, or a roof, but is considered a defined/allocated space."
* #wi "Wing" "A Wing within a Building, this often contains levels, rooms and corridors."
* #wa "Ward" "A Ward is a section of a medical facility that may contain rooms and other types of location."
* #lvl "Level" "A Level in a multi-level Building/Structure."
* #co "Corridor" "Any corridor within a Building, that may connect rooms."
* #ro "Room" "A space that is allocated as a room, it may have walls/roof etc., but does not require these."
* #bd "Bed" "A space that is allocated for sleeping/laying on. This is not the physical bed/trolley that may be moved about, but the space it may occupy."
* #ve "Vehicle" "A means of transportation."
* #ho "House" "A residential dwelling. Usually used to reference a location that a person/patient may reside."
* #ca "Cabinet" "A container that can store goods, equipment, medications or other items."
* #rd "Road" "A defined path to travel between 2 points that has a known name."
* #area "Area" "A defined physical boundary of something, such as a flood risk zone, region, postcode"
* #jdn "Jurisdiction" "A wide scope that covers a conceptual domain, such as a Nation (Country wide community or Federal Government - e.g. Ministry of Health),  Province or State (community or Government), Business (throughout the enterprise), Nation with a business scope of an agency (e.g. CDC, FDA etc.) or a Business segment (UK Pharmacy), not just an physical boundary"

ValueSet: LocationType
Id: location-physical-type
Title: "Location type"
Description: "This example value set defines a set of codes that can be used to indicate the physical form of the Location."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:49.943+03:00"
* ^meta.source = "#8P8ff87VcceXv5a0"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.328"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "FHIR Project team"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* ^immutable = true
* include codes from system LocationType

CodeSystem: DaysOfWeek
Id: days-of-week
Title: "DaysOfWeek"
Description: "The days of the week."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:04.757+03:00"
* ^meta.source = "#05cbULabyly6Sdiw"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^url = "http://hl7.org/fhir/days-of-week"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.513"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/days-of-week"
* ^content = #complete
* #mon "Monday" "Monday."
* #tue "Tuesday" "Tuesday."
* #wed "Wednesday" "Wednesday."
* #thu "Thursday" "Thursday."
* #fri "Friday" "Friday."
* #sat "Saturday" "Saturday."
* #sun "Sunday" "Sunday."

ValueSet: DaysOfWeek
Id: days-of-week
Title: "DaysOfWeek"
Description: "The days of the week."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:34.050+03:00"
* ^meta.source = "#CXlBXmcSsOgfpWPv"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.512"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system DaysOfWeek

CodeSystem: IdentifierUse
Id: identifier-use
Title: "IdentifierUse"
Description: "Identifies the purpose for this identifier, if known ."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:14:40.194+03:00"
* ^meta.source = "#MwLVKPjy1CijmhDQ"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^url = "http://hl7.org/fhir/identifier-use"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.58"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/identifier-use"
* ^content = #complete
* #usual "Usual" "The identifier recommended for display and use in real-world interactions."
* #official "Official" "The identifier considered to be most trusted for the identification of this item. Sometimes also known as \"primary\" and \"main\". The determination of \"official\" is subjective and implementation guides often provide additional guidelines for use."
* #temp "Temp" "A temporary identifier."
* #secondary "Secondary" "An identifier that was assigned in secondary use - it serves to identify the object in a relative context, but cannot be consistently assigned to the same object again in a different context."
* #old "Old" "The identifier id no longer considered valid, but may be relevant for search purposes.  E.g. Changes to identifier schemes, account merges, etc."

ValueSet: IdentifierUse
Id: identifier-use
Title: "IdentifierUse"
Description: "Identifies the purpose for this identifier, if known ."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:20.167+03:00"
* ^meta.source = "#U0TzXC5mCBPohj72"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.57"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system IdentifierUse

Alias: $v2-0203 = http://terminology.hl7.org/CodeSystem/v2-0203

ValueSet: IdentifierType
Id: identifier-type
Title: "IdentifierType"
Description: "A coded type for an identifier that can be used to determine which identifier to use for a specific purpose."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:53.644+03:00"
* ^meta.source = "#dUQ1w25GGaF7BmRG"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/valueset-warning"
* ^extension[=].valueMarkdown = "Types are for general categories of identifiers. See [the identifier registry](identifier-registry.html) for a list of common identifier systems"
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #vocab
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.45"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* $v2-0203#DL
* $v2-0203#PPN
* $v2-0203#BRN
* $v2-0203#MR
* $v2-0203#MCN
* $v2-0203#EN
* $v2-0203#TAX
* $v2-0203#NIIP
* $v2-0203#PRN
* $v2-0203#MD
* $v2-0203#DR
* $v2-0203#ACSN
* $v2-0203#UDI
* $v2-0203#SNO
* $v2-0203#SB
* $v2-0203#PLAC
* $v2-0203#FILL
* $v2-0203#JHN

CodeSystem: OrganizationType
Id: organization-type
Title: "Organization type"
Description: "This example value set defines a set of codes that can be used to indicate a type of organization."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:14:57.505+03:00"
* ^meta.source = "#p4w49vQd1ZBWk4fI"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablecodesystem"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^url = "http://terminology.hl7.org/CodeSystem/organization-type"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.1128"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^publisher = "FHIR Project team"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/organization-type"
* ^content = #complete
* #prov "Healthcare Provider" "An organization that provides healthcare services."
* #dept "Hospital Department" "A department or ward within a hospital (Generally is not applicable to top level organizations)"
* #team "Organizational team" "An organizational team is usually a grouping of practitioners that perform a specific function within an organization (which could be a top level organization, or a department)."
* #govt "Government" "A political body, often used when including organization records for government bodies such as a Federal Government, State or Local Government."
* #ins "Insurance Company" "A company that provides insurance to its subscribers that may include healthcare related policies."
* #pay "Payer" "A company, charity, or governmental organization, which processes claims and/or issues payments to providers on behalf of patients or groups of patients."
* #edu "Educational Institute" "An educational institution that provides education or research facilities."
* #reli "Religious Institution" "An organization that is identified as a part of a religious institution."
* #crs "Clinical Research Sponsor" "An organization that is identified as a Pharmaceutical/Clinical Research Sponsor."
* #cg "Community Group" "An un-incorporated community group."
* #bus "Non-Healthcare Business or Corporation" "An organization that is a registered business or corporation but not identified by other types."
* #other "Other" "Other type of organization not already specified."

ValueSet: OrganizationType
Id: organization-type
Title: "Organization type"
Description: "This example value set defines a set of codes that can be used to indicate a type of organization."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:55.027+03:00"
* ^meta.source = "#dezHevrFSt6FSwo3"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.414"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "FHIR Project team"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* ^immutable = true
* include codes from system OrganizationType

ValueSet: ContactEntityType
Id: contactentity-type
Title: "Contact entity type"
Description: "This example value set defines a set of codes that can be used to indicate the purpose for which you would contact a contact party."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:19.047+03:00"
* ^meta.source = "#eHG5BtkmJ0r62Snc"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #trial-use
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 3
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.416"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "FHIR Project team"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* ^immutable = true
* include codes from system ContactEntityType

CodeSystem: ContactEntityType
Id: contactentity-type
Title: "Contact entity type"
Description: "This example value set defines a set of codes that can be used to indicate the purpose for which you would contact a contact party."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:12.032+03:00"
* ^meta.source = "#1TzaqZMbfamefRi3"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablecodesystem"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #trial-use
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 3
* ^url = "http://terminology.hl7.org/CodeSystem/contactentity-type"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.1129"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^publisher = "FHIR Project team"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/contactentity-type"
* ^content = #complete
* #BILL "Billing" "Contact details for information regarding to billing/general finance enquiries."
* #ADMIN "Administrative" "Contact details for administrative enquiries."
* #HR "Human Resource" "Contact details for issues related to Human Resources, such as staff matters, OH&S etc."
* #PAYOR "Payor" "Contact details for dealing with issues related to insurance claims/adjudication/payment."
* #PATINF "Patient" "Generic information contact for patients."
* #PRESS "Press" "Dedicated contact point for matters relating to press enquiries."

CodeSystem: ServiceCategory
Id: service-category
Title: "Service category"
Description: "This value set defines an example set of codes that can be used to classify groupings of service-types/specialties."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:14:09.156+03:00"
* ^meta.source = "#59YPjXFV70pbLKzb"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablecodesystem"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^url = "http://terminology.hl7.org/CodeSystem/service-category"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.1144"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^publisher = "FHIR Project team"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/service-category"
* ^content = #example
* #1 "Adoption" "Adoption"
* #2 "Aged Care" "Aged Care"
* #34 "Allied Health" "Allied Health"
* #3 "Alternative/Complementary Therapies" "Alternative & Complementary Therapies"
* #4 "Child Care /Kindergarten" "Child Care and/or Kindergarten"
* #5 "Child Development" "Child Development"
* #6 "Child Protection & Family Services" "Child Protection & Family Services"
* #7 "Community Health Care" "Community Health Care"
* #8 "Counselling" "Counselling"
* #36 "Crisis Line (GPAH use only)" "Crisis Line (GPAH use only)"
* #9 "Death Services" "Death Services"
* #10 "Dental" "Dental"
* #11 "Disability Support" "Disability Support"
* #12 "Drug/Alcohol" "Drug/Alcohol"
* #13 "Education & Learning" "Education & Learning"
* #14 "Emergency Department" "Emergency Department"
* #15 "Employment" "Employment"
* #16 "Financial & Material Aid" "Financial & Material aid"
* #17 "General Practice" "General Practice/GP (doctor)"
* #35 "Hospital" "Hospital"
* #18 "Housing/Homelessness" "Housing/Homelessness"
* #19 "Interpreting" "Interpreting"
* #20 "Justice" "Justice"
* #21 "Legal" "Legal"
* #22 "Mental Health" "Mental Health"
* #38 "NDIA" "NDIA"
* #23 "Physical Activity & Recreation" "Physical Activity & Recreation"
* #24 "Regulation" "Regulation"
* #25 "Respite/Carer Support" "Respite/Carer Support"
* #26 "Specialist Clinical Pathology" "Specialist Clinical Pathology - requires referral"
* #27 "Specialist Medical" "Specialist Medical - requires referral"
* #28 "Specialist Obstetrics & Gynecology" "Specialist Obstetrics & Gynecology - requires referral"
* #29 "Specialist Paediatric" "Specialist Paediatric - requires referral"
* #30 "Specialist Radiology/Imaging" "Specialist Radiology/Imaging - requires referral"
* #31 "Specialist Surgical" "Specialist Surgical - requires referral"
* #32 "Support Group/s" "Support group/s"
* #37 "Test Message (HSD admin)" "Test Message (HSD admin use only)"
* #33 "Transport" "Transport"

ValueSet: ServiceCategory
Id: service-category
Title: "Service category"
Description: "This value set defines an example set of codes that can be used to classify groupings of service-types/specialties."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:21.599+03:00"
* ^meta.source = "#RtDutPC6pl7y2ZEp"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.516"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "FHIR Project team"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* ^immutable = true
* include codes from system ServiceCategory

CodeSystem: ServiceType
Id: service-type
Title: "Service type"
Description: "This value set defines an example set of codes of service-types."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:14:01.881+03:00"
* ^meta.source = "#Uf5s6bOIvW2qRaSD"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablecodesystem"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^url = "http://terminology.hl7.org/CodeSystem/service-type"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.1145"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^publisher = "FHIR Project team"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/service-type"
* ^content = #example
* #1 "Adoption/Permanent Care Info/Support" "Adoption & permanent care information/support"
* #2 "Aged Care Assessment" "Aged care assessment"
* #3 "Aged Care Information/Referral" "Aged Care information/referral"
* #4 "Aged Residential Care" "Aged Residential Care"
* #5 "Case Management for Older Persons" "Case management for older persons"
* #6 "Delivered Meals (Meals On Wheels)" "Delivered meals (meals on wheels)"
* #7 "Friendly Visiting" "Friendly visiting"
* #8 "Home Care/Housekeeping Assistance" "Home care/housekeeping assistance"
* #9 "Home Maintenance and Repair" "Home maintenance and repair"
* #10 "Personal Alarms/Alerts" "Personal alarms/alerts"
* #11 "Personal Care for Older Persons" "Personal care for older persons"
* #12 "Planned Activity Groups" "Planned activity groups"
* #13 "Acupuncture" "Acupuncture"
* #14 "Alexander Technique Therapy" "Alexander technique therapy"
* #15 "Aromatherapy" "Aromatherapy"
* #16 "Biorhythm Services" "Biorhythm services"
* #17 "Bowen Therapy" "Bowen therapy"
* #18 "Chinese Herbal Medicine" "Chinese herbal medicine"
* #19 "Feldenkrais" "Feldenkrais"
* #20 "Homoeopathy" "Homoeopathy"
* #21 "Hydrotherapy" "Hydrotherapy"
* #22 "Hypnotherapy" "Hypnotherapy"
* #23 "Kinesiology" "Kinesiology"
* #24 "Magnetic Therapy" "Magnetic therapy"
* #25 "Massage Therapy" "Massage therapy"
* #26 "Meditation" "Meditation"
* #27 "Myotherapy" "Myotherapy"
* #28 "Naturopathy" "Naturopathy"
* #29 "Reflexology" "Reflexology"
* #30 "Reiki" "Reiki"
* #31 "Relaxation Therapy" "Relaxation therapy"
* #32 "Shiatsu" "Shiatsu"
* #33 "Western Herbal Medicine" "Western herbal medicine"
* #34 "Family Day care" "Family day care"
* #35 "Holiday Programs" "Holiday programs"
* #36 "Kindergarten Inclusion Support " "Kindergarten inclusion support for children with a disability"
* #37 "Kindergarten/Preschool" "Kindergarten/preschool"
* #38 "Long Day Child Care" "Long day child care"
* #39 "Occasional Child Care" "Occasional child care"
* #40 "Outside School Hours Care" "Outside school hours care"
* #41 "Children's Play Programs" "Children's play programs"
* #42 "Parenting/Family Support/Education" "Parenting & family management support/education"
* #43 "Playgroup" "Playgroup"
* #44 "School Nursing" "School nursing"
* #45 "Toy Library" "Toy library"
* #46 "Child Protection/Child Abuse Report" "Child protection/child abuse report"
* #47 "Foster Care" "Foster care"
* #48 "Residential/Out-of-Home Care" "Residential/ out of home care"
* #49 "Support - Young People Leaving Care" "Support for young people leaving care"
* #50 "Audiology" "Audiology"
* #51 "Blood Donation" "Blood donation"
* #52 "Chiropractic" "Chiropractic"
* #53 "Dietetics" "Dietetics"
* #54 "Family Planning" "Family planning"
* #55 "Health Advocacy/Liaison Service" "Health advocacy/Liaison service"
* #56 "Health Information/Referral" "Health information/referral"
* #57 "Immunization" "Immunization"
* #58 "Maternal & Child Health" "Maternal & child health"
* #59 "Nursing" "Nursing"
* #60 "Nutrition" "Nutrition"
* #61 "Occupational Therapy" "Occupational therapy"
* #62 "Optometry" "Optometry"
* #63 "Osteopathy" "Osteopathy"
* #64 "Pharmacy" "Pharmacy"
* #65 "Physiotherapy" "Physiotherapy"
* #66 "Podiatry" "Podiatry"
* #67 "Sexual Health" "Sexual health"
* #68 "Speech Pathology/Therapy" "Speech pathology/therapy"
* #69 "Bereavement Counselling" "Bereavement counselling"
* #70 "Crisis Counselling" "Crisis counselling"
* #71 "Family Counselling/Therapy" "Family counselling and/or family therapy"
* #72 "Family Violence Counselling" "Family violence counselling"
* #73 "Financial Counselling" "Financial counselling"
* #74 "Generalist Counselling" "Generalist counselling"
* #75 "Genetic Counselling" "Genetic counselling"
* #76 "Health Counselling" "Health counselling"
* #77 "Mediation" "Mediation"
* #78 "Problem Gambling Counselling" "Problem gambling counselling"
* #79 "Relationship Counselling" "Relationship counselling"
* #80 "Sexual Assault Counselling" "Sexual assault counselling"
* #81 "Trauma Counselling" "Trauma counselling"
* #82 "Victims of Crime Counselling" "Victims of crime counselling"
* #83 "Cemetery Operation" "Cemetery operation"
* #84 "Cremation" "Cremation"
* #85 "Death Service Information" "Death service information"
* #86 "Funeral Services" "Funeral services"
* #87 "Endodontic" "Endodontic"
* #88 "General Dental" "General dental"
* #89 "Oral Medicine" "Oral medicine"
* #90 "Oral Surgery" "Oral surgery"
* #91 "Orthodontic" "Orthodontic"
* #92 "Paediatric Dentistry" "Paediatric Dentistry"
* #93 "Periodontic" "Periodontic"
* #94 "Prosthodontic" "Prosthodontic"
* #95 "Acquired Brain Injury Info/Referral" "Acquired brain injury information/referral"
* #96 "Disability Advocacy" "Disability advocacy"
* #97 "Disability Aids & Equipment" "Disability aids & equipment"
* #98 "Disability Case Management" "Disability case management"
* #99 "Disability Day Programs/Activities" "Disability day programs & activities"
* #100 "Disability Information/Referral" "Disability information/referral"
* #101 "Disability Support Packages" "Disability support packages"
* #102 "Disability Supported Accommodation" "Disability supported accommodation"
* #103 "Early Childhood Intervention" "Early childhood intervention"
* #104 "Hearing Aids & Equipment" "Hearing aids & equipment"
* #105 "Drug and/or Alcohol Counselling" "Drug and/or alcohol counselling"
* #106 "Drug/Alcohol Information/Referral" "Drug and/or alcohol information/referral"
* #107 "Needle & Syringe Exchange" "Needle & Syringe exchange"
* #108 "Non-resid. Alcohol/Drug Treatment " "Non-residential alcohol and/or drug dependence treatment"
* #109 "Pharmacotherapy" "Pharmacotherapy (eg. methadone) program"
* #110 "Quit Program" "Quit program"
* #111 "Residential Alcohol/Drug Treatment " "Residential alcohol and/or drug dependence treatment"
* #112 "Adult/Community Education" "Adult/community education"
* #113 "Higher Education" "Higher education"
* #114 "Primary Education" "Primary education"
* #115 "Secondary Education" "Secondary education"
* #116 "Training & Vocational Education" "Training & vocational education"
* #117 "Emergency Medical" "Emergency medical"
* #118 "Employment Placement and/or Support" "Employment placement and/or support"
* #119 "Vocational Rehabilitation" "Vocational Rehabilitation"
* #120 "Work Safety/Accident Prevention" "Workplace safety and/or accident prevention"
* #121 "Financial Assistance" "Financial assistance"
* #122 "Financial Information/Advice" "Financial information/advice"
* #123 "Material Aid" "Material aid"
* #124 "General Practice" "General Practice/GP (doctor)"
* #125 "Accommodation Placement/Support" "Accommodation placement and/or support"
* #126 "Crisis/Emergency Accommodation" "Crisis/emergency accommodation"
* #127 "Homelessness Support" "Homelessness support"
* #128 "Housing Information/Referral" "Housing information/referral"
* #129 "Public Rental Housing" "Public rental housing"
* #130 "Interpreting/Multilingual Service" "Interpreting/Multilingual/Language service"
* #131 "Juvenile Justice" "Juvenile Justice"
* #132 "Legal Advocacy" "Legal advocacy"
* #133 "Legal Information/Advice/Referral" "Legal information/advice/referral"
* #134 "Mental Health Advocacy" "Mental health advocacy"
* #135 "Mental Health Assess/Triage/Crisis Response" "Mental health assessment/triage/crisis response"
* #136 "Mental Health Case Management" "Mental health case management/continuing care"
* #137 "Mental Health Information/Referral" "Mental health information/referral"
* #138 "Mental Health Inpatient Services" "Mental health inpatient services (hospital psychiatric unit) - requires referral"
* #139 "Mental Health Non-residential Rehab" "Mental health non-residential rehabilitation"
* #140 "Mental Health Residential Rehab/CCU" "Mental health residential rehabilitation/community care unit"
* #141 "Psychiatry (Requires Referral)" "Psychiatry (requires referral)"
* #142 "Psychology" "Psychology"
* #143 "Martial Arts" "Martial arts"
* #144 "Personal Fitness Training" "Personal fitness training"
* #145 "Physical Activity Group" "Physical activity group"
* #146 "Physical Activity Programs" "Physical activity programs"
* #147 "Physical Fitness Testing" "Physical fitness testing"
* #148 "Pilates" "Pilates"
* #149 "Self-Defence" "Self defence"
* #150 "Sporting Club" "Sporting club"
* #151 "Yoga" "Yoga"
* #152 "Food Safety" "Food safety"
* #153 "Health Regulatory /Inspection /Cert." "Health regulatory, inspection and/or certification"
* #154 "Work Health/Safety Inspection/Cert." "Workplace health and/or safety inspection and/or certification"
* #155 "Carer Support" "Carer support"
* #156 "Respite Care" "Respite care"
* #157 "Anatomical Pathology " "Anatomical Pathology (including Cytopathology & Forensic Pathology)"
* #158 "Pathology - Clinical Chemistry" "Pathology - Clinical Chemistry"
* #159 "Pathology - General" "Pathology - General"
* #160 "Pathology - Genetics" "Pathology - Genetics"
* #161 "Pathology - Haematology" "Pathology - Haematology"
* #162 "Pathology - Immunology" "Pathology - Immunology"
* #163 "Pathology - Microbiology" "Pathology - Microbiology"
* #164 "Anaesthesiology - Pain Medicine" "Anaesthesiology - Pain Medicine"
* #165 "Cardiology" "Cardiology"
* #166 "Clinical Genetics" "Clinical Genetics"
* #167 "Clinical Pharmacology" "Clinical Pharmacology"
* #168 "Dermatology" "Dermatology"
* #169 "Endocrinology" "Endocrinology"
* #170 "Gastroenterology & Hepatology" "Gastroenterology & Hepatology"
* #171 "Geriatric Medicine" "Geriatric medicine"
* #172 "Immunology & Allergy" "Immunology & Allergy"
* #173 "Infectious Diseases" "Infectious diseases"
* #174 "Intensive Care Medicine" "Intensive care medicine"
* #175 "Medical Oncology" "Medical Oncology"
* #176 "Nephrology" "Nephrology"
* #177 "Neurology" "Neurology"
* #178 "Occupational Medicine" "Occupational Medicine"
* #179 "Palliative Medicine" "Palliative Medicine"
* #180 "Public Health Medicine" "Public Health Medicine"
* #181 "Rehabilitation Medicine" "Rehabilitation Medicine"
* #182 "Rheumatology" "Rheumatology"
* #183 "Sleep Medicine" "Sleep Medicine"
* #184 "Thoracic Medicine" "Thoracic medicine"
* #185 "Gynaecological Oncology" "Gynaecological Oncology"
* #186 "Obstetrics & Gynaecology" "Obstetrics & Gynaecology"
* #187 "Reproductive Endocrinology/Infertility" "Reproductive Endocrinology & Infertility"
* #188 "Urogynaecology" "Urogynaecology"
* #189 "Neonatology & Perinatology" "Neonatology & Perinatology"
* #190 "Paediatric Cardiology" "Paediatric Cardiology"
* #191 "Paediatric Clinical Genetics" "Paediatric Clinical Genetics"
* #192 "Paediatric Clinical Pharmacology" "Paediatric Clinical Pharmacology"
* #193 "Paediatric Endocrinology" "Paediatric Endocrinology"
* #194 "Paed. Gastroenterology/Hepatology" "Paediatric Gastroenterology & Hepatology"
* #195 "Paediatric Haematology" "Paediatric Haematology"
* #196 "Paediatric Immunology & Allergy" "Paediatric Immunology & Allergy"
* #197 "Paediatric Infectious Diseases" "Paediatric Infectious diseases"
* #198 "Paediatric Intensive Care Medicine" "Paediatric intensive care medicine"
* #199 "Paediatric Medical Oncology" "Paediatric Medical Oncology"
* #200 "Paediatric Medicine" "Paediatric Medicine"
* #201 "Paediatric Nephrology" "Paediatric Nephrology"
* #202 "Paediatric Neurology" "Paediatric Neurology"
* #203 "Paediatric Nuclear Medicine" "Paediatric Nuclear Medicine"
* #204 "Paediatric Rehabilitation Medicine" "Paediatric Rehabilitation Medicine"
* #205 "Paediatric Rheumatology" "Paediatric Rheumatology"
* #206 "Paediatric Sleep Medicine" "Paediatric Sleep Medicine"
* #207 "Paediatric Surgery" "Paediatric Surgery"
* #208 "Paediatric Thoracic Medicine" "Paediatric Thoracic Medicine"
* #209 "Diag. Radiology /Xray /CT /Fluoroscopy" "Diagnostic Radiology/Xray/CT/Fluoroscopy"
* #210 "Diagnostic Ultrasound" "Diagnostic Ultrasound"
* #211 "Magnetic Resonance Imaging (MRI)" "Magnetic Resonance Imaging (MRI)"
* #212 "Nuclear Medicine" "Nuclear Medicine"
* #213 "Obstetric/Gynaecological Ultrasound" "Obstetric & Gynaecological Ultrasound"
* #214 "Radiation Oncology" "Radiation oncology"
* #215 "Cardiothoracic Surgery" "Cardiothoracic surgery"
* #216 "Neurosurgery" "Neurosurgery"
* #217 "Ophthalmology" "Ophthalmology"
* #218 "Orthopaedic Surgery" "Orthopaedic surgery"
* #219 "Otolaryngology/Head & Neck Surgery" "Otolaryngology - Head & Neck Surgery"
* #220 "Plastic & Reconstructive Surgery" "Plastic & Reconstructive Surgery"
* #221 "Surgery - General" "Surgery - General"
* #222 "Urology" "Urology"
* #223 "Vascular Surgery" "Vascular surgery"
* #224 "Support Groups" "Support groups"
* #225 "Air ambulance" "Air ambulance"
* #226 "Ambulance" "Ambulance"
* #227 "Blood Transport" "Blood transport"
* #228 "Community Bus" "Community bus"
* #229 "Flying Doctor Service" "Flying doctor service"
* #230 "Patient Transport" "Patient transport"
* #231 "A&E" "A&E"
* #232 "A&EP" "A&EP"
* #233 "Abuse" "Abuse"
* #234 "ACAS" "ACAS"
* #235 "Access" "Access"
* #236 "Accident" "Accident"
* #237 "Acute Inpatient Serv" "Acute Inpatient Service's"
* #238 "Adult Day Programs" "Adult Day Programs"
* #239 "Adult Mental Health Services" "Adult Mental Health Services"
* #240 "Advice" "Advice"
* #241 "Advocacy" "Advocacy"
* #242 "Aged Persons Mental " "Aged Persons Mental Health Residential Units"
* #243 "Aged Persons Mental " "Aged Persons Mental Health Services"
* #244 "Aged Persons Mental " "Aged Persons Mental Health Teams"
* #245 "Aids" "Aids"
* #246 "Al-Anon" "Al-Anon"
* #247 "Alcohol" "Alcohol"
* #248 "Al-Teen" "Al-Teen"
* #249 "Antenatal" "Antenatal"
* #250 "Anxiety" "Anxiety"
* #251 "Arthritis" "Arthritis"
* #252 "Assessment" "Assessment"
* #253 "Assistance" "Assistance"
* #254 "Asthma" "Asthma"
* #255 "ATSS" "ATSS"
* #256 "Attendant Care" "Attendant Care"
* #257 "Babies" "Babies"
* #258 "Bathroom Modificatio" "Bathroom Modification"
* #259 "Behavior" "Behavior"
* #260 "Behavior Interventi" "Behavior Intervention"
* #261 "Bereavement" "Bereavement"
* #262 "Bipolar" "Bipolar"
* #263 "Birth" "Birth"
* #264 "Birth Control" "Birth Control"
* #265 "Birthing Options" "Birthing Options"
* #266 "BIST" "BIST"
* #267 "Blood" "Blood"
* #268 "Bone" "Bone"
* #269 "Bowel" "Bowel"
* #270 "Brain" "Brain"
* #271 "Breast Feeding" "Breast Feeding"
* #272 "Breast Screen" "Breast Screen"
* #273 "Brokerage" "Brokerage"
* #274 "Cancer" "Cancer"
* #275 "Cancer Support" "Cancer Support"
* #276 "Cardiovascular Disea" "Cardiovascular Disease"
* #277 "Care Packages" "Care Packages"
* #278 "Carer" "Carer"
* #279 "Case Management" "Case Management"
* #280 "Casualty" "Casualty"
* #281 "Centrelink" "Centrelink"
* #282 "Chemists" "Chemists"
* #283 "Child And Adolescent" "Child And Adolescent Mental Health Services"
* #284 "Child Care" "Child Care"
* #285 "Child Services" "Child Services"
* #286 "Children" "Children"
* #287 "Children's Services" "Children's Services"
* #288 "Cholesterol" "Cholesterol"
* #289 "Clothing" "Clothing"
* #290 "Community Based Acco" "Community Based Accommodation"
* #291 "Community Care Unit" "Community Care Unit"
* #292 "Community Child And " "Community Child And Adolescent Mental Health Services"
* #293 "Community Health" "Community Health"
* #294 "Community Residentia" "Community Residential Unit"
* #295 "Community Transport" "Community Transport"
* #296 "Companion Visiting" "Companion Visiting"
* #297 "Companionship" "Companionship"
* #298 "Consumer Advice" "Consumer Advice"
* #299 "Consumer Issues" "Consumer Issues"
* #300 "Continuing Care Serv" "Continuing Care Services"
* #301 "Contraception Inform" "Contraception Information"
* #302 "Coordinating Bodies" "Coordinating Bodies"
* #303 "Correctional Service" "Correctional Services"
* #304 "Council Environmenta" "Council Environmental Health"
* #305 "Counselling" "Counselling"
* #306 "Criminal" "Criminal"
* #307 "Crises" "Crises"
* #308 "Crisis Assessment An" "Crisis Assessment And Treatment Services (Cats)"
* #309 "Crisis Assistance" "Crisis Assistance"
* #310 "Crisis Refuge" "Crisis Refuge"
* #311 "Day Program" "Day Program"
* #312 "Deaf" "Deaf"
* #313 "Dental Hygiene" "Dental Hygiene"
* #314 "Dentistry" "Dentistry"
* #315 "Dentures" "Dentures"
* #316 "Depression" "Depression"
* #317 "Detoxification" "Detoxification"
* #318 "Diabetes" "Diabetes"
* #319 "Diaphragm Fitting" "Diaphragm Fitting"
* #320 "Dieticians" "Dieticians"
* #321 "Disabled Parking" "Disabled Parking"
* #322 "District Nursing" "District Nursing"
* #323 "Divorce" "Divorce"
* #324 "Doctors" "Doctors"
* #325 "Drink-Drive" "Drink-Drive"
* #326 "Dual Diagnosis Servi" "Dual Diagnosis Services"
* #327 "Early Choice" "Early Choice"
* #328 "Eating Disorder" "Eating Disorder"
* #330 "Emergency Relief" "Emergency Relief"
* #331 "Employment And Train" "Employment And Training"
* #332 "Environment" "Environment"
* #333 "Equipment" "Equipment"
* #334 "Exercise" "Exercise"
* #335 "Facility" "Facility"
* #336 "Family Choice" "Family Choice"
* #337 "Family Law" "Family Law"
* #338 "Family Options" "Family Options"
* #339 "Family Services" "Family Services"
* #340 "FFYA" "FFYA"
* #341 "Financial Aid" "Financial Aid"
* #342 "Fitness" "Fitness"
* #343 "Flexible Care Packag" "Flexible Care Packages"
* #344 "Food" "Food"
* #345 "Food Vouchers" "Food Vouchers"
* #346 "Forensic Mental Heal" "Forensic Mental Health Services"
* #347 "Futures" "Futures"
* #348 "Futures For Young Ad" "Futures For Young Adults"
* #349 "General Practitioner" "General Practitioners"
* #350 "Grants" "Grants"
* #351 "Grief" "Grief"
* #352 "Grief Counselling" "Grief Counselling"
* #353 "HACC" "HACC"
* #354 "Heart Disease" "Heart Disease"
* #355 "Help" "Help"
* #356 "High Blood Pressure" "High Blood Pressure"
* #357 "Home Help" "Home Help"
* #358 "Home Nursing" "Home Nursing"
* #359 "Homefirst" "Homefirst"
* #360 "Hospice Care" "Hospice Care"
* #361 "Hospital Services" "Hospital Services"
* #362 "Hospital To Home" "Hospital To Home"
* #364 "Hostel" "Hostel"
* #365 "Hostel Accommodation" "Hostel Accommodation"
* #366 "Household Items" "Household Items"
* #367 "Hypertension" "Hypertension"
* #368 "Illness" "Illness"
* #369 "Independent Living" "Independent Living"
* #370 "Information" "Information"
* #371 "Injury" "Injury"
* #372 "Intake" "Intake"
* #373 "Intensive Mobile You" "Intensive Mobile Youth Outreach Services (Imyos)"
* #374 "Intervention" "Intervention"
* #375 "Job Searching" "Job Searching"
* #376 "Justice" "Justice"
* #377 "Leisure" "Leisure"
* #378 "Loans" "Loans"
* #379 "Low Income Earners" "Low Income Earners"
* #380 "Lung" "Lung"
* #381 "Making A Difference" "Making A Difference"
* #382 "Medical Services" "Medical Services"
* #383 "Medical Specialists" "Medical Specialists"
* #384 "Medication Administr" "Medication Administration"
* #385 "Menstrual Informatio" "Menstrual Information"
* #386 "Methadone" "Methadone"
* #387 "Mobile Support And T" "Mobile Support And Treatment Services (MSTS)"
* #388 "Motor Neurone" "Motor Neurone"
* #389 "Multiple Sclerosis" "Multiple Sclerosis"
* #390 "Neighbourhood House" "Neighbourhood House"
* #391 "Nursing Home" "Nursing Home"
* #392 "Nursing Mothers" "Nursing Mothers"
* #393 "Obesity" "Obesity"
* #394 "Occupational Health " "Occupational Health & Safety"
* #395 "Optometrist" "Optometrist"
* #396 "Oral Hygiene" "Oral Hygiene"
* #397 "Outpatients" "Outpatients"
* #398 "Outreach Service" "Outreach Service"
* #399 "PADP" "PADP"
* #400 "Pain" "Pain"
* #401 "Pap Smear" "Pap Smear"
* #402 "Parenting" "Parenting"
* #403 "Peak Organizations" "Peak Organizations"
* #404 "Personal Care" "Personal Care"
* #405 "Pharmacies" "Pharmacies"
* #406 "Phobias" "Phobias"
* #407 "Physical" "Physical"
* #408 "Physical Activity" "Physical Activity"
* #409 "Postnatal" "Postnatal"
* #410 "Pregnancy" "Pregnancy"
* #411 "Pregnancy Tests" "Pregnancy Tests"
* #412 "Preschool" "Preschool"
* #413 "Prescriptions" "Prescriptions"
* #414 "Primary Mental Healt" "Primary Mental Health And Early Intervention Teams"
* #415 "Property Maintenance" "Property Maintenance"
* #416 "Prostate" "Prostate"
* #417 "Psychiatric" "Psychiatric"
* #418 "Psychiatric Disabili" "Psychiatric Disability Support Services - Home-Based Outreach"
* #419 "Psychiatric Disabili" "Psychiatric Disability Support Services - Planned Respite"
* #420 "Psychiatric Disabili" "Psychiatric Disability Support Services - Residential Rehabilitation"
* #421 "Psychiatric Disabili" "Psychiatric Disability Support Services Home-Based Outreach"
* #422 "Psychiatric Disabili" "Psychiatric Disability Support Services Mutual Support And Self Help"
* #423 "Psychiatric Support" "Psychiatric Support"
* #424 "Recreation" "Recreation"
* #425 "Referral" "Referral"
* #426 "Refuge" "Refuge"
* #427 "Rent Assistance" "Rent Assistance"
* #428 "Residential Faciliti" "Residential Facilities"
* #429 "Residential Respite" "Residential Respite"
* #430 "Respiratory" "Respiratory"
* #431 "Response" "Response"
* #432 "Rooming Houses" "Rooming Houses"
* #433 "Safe Sex" "Safe Sex"
* #434 "Secure Extended Care" "Secure Extended Care Inpatient Services"
* #435 "Self Help" "Self Help"
* #436 "Separation" "Separation"
* #437 "Services" "Services"
* #438 "Sex Education" "Sex Education"
* #439 "Sexual Abuse" "Sexual Abuse"
* #440 "Sexual Issues" "Sexual Issues"
* #441 "Sexually Transmitted" "Sexually Transmitted Diseases"
* #442 "SIDS" "SIDS"
* #443 "Social Support" "Social Support"
* #444 "Socialisation" "Socialisation"
* #445 "Special Needs" "Special Needs"
* #446 "Speech Therapist" "Speech Therapist"
* #447 "Splinting" "Splinting"
* #448 "Sport" "Sport"
* #449 "Statewide And Specia" "Statewide And Specialist Services"
* #450 "STD" "STD"
* #451 "STI" "STI"
* #452 "Stillbirth" "Stillbirth"
* #453 "Stomal Care" "Stomal Care"
* #454 "Stroke" "Stroke"
* #455 "Substance Abuse" "Substance Abuse"
* #456 "Support" "Support"
* #457 "Syringes" "Syringes"
* #458 "Teeth" "Teeth"
* #459 "Tenancy Advice" "Tenancy Advice"
* #460 "Terminal Illness" "Terminal Illness"
* #461 "Therapy" "Therapy"
* #462 "Transcription" "Transcription"
* #463 "Translating Services" "Translating Services"
* #464 "Translator" "Translator"
* #465 "Transport" "Transport"
* #466 "Vertebrae" "Vertebrae"
* #467 "Violence" "Violence"
* #468 "Vocational Guidance" "Vocational Guidance"
* #469 "Weight" "Weight"
* #470 "Welfare Assistance" "Welfare Assistance"
* #471 "Welfare Counselling" "Welfare Counselling"
* #472 "Wheelchairs" "Wheelchairs"
* #473 "Wound Management" "Wound Management"
* #474 "Young People At Risk" "Young People At Risk"
* #475 "Further Desc. - Community Health Care" "Further Description - Community Health Care"
* #476 "Library" "Library"
* #477 "Community Hours" "Community Hours"
* #478 "Further Desc. - Specialist Medical" "Further Description - Specialist Medical"
* #479 "Hepatology" "Hepatology"
* #480 "Gastroenterology " "Gastroenterology"
* #481 "Gynaecology" "Gynaecology"
* #482 "Obstetrics" "Obstetrics"
* #483 "Further Desc. - Specialist Surgical" "Further Description - Specialist Surgical"
* #484 "Placement Protection" "Placement Protection"
* #485 "Family Violence" "Family Violence"
* #486 "Integrated Family Services" "Integrated Family Services"
* #488 "Diabetes Educator" "Diabetes Educator"
* #489 "Kinship Care" "Kinship Care"
* #490 "General Mental Health Services" "General Mental Health Services"
* #491 "Exercise Physiology" "Exercise Physiology"
* #492 "Medical Research" "Medical Research"
* #493 "Youth" "Youth"
* #494 "Youth Services" "Youth Services"
* #495 "Youth Health" "Youth Health"
* #496 "Child and Family Ser" "Child and Family Services"
* #497 "Home Visits" "Home Visits"
* #498 "Mobile Services" "Mobile Services"
* #500 "Before and/or After " "Before and/or After School Care"
* #501 "Cancer Services" "Cancer Services"
* #502 "Integrated Cancer Se" "Integrated Cancer Services"
* #503 "Multidisciplinary Se" "Multidisciplinary Services"
* #504 "Multidisciplinary Ca" "Multidisciplinary Cancer Services"
* #505 "Meetings" "Meetings"
* #506 "Blood pressure monit" "Blood pressure monitoring"
* #507 "Dose administration " "Dose administration aid"
* #508 "Medical Equipment Hi" "Medical Equipment Hire"
* #509 "Parenting/Family Support/Education" "Parenting & family support/education"
* #510 "Deputising Service" "Deputising Service"
* #513 "Cancer Support Groups" "Cancer Support Groups"
* #514 "Community Cancer Services" "Community Cancer Services"
* #530 "Disability Care Transport" "Disability Care Transport"
* #531 "Aged Care Transport" "Aged Care Transport"
* #532 "Diabetes Education s" "Diabetes Education service"
* #533 "Cardiac Rehabilitati" "Cardiac Rehabilitation Service "
* #534 "Young Adult Diabetes" "Young Adult Diabetes services (YADS)"
* #535 "Pulmonary Rehabilita" "Pulmonary Rehabilitation Service"
* #536 "Art therapy " "Art therapy"
* #537 "Medication Reviews" "Medication Reviews"
* #538 "Telephone Counselling" "Telephone Counselling"
* #539 "Telephone Help Line" "Telephone Help Line"
* #540 "Online Service" "Online Service"
* #541 "Crisis - Mental Health" "Crisis - Mental Health"
* #542 "Youth Crisis" "Youth Crisis"
* #543 "Sexual Assault" "Sexual Assault"
* #544 "GPAH Other" "GPAH Other"
* #545 "Paediatric Dermatology" "Paediatric Dermatology"
* #546 "Veterans Services" "Veterans Services"
* #547 "Veterans" "Veterans"
* #548 "Food Relief/Food/Meals" "Food Relief/food/meals"
* #550 "Dementia Care" "Dementia Care"
* #551 "Alzheimer" "Alzheimer"
* #552 "Drug and/or Alcohol Support Groups" "Drug and/or alcohol support groups"
* #553 "1-on-1 Support /Mentoring /Coaching" "One on One Support/Mentoring/Coaching"
* #554 "Chronic Disease Management" "Chronic Disease Management"
* #555 "Liaison Services" "Liaison Services"
* #556 "Walk-in Centre /Non-Emergency" "Walk in Centre / non emergency"
* #557 "Inpatients" "Inpatients"
* #558 "Spiritual Counselling" "Spiritual Counselling"
* #559 "Women's Health" "Women's Health"
* #560 "Men's Health" "Men's Health"
* #561 "Health Education/Awareness Program" "Health education/Health awareness program"
* #562 "Test Message" "Test Message"
* #563 "Remedial Massage" "Remedial Massage"
* #564 "Adolescent Mental Health Services" "Adolescent Mental Health Services"
* #565 "Youth Drop In/Assistance/Support" "Youth drop in/assistance/support"
* #566 "Aboriginal Health Worker" "Aboriginal Health Worker"
* #567 "Women's Health Clinic" "Women's Health Clinic"
* #568 "Men's Health Clinic" "Men's Health Clinic "
* #569 "Migrant Health Clinic" "Migrant Health Clinic"
* #570 "Refugee Health Clinic" "Refugee Health Clinic"
* #571 "Aboriginal Health Clinic" "Aboriginal Health Clinic"
* #572 "Nurse Practitioner Lead Clinic/s" "Nurse Practitioner lead Clinic/s"
* #573 "Nurse Lead Clinic/s" "Nurse lead Clinic/s"
* #574 "Culturally Tailored Support Groups" "Culturally tailored support groups"
* #575 "Culturally Tailored Health Promotion" "Culturally tailored health promotion"
* #576 "Rehabilitation" "Rehabilitation"
* #577 "Education Information/Referral" "Education information/referral"
* #580 "Social Work" "Social Work"
* #581 "Haematology" "Haematology"
* #582 "Maternity Shared Car" "Maternity Shared Care"
* #583 "Rehabilitation Servi" "Rehabilitation Service"
* #584 "Cranio-sacral Therapy" "Cranio-Sacral Therapy"
* #585 "Prosthetics & Orthotics" "Prosthetics & Orthotics"
* #589 "Home Medicine Review" "Home Medicine Review"
* #590 "GPAH - Medical" "GPAH - Medical"
* #591 "Music Therapy" "Music Therapy"
* #593 "Falls Prevention" "Falls Prevention"
* #599 "Accommodation/Tenancy" "Accommodation/Tenancy"
* #600 "Assess-Skill, Ability, Needs" "Assess-Skill, Ability, Needs"
* #601 "Assist Access/Maintain Employ" "Assist Access/Maintain Employ"
* #602 "Assist Prod-Pers Care/Safety" "Assist Prod-Pers Care/Safety"
* #603 "Assist-Integrate School/Ed" "Assist-Integrate School/Ed"
* #604 "Assist-Life Stage, Transition" "Assist-Life Stage, Transition"
* #605 "Assist-Personal Activities" "Assist-Personal Activities"
* #606 "Assist-Travel/Transport" "Assist-Travel/Transport"
* #607 "Assistive Equip-General Tasks" "Assistive Equip-General Tasks"
* #608 "Assistive Equip-Recreation" "Assistive Equip-Recreation"
* #609 "Assistive Prod-Household Task" "Assistive Prod-Household Task"
* #610 "Behavior Support" "Behavior Support"
* #611 "Comms & Info Equipment" "Comms & Info Equipment"
* #612 "Community Nursing Care" "Community Nursing Care"
* #613 "Daily Tasks/Shared Living" "Daily Tasks/Shared Living"
* #614 "Development-Life Skills" "Development-Life Skills"
* #615 "Early Childhood Supports" "Early Childhood Supports"
* #616 "Equipment Special Assess Setup" "Equipment Special Assess Setup"
* #617 "Hearing Equipment" "Hearing Equipment"
* #618 "Home Modification" "Home Modification"
* #619 "Household Tasks" "Household Tasks"
* #620 "Interpret/Translate" "Interpret/Translate"
* #621 "Other Innovative Supports" "Other Innovative Supports"
* #622 "Participate Community" "Participate Community"
* #623 "Personal Mobility Equipment" "Personal Mobility Equipment"
* #624 "Physical Wellbeing" "Physical Wellbeing"
* #625 "Plan Management" "Plan Management"
* #626 "Therapeutic Supports" "Therapeutic Supports"
* #627 "Training-Travel Independence" "Training-Travel Independence"
* #628 "Vehicle modifications" "Vehicle modifications"
* #629 "Vision Equipment" "Vision Equipment"

ValueSet: ServiceType
Id: service-type
Title: "Service type"
Description: "This value set defines an example set of codes of service-types."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:16:04.999+03:00"
* ^meta.source = "#VDP0aNoNfNM4F2TN"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.518"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "FHIR Project team"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org/fhir"
* ^immutable = true
* include codes from system ServiceType

CodeSystem: SNOMED_CT
Id: snomedct
Title: "SNOMED CT (all versions)"
Description: "SNOMED CT is the most comprehensive and precise clinical health terminology product in the world, owned and distributed around the world by The International Health Terminology Standards Development Organisation (IHTSDO)."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:13:52.270+03:00"
* ^meta.source = "#F3FREVVOnY6AuVZY"
* ^extension.url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension.valueCode = #fhir
* ^url = "http://snomed.info/sct"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.6.96"
* ^status = #active
* ^experimental = false
* ^publisher = "IHTSDO"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://ihtsdo.org"
* ^copyright = "© 2002-2016 International Health Terminology Standards Development Organisation (IHTSDO). All rights reserved. SNOMED CT®, was originally created by The College of American Pathologists. \"SNOMED\" and \"SNOMED CT\" are registered trademarks of the IHTSDO http://www.ihtsdo.org/snomed-ct/get-snomed-ct"
* ^caseSensitive = false
* ^hierarchyMeaning = #is-a
* ^compositional = true
* ^versionNeeded = false
* ^content = #not-present
* ^filter[0].code = #concept
* ^filter[=].description = "Filter that includes concepts based on their logical definition. e.g. [concept] [is-a] [x] - include all concepts with an is-a relationship to concept x, or [concept] [in] [x]- include all concepts in the reference set identified by concept x"
* ^filter[=].operator[0] = #is-a
* ^filter[=].operator[+] = #in
* ^filter[=].value = "A SNOMED CT code"
* ^filter[+].code = #expression
* ^filter[=].description = "The result of the filter is the result of executing the given SNOMED CT Expression Constraint"
* ^filter[=].operator = #=
* ^filter[=].value = "A SNOMED CT ECL expression (see http://snomed.org/ecl)"
* ^filter[+].code = #expressions
* ^filter[=].description = "Whether post-coordinated expressions are included in the value set"
* ^filter[=].operator = #=
* ^filter[=].value = "true or false"
* ^property[0].code = #inactive
* ^property[=].uri = "http://snomed.info/field/Concept.active"
* ^property[=].description = "Whether the code is active or not (defaults to false). Not the same as deprecated"
* ^property[=].type = #boolean
* ^property[+].code = #definitionStatusId
* ^property[=].uri = "http://snomed.info/field/Concept.definitionStatusId"
* ^property[=].description = "Either of the codes that are descendants of 900000000000444006"
* ^property[=].type = #code
* ^property[+].code = #parent
* ^property[=].uri = "http://.........?"
* ^property[=].description = "A SNOMED CT concept id that has the target of a direct is-a relationship from the concept"
* ^property[=].type = #code
* ^property[+].code = #child
* ^property[=].uri = "http://.........?"
* ^property[=].description = "A SNOMED CT concept id that has a direct is-a relationship to the concept"
* ^property[=].type = #code
* ^property[+].code = #moduleId
* ^property[=].uri = "http://snomed.info/field/Concept.moduleId"
* ^property[=].description = "The SNOMED CT concept id of the module that the concept belongs to."
* ^property[=].type = #code
* ^property[+].code = #normalForm
* ^property[=].uri = "http://.........?"
* ^property[=].description = "Generated Normal form expression for the provided code or expression, with terms"
* ^property[=].type = #string
* ^property[+].code = #normalFormTerse
* ^property[=].uri = "http://.........?"
* ^property[=].description = "Generated Normal form expression for the provided code or expression, conceptIds only"
* ^property[=].type = #string
* ^property[+].code = #"Due to"
* ^property[=].uri = "http://snomed.info/id/42752001"
* ^property[=].type = #code
* ^property[+].code = #"Associated with"
* ^property[=].uri = "http://snomed.info/id/47429007"
* ^property[=].type = #code
* ^property[+].code = #"Associated morphology"
* ^property[=].uri = "http://snomed.info/id/116676008"
* ^property[=].type = #code
* ^property[+].code = #"Has specimen"
* ^property[=].uri = "http://snomed.info/id/116686009"
* ^property[=].type = #code
* ^property[+].code = #"Specimen source morphology"
* ^property[=].uri = "http://snomed.info/id/118168003"
* ^property[=].type = #code
* ^property[+].code = #"Specimen source topography"
* ^property[=].uri = "http://snomed.info/id/118169006"
* ^property[=].type = #code
* ^property[+].code = #"Specimen source identity"
* ^property[=].uri = "http://snomed.info/id/118170007"
* ^property[=].type = #code
* ^property[+].code = #"Specimen procedure"
* ^property[=].uri = "http://snomed.info/id/118171006"
* ^property[=].type = #code
* ^property[+].code = #"Part of"
* ^property[=].uri = "http://snomed.info/id/123005000"
* ^property[=].type = #code
* ^property[+].code = #"Has active ingredient"
* ^property[=].uri = "http://snomed.info/id/127489000"
* ^property[=].type = #code
* ^property[+].code = #"Subject of information"
* ^property[=].uri = "http://snomed.info/id/131195008"
* ^property[=].type = #code
* ^property[+].code = #"Causative agent"
* ^property[=].uri = "http://snomed.info/id/246075003"
* ^property[=].type = #code
* ^property[+].code = #"Associated finding"
* ^property[=].uri = "http://snomed.info/id/246090004"
* ^property[=].type = #code
* ^property[+].code = #Component
* ^property[=].uri = "http://snomed.info/id/246093002"
* ^property[=].type = #code
* ^property[+].code = #Severity
* ^property[=].uri = "http://snomed.info/id/246112005"
* ^property[=].type = #code
* ^property[+].code = #Occurrence
* ^property[=].uri = "http://snomed.info/id/246454002"
* ^property[=].type = #code
* ^property[+].code = #Episodicity
* ^property[=].uri = "http://snomed.info/id/246456000"
* ^property[=].type = #code
* ^property[+].code = #Technique
* ^property[=].uri = "http://snomed.info/id/246501002"
* ^property[=].type = #code
* ^property[+].code = #"Revision status"
* ^property[=].uri = "http://snomed.info/id/246513007"
* ^property[=].type = #code
* ^property[+].code = #Units
* ^property[=].uri = "http://snomed.info/id/246514001"
* ^property[=].type = #code
* ^property[+].code = #After
* ^property[=].uri = "http://snomed.info/id/255234002"
* ^property[=].type = #code
* ^property[+].code = #Access
* ^property[=].uri = "http://snomed.info/id/260507000"
* ^property[=].type = #code
* ^property[+].code = #Method
* ^property[=].uri = "http://snomed.info/id/260686004"
* ^property[=].type = #code
* ^property[+].code = #Priority
* ^property[=].uri = "http://snomed.info/id/260870009"
* ^property[=].type = #code
* ^property[+].code = #"Clinical course"
* ^property[=].uri = "http://snomed.info/id/263502005"
* ^property[=].type = #code
* ^property[+].code = #Laterality
* ^property[=].uri = "http://snomed.info/id/272741003"
* ^property[=].type = #code
* ^property[+].code = #"Associated procedure"
* ^property[=].uri = "http://snomed.info/id/363589002"
* ^property[=].type = #code
* ^property[+].code = #"Finding site"
* ^property[=].uri = "http://snomed.info/id/363698007"
* ^property[=].type = #code
* ^property[+].code = #Laterality
* ^property[=].uri = "http://snomed.info/id/363699004"
* ^property[=].type = #code
* ^property[+].code = #"Direct morphology"
* ^property[=].uri = "http://snomed.info/id/363700003"
* ^property[=].type = #code
* ^property[+].code = #"Direct substance"
* ^property[=].uri = "http://snomed.info/id/363701004"
* ^property[=].type = #code
* ^property[+].code = #"Has focus"
* ^property[=].uri = "http://snomed.info/id/363702006"
* ^property[=].type = #code
* ^property[+].code = #"Has intent"
* ^property[=].uri = "http://snomed.info/id/363703001"
* ^property[=].type = #code
* ^property[+].code = #"Procedure site"
* ^property[=].uri = "http://snomed.info/id/363704007"
* ^property[=].type = #code
* ^property[+].code = #"Has definitional manifestation"
* ^property[=].uri = "http://snomed.info/id/363705008"
* ^property[=].type = #code
* ^property[+].code = #"Indirect morphology"
* ^property[=].uri = "http://snomed.info/id/363709002"
* ^property[=].type = #code
* ^property[+].code = #"Indirect device"
* ^property[=].uri = "http://snomed.info/id/363710007"
* ^property[=].type = #code
* ^property[+].code = #"Has interpretation"
* ^property[=].uri = "http://snomed.info/id/363713009"
* ^property[=].type = #code
* ^property[+].code = #Interprets
* ^property[=].uri = "http://snomed.info/id/363714003"
* ^property[=].type = #code
* ^property[+].code = #"Measurement method"
* ^property[=].uri = "http://snomed.info/id/370129005"
* ^property[=].type = #code
* ^property[+].code = #Property
* ^property[=].uri = "http://snomed.info/id/370130000"
* ^property[=].type = #code
* ^property[+].code = #"Recipient category"
* ^property[=].uri = "http://snomed.info/id/370131001"
* ^property[=].type = #code
* ^property[+].code = #"Scale type"
* ^property[=].uri = "http://snomed.info/id/370132008"
* ^property[=].type = #code
* ^property[+].code = #"Specimen substance"
* ^property[=].uri = "http://snomed.info/id/370133003"
* ^property[=].type = #code
* ^property[+].code = #"Time aspect"
* ^property[=].uri = "http://snomed.info/id/370134009"
* ^property[=].type = #code
* ^property[+].code = #"Pathological process"
* ^property[=].uri = "http://snomed.info/id/370135005"
* ^property[=].type = #code
* ^property[+].code = #"Procedure site - Direct"
* ^property[=].uri = "http://snomed.info/id/405813007"
* ^property[=].type = #code
* ^property[+].code = #"Procedure site - Indirect"
* ^property[=].uri = "http://snomed.info/id/405814001"
* ^property[=].type = #code
* ^property[+].code = #"Procedure device"
* ^property[=].uri = "http://snomed.info/id/405815000"
* ^property[=].type = #code
* ^property[+].code = #"Procedure morphology"
* ^property[=].uri = "http://snomed.info/id/405816004"
* ^property[=].type = #code
* ^property[+].code = #"Finding context"
* ^property[=].uri = "http://snomed.info/id/408729009"
* ^property[=].type = #code
* ^property[+].code = #"Procedure context"
* ^property[=].uri = "http://snomed.info/id/408730004"
* ^property[=].type = #code
* ^property[+].code = #"Temporal context"
* ^property[=].uri = "http://snomed.info/id/408731000"
* ^property[=].type = #code
* ^property[+].code = #"Subject relationship context"
* ^property[=].uri = "http://snomed.info/id/408732007"
* ^property[=].type = #code
* ^property[+].code = #"Route of administration"
* ^property[=].uri = "http://snomed.info/id/410675002"
* ^property[=].type = #code
* ^property[+].code = #"Has dose form"
* ^property[=].uri = "http://snomed.info/id/411116001"
* ^property[=].type = #code
* ^property[+].code = #"Finding method"
* ^property[=].uri = "http://snomed.info/id/418775008"
* ^property[=].type = #code
* ^property[+].code = #"Finding informer"
* ^property[=].uri = "http://snomed.info/id/419066007"
* ^property[=].type = #code
* ^property[+].code = #"Using device"
* ^property[=].uri = "http://snomed.info/id/424226004"
* ^property[=].type = #code
* ^property[+].code = #"Using energy"
* ^property[=].uri = "http://snomed.info/id/424244007"
* ^property[=].type = #code
* ^property[+].code = #"Using substance"
* ^property[=].uri = "http://snomed.info/id/424361007"
* ^property[=].type = #code
* ^property[+].code = #"Surgical approach"
* ^property[=].uri = "http://snomed.info/id/424876005"
* ^property[=].type = #code
* ^property[+].code = #"Using access device"
* ^property[=].uri = "http://snomed.info/id/425391005"
* ^property[=].type = #code
* ^property[+].code = #"Role group"
* ^property[=].uri = "http://snomed.info/id/609096000"
* ^property[=].type = #code
* ^property[+].code = #"Property type"
* ^property[=].uri = "http://snomed.info/id/704318007"
* ^property[=].type = #code
* ^property[+].code = #"Inheres in"
* ^property[=].uri = "http://snomed.info/id/704319004"
* ^property[=].type = #code
* ^property[+].code = #Towards
* ^property[=].uri = "http://snomed.info/id/704320005"
* ^property[=].type = #code
* ^property[+].code = #Characterizes
* ^property[=].uri = "http://snomed.info/id/704321009"
* ^property[=].type = #code
* ^property[+].code = #"Process agent"
* ^property[=].uri = "http://snomed.info/id/704322002"
* ^property[=].type = #code
* ^property[+].code = #"Process duration"
* ^property[=].uri = "http://snomed.info/id/704323007"
* ^property[=].type = #code
* ^property[+].code = #"Process output"
* ^property[=].uri = "http://snomed.info/id/704324001"
* ^property[=].type = #code
* ^property[+].code = #"Relative to"
* ^property[=].uri = "http://snomed.info/id/704325000"
* ^property[=].type = #code
* ^property[+].code = #Precondition
* ^property[=].uri = "http://snomed.info/id/704326004"
* ^property[=].type = #code
* ^property[+].code = #"Direct site"
* ^property[=].uri = "http://snomed.info/id/704327008"
* ^property[=].type = #code
* ^property[+].code = #"Specified by"
* ^property[=].uri = "http://snomed.info/id/704346009"
* ^property[=].type = #code
* ^property[+].code = #Observes
* ^property[=].uri = "http://snomed.info/id/704347000"
* ^property[=].type = #code
* ^property[+].code = #"Is about"
* ^property[=].uri = "http://snomed.info/id/704647008"
* ^property[=].type = #code

ValueSet: PracticeSettingCodeValueSet
Id: c80-practice-codes
Title: "Practice Setting Code Value Set"
Description: "This is the code representing the clinical specialty of the clinician or provider who interacted with, treated, or provided a service to/for the patient. The value set used for clinical specialty has been limited by HITSP to the value set reproduced from HITSP C80 Table 2-149 Clinical Specialty Value Set Definition."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:27.072+03:00"
* ^meta.source = "#eMWFzSyStKyyxKMM"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #sd
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.3.88.12.80.72"
* ^version = "4.0.1"
* ^status = #active
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HITSP"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^copyright = "This resource includes content from SNOMED Clinical Terms® (SNOMED CT®) which is copyright of the International Health Terminology Standards Development Organisation (IHTSDO). Implementers of these specifications must have the appropriate SNOMED CT Affiliate license - for more information contact http://www.snomed.org/snomed-ct/get-snomed-ct or info@snomed.org"
* SNOMED_CT#408467006 "Adult mental illness"
* SNOMED_CT#394577000 "Anesthetics"
* SNOMED_CT#394578005 "Audiological medicine"
* SNOMED_CT#421661004 "Blood banking and transfusion medicine"
* SNOMED_CT#408462000 "Burns care"
* SNOMED_CT#394579002 "Cardiology"
* SNOMED_CT#394804000 "Clinical cytogenetics and molecular genetics"
* SNOMED_CT#394580004 "Clinical genetics"
* SNOMED_CT#394803006 "Clinical hematology"
* SNOMED_CT#408480009 "Clinical immunology"
* SNOMED_CT#408454008 "Clinical microbiology"
* SNOMED_CT#394809005 "Clinical neuro-physiology"
* SNOMED_CT#394592004 "Clinical oncology"
* SNOMED_CT#394600006 "Clinical pharmacology"
* SNOMED_CT#394601005 "Clinical physiology"
* SNOMED_CT#394581000 "Community medicine"
* SNOMED_CT#408478003 "Critical care medicine"
* SNOMED_CT#394812008 "Dental medicine specialties"
* SNOMED_CT#408444009 "Dental-General dental practice"
* SNOMED_CT#394582007 "Dermatology"
* SNOMED_CT#408475000 "Diabetic medicine"
* SNOMED_CT#410005002 "Dive medicine"
* SNOMED_CT#394583002 "Endocrinology"
* SNOMED_CT#419772000 "Family practice"
* SNOMED_CT#394584008 "Gastroenterology"
* SNOMED_CT#408443003 "General medical practice"
* SNOMED_CT#394802001 "General medicine"
* SNOMED_CT#394915009 "General pathology"
* SNOMED_CT#394814009 "General practice"
* SNOMED_CT#394808002 "Genito-urinary medicine"
* SNOMED_CT#394811001 "Geriatric medicine"
* SNOMED_CT#408446006 "Gynecological oncology"
* SNOMED_CT#394586005 "Gynecology"
* SNOMED_CT#394916005 "Hematopathology"
* SNOMED_CT#408472002 "Hepatology"
* SNOMED_CT#394597005 "Histopathology"
* SNOMED_CT#394598000 "Immunopathology"
* SNOMED_CT#394807007 "Infectious diseases"
* SNOMED_CT#419192003 "Internal medicine"
* SNOMED_CT#408468001 "Learning disability"
* SNOMED_CT#394593009 "Medical oncology"
* SNOMED_CT#394813003 "Medical ophthalmology"
* SNOMED_CT#410001006 "Military medicine"
* SNOMED_CT#394589003 "Nephrology"
* SNOMED_CT#394591006 "Neurology"
* SNOMED_CT#394599008 "Neuropathology"
* SNOMED_CT#394649004 "Nuclear medicine"
* SNOMED_CT#408470005 "Obstetrics"
* SNOMED_CT#394585009 "Obstetrics and gynecology"
* SNOMED_CT#394821009 "Occupational medicine"
* SNOMED_CT#422191005 "Ophthalmic surgery"
* SNOMED_CT#394594003 "Ophthalmology"
* SNOMED_CT#416304004 "Osteopathic manipulative medicine"
* SNOMED_CT#418960008 "Otolaryngology"
* SNOMED_CT#394882004 "Pain management"
* SNOMED_CT#394806003 "Palliative medicine"
* SNOMED_CT#394588006 "Pediatric (Child and adolescent) psychiatry"
* SNOMED_CT#408459003 "Pediatric cardiology"
* SNOMED_CT#394607009 "Pediatric dentistry"
* SNOMED_CT#419610006 "Pediatric endocrinology"
* SNOMED_CT#418058008 "Pediatric gastroenterology"
* SNOMED_CT#420208008 "Pediatric genetics"
* SNOMED_CT#418652005 "Pediatric hematology"
* SNOMED_CT#418535003 "Pediatric immunology"
* SNOMED_CT#418862001 "Pediatric infectious diseases"
* SNOMED_CT#419365004 "Pediatric nephrology"
* SNOMED_CT#418002000 "Pediatric oncology"
* SNOMED_CT#419983000 "Pediatric ophthalmology"
* SNOMED_CT#419170002 "Pediatric pulmonology"
* SNOMED_CT#419472004 "Pediatric rheumatology"
* SNOMED_CT#394539006 "Pediatric surgery"
* SNOMED_CT#420112009 "Pediatric surgery-bone marrow transplantation"
* SNOMED_CT#409968004 "Preventive medicine"
* SNOMED_CT#394587001 "Psychiatry"
* SNOMED_CT#394913002 "Psychotherapy"
* SNOMED_CT#408440000 "Public health medicine"
* SNOMED_CT#418112009 "Pulmonary medicine"
* SNOMED_CT#419815003 "Radiation oncology"
* SNOMED_CT#394914008 "Radiology"
* SNOMED_CT#408455009 "Radiology-Interventional radiology"
* SNOMED_CT#394602003 "Rehabilitation"
* SNOMED_CT#408447002 "Respite care"
* SNOMED_CT#394810000 "Rheumatology"
* SNOMED_CT#408450004 "Sleep studies"
* SNOMED_CT#408476004 "Surgery-Bone and marrow transplantation"
* SNOMED_CT#408469009 "Surgery-Breast surgery"
* SNOMED_CT#408466002 "Surgery-Cardiac surgery"
* SNOMED_CT#408471009 "Surgery-Cardiothoracic transplantation"
* SNOMED_CT#408464004 "Surgery-Colorectal surgery"
* SNOMED_CT#408441001 "Surgery-Dental-Endodontics"
* SNOMED_CT#408465003 "Surgery-Dental-Oral and maxillofacial surgery"
* SNOMED_CT#394605001 "Surgery-Dental-Oral surgery"
* SNOMED_CT#394608004 "Surgery-Dental-Orthodontics"
* SNOMED_CT#408461007 "Surgery-Dental-Periodontal surgery"
* SNOMED_CT#408460008 "Surgery-Dental-Prosthetic dentistry (Prosthodontics)"
* SNOMED_CT#408460008 "Surgery-Dental-surgical-Prosthodontics"
* SNOMED_CT#394606000 "Surgery-Dentistry-Restorative dentistry"
* SNOMED_CT#408449004 "Surgery-Dentistry--surgical"
* SNOMED_CT#394608004 "Surgery-Dentistry-surgical-Orthodontics"
* SNOMED_CT#418018006 "Surgery-Dermatologic surgery"
* SNOMED_CT#394604002 "Surgery-Ear, nose and throat surgery"
* SNOMED_CT#394609007 "Surgery-general"
* SNOMED_CT#408474001 "Surgery-Hepatobiliary and pancreatic surgery"
* SNOMED_CT#394610002 "Surgery-Neurosurgery"
* SNOMED_CT#394611003 "Surgery-Plastic surgery"
* SNOMED_CT#408477008 "Surgery-Transplantation surgery"
* SNOMED_CT#394801008 "Surgery-Trauma and orthopedics"
* SNOMED_CT#408463005 "Surgery-Vascular"
* SNOMED_CT#419321007 "Surgical oncology"
* SNOMED_CT#394576009 "Surgical-Accident & emergency"
* SNOMED_CT#394590007 "Thoracic medicine"
* SNOMED_CT#409967009 "Toxicology"
* SNOMED_CT#408448007 "Tropical medicine"
* SNOMED_CT#419043006 "Urological oncology"
* SNOMED_CT#394612005 "Urology"
* SNOMED_CT#394733009 "Medical specialty--OTHER--NOT LISTED"
* SNOMED_CT#394732004 "Surgical specialty--OTHER-NOT LISTED"

CodeSystem: ServiceProvisionConditions
Id: service-provision-conditions
Title: "ServiceProvisionConditions"
Description: "The code(s) that detail the conditions under which the healthcare service is available/offered."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:13.131+03:00"
* ^meta.source = "#GRPiOoNOzlP2WMgQ"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^url = "http://terminology.hl7.org/CodeSystem/service-provision-conditions"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.4.1143"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/service-provision-conditions"
* ^content = #complete
* #free "Free" "This service is available for no patient cost."
* #disc "Discounts Available" "There are discounts available on this service for qualifying patients."
* #cost "Fees apply" "Fees apply for this service."

ValueSet: ServiceProvisionConditions
Id: service-provision-conditions
Title: "ServiceProvisionConditions"
Description: "The code(s) that detail the conditions under which the healthcare service is available/offered."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:15:39.998+03:00"
* ^meta.source = "#0m2hmKlpeBEUxoSg"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #draft
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 1
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.514"
* ^version = "4.0.1"
* ^status = #draft
* ^experimental = false
* ^date = "2019-11-01T09:29:23+11:00"
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system ServiceProvisionConditions

Alias: $shareablevalueset = http://hl7.org/fhir/StructureDefinition/shareablevalueset

Instance: languages
InstanceOf: $shareablevalueset
Usage: #definition
* meta.versionId = "1"
* meta.lastUpdated = "2022-02-15T08:15:57.573+03:00"
* meta.source = "#CnS3ajMd14M2CL4m"
* extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* extension[=].valueCode = #fhir
* extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* extension[=].valueCode = #trial-use
* extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* extension[=].valueInteger = 3
* url = "http://hl7.org/fhir/ValueSet/languages"
* identifier.system = "urn:ietf:rfc:3986"
* identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.20"
* version = "4.0.1"
* name = "CommonLanguages"
* title = "Common Languages"
* status = #draft
* experimental = true
* date = "2016-08-22T09:53:05+00:00"
* publisher = "HL7 International - FHIR-Infrastructure"
* contact.telecom.system = #url
* contact.telecom.value = "http://hl7.org/fhir"
* description = "This value set includes common codes from BCP-47 (http://tools.ietf.org/html/bcp47)"
* compose.include.system = "urn:ietf:bcp:47"
* compose.include.concept[0].code = #ar
* compose.include.concept[=].display = "Arabic"
* compose.include.concept[=].designation[0].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Arabisk"
* compose.include.concept[=].designation[+].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Arabic"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Arabisch"
* compose.include.concept[+].code = #bn
* compose.include.concept[=].display = "Bengali"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Bengali"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Bengaals"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Бенгальский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "孟加拉语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Bengalisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Bengalsk"
* compose.include.concept[+].code = #cs
* compose.include.concept[=].display = "Czech"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Czech"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Tsjechisch"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Чешский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "捷克语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Tschechisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Tjekkisk"
* compose.include.concept[+].code = #da
* compose.include.concept[=].display = "Danish"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Danish"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Deens"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Датский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "丹麦语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Dänisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Dansk"
* compose.include.concept[+].code = #de
* compose.include.concept[=].display = "German"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "German"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Duits"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Немецкий"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "德语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Deutsch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Tysk"
* compose.include.concept[+].code = #de-AT
* compose.include.concept[=].display = "German (Austria)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "German (Austria)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Duits (Oostenrijk)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Немецкий (Австрия)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "德语 （奥地利）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Deutsch (Österreich)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Tysk (Østrig"
* compose.include.concept[+].code = #de-CH
* compose.include.concept[=].display = "German (Switzerland)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "German (Switzerland)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Duits (Zwitserland)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Немецкий (Швейцария)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "德语 （瑞士）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Deutsch (Schweiz)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Tysk (Schweiz)"
* compose.include.concept[+].code = #de-DE
* compose.include.concept[=].display = "German (Germany)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "German (Germany)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Duits (Duitsland)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Немецкий (Германия)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "德语 （德国）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Deutsch (Deutschland)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Tysk (Tyskland)"
* compose.include.concept[+].code = #el
* compose.include.concept[=].display = "Greek"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Greek"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Grieks"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Греческий"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "希腊语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Griechisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Græsk"
* compose.include.concept[+].code = #en
* compose.include.concept[=].display = "English"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "English"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engels"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Английский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "英语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Englisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engelsk"
* compose.include.concept[+].code = #en-AU
* compose.include.concept[=].display = "English (Australia)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "English (Australia)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engels (Australië)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Английский (Австралия)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "英语 （澳大利亚）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Englisch (Australien)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engelsk (Australien)"
* compose.include.concept[+].code = #en-CA
* compose.include.concept[=].display = "English (Canada)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "English (Canada)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engels (Canada)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Английский (Канада)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "英语 （加拿大）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Englisch (Kanada)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engelsk (Canada)"
* compose.include.concept[+].code = #en-GB
* compose.include.concept[=].display = "English (Great Britain)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "English (Great Britain)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engels (Groot Brittannië)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Английский (Великобритания)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "英语 （英国）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Englisch (Großbritannien)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engelsk (Storbritannien)"
* compose.include.concept[+].code = #en-IN
* compose.include.concept[=].display = "English (India)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "English (India)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engels (India)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Английский (Индия)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "英语 （印度）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Englisch (Indien)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engelsk (Indien)"
* compose.include.concept[+].code = #en-NZ
* compose.include.concept[=].display = "English (New Zeland)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "English (New Zeland)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engels (Nieuw Zeeland)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Английский (Новая Зеландия)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "英语 （新西兰）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Englisch (Neuseeland)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engelsk (New Zeeland)"
* compose.include.concept[+].code = #en-SG
* compose.include.concept[=].display = "English (Singapore)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "English (Singapore)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engels (Singapore)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Английский (Сингапур)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "英语 （新加坡）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Englisch (Singapur)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engelsk (Singapore)"
* compose.include.concept[+].code = #en-US
* compose.include.concept[=].display = "English (United States)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "English (United States)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engels (Verenigde Staten)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Английский (США)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "英语 （美国）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Englisch (USA)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Engelsk (Amerikansk)"
* compose.include.concept[+].code = #es
* compose.include.concept[=].display = "Spanish"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spanish"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spaans"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Испанский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "西班牙语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spanisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spansk"
* compose.include.concept[+].code = #es-AR
* compose.include.concept[=].display = "Spanish (Argentina)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spanish (Argentina)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spaans (Argentinië)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Испанский (Аргентина)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "西班牙语 （阿根廷）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spanisch (Argentinien)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spansk (Argentina)"
* compose.include.concept[+].code = #es-ES
* compose.include.concept[=].display = "Spanish (Spain)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spanish (Spain)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spaans (Spanje)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Испанский (Испания)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "西班牙语 （西班牙）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spanisch (Spanien)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spansk (Spanien)"
* compose.include.concept[+].code = #es-UY
* compose.include.concept[=].display = "Spanish (Uruguay)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spanish (Uruguay)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spaans (Uruguay)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Испанский (Уругвай)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "西班牙语 （乌拉圭）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spanisch (Uruguay)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Spansk (Uruguay)"
* compose.include.concept[+].code = #fi
* compose.include.concept[=].display = "Finnish"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Finnish"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Fins"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Финский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "芬兰语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Finnisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Finsk"
* compose.include.concept[+].code = #fr
* compose.include.concept[=].display = "French"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "French"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Frans"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Французский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "法语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Französisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Fransk"
* compose.include.concept[+].code = #fr-BE
* compose.include.concept[=].display = "French (Belgium)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "French (Belgium)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Frans (België)"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Französisch (Belgien)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Finsk (Belgien)"
* compose.include.concept[+].code = #fr-CH
* compose.include.concept[=].display = "French (Switzerland)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "French (Switzerland)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Frans (Zwitserland)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Французский (Швейцария)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "法语 （比利时）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Französisch (Schweiz)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Fransk (Schweiz)"
* compose.include.concept[+].code = #fr-FR
* compose.include.concept[=].display = "French (France)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "French (France)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Frans (Frankrijk)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Французский (Франция)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "法语 （瑞士）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Französisch (Frankreich)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Fransk (Frankrig)"
* compose.include.concept[+].code = #fy
* compose.include.concept[=].display = "Frysian"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Frysian"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Fries"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "弗里士兰语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Friesisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Frisisk"
* compose.include.concept[+].code = #fy-NL
* compose.include.concept[=].display = "Frysian (Netherlands)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Frysian (Netherlands)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Fries (Nederland)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "弗里士兰语（荷兰）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Friesisch (Niederlande)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Frisisk (Holland)"
* compose.include.concept[+].code = #hi
* compose.include.concept[=].display = "Hindi"
* compose.include.concept[=].designation[0].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Hindi"
* compose.include.concept[=].designation[+].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Hindi"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Hindi"
* compose.include.concept[+].code = #hr
* compose.include.concept[=].display = "Croatian"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Croatian"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kroatisch"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Хорватский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "克罗地亚语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kroatisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kroatisk"
* compose.include.concept[+].code = #it
* compose.include.concept[=].display = "Italian"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italian"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italiaans"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Итальянский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "意大利语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italienisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italiensk"
* compose.include.concept[+].code = #it-CH
* compose.include.concept[=].display = "Italian (Switzerland)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italian (Switzerland)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italiaans (Zwitserland)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Итальянский (Швейцария)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "意大利语 （瑞士）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italienisch (Schweiz)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italiensk (Schweiz)"
* compose.include.concept[+].code = #it-IT
* compose.include.concept[=].display = "Italian (Italy)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italian (Italy)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italiaans (Italië)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Итальянский (Италия)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "意大利语 （意大利）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italienisch (Italien)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Italiensk (Italien)"
* compose.include.concept[+].code = #ja
* compose.include.concept[=].display = "Japanese"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Japanese"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Japans"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Японский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "日语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Japanisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Japansk"
* compose.include.concept[+].code = #ko
* compose.include.concept[=].display = "Korean"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Korean"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Koreaans"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Корейский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "朝鲜语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Koreanisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Koreansk"
* compose.include.concept[+].code = #nl
* compose.include.concept[=].display = "Dutch"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Dutch"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Nederlands"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Нидерландский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "荷兰语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Niederländisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Hollandsk"
* compose.include.concept[+].code = #nl-BE
* compose.include.concept[=].display = "Dutch (Belgium)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Dutch (Belgium)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Nederlands (België)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "荷兰语 （比利时）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Niederländisch (Belgien)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Hollandsk (Belgien)"
* compose.include.concept[+].code = #nl-NL
* compose.include.concept[=].display = "Dutch (Netherlands)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Dutch (Netherlands)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Nederlands (Nederland)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Нидерландский (Нидерланды)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "荷兰语 （荷兰）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Niederländisch (Niederlande)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Hollandsk (Holland)"
* compose.include.concept[+].code = #no
* compose.include.concept[=].display = "Norwegian"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Norwegian"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Noors"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Норвежский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "挪威语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Norwegisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Norsk"
* compose.include.concept[+].code = #no-NO
* compose.include.concept[=].display = "Norwegian (Norway)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Norwegian (Norway)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Noors (Noorwegen)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Норвежский (Норвегия)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "挪威语 （挪威）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Norwegisch (Norwegen)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Norsk (Norge)"
* compose.include.concept[+].code = #pa
* compose.include.concept[=].display = "Punjabi"
* compose.include.concept[=].designation[0].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Punjabi"
* compose.include.concept[=].designation[+].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Punjabi"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Punjabi"
* compose.include.concept[+].code = #pl
* compose.include.concept[=].display = "Polish"
* compose.include.concept[=].designation.language = #pl
* compose.include.concept[=].designation.use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation.value = "Polskie"
* compose.include.concept[+].code = #pt
* compose.include.concept[=].display = "Portuguese"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Portuguese"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Portugees"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Португальский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "葡萄牙语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Portugiesisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Portugisisk"
* compose.include.concept[+].code = #pt-BR
* compose.include.concept[=].display = "Portuguese (Brazil)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Portuguese (Brazil)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Portugees (Brazilië)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Португальский (Бразилия)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "葡萄牙语 （巴西）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Portugiesisch (Brasilien)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Portugisisk (Brasilien)"
* compose.include.concept[+].code = #ru
* compose.include.concept[=].display = "Russian"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Russian"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Russisch"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Русский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "俄语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Russisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Russisk"
* compose.include.concept[+].code = #ru-RU
* compose.include.concept[=].display = "Russian (Russia)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Russian (Russia)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Russisch (Rusland)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Русский (Россия)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "俄语 （俄罗斯）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Russisch (Russland)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Russisk (Rusland)"
* compose.include.concept[+].code = #sr
* compose.include.concept[=].display = "Serbian"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Serbian"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Servisch"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Сербский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "塞尔维亚语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Serbisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Serbisk"
* compose.include.concept[+].code = #sr-RS
* compose.include.concept[=].display = "Serbian (Serbia)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Serbian (Serbia)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Servisch (Servië)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Сербский (Сербия)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "塞尔维亚语 （塞尔维亚）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Serbisch (Serbien)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Serbisk (Serbien)"
* compose.include.concept[+].code = #sv
* compose.include.concept[=].display = "Swedish"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Swedish"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Zweeds"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Шведский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "瑞典语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Schwedisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Svensk"
* compose.include.concept[+].code = #sv-SE
* compose.include.concept[=].display = "Swedish (Sweden)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Swedish (Sweden)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Zweeds (Zweden)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Шведский (Швеция)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "瑞典语 （瑞典）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Schwedisch (Schweden)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Svensk (Sverige)"
* compose.include.concept[+].code = #te
* compose.include.concept[=].display = "Telegu"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Telegu"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Teloegoe"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Телугу"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "泰卢固语"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Telugu"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Telugu"
* compose.include.concept[+].code = #zh
* compose.include.concept[=].display = "Chinese"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinese"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinees"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kитайский"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "中文"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinesisch"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kinesisk"
* compose.include.concept[+].code = #zh-CN
* compose.include.concept[=].display = "Chinese (China)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinese (China)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinees (China)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kитайский (Китай)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "中文 （中国）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinesisch (China)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kinesisk (Kina)"
* compose.include.concept[+].code = #zh-HK
* compose.include.concept[=].display = "Chinese (Hong Kong)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinese (Hong Kong)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinees (Hong Kong)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kитайский (Гонконг)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "中文 （香港特别行政区）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinesisch (Hong Kong)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kinesisk (Hong Kong)"
* compose.include.concept[+].code = #zh-SG
* compose.include.concept[=].display = "Chinese (Singapore)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinese (Singapore)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinees (Singapore)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kитайский (Сингапур)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "中文 （新加坡）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinesisch (Singapur)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kinesisk (Singapore)"
* compose.include.concept[+].code = #zh-TW
* compose.include.concept[=].display = "Chinese (Taiwan)"
* compose.include.concept[=].designation[0].language = #en
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinese (Taiwan)"
* compose.include.concept[=].designation[+].language = #nl
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinees (Taiwan)"
* compose.include.concept[=].designation[+].language = #ru
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kитайский (Тайвань)"
* compose.include.concept[=].designation[+].language = #zh
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "中文 （台湾）"
* compose.include.concept[=].designation[+].language = #de
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Chinesisch (Taiwan)"
* compose.include.concept[=].designation[+].language = #da
* compose.include.concept[=].designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* compose.include.concept[=].designation[=].value = "Kinesisk (Taiwan)"

CodeSystem: V2_0203
Id: v2-0203
Title: "v2 Identifier Type"
Description: "FHIR Value set/code system definition for HL7 v2 table 0203 ( Identifier Type)"
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:17:27.194+03:00"
* ^meta.source = "#qM5Ix2L4E0neUWFx"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablecodesystem"
* ^language = #en
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^url = "http://terminology.hl7.org/CodeSystem/v2-0203"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.18.108"
* ^version = "2.9"
* ^status = #active
* ^experimental = false
* ^publisher = "HL7, Inc"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org"
* ^content = #complete
* #AC "Accreditation/Certification Identifier"
* #ACSN "Accession ID"
* #ACSN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #ACSN ^extension[=].valueString = "Accession Identifier"
* #ACSN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #ACSN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #ACSN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #ACSN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #ACSN ^extension[=].valueString.extension[0].extension[=].valueString = "Accession identificatie"
* #ACSN ^designation[0].language = #nl
* #ACSN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #ACSN ^designation[=].value = "Accession ID"
* #AM "American Express"
* #AM ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #AM ^extension[=].valueString = "Deprecated and replaced by BC in v 2.5."
* #AM ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #AM ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #AM ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #AM ^extension[=].valueString.extension[0].extension[+].url = "content"
* #AM ^extension[=].valueString.extension[0].extension[=].valueString = "Vervangen door BC vanaf v2.5"
* #AM ^designation[0].language = #de
* #AM ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #AM ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #AM ^designation[=].value = "American Express"
* #AM ^designation[+].language = #nl
* #AM ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #AM ^designation[=].value = "American Express"
* #AMA "American Medical Association Number"
* #AMA ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #AMA ^extension[=].valueString = "A physician identifier assigned by the AMA."
* #AMA ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #AMA ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #AMA ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #AMA ^extension[=].valueString.extension[0].extension[+].url = "content"
* #AMA ^extension[=].valueString.extension[0].extension[=].valueString = "Een zorgverleneridentificatie toegekend door de AMA"
* #AMA ^designation[0].language = #nl
* #AMA ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #AMA ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #AMA ^designation[=].value = "American Medical Association nummer"
* #AN "Account number"
* #AN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #AN ^extension[=].valueString = "An identifier that is unique to an account."
* #AN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #AN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #AN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #AN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #AN ^extension[=].valueString.extension[0].extension[=].valueString = "Een unieke identificatie van het account"
* #AN ^designation[0].language = #de
* #AN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #AN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #AN ^designation[=].value = "Kontonummer"
* #AN ^designation[+].language = #nl
* #AN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #AN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #AN ^designation[=].value = "Accountnummer"
* #ANC "Account number Creditor"
* #ANC ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #ANC ^extension[=].valueString = "Class: Financial A more precise definition of an account number: sometimes two distinct account numbers must be transmitted in the same message, one as the creditor, the other as the debitor. Kreditorenkontonummer"
* #ANC ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #ANC ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #ANC ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #ANC ^extension[=].valueString.extension[0].extension[+].url = "content"
* #ANC ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: financieel. Een preciesere definitie van een accountnummer: soms moeten 2 verschillende accountnummers moeten worden doorgegeven in hetzelfde bericht, een als crediteur, de andere als debiteur. Crediteuraccountnummer."
* #ANC ^designation[0].language = #nl
* #ANC ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #ANC ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #ANC ^designation[=].value = "Accountnummer crediteur"
* #AND "Account number debitor"
* #AND ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #AND ^extension[=].valueString = "Class: Financial A more precise definition of an account number: sometimes two distinct account numbers must be transmitted in the same message, one as the creditor, the other as the debitor. Debitorenkontonummer"
* #AND ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #AND ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #AND ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #AND ^extension[=].valueString.extension[0].extension[+].url = "content"
* #AND ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: financieel. Een preciesere definitie van een accountnummer: soms moeten 2 verschillende accountnummers moeten worden doorgegeven in hetzelfde bericht, een als crediteur, de andere als debiteur. Debiteuraccountnummer."
* #AND ^designation[0].language = #nl
* #AND ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #AND ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #AND ^designation[=].value = "Accountnummer debiteur"
* #ANON "Anonymous identifier"
* #ANON ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #ANON ^extension[=].valueString = "An identifier for a living subject whose real identity is protected or suppressed Justification: For public health reporting purposes, anonymous identifiers are occasionally used for protecting patient identity in reporting certain results. For instance, a state health department may choose to use a scheme for generating an anonymous identifier for reporting a patient that has had a positive human immunodeficiency virus antibody test. Anonymous identifiers can be used in PID 3 by replacing the medical record number or other non-anonymous identifier. The assigning authority for an anonymous identifier would be the state/local health department."
* #ANON ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #ANON ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #ANON ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #ANON ^extension[=].valueString.extension[0].extension[+].url = "content"
* #ANON ^extension[=].valueString.extension[0].extension[=].valueString = "Verklaring: t.b.v. volksgezondheid-doeleinden worden anonieme identificaties soms gebruikt voor bescherming van de identiteit van de patiënt bij melden van bepaalde resultaten. Zo kan een gezondheidsafdeling van een overheid voor een algoritme voor het genereren van nummers kiezen bij patiënten met een positieve HIV-antilichamentest. Anonieme identificaties kunnen worden gebruikt in PID-3 door het medisch dossiernummer of ander niet-anonieme identificatie te vervangen. De toekennende autoriteit voor de anonieme identificatie is dan de betreffende overheidsafdeling."
* #ANON ^designation[0].language = #nl
* #ANON ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #ANON ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #ANON ^designation[=].value = "Anonieme identificatie"
* #ANT "Temporary Account Number"
* #ANT ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #ANT ^extension[=].valueString = "Class: Financial Temporary version of an Account Number. Use Case: An ancillary system that does not normally assign account numbers is the first time to register a patient. This ancillary system will generate a temporary account number that will only be used until an official account number is assigned."
* #ANT ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #ANT ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #ANT ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #ANT ^extension[=].valueString.extension[0].extension[+].url = "content"
* #ANT ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: financieel. Tijdelijke versie van een accountnummer. Use case: een satellietsysteem dat normaal geen accountnummers toekent, is de eerste plaats waar een patiënt wordt geregistreerd. Dit satellietsysteem zal een tijdelijk accountnummer genereren dat wordt gebruikt totdat een officieel accountnummer wordt toegekend."
* #ANT ^designation[0].language = #nl
* #ANT ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #ANT ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #ANT ^designation[=].value = "Tijdelijk accountnummer"
* #APRN "Advanced Practice Registered Nurse number"
* #APRN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #APRN ^extension[=].valueString = "An identifier that is unique to an advanced practice registered nurse within the jurisdiction of a certifying board"
* #ASID "Ancestor Specimen ID"
* #ASID ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #ASID ^extension[=].valueString = "A unique identifier for the ancestor specimen. All child, grandchild, etc. specimens of the ancestor specimen share the same Ancestor Specimen ID."
* #ASID ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #ASID ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #ASID ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #ASID ^extension[=].valueString.extension[0].extension[+].url = "content"
* #ASID ^extension[=].valueString.extension[0].extension[=].valueString = "Een unieke identificatie voor het oorspronkelijke monster. Alle afgeleide (kind, kleinkind, etc.) monsters van het oorspronkelijke monster delen hetzelfde Oorspronkelijke monster ID"
* #ASID ^designation[0].language = #nl
* #ASID ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #ASID ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #ASID ^designation[=].value = "Oorspronkelijk monster ID"
* #BA "Bank Account Number"
* #BA ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #BA ^extension[=].valueString = "Class: Financial"
* #BA ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #BA ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #BA ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #BA ^extension[=].valueString.extension[0].extension[+].url = "content"
* #BA ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: financieel"
* #BA ^designation[0].language = #de
* #BA ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #BA ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #BA ^designation[=].value = "Bank Kontonummer"
* #BA ^designation[+].language = #nl
* #BA ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #BA ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #BA ^designation[=].value = "Bankrekeningnummer"
* #BC "Bank Card Number"
* #BC ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #BC ^extension[=].valueString = "Class: Financial An identifier that is unique to a person's bank card. Replaces AM, DI, DS, MS, and VS beginning in v 2.5."
* #BC ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #BC ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #BC ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #BC ^extension[=].valueString.extension[0].extension[+].url = "content"
* #BC ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: financieel. Een identificatie die uniek is voor iemand's bankpas. Vervangt AM, DI, DS, MS en VS vanaf v2.5"
* #BC ^designation[0].language = #nl
* #BC ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #BC ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #BC ^designation[=].value = "Bankrekeningnummer"
* #BCFN "Birth Certificate File Number"
* #BCT "Birth Certificate"
* #BCT ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #BCT ^extension[=].valueString = "A number associated with a document identifying the event of a person's birth."
* #BCT ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #BCT ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #BCT ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #BCT ^extension[=].valueString.extension[0].extension[+].url = "content"
* #BCT ^extension[=].valueString.extension[0].extension[=].valueString = "Een nummer gekoppeld aan een document die de geboorte van een persoon documenteert."
* #BCT ^designation[0].language = #nl
* #BCT ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #BCT ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #BCT ^designation[=].value = "Geboortecertificaat"
* #BR "Birth registry number"
* #BR ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #BR ^extension[=].valueString = "An identifier unique within the Assigning Authority that is the official legal record of a person's birth."
* #BR ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #BR ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #BR ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #BR ^extension[=].valueString.extension[0].extension[+].url = "content"
* #BR ^extension[=].valueString.extension[0].extension[=].valueString = "Een nummer gekoppeld aan de toekennende autoriteit die het officieel wettelijk afschrift van de geboorte van een persoon bijhoudt."
* #BR ^designation[0].language = #de
* #BR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #BR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #BR ^designation[=].value = "Geburtsregisternummer"
* #BR ^designation[+].language = #nl
* #BR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #BR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #BR ^designation[=].value = "Geboorteregister-nummer"
* #BRN "Breed Registry Number"
* #BRN ^designation[0].language = #nl
* #BRN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #BRN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #BRN ^designation[=].value = "Dierenras-registernummer"
* #BSNR "Primary physician office number"
* #BSNR ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #BSNR ^extension[=].valueString = "Betriebsstättennummer - for use in the German realm."
* #BSNR ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #BSNR ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #BSNR ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #BSNR ^extension[=].valueString.extension[0].extension[+].url = "content"
* #BSNR ^extension[=].valueString.extension[0].extension[=].valueString = "Betriebsstättennummer - voor gebruik in Duitse context."
* #BSNR ^designation[0].language = #nl
* #BSNR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #BSNR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #BSNR ^designation[=].value = "Primair zorgverlenerpraktijknummer"
* #CC "Cost Center number"
* #CC ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #CC ^extension[=].valueString = "Class: Financial Use Case: needed especially for transmitting information about invoices."
* #CC ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #CC ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #CC ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #CC ^extension[=].valueString.extension[0].extension[+].url = "content"
* #CC ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: financieel. Use case: specifiek nodig voor doorgeven van informatie over facturen."
* #CC ^designation[0].language = #nl
* #CC ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #CC ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #CC ^designation[=].value = "Kostenplaatsnummer"
* #CONM "Change of Name Document"
* #CONM ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #CONM ^extension[=].valueString = "A number associated with a document identifying a person's legal change of name."
* #CONM ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #CONM ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #CONM ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #CONM ^extension[=].valueString.extension[0].extension[+].url = "content"
* #CONM ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie gekoppeld aan een document met daarop de officiële wijziging van persoonsnaam."
* #CONM ^designation[0].language = #nl
* #CONM ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #CONM ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #CONM ^designation[=].value = "Naamswijzigingdocument"
* #CY "County number"
* #CY ^designation[0].language = #nl
* #CY ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #CY ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #CY ^designation[=].value = "County-nummer"
* #CZ "Citizenship Card"
* #CZ ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #CZ ^extension[=].valueString = "A number assigned by a person's country of residence to identify a person's citizenship."
* #CZ ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #CZ ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #CZ ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #CZ ^extension[=].valueString.extension[0].extension[+].url = "content"
* #CZ ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie gekoppeld aan het land van inwonerschap van een persoon om iemand staatsburgerschap aan te duiden."
* #CZ ^designation[0].language = #nl
* #CZ ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #CZ ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #CZ ^designation[=].value = "Staatsburgerschapkaart"
* #DC "Death Certificate ID"
* #DCFN "Death Certificate File Number"
* #DDS "Dentist license number"
* #DDS ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #DDS ^extension[=].valueString = "An identifier that is unique to a dentist within the jurisdiction of the licensing board"
* #DDS ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #DDS ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #DDS ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #DDS ^extension[=].valueString.extension[0].extension[+].url = "content"
* #DDS ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een tandarts binnen het rechtsgebied van de licentiegever."
* #DDS ^designation[0].language = #nl
* #DDS ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DDS ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DDS ^designation[=].value = "Tandarts licentienummer"
* #DEA "Drug Enforcement Administration registration number"
* #DEA ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #DEA ^extension[=].valueString = "An identifier for an individual or organization relative to controlled substance regulation and transactions. Use case: This is a registration number that identifies an individual or organization relative to controlled substance regulation and transactions.  A DEA number has a very precise and widely accepted meaning within the United States. Surprisingly, the US Drug Enforcement Administration does not solely assign DEA numbers in the United States. Hospitals have the authority to issue DEA numbers to their medical residents. These DEA numbers are based upon the hospital’s DEA number, but the authority rests with the hospital on the assignment to the residents. Thus, DEA as an Identifier Type is necessary in addition to DEA as an Assigning Authority."
* #DEA ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #DEA ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #DEA ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #DEA ^extension[=].valueString.extension[0].extension[+].url = "content"
* #DEA ^extension[=].valueString.extension[0].extension[=].valueString = "Use case: dit is een registratienummer die een persoon of organisatie aanduidt, gerelateerd aan gereguleerde substantie-wetgeving en transacties."
* #DEA ^designation[0].language = #nl
* #DEA ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DEA ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DEA ^designation[=].value = "Amerikaanse Drug Enforcement Administration registratienummer"
* #DFN "Drug Furnishing or prescriptive authority Number"
* #DFN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #DFN ^extension[=].valueString = "An identifier issued to a health care provider authorizing the person to write drug orders Use Case: A nurse practitioner has authorization to furnish or prescribe pharmaceutical substances; this identifier is in component 1."
* #DFN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #DFN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #DFN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #DFN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #DFN ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie uitgegeven aan een zorgverlener die de persoon autoriseert om medicatie voor te schrijven. Use case: een nurse practitioner heeft toestemming om farmaceutische substanties te verstrekken of voor te schrijven; deze identificatie staat in component 1."
* #DFN ^designation[0].language = #nl
* #DFN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DFN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DFN ^designation[=].value = "Medicatieverstrekker of voorschrijver autoriteitnummer"
* #DI "Diner's Club card"
* #DI ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #DI ^extension[=].valueString = "Deprecated and replaced by BC in v 2.5."
* #DI ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #DI ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #DI ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #DI ^extension[=].valueString.extension[0].extension[+].url = "content"
* #DI ^extension[=].valueString.extension[0].extension[=].valueString = "Vervangen door BC vanaf v2.5"
* #DI ^designation[0].language = #de
* #DI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DI ^designation[=].value = "Diners Club"
* #DI ^designation[+].language = #nl
* #DI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DI ^designation[=].value = "Diner's Club"
* #DL "Driver's license number"
* #DL ^designation[0].language = #de
* #DL ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DL ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DL ^designation[=].value = "Führerscheinnummer"
* #DL ^designation[+].language = #nl
* #DL ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DL ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DL ^designation[=].value = "Rijbewijsnummer"
* #DN "Doctor number"
* #DN ^designation[0].language = #de
* #DN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DN ^designation[=].value = "Arztnummer"
* #DN ^designation[+].language = #nl
* #DN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DN ^designation[=].value = "Artsnummer"
* #DO "Osteopathic License number"
* #DO ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #DO ^extension[=].valueString = "An identifier that is unique to an osteopath within the jurisdiction of a licensing board."
* #DO ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #DO ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #DO ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #DO ^extension[=].valueString.extension[0].extension[+].url = "content"
* #DO ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een osteopaat binnen het rechtsgebied van de licentiegever."
* #DO ^designation[0].language = #nl
* #DO ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DO ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DO ^designation[=].value = "Osteopatisch licentienummer"
* #DP "Diplomatic Passport"
* #DP ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #DP ^extension[=].valueString = "A number assigned to a diplomatic passport."
* #DP ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #DP ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #DP ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #DP ^extension[=].valueString.extension[0].extension[+].url = "content"
* #DP ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie van een diplomatiek paspoort."
* #DP ^designation[0].language = #nl
* #DP ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DP ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DP ^designation[=].value = "Diplomatiek paspoort"
* #DPM "Podiatrist license number"
* #DPM ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #DPM ^extension[=].valueString = "An identifier that is unique to a podiatrist within the jurisdiction of the licensing board."
* #DPM ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #DPM ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #DPM ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #DPM ^extension[=].valueString.extension[0].extension[+].url = "content"
* #DPM ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een podoloog binnen het rechtsgebied van de licentiegever."
* #DPM ^designation[0].language = #nl
* #DPM ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DPM ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DPM ^designation[=].value = "Podoloog licentienummer"
* #DR "Donor Registration Number"
* #DR ^designation[0].language = #nl
* #DR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DR ^designation[=].value = "Donorregistratienummer"
* #DS "Discover Card"
* #DS ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #DS ^extension[=].valueString = "Deprecated and replaced by BC in v 2.5."
* #DS ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #DS ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #DS ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #DS ^extension[=].valueString.extension[0].extension[+].url = "content"
* #DS ^extension[=].valueString.extension[0].extension[=].valueString = "Vervangen door BC vanaf v2.5"
* #DS ^designation[0].language = #de
* #DS ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DS ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DS ^designation[=].value = "Discover Card"
* #DS ^designation[+].language = #nl
* #DS ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #DS ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #DS ^designation[=].value = "Discover kaart"
* #EI "Employee number"
* #EI ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #EI ^extension[=].valueString = "A number that uniquely identifies an employee to an employer."
* #EI ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #EI ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #EI ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #EI ^extension[=].valueString.extension[0].extension[+].url = "content"
* #EI ^extension[=].valueString.extension[0].extension[=].valueString = "Een aanduiding die een werknemer uniek identificeert ten opzichte van een werkgever"
* #EI ^designation[0].language = #de
* #EI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #EI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #EI ^designation[=].value = "Arbeitnehmernummer"
* #EI ^designation[+].language = #nl
* #EI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #EI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #EI ^designation[=].value = "Werknemernummer"
* #EN "Employer number"
* #EN ^designation[0].language = #de
* #EN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #EN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #EN ^designation[=].value = "Arbeitgebernummer"
* #EN ^designation[+].language = #nl
* #EN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #EN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #EN ^designation[=].value = "Werkgevernummer"
* #ESN "Staff Enterprise Number"
* #ESN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #ESN ^extension[=].valueString = "An identifier that is unique to a staff member within an enterprise (as identified by the Assigning Authority)."
* #ESN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #ESN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #ESN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #ESN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #ESN ^extension[=].valueString.extension[0].extension[=].valueString = "Een aanduiding die een medewerker uniek identificeert binnen een bedrijf (zoals geïdentificeerd door de toekennende autoriteit)"
* #ESN ^designation[0].language = #nl
* #ESN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #ESN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #ESN ^designation[=].value = "Medewerker bedrijfsnummer"
* #FDR "Fetal Death Report ID"
* #FDRFN "Fetal Death Report File Number"
* #FI "Facility ID"
* #FI ^designation[0].language = #nl
* #FI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #FI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #FI ^designation[=].value = "Afdeling-ID"
* #FILL "Filler Identifier"
* #GI "Guarantor internal identifier"
* #GI ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #GI ^extension[=].valueString = "Class: Financial"
* #GI ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #GI ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #GI ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #GI ^extension[=].valueString.extension[0].extension[+].url = "content"
* #GI ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: financieel"
* #GI ^designation[0].language = #de
* #GI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #GI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #GI ^designation[=].value = "interne ID des Zahlungspflichtigen"
* #GI ^designation[+].language = #nl
* #GI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #GI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #GI ^designation[=].value = "Interne garantsteller identificatie"
* #GL "General ledger number"
* #GL ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #GL ^extension[=].valueString = "Class: Financial"
* #GL ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #GL ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #GL ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #GL ^extension[=].valueString.extension[0].extension[+].url = "content"
* #GL ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: financieel"
* #GL ^designation[0].language = #nl
* #GL ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #GL ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #GL ^designation[=].value = "Grootboeknummer"
* #GN "Guarantor external  identifier"
* #GN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #GN ^extension[=].valueString = "Class: Financial"
* #GN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #GN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #GN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #GN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #GN ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: financieel"
* #GN ^designation[0].language = #de
* #GN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #GN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #GN ^designation[=].value = "externe ID des Zahlungspflichtigen"
* #GN ^designation[+].language = #nl
* #GN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #GN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #GN ^designation[=].value = "Externe garantsteller identificatie"
* #HC "Health Card Number"
* #HC ^designation[0].language = #nl
* #HC ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #HC ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #HC ^designation[=].value = "Gezondheidskaartnummer"
* #IND "Indigenous/Aboriginal"
* #IND ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #IND ^extension[=].valueString = "A number assigned to a member of an indigenous or aboriginal group outside of Canada."
* #IND ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #IND ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #IND ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #IND ^extension[=].valueString.extension[0].extension[+].url = "content"
* #IND ^extension[=].valueString.extension[0].extension[=].valueString = "Een nummer toegekend aan een lid van een inheemse of aboriginal groep buiten Canada."
* #IND ^designation[0].language = #nl
* #IND ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #IND ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #IND ^designation[=].value = "Inheems/Aboriginal"
* #JHN "Jurisdictional health number (Canada)"
* #JHN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #JHN ^extension[=].valueString = "Class: Insurance 2 uses: a) UK jurisdictional CHI number; b) Canadian provincial health card number:"
* #JHN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #JHN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #JHN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #JHN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #JHN ^extension[=].valueString.extension[0].extension[=].valueString = "2 use cases: a) CHI-nummer van rechtsgebied in Verenigd Koninkrijk; b) Canadees provinciaal gezondheidskaartnummer:"
* #JHN ^designation[0].language = #nl
* #JHN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #JHN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #JHN ^designation[=].value = "Rechtsgebied gezondheidsnummer (Canada)"
* #LACSN "Laboratory Accession ID"
* #LACSN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #LACSN ^extension[=].valueString = "A laboratory accession id is used in the laboratory domain. The concept of accession is used in other domains such as radiology, so the LACSN is used to distinguish a lab accession id from an radiology accession id"
* #LACSN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #LACSN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #LACSN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #LACSN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #LACSN ^extension[=].valueString.extension[0].extension[=].valueString = "Een laboratorium accessie ID wordt gebruikt in het laboratoriumdomein. Het concept accessie wordt ook in andere domeinen gebruikt zoals radiologie, dus de LACSN wordt gebruikt om onderscheid te maken tussen een lab accessie ID en een radiologie accessie ID."
* #LACSN ^designation[0].language = #nl
* #LACSN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #LACSN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #LACSN ^designation[=].value = "Laboratorium Accessie ID"
* #LANR "Lifelong physician number"
* #LANR ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #LANR ^extension[=].valueString = "Lebenslange Arztnummer - for use in German realm."
* #LANR ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #LANR ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #LANR ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #LANR ^extension[=].valueString.extension[0].extension[+].url = "content"
* #LANR ^extension[=].valueString.extension[0].extension[=].valueString = "Lebenslange Artznummer - voor gebruik in Duitse context."
* #LANR ^designation[0].language = #nl
* #LANR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #LANR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #LANR ^designation[=].value = "Levenslang zorgverlenernummer"
* #LI "Labor and industries number"
* #LI ^designation[0].language = #nl
* #LI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #LI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #LI ^designation[=].value = "Arbeid en industrienummer"
* #LN "License number"
* #LN ^designation[0].language = #nl
* #LN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #LN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #LN ^designation[=].value = "Licentienummer"
* #LR "Local Registry ID"
* #LR ^designation[0].language = #nl
* #LR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #LR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #LR ^designation[=].value = "Lokaal register ID"
* #MA "Patient Medicaid number"
* #MA ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MA ^extension[=].valueString = "Class: Insurance"
* #MA ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MA ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MA ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MA ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MA ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: verzekering"
* #MA ^designation[0].language = #de
* #MA ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MA ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MA ^designation[=].value = "Armennummer"
* #MA ^designation[+].language = #nl
* #MA ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MA ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MA ^designation[=].value = "Medicaid patiëntnummer"
* #MB "Member Number"
* #MB ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MB ^extension[=].valueString = "An identifier for the insured of an insurance policy (this insured always has a subscriber), usually assigned by the insurance carrier. Use Case: Person is covered by an insurance policy. This person may or may not be the subscriber of the policy."
* #MB ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MB ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MB ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MB ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MB ^extension[=].valueString.extension[0].extension[=].valueString = "Use case: persoon is gedekt door verzekeringspolis. Deze persoon is mogelijk tevens hoofdpolishouder."
* #MB ^designation[0].language = #nl
* #MB ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MB ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MB ^designation[=].value = "Lidnummer"
* #MC "Patient's Medicare number"
* #MC ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MC ^extension[=].valueString = "Class: Insurance"
* #MC ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MC ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MC ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MC ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MC ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: verzekering"
* #MC ^designation[0].language = #de
* #MC ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MC ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MC ^designation[=].value = "Rentnernummer"
* #MC ^designation[+].language = #nl
* #MC ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MC ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MC ^designation[=].value = "Medicare patiëntnummer"
* #MCD "Practitioner Medicaid number"
* #MCD ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MCD ^extension[=].valueString = "Class: Insurance"
* #MCD ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MCD ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MCD ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MCD ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MCD ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: verzekering"
* #MCD ^designation[0].language = #nl
* #MCD ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MCD ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MCD ^designation[=].value = "Medicaid zorgverlenernummer"
* #MCN "Microchip Number"
* #MCN ^designation[0].language = #nl
* #MCN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MCN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MCN ^designation[=].value = "Microchip-nummer"
* #MCR "Practitioner Medicare number"
* #MCR ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MCR ^extension[=].valueString = "Class: Insurance"
* #MCR ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MCR ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MCR ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MCR ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MCR ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: verzekering"
* #MCR ^designation[0].language = #nl
* #MCR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MCR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MCR ^designation[=].value = "Medicare zorgverlenernummer"
* #MCT "Marriage Certificate"
* #MCT ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MCT ^extension[=].valueString = "A number associated with a document identifying the event of a person's marriage."
* #MCT ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MCT ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MCT ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MCT ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MCT ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie gekoppeld aan een document dat het huwelijk van een persoon aantoont."
* #MCT ^designation[0].language = #nl
* #MCT ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MCT ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MCT ^designation[=].value = "Huwelijkscertificaat"
* #MD "Medical License number"
* #MD ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MD ^extension[=].valueString = "An identifier that is unique to a medical doctor within the jurisdiction of a licensing board. Use Case: These license numbers are sometimes used as identifiers. In some states, the same authority issues all three identifiers, e.g., medical, osteopathic, and physician assistant licenses all issued by one state medical board. For this case, the CX data type requires distinct identifier types to accurately interpret component 1. Additionally, the distinction among these license types is critical in most health care settings (this is not to convey full licensing information, which requires a segment to support all related attributes)."
* #MD ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MD ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MD ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MD ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MD ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die unieke is voor een arts binnen het rechtsgebied van een licentiegever. Use case: deze licentienummers worden soms gebruikt ter identificatie. In sommige staten, geeft dezelfde autoriteit alle drie identificaties uit, bijv. medisch, osteopathisch, en arts-assistent licenties die alle worden uitgegeven door één overheidsinstantie. Voor dit geval vereist het CX datatype afzonderlijke identificatietypen om component 1 te kunnen interpreteren. Daarnaast is onderscheid tussen deze licentietypen essentieel in de meeste zorgsituaties (niet om volledige licentie-informatie door te geven, waarvoor een segment voor alle gerelateerde attributen nodig zou zijn)."
* #MD ^designation[0].language = #nl
* #MD ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MD ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MD ^designation[=].value = "Geneeskundig licentienummer"
* #MI "Military ID number"
* #MI ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MI ^extension[=].valueString = "A number assigned to an individual who has had military duty, but is not currently on active duty. The number is assigned by the DOD or Veterans' Affairs (VA)."
* #MI ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MI ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MI ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MI ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MI ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie toegekend aan een persoon die in militaire dienst is geweest, maar op dit moment niet in actieve dienst. Het nummer wordt toegekend door de Amerikaanse Department of Defense (DOD) of Veteran's Affairs (VA)."
* #MI ^designation[0].language = #nl
* #MI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MI ^designation[=].value = "Militaire identificatie"
* #MR "Medical record number"
* #MR ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MR ^extension[=].valueString = "An identifier that is unique to a patient within a set of medical records, not necessarily unique within an application."
* #MR ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MR ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MR ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MR ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MR ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie gekoppeld aan een patiënt binnen een set van medische dossiers, niet noodzakelijk uniek binnen een applicatie."
* #MR ^designation[0].language = #de
* #MR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MR ^designation[=].value = "Krankenaktennummer"
* #MR ^designation[+].language = #nl
* #MR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MR ^designation[=].value = "Medisch dossiernummer"
* #MRT "Temporary Medical Record Number"
* #MRT ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MRT ^extension[=].valueString = "Temporary version of a Medical Record Number Use Case: An ancillary system that does not normally assign medical record numbers is the first time to register a patient. This ancillary system will generate a temporary medical record number that will only be used until an official medical record number is assigned."
* #MRT ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MRT ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MRT ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MRT ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MRT ^extension[=].valueString.extension[0].extension[=].valueString = "Use case: een satellietsysteem dat normaal geen medische dossiernummer toekent is het eerste systeem waar een patiënt wordt geregistreerd. Dit satellietsysteem geeft een tijdelijk medisch dossiernummer uit dat alleen wordt gebruikt totdat het officiële medisch dossiernummer wordt toegekend."
* #MRT ^designation[0].language = #nl
* #MRT ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MRT ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MRT ^designation[=].value = "Tijdelijke medisch dossiernummer"
* #MS "MasterCard"
* #MS ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #MS ^extension[=].valueString = "Deprecated and replaced by BC in v 2.5."
* #MS ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #MS ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #MS ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #MS ^extension[=].valueString.extension[0].extension[+].url = "content"
* #MS ^extension[=].valueString.extension[0].extension[=].valueString = "Vervangen door BC vanaf v2.5"
* #MS ^designation[0].language = #de
* #MS ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MS ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MS ^designation[=].value = "MasterCard"
* #MS ^designation[+].language = #nl
* #MS ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #MS ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #MS ^designation[=].value = "MasterCard"
* #NBSNR "Secondary physician office number"
* #NBSNR ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #NBSNR ^extension[=].valueString = "Nebenbetriebsstättennummer - for use in the German realm."
* #NBSNR ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #NBSNR ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #NBSNR ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #NBSNR ^extension[=].valueString.extension[0].extension[+].url = "content"
* #NBSNR ^extension[=].valueString.extension[0].extension[=].valueString = "Nebenbetriebsstättennummer - voor gebruik in Duitse context."
* #NBSNR ^designation[0].language = #nl
* #NBSNR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NBSNR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NBSNR ^designation[=].value = "Secundaire zorgverlenerpraktijknummer"
* #NCT "Naturalization Certificate"
* #NCT ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #NCT ^extension[=].valueString = "A number associated with a document identifying a person's retention of citizenship in a particular country."
* #NCT ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #NCT ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #NCT ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #NCT ^extension[=].valueString.extension[0].extension[+].url = "content"
* #NCT ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie gekoppeld aan een document dat het verwerven van staatburgerschap in een bepaald land aantoont."
* #NCT ^designation[0].language = #nl
* #NCT ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NCT ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NCT ^designation[=].value = "Naturalisatiecertificaat"
* #NE "National employer identifier"
* #NE ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #NE ^extension[=].valueString = "In the US, the Assigning Authority for this value is typically CMS, but it may be used by all providers and insurance companies in HIPAA related transactions."
* #NE ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #NE ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #NE ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #NE ^extension[=].valueString.extension[0].extension[+].url = "content"
* #NE ^extension[=].valueString.extension[0].extension[=].valueString = "In de VS is de toekennende autoriteit voor deze waarde meestal CMS, maar het kan worden gebruikt voor alle zorgaanbieders/zorverleners en verzekeraars in HIPAA gerelateerde transacties."
* #NE ^designation[0].language = #nl
* #NE ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NE ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NE ^designation[=].value = "Nationale werkgeveridentificatie"
* #NH "National Health Plan Identifier"
* #NH ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #NH ^extension[=].valueString = "Class: Insurance Used for the UK NHS national identifier. In the US, the Assigning Authority for this value is typically CMS, but it may be used by all providers and insurance companies in HIPAA related transactions."
* #NH ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #NH ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #NH ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #NH ^extension[=].valueString.extension[0].extension[+].url = "content"
* #NH ^extension[=].valueString.extension[0].extension[=].valueString = "Ten behoeve de NHS nationale identificatie in het Verenigd Koninkrijk"
* #NH ^designation[0].language = #nl
* #NH ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NH ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NH ^designation[=].value = "Nationaal zorgverzekeringsnummer"
* #NI "National unique individual identifier"
* #NI ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #NI ^extension[=].valueString = "Class: Insurance In the US, the Assigning Authority for this value is typically CMS, but it may be used by all providers and insurance companies in HIPAA related transactions."
* #NI ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #NI ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #NI ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #NI ^extension[=].valueString.extension[0].extension[+].url = "content"
* #NI ^extension[=].valueString.extension[0].extension[=].valueString = "In de VS is de toekennende autoriteit voor deze waarde normalerwijs CMS, maar het kan door alle zorgaanbieders en verzekeraars worden gebruikt in HIPAA-gerelateerde transacties."
* #NI ^designation[0].language = #nl
* #NI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NI ^designation[=].value = "Nationale unieke identificatie persoon"
* #NII "National Insurance Organization Identifier"
* #NII ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #NII ^extension[=].valueString = "Class: Insurance In Germany a national identifier for an insurance company. It is printed on the insurance card (health card). It is not to be confused with the health card number itself. Krankenkassen-ID der KV-Karte"
* #NII ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #NII ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #NII ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #NII ^extension[=].valueString.extension[0].extension[+].url = "content"
* #NII ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: verzekering. In Duitsland is dit een nationale identificatie voor een verzekeraar. Deze staat op de verzekeringskaart. De identificatie moet niet worden verward met het kaartnummer zelf. Krankenkassen-ID der KV-Karte"
* #NII ^designation[0].language = #de
* #NII ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NII ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NII ^designation[=].value = "Institutskennzeichen der Krankenkasse"
* #NII ^designation[+].language = #nl
* #NII ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NII ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NII ^designation[=].value = "Nationale verzekeraar identificatie"
* #NIIP "National Insurance Payor Identifier (Payor)"
* #NIIP ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #NIIP ^extension[=].valueString = "Class: Insurance In Germany the insurance identifier addressed as the payor. Krankenkassen-ID des Rechnungsempfängers Use case: a subdivision issues the card with their identifier, but the main division is going to pay the invoices."
* #NIIP ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #NIIP ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #NIIP ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #NIIP ^extension[=].valueString.extension[0].extension[+].url = "content"
* #NIIP ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: verzekering. In Duitsland is dit een nationale identificatie voor een betaler. Krankenkassen-ID des Rechnungsempfängers. Use case: een subdivisie geeft een kaart af met deze identificatie, maar de hoofddivisie betaalt de facturen."
* #NIIP ^designation[0].language = #de
* #NIIP ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NIIP ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NIIP ^designation[=].value = "Vertragskassennummer (VKNR)"
* #NIIP ^designation[+].language = #nl
* #NIIP ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NIIP ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NIIP ^designation[=].value = "Nationale verzekeraar betaler identificatie (Betaler)"
* #NNxxx "National Person Identifier where the xxx is the ISO table 3166 3-character (alphabetic) country code"
* #NNxxx ^designation[0].language = #nl
* #NNxxx ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NNxxx ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NNxxx ^designation[=].value = "Nationale persoonsidentificatie waarbij xxx de ISO-tabel 3166 3-tekens (alfabetisch) landcode is"
* #NP "Nurse practitioner number"
* #NP ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #NP ^extension[=].valueString = "An identifier that is unique to a nurse practitioner within the jurisdiction of a certifying board."
* #NP ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #NP ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #NP ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #NP ^extension[=].valueString.extension[0].extension[+].url = "content"
* #NP ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een nurse practitioner binnen het rechtsgebied van een certificeringsinstantie"
* #NP ^designation[0].language = #nl
* #NP ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NP ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NP ^designation[=].value = "Nurse practitioner nummer"
* #NPI "National provider identifier"
* #NPI ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #NPI ^extension[=].valueString = "Class: Insurance In the US, the Assigning Authority for this value is typically CMS, but it may be used by all providers and insurance companies in HIPAA related transactions."
* #NPI ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #NPI ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #NPI ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #NPI ^extension[=].valueString.extension[0].extension[+].url = "content"
* #NPI ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: verzekering. UZI-nummer."
* #NPI ^designation[0].language = #nl
* #NPI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #NPI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #NPI ^designation[=].value = "Nationale zorgaanbieder/zorgverlener identificatie"
* #OBI "Observation Instance Identifier"
* #OD "Optometrist license number"
* #OD ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #OD ^extension[=].valueString = "A number that is unique to an individual optometrist within the jurisdiction of the licensing board."
* #OD ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #OD ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #OD ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #OD ^extension[=].valueString.extension[0].extension[+].url = "content"
* #OD ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een optometrist binnen het rechtsgebied van een certificeringsinstantie"
* #OD ^designation[0].language = #nl
* #OD ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #OD ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #OD ^designation[=].value = "Optometrist nummer"
* #PA "Physician Assistant number"
* #PA ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #PA ^extension[=].valueString = "An identifier that is unique to a physician assistant within the jurisdiction of a licensing board"
* #PA ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #PA ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #PA ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #PA ^extension[=].valueString.extension[0].extension[+].url = "content"
* #PA ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een zorgverlener binnen het rechtsgebied van een certificeringsinstantie"
* #PA ^designation[0].language = #de
* #PA ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PA ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PA ^designation[=].value = "Assistenzarztnummer"
* #PA ^designation[+].language = #nl
* #PA ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PA ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PA ^designation[=].value = "Zorgverlener nummer"
* #PC "Parole Card"
* #PC ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #PC ^extension[=].valueString = "A number identifying a person on parole."
* #PC ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #PC ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #PC ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #PC ^extension[=].valueString.extension[0].extension[+].url = "content"
* #PC ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie van een persoon die subject is van reclassering"
* #PC ^designation[0].language = #nl
* #PC ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PC ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PC ^designation[=].value = "Reclasseringskaart"
* #PCN "Penitentiary/correctional institution Number"
* #PCN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #PCN ^extension[=].valueString = "A number assigned to individual who is incarcerated."
* #PCN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #PCN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #PCN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #PCN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #PCN ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie toegekend aan een persoon die inbewaringgesteld/gevangengezet is"
* #PCN ^designation[0].language = #nl
* #PCN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PCN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PCN ^designation[=].value = "Penitentiaire instellings-nummer"
* #PE "Living Subject Enterprise Number"
* #PE ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #PE ^extension[=].valueString = "An identifier that is unique to a living subject within an enterprise (as identified by the Assigning Authority)."
* #PE ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #PE ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #PE ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #PE ^extension[=].valueString.extension[0].extension[+].url = "content"
* #PE ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een levend wezen binnen een bedrijf (zoals geïdentificeerd door de toekennende autoriteit)."
* #PE ^designation[0].language = #nl
* #PE ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PE ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PE ^designation[=].value = "Levend wezen bedrijfs-nummer"
* #PEN "Pension Number"
* #PEN ^designation[0].language = #nl
* #PEN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PEN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PEN ^designation[=].value = "Pensioennummer"
* #PHC "Public Health Case Identifier"
* #PHE "Public Health Event Identifier"
* #PHO "Public Health Official ID"
* #PI "Patient internal identifier"
* #PI ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #PI ^extension[=].valueString = "A number that is unique to a patient within an Assigning Authority."
* #PI ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #PI ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #PI ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #PI ^extension[=].valueString.extension[0].extension[+].url = "content"
* #PI ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een patiënt binnen een toekennende autoriteit."
* #PI ^designation[0].language = #de
* #PI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PI ^designation[=].value = "interne Patienten-ID"
* #PI ^designation[+].language = #nl
* #PI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PI ^designation[=].value = "Intern patiëntnummer"
* #PLAC "Placer Identifier"
* #PN "Person number"
* #PN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #PN ^extension[=].valueString = "A number that is unique to a living subject within an Assigning Authority."
* #PN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #PN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #PN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #PN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #PN ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een levend wezen binnen een toekennende autoriteit."
* #PN ^designation[0].language = #de
* #PN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PN ^designation[=].value = "Personen-ID"
* #PN ^designation[+].language = #nl
* #PN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PN ^designation[=].value = "Persoonsnummer"
* #PNT "Temporary Living Subject Number"
* #PNT ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #PNT ^extension[=].valueString = "Temporary version of a Lining Subject Number."
* #PNT ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #PNT ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #PNT ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #PNT ^extension[=].valueString.extension[0].extension[+].url = "content"
* #PNT ^extension[=].valueString.extension[0].extension[=].valueString = "Tijdelijke versie van een Levend wezen nummer"
* #PNT ^designation[0].language = #nl
* #PNT ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PNT ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PNT ^designation[=].value = "Tijdelijk levend wezen nummer"
* #PPIN "Medicare/CMS Performing Provider Identification Number"
* #PPIN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #PPIN ^extension[=].valueString = "Class:  Insurance"
* #PPIN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #PPIN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #PPIN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #PPIN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #PPIN ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: verzekering"
* #PPIN ^designation[0].language = #nl
* #PPIN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PPIN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PPIN ^designation[=].value = "Medicare/CMS Uitvoerende zorgaanbieder/zorgverlener identificatienummer"
* #PPN "Passport number"
* #PPN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #PPN ^extension[=].valueString = "A unique number assigned to the document affirming that a person is a citizen of the country. In the US this number is issued only by the State Department."
* #PPN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #PPN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #PPN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #PPN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #PPN ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een wettig document dat bevestigt dat een persoon een staatsburger van het land is."
* #PPN ^designation[0].language = #de
* #PPN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PPN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PPN ^designation[=].value = "Passnummer"
* #PPN ^designation[+].language = #nl
* #PPN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PPN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PPN ^designation[=].value = "Paspoortnummer"
* #PRC "Permanent Resident Card Number"
* #PRC ^designation[0].language = #nl
* #PRC ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PRC ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PRC ^designation[=].value = "Permanente verblijfsvergunning-nummer"
* #PRN "Provider number"
* #PRN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #PRN ^extension[=].valueString = "A number that is unique to an individual provider, a provider group or an organization within an Assigning Authority. Use case: This allows PRN to represent either an individual (a nurse) or a group/organization (orthopedic surgery team)."
* #PRN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #PRN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #PRN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #PRN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #PRN ^extension[=].valueString.extension[0].extension[=].valueString = "Use case: hiermee wordt een persoon (zoals een verpleegkundige) of een groep/organisatie (orthopedisch chirurgisch team) aangeduid."
* #PRN ^designation[0].language = #nl
* #PRN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PRN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PRN ^designation[=].value = "Zorgaanbieder/zorgverlener-nummer"
* #PT "Patient external identifier"
* #PT ^designation[0].language = #de
* #PT ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PT ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PT ^designation[=].value = "externe Patienten-ID"
* #PT ^designation[+].language = #nl
* #PT ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #PT ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #PT ^designation[=].value = "Extern patiëntnummer"
* #QA "QA number"
* #QA ^designation[0].language = #nl
* #QA ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #QA ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #QA ^designation[=].value = "Quality Assurance-nummer"
* #RI "Resource identifier"
* #RI ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #RI ^extension[=].valueString = "A generalized resource identifier. Use Case: An identifier type is needed to accommodate what are commonly known as resources. The resources can include human (e.g. a respiratory therapist), non-human (e.g., a companion animal), inanimate object (e.g., an exam room), organization (e.g., diabetic education class) or any other physical or logical entity."
* #RI ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #RI ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #RI ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #RI ^extension[=].valueString.extension[0].extension[+].url = "content"
* #RI ^extension[=].valueString.extension[0].extension[=].valueString = "Use case: een identificatietype is nodig voor wat algemeen 'resources' heten. Hieronder vallen menselijke resources (bijv. een respiratoir therapeut), niet-menselijke resources (bijv., een begeleidend dier), niet-levende entiteiten (bijv. een onderzoeksruimte), organisaties (bijv. diabetesonderwijsklas) of andere fysieke of logische entiteiten."
* #RI ^designation[0].language = #nl
* #RI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #RI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #RI ^designation[=].value = "Resource identicatie"
* #RN "Registered Nurse Number"
* #RN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #RN ^extension[=].valueString = "An identifier that is unique to a registered nurse within the jurisdiction of the licensing board."
* #RN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #RN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #RN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #RN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #RN ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een geregistreerde verpleegkundige binnen het rechtsgebied van een licenserende instantie."
* #RN ^designation[0].language = #nl
* #RN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #RN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #RN ^designation[=].value = "Verpleegkundige registratienummer"
* #RPH "Pharmacist license number"
* #RPH ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #RPH ^extension[=].valueString = "An identifier that is unique to a pharmacist within the jurisdiction of the licensing board."
* #RPH ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #RPH ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #RPH ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #RPH ^extension[=].valueString.extension[0].extension[+].url = "content"
* #RPH ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een apotheek binnen het rechtsgebied van een licenserende instantie."
* #RPH ^designation[0].language = #nl
* #RPH ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #RPH ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #RPH ^designation[=].value = "Apotheek licentienummer"
* #RR "Railroad Retirement number"
* #RR ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #RR ^extension[=].valueString = "An identifier for an individual enrolled with the Railroad Retirement Administration.  Analogous to, but distinct from, a Social Security Number"
* #RR ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #RR ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #RR ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #RR ^extension[=].valueString.extension[0].extension[+].url = "content"
* #RR ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een persoon binnen de Railroad Retirement Administration. Aanaloog aan, maar anders dan een SOFI-nummer."
* #RR ^designation[0].language = #de
* #RR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #RR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #RR ^designation[=].value = "Seniorenkartennummer"
* #RR ^designation[+].language = #nl
* #RR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #RR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #RR ^designation[=].value = "Spoorwegen pensioneringsnummer"
* #RRI "Regional registry ID"
* #RRI ^designation[0].language = #nl
* #RRI ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #RRI ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #RRI ^designation[=].value = "Regionaal register-ID"
* #RRP "Railroad Retirement Provider"
* #RRP ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #RRP ^extension[=].valueString = "Class:  Insurance"
* #RRP ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #RRP ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #RRP ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #RRP ^extension[=].valueString.extension[0].extension[+].url = "content"
* #RRP ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: verzekering."
* #RRP ^designation[0].language = #nl
* #RRP ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #RRP ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #RRP ^designation[=].value = "Spoorwegen pensioenaanbieder"
* #SB "Social Beneficiary Identifier"
* #SID "Specimen ID"
* #SID ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #SID ^extension[=].valueString = "Identifier for a specimen. Used when it is not known if the specimen ID is a unique specimen ID (USID) or an ancestor ID (ASID)."
* #SID ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #SID ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #SID ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #SID ^extension[=].valueString.extension[0].extension[+].url = "content"
* #SID ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een monster. Gebruikt wanneer onbekend is of het monsternummer een Uniek monsternummer (USID) of een Oorspronkelijk monsternummer (ASID) is."
* #SID ^designation[0].language = #nl
* #SID ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #SID ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #SID ^designation[=].value = "Monsternummer"
* #SL "State license"
* #SL ^designation[0].language = #nl
* #SL ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #SL ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #SL ^designation[=].value = "Staat-licentie"
* #SN "Subscriber Number"
* #SN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #SN ^extension[=].valueString = "Class: Insurance An identifier for a subscriber of an insurance policy which is unique for, and usually assigned by, the insurance carrier. Use Case: A person is the subscriber of an insurance policy. The person’s family may be plan members, but are not the subscriber."
* #SN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #SN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #SN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #SN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #SN ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie voor een hoofdverzekerde onder een verzekeringspolis die uniek is voor, en normaal wordt toegekend door, een verzekeraar."
* #SN ^designation[0].language = #nl
* #SN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #SN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #SN ^designation[=].value = "Hoofdverzekerdenummer"
* #SNBSN "State assigned NDBS card Identifier"
* #SNO "Serial Number"
* #SP "Study Permit"
* #SP ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #SP ^extension[=].valueString = "A number associated with a permit identifying a person who is a resident of a jurisdiction for the purpose of education."
* #SP ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #SP ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #SP ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #SP ^extension[=].valueString.extension[0].extension[+].url = "content"
* #SP ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een visum voor een persoon die inwoner van rechtsgebied is ten behoeve van een opleiding."
* #SP ^designation[0].language = #nl
* #SP ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #SP ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #SP ^designation[=].value = "Opleidingsvisum"
* #SR "State registry ID"
* #SR ^designation[0].language = #nl
* #SR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #SR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #SR ^designation[=].value = "Staat register-ID"
* #SS "Social Security number"
* #SS ^designation[0].language = #de
* #SS ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #SS ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #SS ^designation[=].value = "Sozialversicherungsnummer"
* #SS ^designation[+].language = #nl
* #SS ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #SS ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #SS ^designation[=].value = "SOFI-nummer"
* #STN "Shipment Tracking Number"
* #TAX "Tax ID number"
* #TAX ^designation[0].language = #de
* #TAX ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #TAX ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #TAX ^designation[=].value = "Steueridentifikationsnummer"
* #TAX ^designation[+].language = #nl
* #TAX ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #TAX ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #TAX ^designation[=].value = "Belasting identificatie"
* #TN "Treaty Number/ (Canada)"
* #TN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #TN ^extension[=].valueString = "A number assigned to a member of an indigenous group in Canada. Use Case: First Nation."
* #TN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #TN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #TN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #TN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #TN ^extension[=].valueString.extension[0].extension[=].valueString = "Use case: First Nation."
* #TN ^designation[0].language = #nl
* #TN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #TN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #TN ^designation[=].value = "Verdragnummer/ (Canada)"
* #TPR "Temporary Permanent Resident (Canada)"
* #TPR ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #TPR ^extension[=].valueString = "A number associated with a document identifying a person's temporary permanent resident status."
* #TPR ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #TPR ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #TPR ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #TPR ^extension[=].valueString.extension[0].extension[+].url = "content"
* #TPR ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie die uniek is voor een apotheek binnen het rechtsgebied van een licenserende instantie."
* #TPR ^designation[0].language = #nl
* #TPR ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #TPR ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #TPR ^designation[=].value = "Tijdelijk permanente inwoner (Canada)"
* #TRL "Training License Number"
* #U "Unspecified identifier"
* #U ^designation[0].language = #nl
* #U ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #U ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #U ^designation[=].value = "Niet-gspecificeerde identificatie"
* #UDI "Universal Device Identifier"
* #UPIN "Medicare/CMS (formerly HCFA)'s Universal Physician Identification numbers"
* #UPIN ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #UPIN ^extension[=].valueString = "Class: Insurance An identifier for a provider within the CMS/Medicare program.  A globally unique identifier for the provider in the Medicare program."
* #UPIN ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #UPIN ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #UPIN ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #UPIN ^extension[=].valueString.extension[0].extension[+].url = "content"
* #UPIN ^extension[=].valueString.extension[0].extension[=].valueString = "Klasse: verzekering. Een identificatie van een zorgverlener/zorgaanbieder binnen het CMS/Medicare programma. Een wereldwij unieke identificatie voor de zorgverlener/zorgaanbieder in het Medicare programma."
* #UPIN ^designation[0].language = #nl
* #UPIN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #UPIN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #UPIN ^designation[=].value = "Medicare/HCFA's Universele Zorgverlener Identificatie Nummers"
* #USID "Unique Specimen ID"
* #USID ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #USID ^extension[=].valueString = "A unique identifier for a specimen."
* #USID ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #USID ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #USID ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #USID ^extension[=].valueString.extension[0].extension[+].url = "content"
* #USID ^extension[=].valueString.extension[0].extension[=].valueString = "Een unieke identificatie voor een monster."
* #USID ^designation[0].language = #nl
* #USID ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #USID ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #USID ^designation[=].value = "Uniek monsternummer"
* #VN "Visit number"
* #VN ^designation[0].language = #de
* #VN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #VN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #VN ^designation[=].value = "Fallnummer"
* #VN ^designation[+].language = #nl
* #VN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #VN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #VN ^designation[=].value = "Bezoeknummer"
* #VP "Visitor Permit"
* #VP ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #VP ^extension[=].valueString = "A number associated with a document identifying a person as a visitor of a jurisdiction or country."
* #VP ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #VP ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #VP ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #VP ^extension[=].valueString.extension[0].extension[+].url = "content"
* #VP ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie gekoppeld aan een visum voor een persoon als toerist in een bepaald rechtsgebied of land."
* #VP ^designation[0].language = #de
* #VP ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #VP ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #VP ^designation[=].value = "Besucherkennung"
* #VP ^designation[+].language = #nl
* #VP ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #VP ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #VP ^designation[=].value = "Toeristenvisum"
* #VS "VISA"
* #VS ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #VS ^extension[=].valueString = "Deprecated and replaced by BC in v 2.5."
* #VS ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #VS ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #VS ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #VS ^extension[=].valueString.extension[0].extension[+].url = "content"
* #VS ^extension[=].valueString.extension[0].extension[=].valueString = "Vervangen door BC vanaf v2.5"
* #VS ^designation[0].language = #de
* #VS ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #VS ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #VS ^designation[=].value = "VISA"
* #VS ^designation[+].language = #nl
* #VS ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #VS ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #VS ^designation[=].value = "VISA"
* #WC "WIC identifier"
* #WC ^designation[0].language = #nl
* #WC ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #WC ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #WC ^designation[=].value = "WIC identificatie"
* #WCN "Workers' Comp Number"
* #WCN ^designation[0].language = #nl
* #WCN ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #WCN ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #WCN ^designation[=].value = "Werknemerscompensatie-nummer"
* #WP "Work Permit"
* #WP ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/codesystem-concept-comments"
* #WP ^extension[=].valueString = "A number associated with a permit for a person who is granted permission to work in a country for a specified time period."
* #WP ^extension[=].valueString.extension[0].url = "http://hl7.org/fhir/StructureDefinition/translation"
* #WP ^extension[=].valueString.extension[0].extension[0].url = "lang"
* #WP ^extension[=].valueString.extension[0].extension[=].valueCode = #nl
* #WP ^extension[=].valueString.extension[0].extension[+].url = "content"
* #WP ^extension[=].valueString.extension[0].extension[=].valueString = "Een identificatie gekoppeld aan een visum voor een persoon die voor een bepaalde periode in een land mag werken."
* #WP ^designation[0].language = #nl
* #WP ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #WP ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #WP ^designation[=].value = "Werkvisum"
* #XV "Health Plan Identifier"
* #XX "Organization identifier"
* #XX ^designation[0].language = #de
* #XX ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #XX ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #XX ^designation[=].value = "Organisations-ID"
* #XX ^designation[+].language = #nl
* #XX ^designation[=].use.system = "http://terminology.hl7.org/CodeSystem/designation-usage"
* #XX ^designation[=].use = http://terminology.hl7.org/CodeSystem/designation-usage#display
* #XX ^designation[=].value = "Organisatie identificatie"

CodeSystem: V3_RoleCode
Id: v3-RoleCode
Title: "v3 Code System RoleCode"
Description: " A set of codes further specifying the kind of Role; specific classification codes for further qualifying RoleClass codes."
* ^meta.versionId = "1"
* ^meta.lastUpdated = "2022-02-15T08:16:26.275+03:00"
* ^meta.source = "#2FCU6zzymjfBQtS5"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #external
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 0
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.5.111"
* ^version = "2018-08-12"
* ^status = #active
* ^experimental = false
* ^date = "2018-08-12T00:00:00+10:00"
* ^publisher = "HL7, Inc"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://terminology.hl7.org/ValueSet/v3-RoleCode"
* ^hierarchyMeaning = #is-a
* ^content = #complete
* ^property[0].code = #notSelectable
* ^property[=].uri = "http://hl7.org/fhir/concept-properties#notSelectable"
* ^property[=].description = "Indicates that the code is abstract - only intended to be used as a selector for other concepts"
* ^property[=].type = #boolean
* ^property[+].code = #status
* ^property[=].uri = "http://hl7.org/fhir/concept-properties#status"
* ^property[=].description = "A property that indicates the status of the concept. One of active, experimental, deprecated, retired"
* ^property[=].type = #code
* ^property[+].code = #deprecationDate
* ^property[=].uri = "http://hl7.org/fhir/concept-properties#deprecationDate"
* ^property[=].description = "The date at which a concept was deprecated. Concepts that are deprecated but not inactive can still be used, but their use is discouraged"
* ^property[=].type = #dateTime
* ^property[+].code = #child
* ^property[=].uri = "http://hl7.org/fhir/concept-properties#child"
* ^property[=].description = "The concept identified in this property is a child of the concept on which it is a property. The property type will be 'code'. The meaning of parent/child relationships is defined by the hierarchyMeaning attribute"
* ^property[=].type = #code
* #_AffiliationRoleType "AffiliationRoleType" "Concepts characterizing the type of association formed by player and scoper when there is a recognized Affiliate role by which the two parties are related.                    Examples: Business Partner, Business Associate, Colleague"
* #_AffiliationRoleType ^property[0].code = #notSelectable
* #_AffiliationRoleType ^property[=].valueBoolean = true
* #_AffiliationRoleType #_AgentRoleType "AgentRoleType" "Parties that may or should contribute or have contributed to an Act."
* #_AffiliationRoleType #_AgentRoleType ^property[0].code = #notSelectable
* #_AffiliationRoleType #_AgentRoleType ^property[=].valueBoolean = true
* #_AffiliationRoleType #_AgentRoleType #AMENDER "amender" "An entity which corrected, edited, or amended pre-existing information."
* #_AffiliationRoleType #_AgentRoleType #CLASSIFIER "classifier" "An individual authorized to assign an original classification to information, including compilations of unclassified information, based on a determination that the information requires protection against unauthorized disclosure. The individual marks the information with immutable, computable, and human readable security labels in accordance with applicable security labeling policies.  The labeling policies provide instructions on whether and if so how the security labels may be later reclassified [i.e., upgraded, downgraded, used in derivative classification, or declassified] in a manner that preserves the overridden original classification binding and provenance."
* #_AffiliationRoleType #_AgentRoleType #CONSENTER "consenter" "An entity or an entity's delegatee who is the grantee in an agreement such as a consent for services, advanced directive, or a privacy consent directive in accordance with jurisdictional, organizational, or patient policy."
* #_AffiliationRoleType #_AgentRoleType #CONSWIT "consent witness" "An entity which has witnessed and attests to observing another entity being counseled about an agreement such as a consent for services, advanced directive, or a privacy consent directive."
* #_AffiliationRoleType #_AgentRoleType #COPART "co-participant" "An entity which participates in the generation of and attest to veracity of content, but is not an author or coauthor. For example a surgeon who is required by institutional, regulatory, or legal rules to sign an operative report, but who was not involved in the authorship of that report."
* #_AffiliationRoleType #_AgentRoleType #DECLASSIFIER "declassifier" "An individual which is authorized to declassify information based on a determination that the information no longer requires protection against unauthorized disclosure.  The individual marks the information being declassified using computable and human readable security labels indicating that this is copy of previously classified information is unclassified in accordance with applicable security labeling policies.  The labeling policies provide instructions on whether and if so how the security labels may be later reclassified [i.e., upgraded or used in derivative classification] in a manner that preserves the overridden original classification binding and provenance."
* #_AffiliationRoleType #_AgentRoleType #DELEGATEE "delegatee" "A party to whom some right or authority is granted by a delegator."
* #_AffiliationRoleType #_AgentRoleType #DELEGATOR "delegator" "A party that grants all or some portion its right or authority to another party."
* #_AffiliationRoleType #_AgentRoleType #DOWNGRDER "downgrader" "An individual authorized to lower the classification level of labeled content and provide rationale for doing so as directed by a classification guide."
* #_AffiliationRoleType #_AgentRoleType #DRIVCLASSIFIER "derivative classifier" "An individual who is only authorized to classify reproduced, extracted, or summarized classified information, or compile classified and unclassified information by applying classification markings derived from source material or as directed by a classification guide."
* #_AffiliationRoleType #_AgentRoleType #GRANTEE "grantee" "An entity which accepts certain rights or authority from a grantor."
* #_AffiliationRoleType #_AgentRoleType #GRANTOR "grantor" "An entity which agrees to confer certain rights or authority to a grantee."
* #_AffiliationRoleType #_AgentRoleType #INTPRTER "interpreter" "An entity which converts spoken or written language into the language of key participants in an event such as when a provider is obtaining a patient's consent to treatment or permission to disclose information."
* #_AffiliationRoleType #_AgentRoleType #REVIEWER "reviewer" "An entity authorized to filter information according to approved criteria."
* #_AffiliationRoleType #_AgentRoleType #VALIDATOR "validator" "An entity authorized to validate information for inclusion in a record."
* #_AffiliationRoleType #_CoverageSponsorRoleType "CoverageSponsorRoleType" "Description:Codes that indicate a specific type of sponsor.  Used when the sponsor's role is only either as a fully insured sponsor or only as a self-insured sponsor.  NOTE: Where a sponsor may be either, use the SponsorParticipationFunction.code (fully insured or self insured) to indicate the type of responsibility. (CO6-0057)"
* #_AffiliationRoleType #_CoverageSponsorRoleType ^property[0].code = #notSelectable
* #_AffiliationRoleType #_CoverageSponsorRoleType ^property[=].valueBoolean = true
* #_AffiliationRoleType #_CoverageSponsorRoleType #FULLINS "Fully insured coverage sponsor" "Description:An employer or organization that contracts with an underwriter to assumes the financial risk and administrative responsibility for coverage of health services for covered parties."
* #_AffiliationRoleType #_CoverageSponsorRoleType #SELFINS "Self insured coverage sponsor" "Description:An employer or organization that assumes the financial risk and administrative responsibility for coverage of health services for covered parties."
* #_AffiliationRoleType #_PayorRoleType "PayorRoleType" "Description:PayorRoleType for a particular type of policy or program benefit package or plan where more detail about the coverage administration role of the Payor is required.  The functions performed by a Payor qualified by a PayorRoleType may be specified by the PayorParticpationFunction value set.                    Examples:A Payor that is a TPA may administer a managed care plan without underwriting the risk."
* #_AffiliationRoleType #_PayorRoleType ^property[0].code = #notSelectable
* #_AffiliationRoleType #_PayorRoleType ^property[=].valueBoolean = true
* #_AffiliationRoleType #_PayorRoleType #ENROLBKR "Enrollment Broker" "Description:A payor that is responsible for functions related to the enrollment of covered parties."
* #_AffiliationRoleType #_PayorRoleType #TPA "Third party administrator" "Description:Third party administrator (TPA) is a payor organization that processes health care claims without carrying insurance risk. Third party administrators are prominent players in the managed care industry and have the expertise and capability to administer all or a portion of the claims process. They are normally contracted by a health insurer or self-insuring companies to administer services, including claims administration, premium collection, enrollment and other administrative activities.          Self-insured employers often contract with third party administrator to handle their insurance functions. Insurance companies oftentimes outsource the claims, utilization review or membership functions to a TPA. Sometimes TPAs only manage provider networks, only claims or only utilization review.          While some third-party administrators may operate as units of insurance companies, they are often independent. However, hospitals or provider organizations desiring to set up their own health plans will often outsource certain responsibilities to TPAs.  TPAs may perform one or several payor functions, specified by the PayorParticipationFunction value set, such as provider management, enrollment, utilization management, and fee for service claims adjudication management."
* #_AffiliationRoleType #_PayorRoleType #UMO "Utilization management organization" "Description:A payor that is responsible for review and case management of health services covered under a policy or program."
* #_AffiliationRoleType #RESPRSN "responsible party" "The role played by a party who has legal responsibility for another party."
* #_AffiliationRoleType #RESPRSN #EXCEST "executor of estate" "The role played by a person acting as the estate executor for a deceased subscriber or policyholder who was the responsible party"
* #_AffiliationRoleType #RESPRSN #GUADLTM "guardian ad lidem" "The role played by a person appointed by the court to look out for the best interests of a minor child during the course of legal proceedings."
* #_AffiliationRoleType #RESPRSN #GUARD "guardian" "The role played by a person or institution legally empowered with responsibility for the care of a ward."
* #_AffiliationRoleType #RESPRSN #POWATT "power of attorney" "A relationship between two people in which one person authorizes another to act for him in a manner which is a legally binding upon the person giving such authority as if he or she personally were to do the acts."
* #_AffiliationRoleType #RESPRSN #POWATT #DPOWATT "durable power of attorney" "A relationship between two people in which one person authorizes another, usually a family member or relative, to act for him or her in a manner which is a legally binding upon the person giving such authority as if he or she personally were to do the acts that is often limited in the kinds of powers that can be assigned.  Unlike ordinary powers of attorney, durable powers can survive for long periods of time, and again, unlike standard powers of attorney, durable powers can continue after incompetency."
* #_AffiliationRoleType #RESPRSN #POWATT #HPOWATT "healthcare power of attorney" "A relationship between two people in which one person authorizes another to act for him or her in a manner which is a legally binding upon the person giving such authority as if he or she personally were to do the acts that continues (by its terms) to be effective even though the grantor has become mentally incompetent after signing the document."
* #_AffiliationRoleType #RESPRSN #POWATT #SPOWATT "special power of attorney" "A relationship between two people in which one person authorizes another to act for him or her in a manner which is a legally binding upon the person giving such authority as if he or she personally were to do the acts that is often limited in the kinds of powers that can be assigned."
* #_AssignedRoleType "AssignedRoleType" "AssignedRoleType"
* #_AssignedRoleType ^property[0].code = #notSelectable
* #_AssignedRoleType ^property[=].valueBoolean = true
* #_AssignedRoleType #_AssignedNonPersonLivingSubjectRoleType "AssignedNonPersonLivingSubjectRoleType" "Description:A role type that is used to further qualify a non-person subject playing a role where the role class attribute is set to RoleClass AssignedEntity"
* #_AssignedRoleType #_AssignedNonPersonLivingSubjectRoleType ^property[0].code = #notSelectable
* #_AssignedRoleType #_AssignedNonPersonLivingSubjectRoleType ^property[=].valueBoolean = true
* #_AssignedRoleType #_AssignedNonPersonLivingSubjectRoleType #ASSIST "Assistive non-person living subject" "Description:Dogs trained to assist the ill or physically challenged."
* #_AssignedRoleType #_AssignedNonPersonLivingSubjectRoleType #BIOTH "Biotherapeutic non-person living subject" "Description:Animals, including fish and insects, and microorganisms which may participate as assigned entities in biotherapies."
* #_AssignedRoleType #_AssignedNonPersonLivingSubjectRoleType #BIOTH #ANTIBIOT "Antibiotic" "Description:Non-person living subject used as antibiotic.                    Examples:Bacteriophage, is a virus that infects bacteria."
* #_AssignedRoleType #_AssignedNonPersonLivingSubjectRoleType #BIOTH #DEBR "Debridement" "Description:Maggots raised for biodebridement.                    Discussion: Maggot Debridement Therapy is the medical use of live maggots for cleaning non-healing wounds.                    Examples:Removal of burnt skin."
* #_AssignedRoleType #_AssignedNonPersonLivingSubjectRoleType #CCO "Clinical Companion" "Description:Companion animals, such as dogs, cats, and rabbits, which may be provided to patients to improve general mood, decrease depression and loneliness, and distract from stress-inducing concerns to improve quality of life."
* #_AssignedRoleType #_AssignedNonPersonLivingSubjectRoleType #SEE "Seeing" "Description:Dogs trained to assist persons who are seeing impaired or blind."
* #_AssignedRoleType #_AssignedNonPersonLivingSubjectRoleType #SNIFF "Sniffing" "Description:Dogs trained or having the ability to detect imminent seizures or cancers in humans, probably as a result of volatile chemical (odors) given off by the malignancy of the host."
* #_CertifiedEntityType "CertifiedEntityType" "Defines types of certifications for all entities"
* #_CertifiedEntityType ^property[0].code = #notSelectable
* #_CertifiedEntityType ^property[=].valueBoolean = true
* #_CitizenRoleType "CitizenRoleType" "A role type used to qualify a person's legal status within a country or nation."
* #_CitizenRoleType #CAS "asylum seeker" "A person who has fled his or her home country to find a safe place elsewhere."
* #_CitizenRoleType #CAS #CASM "single minor asylum seeker" "A person who is someone of below legal age who has fled his or her home country, without his or her parents, to find a safe place elsewhere at time of categorization."
* #_CitizenRoleType #CN "national" "A person who is legally recognized as a member of a nation or country, with associated rights and obligations."
* #_CitizenRoleType #CNRP "non-country member without residence permit" "A foreigner who is present in a country (which is foreign to him/her) unlawfully or without the country's authorization (may be called an illegal alien)."
* #_CitizenRoleType #CNRP #CNRPM "non-country member minor without residence permit" "A person who is below legal age present in a country, without his or her parents, (which is foreign to him/her) unlawfully or without the country's authorization."
* #_CitizenRoleType #CPCA "permit card applicant" "A non-country member admitted to the territory of a nation or country as a non-resident for an explicit purpose."
* #_CitizenRoleType #CRP "non-country member with residence permit" "A foreigner who is a resident of the country but does not have citizenship."
* #_CitizenRoleType #CRP #CRPM "non-country member minor with residence permit" "A person who is a resident below legal age of the country without his or her parents and does not have citizenship."
* #_ContactRoleType "ContactRoleType" "Types of contact for Role code \"CON\""
* #_ContactRoleType ^property[0].code = #notSelectable
* #_ContactRoleType ^property[=].valueBoolean = true
* #_ContactRoleType #_AdministrativeContactRoleType "AdministrativeContactRoleType" "A contact role used for business and/or administrative purposes."
* #_ContactRoleType #_AdministrativeContactRoleType ^property[0].code = #notSelectable
* #_ContactRoleType #_AdministrativeContactRoleType ^property[=].valueBoolean = true
* #_ContactRoleType #_AdministrativeContactRoleType #BILL "Billing Contact" "A contact role used to identify a person within a Provider organization that can be contacted for billing purposes (e.g. about the content of the Invoice)."
* #_ContactRoleType #_AdministrativeContactRoleType #ORG "organizational contact" "A contact for an organization for administrative purposes. Contact role specifies a person acting as a liason for the organization.          Example: HR Department representative."
* #_ContactRoleType #_AdministrativeContactRoleType #PAYOR "Payor Contact" "A contact role used to identify a person within a Payor organization to whom this communication is addressed."
* #_ContactRoleType #ECON "emergency contact" "A contact designated for contact in emergent situations."
* #_ContactRoleType #ECON ^property[0].code = #status
* #_ContactRoleType #ECON ^property[=].valueCode = #deprecated
* #_ContactRoleType #ECON ^property[+].code = #deprecationDate
* #_ContactRoleType #ECON ^property[=].valueDateTime = "2008-12-19"
* #_ContactRoleType #NOK "next of kin" "Played by an individual who is designated as the next of kin for another individual which scopes the role."
* #_ContactRoleType #NOK ^property[0].code = #status
* #_ContactRoleType #NOK ^property[=].valueCode = #deprecated
* #_ContactRoleType #NOK ^property[+].code = #deprecationDate
* #_ContactRoleType #NOK ^property[=].valueDateTime = "2008-12-19"
* #_IdentifiedEntityType "IdentifiedEntityType" "Definition: A code representing the type of identifier that has been assigned to the identified entity (IDENT).                    Examples: Example values include Social Insurance Number, Product Catalog ID, Product Model Number."
* #_IdentifiedEntityType ^property[0].code = #notSelectable
* #_IdentifiedEntityType ^property[=].valueBoolean = true
* #_IdentifiedEntityType #_LocationIdentifiedEntityRoleCode "LocationIdentifiedEntityRoleCode" "Description:Describes types of identifiers other than the primary location registry identifier for a service delivery location.  Identifiers may be assigned by a local service delivery organization, a formal body capable of accrediting the location for the capability to provide specific services or the identifier may be assigned at a jurisdictional level."
* #_IdentifiedEntityType #_LocationIdentifiedEntityRoleCode ^property[0].code = #notSelectable
* #_IdentifiedEntityType #_LocationIdentifiedEntityRoleCode ^property[=].valueBoolean = true
* #_IdentifiedEntityType #_LocationIdentifiedEntityRoleCode #ACHFID "accreditation location identifier" "Description:Identifier assigned to a  location by the organization responsible for accrediting the location."
* #_IdentifiedEntityType #_LocationIdentifiedEntityRoleCode #JURID "jurisdiction location identifier" "Description:Identifier assigned to a location by a jurisdiction."
* #_IdentifiedEntityType #_LocationIdentifiedEntityRoleCode #LOCHFID "local location identifier" "Description:Identifier assigned to a  location by a local party (which could be the facility itself or organization overseeing a group of facilities)."
* #_LivingSubjectProductionClass "LivingSubjectProductionClass" "Code indicating the primary use for which a living subject is bred or grown"
* #_LivingSubjectProductionClass ^property[0].code = #notSelectable
* #_LivingSubjectProductionClass ^property[=].valueBoolean = true
* #_LivingSubjectProductionClass #BF "Beef" "Cattle used for meat production"
* #_LivingSubjectProductionClass #BL "Broiler" "Chickens raised for meat"
* #_LivingSubjectProductionClass #BR "Breeder" "Breeding/genetic stock"
* #_LivingSubjectProductionClass #CO "Companion" "Companion animals"
* #_LivingSubjectProductionClass #DA "Dairy" "Milk production"
* #_LivingSubjectProductionClass #DR "Draft" "Draft animals"
* #_LivingSubjectProductionClass #DU "Dual" "Dual purpose.  Defined purposes based on species and breed"
* #_LivingSubjectProductionClass #FI "Fiber" "Animals raised for their fur, hair or skins"
* #_LivingSubjectProductionClass #LY "Layer" "Chickens raised for egg production"
* #_LivingSubjectProductionClass #MT "Meat" "Animals raised for meat production"
* #_LivingSubjectProductionClass #MU "Multiplier" "Poultry flocks used for chick/poult production"
* #_LivingSubjectProductionClass #PL "Pleasure" "Animals rasied for recreation"
* #_LivingSubjectProductionClass #RC "Racing" "Animals raised for racing perfomance"
* #_LivingSubjectProductionClass #SH "Show" "Animals raised for shows"
* #_LivingSubjectProductionClass #VL "Veal" "Cattle raised for veal meat production.  Implicit is the husbandry method."
* #_LivingSubjectProductionClass #WL "Wool" "Sheep, goats and other mammals raised for their fiber"
* #_LivingSubjectProductionClass #WO "Working" "Animals used to perform work"
* #_MedicationGeneralizationRoleType "MedicationGeneralizationRoleType" "Identifies the specific hierarchical relationship between the playing and scoping medications.                     Examples: Generic, Generic Formulation, Therapeutic Class, etc."
* #_MedicationGeneralizationRoleType ^property[0].code = #notSelectable
* #_MedicationGeneralizationRoleType ^property[=].valueBoolean = true
* #_MedicationGeneralizationRoleType #DC "therapeutic class" "Description:A categorization of medicinal products by their therapeutic properties and/or main therapeutic use."
* #_MedicationGeneralizationRoleType #GD "generic drug" "Relates a manufactured drug product to the non-proprietary (generic) representation of its ingredients independent of strength, and form.          The scoping entity identifies a unique combination of medicine ingredients; sometimes referred to as \"ingredient set\"."
* #_MedicationGeneralizationRoleType #GD #GDF "generic drug form" "Relates a manufactured drug product to the non-proprietary (generic) representation of its ingredients and dose form, independent of strength of the ingredients. The scoping entity identifies a unique combination of medicine ingredients in a specific dose form."
* #_MedicationGeneralizationRoleType #GD #GDS "generic drug strength" "Relates a manufactured drug product to the non-proprietary (generic) representation of is ingredients with their strength.  The scoping entity identifies a unique combination of medicine ingredients with their strength."
* #_MedicationGeneralizationRoleType #GD #GDSF "generic drug strength form" "Relates a manufactured drug product to the non-proprietary (generic) representation of its ingredients with their strength in a specific dose form. The scoping entity identifies a unique combination of medicine ingredients with their strength in a single dose form."
* #_MedicationGeneralizationRoleType #MGDSF "manufactured drug strength form" "Relates a manufactured drug product to the non-proprietary (generic) representation of its ingredients with their strength in a specific dose form. The scoping entity identifies a unique combination of medicine ingredients with their strength in a single dose form."
* #_MemberRoleType "MemberRoleType" "Types of membership for Role code \"MBR\""
* #_MemberRoleType ^property[0].code = #notSelectable
* #_MemberRoleType ^property[=].valueBoolean = true
* #_MemberRoleType #TRB "Tribal Member" "A person who is a member of a tribe."
* #_PersonalRelationshipRoleType "PersonalRelationshipRoleType" "PersonalRelationshipRoleType"
* #_PersonalRelationshipRoleType ^property[0].code = #notSelectable
* #_PersonalRelationshipRoleType ^property[=].valueBoolean = true
* #_PersonalRelationshipRoleType #FAMMEMB "family member" "A relationship between two people characterizing their \"familial\" relationship"
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD "child" "The player of the role is a child of the scoping entity."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #CHLDADOPT "adopted child" "The player of the role is a child taken into a family through legal means and raised by the scoping person (parent) as his or her own child."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #CHLDADOPT #DAUADOPT "adopted daughter" "The player of the role is a female child taken into a family through legal means and raised by the scoping person (parent) as his or her own child."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #CHLDADOPT #SONADOPT "adopted son" "The player of the role is a male child taken into a family through legal means and raised by the scoping person (parent) as his or her own child."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #CHLDFOST "foster child" "The player of the role is a child receiving parental care and nurture from the scoping person (parent) but not related to him or her through legal or blood ties."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #CHLDFOST #DAUFOST "foster daughter" "The player of the role is a female child receiving parental care and nurture from the scoping person (parent) but not related to him or her through legal or blood ties."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #CHLDFOST #SONFOST "foster son" "The player of the role is a male child receiving parental care and nurture from the scoping person (parent) but not related to him or her through legal or blood ties."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #DAUC "daughter" "Description: The player of the role is a female child (of any type) of scoping entity (parent)"
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #DAUC ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #DAUC ^property[=].valueCode = #DAUADOPT
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #DAUC ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #DAUC ^property[=].valueCode = #DAUFOST
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #DAUC #DAU "natural daughter" "The player of the role is a female offspring of the scoping entity (parent)."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #DAUC #STPDAU "stepdaughter" "The player of the role is a daughter of the scoping person's spouse by a previous union."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #NCHILD "natural child" "The player of the role is an offspring of the scoping entity as determined by birth."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #NCHILD ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #NCHILD ^property[=].valueCode = #DAU
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #NCHILD #SON "natural son" "The player of the role is a male offspring of the scoping entity (parent)."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #SONC "son" "Description: The player of the role is a male child (of any type) of scoping entity (parent)"
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #SONC ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #SONC ^property[=].valueCode = #SONADOPT
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #SONC ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #SONC ^property[=].valueCode = #SONFOST
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #SONC ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #SONC ^property[=].valueCode = #SON
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #SONC #STPSON "stepson" "The player of the role is a son of the scoping person's spouse by a previous union."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #STPCHLD "step child" "The player of the role is a child of the scoping person's spouse by a previous union."
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #STPCHLD ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #STPCHLD ^property[=].valueCode = #STPDAU
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #STPCHLD ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #CHILD #STPCHLD ^property[=].valueCode = #STPSON
* #_PersonalRelationshipRoleType #FAMMEMB #EXT "extended family member" "Description: A family member not having an immediate genetic or legal relationship e.g. Aunt, cousin, great grandparent, grandchild, grandparent, niece, nephew or uncle."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #AUNT "aunt" "The player of the role is a sister of the scoping person's mother or father."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #AUNT #MAUNT "maternal aunt" "Description:The player of the role is a biological sister of the scoping person's biological mother."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #AUNT #PAUNT "paternal aunt" "Description:The player of the role is a biological sister of the scoping person's biological father."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #COUSN "cousin" "The player of the role is a relative of the scoping person descended from a common ancestor, such as a  grandparent, by two or more steps in a diverging line."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #COUSN #MCOUSN "maternal cousin" "Description:The player of the role is a biological relative of the scoping person descended from a common ancestor on the player's mother's side, such as a grandparent, by two or more steps in a diverging line."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #COUSN #PCOUSN "paternal cousin" "Description:The player of the role is a biological relative of the scoping person descended from a common ancestor on the player's father's side, such as a grandparent, by two or more steps in a diverging line."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN "great grandparent" "The player of the role is a parent of the scoping person's grandparent."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #GGRFTH "great grandfather" "The player of the role is the father of the scoping person's grandparent."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #GGRFTH #MGGRFTH "maternal great-grandfather" "Description:The player of the role is the biological father of the scoping person's biological mother's parent."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #GGRFTH #PGGRFTH "paternal great-grandfather" "Description:The player of the role is the biological father of the scoping person's biological father's parent."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #GGRMTH "great grandmother" "The player of the role is the mother of the scoping person's grandparent."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #GGRMTH #MGGRMTH "maternal great-grandmother" "Description:The player of the role is the biological mother of the scoping person's biological mother's parent."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #GGRMTH #PGGRMTH "paternal great-grandmother" "Description:The player of the role is the biological mother of the scoping person's biological father's parent."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #MGGRPRN "maternal great-grandparent" "Description:The player of the role is a biological parent of the scoping person's biological mother's parent."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #MGGRPRN ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #MGGRPRN ^property[=].valueCode = #MGGRFTH
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #MGGRPRN ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #MGGRPRN ^property[=].valueCode = #MGGRMTH
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #PGGRPRN "paternal great-grandparent" "Description:The player of the role is a biological parent of the scoping person's biological father's parent."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #PGGRPRN ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #PGGRPRN ^property[=].valueCode = #PGGRFTH
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #PGGRPRN ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GGRPRN #PGGRPRN ^property[=].valueCode = #PGGRMTH
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRNDCHILD "grandchild" "The player of the role is a child of the scoping person's son or daughter."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRNDCHILD #GRNDDAU "granddaughter" "The player of the role is a daughter of the scoping person's son or daughter."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRNDCHILD #GRNDSON "grandson" "The player of the role is a son of the scoping person's son or daughter."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN "grandparent" "The player of the role is a parent of the scoping person's mother or father."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #GRFTH "grandfather" "The player of the role is the father of the scoping person's mother or father."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #GRFTH #MGRFTH "maternal grandfather" "Description:The player of the role is the biological father of the scoping person's biological mother."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #GRFTH #PGRFTH "paternal grandfather" "Description:The player of the role is the biological father of the scoping person's biological father."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #GRMTH "grandmother" "The player of the role is the mother of the scoping person's mother or father."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #GRMTH #MGRMTH "maternal grandmother" "Description:The player of the role is the biological mother of the scoping person's biological mother."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #GRMTH #PGRMTH "paternal grandmother" "Description:The player of the role is the biological mother of the scoping person's biological father."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #MGRPRN "maternal grandparent" "Description:The player of the role is the biological parent of the scoping person's biological mother."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #MGRPRN ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #MGRPRN ^property[=].valueCode = #MGRFTH
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #MGRPRN ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #MGRPRN ^property[=].valueCode = #MGRMTH
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #PGRPRN "paternal grandparent" "Description:The player of the role is the biological parent of the scoping person's biological father."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #PGRPRN ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #PGRPRN ^property[=].valueCode = #PGRFTH
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #PGRPRN ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #GRPRN #PGRPRN ^property[=].valueCode = #PGRMTH
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #INLAW "inlaw" "A relationship between an individual and a member of their spousal partner's immediate family."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #INLAW #CHLDINLAW "child-in-law" "The player of the role is the spouse of scoping person's child."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #INLAW #CHLDINLAW #DAUINLAW "daughter in-law" "The player of the role is the wife of scoping person's son."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #INLAW #CHLDINLAW #SONINLAW "son in-law" "The player of the role is the husband of scoping person's daughter."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #INLAW #PRNINLAW "parent in-law" "The player of the role is the parent of scoping person's husband or wife."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #INLAW #PRNINLAW #FTHINLAW "father-in-law" "The player of the role is the father of the scoping person's husband or wife."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #INLAW #PRNINLAW #MTHINLAW "mother-in-law" "The player of the role is the mother of the scoping person's husband or wife."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #INLAW #SIBINLAW "sibling in-law" "The player of the role is: (1) a sibling of the scoping person's spouse, or (2) the spouse of the scoping person's sibling, or (3) the spouse of a sibling of the scoping person's spouse."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #INLAW #SIBINLAW #BROINLAW "brother-in-law" "The player of the role is: (1) a brother of the scoping person's spouse, or (2) the husband of the scoping person's sister, or (3) the husband of a sister of the scoping person's spouse."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #INLAW #SIBINLAW #SISINLAW "sister-in-law" "The player of the role is: (1) a sister of the scoping person's spouse, or (2) the wife of the scoping person's brother, or (3) the wife of a brother of the scoping person's spouse."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #NIENEPH "niece/nephew" "The player of the role is a child of scoping person's brother or sister or of the brother or sister of the  scoping person's spouse."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #NIENEPH #NEPHEW "nephew" "The player of the role is a son of the scoping person's brother or sister or of the brother or sister of the  scoping person's spouse."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #NIENEPH #NIECE "niece" "The player of the role is a daughter of the scoping person's brother or sister or of the brother or sister of the  scoping person's spouse."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #UNCLE "uncle" "The player of the role is a brother of the scoping person's mother or father."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #UNCLE #MUNCLE "maternal uncle" "Description:The player of the role is a biological brother of the scoping person's biological mother."
* #_PersonalRelationshipRoleType #FAMMEMB #EXT #UNCLE #PUNCLE "paternal uncle" "Description:The player of the role is a biological brother of the scoping person's biological father."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN "parent" "The player of the role is one who begets, gives birth to, or nurtures and raises the scoping entity (child)."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #ADOPTP "adoptive parent" "The player of the role (parent) has taken the scoper (child) into their family through legal means and raises them as his or her own child."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #ADOPTP #ADOPTF "adoptive father" "The player of the role (father) is a male who has taken the scoper (child) into their family through legal means and raises them as his own child."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #ADOPTP #ADOPTM "adoptive mother" "The player of the role (father) is a female who has taken the scoper (child) into their family through legal means and raises them as her own child."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #FTH "father" "The player of the role is a male who begets or raises or nurtures the scoping entity (child)."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #FTH ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #FTH ^property[=].valueCode = #ADOPTF
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #FTH #FTHFOST "foster father" "The player of the role (parent) who is a male state-certified caregiver responsible for the scoper (child) who has been placed in the parent's care. The placement of the child is usually arranged through the government or a social-service agency, and temporary.          The state, via a jurisdiction recognized child protection agency, stands as in loco parentis to the child, making all legal decisions while the foster parent is responsible for the day-to-day care of the specified child."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #FTH #NFTH "natural father" "The player of the role is a male who begets the scoping entity (child)."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #FTH #NFTH #NFTHF "natural father of fetus" "Indicates the biologic male parent of a fetus."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #FTH #STPFTH "stepfather" "The player of the role is the husband of scoping person's mother and not the scoping person's natural father."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #MTH "mother" "The player of the role is a female who conceives, gives birth to, or raises and nurtures the scoping entity (child)."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #MTH ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #MTH ^property[=].valueCode = #ADOPTM
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #MTH #GESTM "gestational mother" "The player is a female whose womb carries the fetus of the scoper.  Generally used when the gestational mother and natural mother are not the same."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #MTH #MTHFOST "foster mother" "The player of the role (parent) who is a female state-certified caregiver responsible for the scoper (child) who has been placed in the parent's care. The placement of the child is usually arranged through the government or a social-service agency, and temporary.          The state, via a jurisdiction recognized child protection agency, stands as in loco parentis to the child, making all legal decisions while the foster parent is responsible for the day-to-day care of the specified child."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #MTH #NMTH "natural mother" "The player of the role is a female who conceives or gives birth to the scoping entity (child)."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #MTH #NMTH #NMTHF "natural mother of fetus" "The player is the biologic female parent of the scoping fetus."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #MTH #STPMTH "stepmother" "The player of the role is the wife of scoping person's father and not the scoping person's natural mother."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #NPRN "natural parent" "natural parent"
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #NPRN ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #NPRN ^property[=].valueCode = #NFTH
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #NPRN ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #NPRN ^property[=].valueCode = #NMTH
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #PRNFOST "foster parent" "The player of the role (parent) who is a state-certified caregiver responsible for the scoper (child) who has been placed in the parent's care. The placement of the child is usually arranged through the government or a social-service agency, and temporary.          The state, via a jurisdiction recognized child protection agency, stands as in loco parentis to the child, making all legal decisions while the foster parent is responsible for the day-to-day care of the specified child."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #PRNFOST ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #PRNFOST ^property[=].valueCode = #FTHFOST
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #PRNFOST ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #PRNFOST ^property[=].valueCode = #MTHFOST
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #STPPRN "step parent" "The player of the role is the spouse of the scoping person's parent and not the scoping person's natural parent."
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #STPPRN ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #STPPRN ^property[=].valueCode = #STPFTH
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #STPPRN ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #PRN #STPPRN ^property[=].valueCode = #STPMTH
* #_PersonalRelationshipRoleType #FAMMEMB #SIB "sibling" "The player of the role shares one or both parents in common with the scoping entity."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #BRO "brother" "The player of the role is a male sharing one or both parents in common with the scoping entity."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #BRO #HBRO "half-brother" "The player of the role is a male related to the scoping entity by sharing only one biological parent."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #BRO #NBRO "natural brother" "The player of the role is a male having the same biological parents as the scoping entity."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #BRO #NBRO #TWINBRO "twin brother" "The scoper was carried in the same womb as the male player and shares common biological parents."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #BRO #NBRO #TWINBRO #FTWINBRO "fraternal twin brother" "The scoper was carried in the same womb as the male player and shares common biological parents but is the product of a distinct egg/sperm pair."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #BRO #NBRO #TWINBRO #ITWINBRO "identical twin brother" "The male scoper is an offspring of the same egg-sperm pair as the male player."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #BRO #STPBRO "stepbrother" "The player of the role is a son of the scoping person's stepparent."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #HSIB "half-sibling" "The player of the role is related to the scoping entity by sharing only one biological parent."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #HSIB ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #HSIB ^property[=].valueCode = #HBRO
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #HSIB #HSIS "half-sister" "The player of the role is a female related to the scoping entity by sharing only one biological parent."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB "natural sibling" "The player of the role has both biological parents in common with the scoping entity."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB ^property[=].valueCode = #NBRO
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #NSIS "natural sister" "The player of the role is a female having the same biological parents as the scoping entity."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #NSIS #TWINSIS "twin sister" "The scoper was carried in the same womb as the female player and shares common biological parents."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #NSIS #TWINSIS #FTWINSIS "fraternal twin sister" "The scoper was carried in the same womb as the female player and shares common biological parents but is the product of a distinct egg/sperm pair."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #NSIS #TWINSIS #ITWINSIS "identical twin sister" "The female scoper is an offspring of the same egg-sperm pair as the female player."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN "twin" "The scoper and player were carried in the same womb and shared common biological parents."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN ^property[=].valueCode = #TWINBRO
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN ^property[=].valueCode = #TWINSIS
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN #FTWIN "fraternal twin" "The scoper and player were carried in the same womb and share common biological parents but are the product of distinct egg/sperm pairs."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN #FTWIN ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN #FTWIN ^property[=].valueCode = #FTWINBRO
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN #FTWIN ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN #FTWIN ^property[=].valueCode = #FTWINSIS
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN #ITWIN "identical twin" "The scoper and player are offspring of the same egg-sperm pair."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN #ITWIN ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN #ITWIN ^property[=].valueCode = #ITWINBRO
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN #ITWIN ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #NSIB #TWIN #ITWIN ^property[=].valueCode = #ITWINSIS
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #SIS "sister" "The player of the role is a female sharing one or both parents in common with the scoping entity."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #SIS ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #SIS ^property[=].valueCode = #HSIS
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #SIS ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #SIS ^property[=].valueCode = #NSIS
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #SIS #STPSIS "stepsister" "The player of the role is a daughter of the scoping person's stepparent."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #STPSIB "step sibling" "The player of the role is a child of the scoping person's stepparent."
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #STPSIB ^property[0].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #STPSIB ^property[=].valueCode = #STPBRO
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #STPSIB ^property[+].code = #child
* #_PersonalRelationshipRoleType #FAMMEMB #SIB #STPSIB ^property[=].valueCode = #STPSIS
* #_PersonalRelationshipRoleType #FAMMEMB #SIGOTHR "significant other" "A person who is important to one's well being; especially a spouse or one in a similar relationship.  (The player is the one who is important)"
* #_PersonalRelationshipRoleType #FAMMEMB #SIGOTHR #DOMPART "domestic partner" "The player of the role cohabits with the scoping person but is not the scoping person's spouse."
* #_PersonalRelationshipRoleType #FAMMEMB #SIGOTHR #FMRSPS "former spouse" "Player of the role was previously joined to the scoping person in marriage and this marriage is now dissolved and inactive.                    Usage Note: This is significant to indicate as some jurisdictions have different legal requirements for former spouse to access the patient's record, from a general friend."
* #_PersonalRelationshipRoleType #FAMMEMB #SIGOTHR #SPS "spouse" "The player of the role is a marriage partner of the scoping person."
* #_PersonalRelationshipRoleType #FAMMEMB #SIGOTHR #SPS #HUSB "husband" "The player of the role is a man joined to a woman (scoping person) in marriage."
* #_PersonalRelationshipRoleType #FAMMEMB #SIGOTHR #SPS #WIFE "wife" "The player of the role is a woman joined to a man (scoping person) in marriage."
* #_PersonalRelationshipRoleType #FRND "unrelated friend" "The player of the role is a person who is known, liked, and trusted by the scoping person."
* #_PersonalRelationshipRoleType #NBOR "neighbor" "The player of the role lives near or next to the  scoping person."
* #_PersonalRelationshipRoleType #ONESELF "self" "The relationship that a person has with his or her self."
* #_PersonalRelationshipRoleType #ROOM "Roommate" "One who shares living quarters with the subject."
* #_PolicyOrProgramCoverageRoleType "PolicyOrProgramCoverageRoleType" "Description: A role recognized through the eligibility of an identified party for benefits covered under an insurance policy or a program based on meeting eligibility criteria.          Eligibility as a covered party may be conditioned on the party meeting criteria to qualify for coverage under a policy or program, which may be mandated by law.  These criteria may be:                                The sole basis for coverage, e.g., being differently abled may qualify a person for disability coverage                                May more fully qualify a covered party role e.g, being differently abled may qualify an adult child as a dependent                                May impact the level of coverage for a covered party under a policy or program, e.g., being differently abled may qualify a program eligible for additional benefits.                                       Discussion:  The Abstract Value Set \"CoverageRoleType\", which was developed for use in the Canadian realm \"pre-coordinate\" coverage roles with other roles that a covered party must play in order to be eligible for coverage, e.g., \"handicapped dependent\".   These role.codes may only be used with COVPTY to avoid overlapping concepts that would result from using them to specify the specializations of COVPTY, e.g., the role.class DEPEN should not be used with the role.code family dependent because that relationship has overlapping concepts due to the role.code precoodination and is conveyed in FICO with the personal relationship role that has a PART role link to the covered party role.  For the same reasons, the role.class DEPEN should not be used with the role.code HANDIC (handicapped dependent); the role.code DIFFABLE (differently abled) should be used instead.          In summary, the coded concepts in the Abstract Value Set \"CoveredPartyRoleType\" can be \"post-coordinated\" with the \"RoleClassCoveredParty\" Abstract Value Set.  Decoupling these concepts is intended to support an expansive range of covered party concepts and their semantic comparability."
* #_PolicyOrProgramCoverageRoleType ^property[0].code = #notSelectable
* #_PolicyOrProgramCoverageRoleType ^property[=].valueBoolean = true
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType "CoverageRoleType" "Role recognized through the issuance of insurance coverage to an identified covered party who has this relationship with the policy holder such as the policy holder themselves (self), spouse, child, etc"
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType ^property[0].code = #notSelectable
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType ^property[=].valueBoolean = true
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #FAMDEP "family dependent" "The player of the role is dependent of the scoping entity."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #HANDIC "handicapped dependent" "Covered party is a dependent of the policy holder with a physical or mental disability causing a disadvantage that makes independent achievement unusually difficult."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #INJ "injured plaintiff" "Covered party is an injured party with a legal claim for compensation against a policy holder under an insurance policy."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #SELF "self" "Covered party is the policy holder.  Also known as the subscriber."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #SPON "sponsored dependent" "Covered party is an individual that the policy holder has assumed responsibility for, such as foster child or legal ward."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #STUD "student" "Covered party to an insurance policy has coverage through full-time or part-time attendance at a recognized educational institution as defined by a particular insurance policy."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #STUD #FSTUD "full-time student" "Covered party to an insurance policy has coverage through full-time attendance at a recognized educational institution as defined by a particular insurance policy."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #STUD #PSTUD "part-time student" "Covered party to an insurance policy has coverage through part-time attendance at a recognized educational institution as defined by a particular insurance policy."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #ADOPT "adopted child" "A child taken into one's family through legal means and raised as one's own child."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #ADOPT ^property[0].code = #status
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #ADOPT ^property[=].valueCode = #retired
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #GCHILD "grandchild" "A child of one's son or daughter."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #GCHILD ^property[0].code = #status
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #GCHILD ^property[=].valueCode = #retired
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #GPARNT "grandparent" "parent of a parent of the subject."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #GPARNT ^property[0].code = #status
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #GPARNT ^property[=].valueCode = #retired
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #NAT "natural child" "A child as determined by birth."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #NAT ^property[0].code = #status
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #NAT ^property[=].valueCode = #retired
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #NIENE "niece/nephew" "A child of one's brother or sister or of the brother or sister of one's spouse."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #NIENE ^property[0].code = #status
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #NIENE ^property[=].valueCode = #retired
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #PARNT "parent" "One that begets or brings forth offspring or a person who brings up and cares for for another (Webster's Collegiate Dictionary)"
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #PARNT ^property[0].code = #status
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #PARNT ^property[=].valueCode = #retired
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #SPSE "spouse" "A marriage partner; a husband or wife."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #SPSE ^property[0].code = #status
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #SPSE ^property[=].valueCode = #retired
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #STEP "step child" "A child receiving parental care and nurture from a person who is related to them through marriage to their parent."
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #STEP ^property[0].code = #status
* #_PolicyOrProgramCoverageRoleType #_CoverageRoleType #STEP ^property[=].valueCode = #retired
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType "covered party role type" "A role recognized through the eligibility of an identified living subject for benefits covered under an insurance policy or a program.  Eligibility as a covered party may be conditioned on a relationship with (1) the policy holder such as the policy holder who is covered as an individual under a poliy or as a party sponsored for coverage by the policy holder.                    Example:An employee as a subscriber; or (2) on being scoped another covered party such as the subscriber, as in the case of a dependent.                     Discussion:  The Abstract Value Set \"CoverageRoleType\", which was developed for use in the Canadian realm \"pre-coordinate\" coverage roles with other roles that a covered party must play in order to be eligible for coverage, e.g., \"handicapped dependent\".  Other codes in the Abstract Value Set CoveredPartyRoleType domain can be \"post-coordinated\" with the EligiblePartyRoleType codes to denote comparable concepts.  Decoupling the concepts is intended to support a wider range of concepts and semantic comparability of coded concepts."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType ^property[0].code = #notSelectable
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType ^property[=].valueBoolean = true
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ClaimantCoveredPartyRoleType "ClaimantCoveredPartyRoleType" "DescriptionA role recognized through the eligibility of a party play a claimant for benefits covered or provided under an insurance policy."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ClaimantCoveredPartyRoleType ^property[0].code = #notSelectable
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ClaimantCoveredPartyRoleType ^property[=].valueBoolean = true
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ClaimantCoveredPartyRoleType #CRIMEVIC "crime victim" "Description: A person playing the role of program eligible under a program based on allegations of being the victim of a crime.                    Discussion: This CoveredPartyRoleType.code is typically used when the CoveredPartyRole class code is \"program eligible\" and the person's status as a crime victim meets jurisdictional or program criteria."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ClaimantCoveredPartyRoleType #INJWKR "injured worker" "Description: A person playing the role of program eligible under a workers compensation program based on the filing of work-related injury claim.                    Discussion:  This CoveredPartyRoleType.code is used when the CoveredPartyRole class code is either \"program eligible\", a \"named insured\", and \"individual insured\",  or \"dependent\", and the person's status as differently abled or \"handicapped\" meets jurisdictional, policy, or program criteria."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_DependentCoveredPartyRoleType "DependentCoveredPartyRoleType" "Description: A role recognized through the eligibility of a party to play a dependent for benefits covered or provided under a health insurance policy because of an association with the subscriber that is recognized by the policy underwriter."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_DependentCoveredPartyRoleType ^property[0].code = #notSelectable
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_DependentCoveredPartyRoleType ^property[=].valueBoolean = true
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_DependentCoveredPartyRoleType #COCBEN "continuity of coverage beneficiary" "Description: A person playing the role of an individual insured with continuity of coverage under a policy which is being terminated based on loss of original status that was the basis for coverage.  Criteria for qualifying for continuity of coverage may be set by law.                    Discussion: This CoveredPartyRoleType.code is typically used when the CoveredPartyRole class code is either \"program eligible\" or \"subscriber\" and the person's status as a continuity of coverage beneficiary meets jurisdictional or policy criteria."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_DependentCoveredPartyRoleType #DIFFABL "differently abled" "Description: A person playing the role of program eligible under a program based on meeting criteria for health or functional limitation set by law or by the program.                    Discussion: This CoveredPartyRoleType.code is typically used when the CoveredPartyRole class code is either \"program eligible\", \"named insured\", \"individual insured\", or \"dependent\", and the person's status as differently abled meets jurisdictional, policy, or program criteria."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_DependentCoveredPartyRoleType #WARD "ward" "Description: A person, who is a minor or is deemed incompetent, who plays the role of a program eligible where eligibility for coverage is based on meeting program eligibility criteria for status as a ward of a court or jurisdiction.                    Discussion: This CoveredPartyRoleType.code is typically used when the CoveredPartyRole class code is a \"claimant\", \"program eligible\", a \"named insured\", an \"individual Insured\" or a \"dependent\", and the person's status as a ward meets program or policy criteria. In the case of a ward covered under a program providing financial or health benefits, a governmental agency may take temporary custody of a minor or incompetent for his/her protection and care, e.g., if the ward is suffering from neglect or abuse, or has been in trouble with the law."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_IndividualInsuredPartyRoleType "IndividualInsuredPartyRoleType" "A role recognized through the eligibility of a party to play an individual insured for benefits covered or provided under an insurance policy where the party is also the policy holder."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_IndividualInsuredPartyRoleType ^property[0].code = #notSelectable
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_IndividualInsuredPartyRoleType ^property[=].valueBoolean = true
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_IndividualInsuredPartyRoleType ^property[+].code = #child
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_IndividualInsuredPartyRoleType ^property[=].valueCode = #COCBEN
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_IndividualInsuredPartyRoleType #RETIREE "retiree" "Description: A person playing the role of an individual insured under a policy based on meeting criteria for the employment status of retired set by law or the policy.                    Discussion: This CoveredPartyRoleType.code is typically used when the CoveredPartyRole class code is either \"program eligible\" or \"subscriber\" and the person's status as a retiree meets jurisdictional or policy criteria."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType "ProgramEligiblePartyRoleType" "Description:A role recognized through the eligibility of a party to play a program eligible for benefits covered or provided under a program."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType ^property[0].code = #notSelectable
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType ^property[=].valueBoolean = true
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType ^property[+].code = #child
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType ^property[=].valueCode = #CRIMEVIC
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType ^property[+].code = #child
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType ^property[=].valueCode = #INJWKR
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType ^property[+].code = #child
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType ^property[=].valueCode = #DIFFABL
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType ^property[+].code = #child
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType ^property[=].valueCode = #WARD
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType #INDIG "member of an indigenous people" "Description: A person playing the role of program eligible under a program based on aboriginal ancestry or as a member of an aboriginal community.                    Discussion: This CoveredPartyRoleType.code is typically used when the CoveredPartyRole class code is \"program eligible\" and the person's status as a member of an indigenous people meets jurisdictional or program criteria."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType #MIL "military" "Definition: A person playing the role of program eligible under a program based on military status.                    Discussion:  This CoveredPartyRoleType.code is typically used when the CoveredPartyRole class code is either \"program eligible\" or \"subscriber\" and the person's status as a member of the military meets jurisdictional or program criteria"
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType #MIL #ACTMIL "active duty military" "Description: A person playing the role of program eligible under a program based on active military status.                    Discussion: This CoveredPartyRoleType.code is typically used when the CoveredPartyRole class code is either \"program eligible\" or \"subscriber\" and the persons status as active duty military meets jurisdictional or program criteria."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType #MIL #RETMIL "retired military" "Description: A person playing the role of program eligible under a program based on retired military status.                    Discussion: This CoveredPartyRoleType.code is typically used when the CoveredPartyRole class code is either \"program eligible\" or \"subscriber\" and the persons status as retired military meets jurisdictional or program criteria."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_ProgramEligiblePartyRoleType #MIL #VET "veteran" "Description: A person playing the role of program eligible under a program based on status as a military veteran.                    Discussion: This CoveredPartyRoleType.code is typically used when the CoveredPartyRole class code is either \"program eligible\" or \"subscriber\" and the persons status as a veteran meets jurisdictional or program criteria."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_SubscriberCoveredPartyRoleType "SubscriberCoveredPartyRoleType" "Description: A role recognized through the eligibility of a party to play a subscriber for benefits covered or provided under a health insurance policy."
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_SubscriberCoveredPartyRoleType ^property[0].code = #notSelectable
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_SubscriberCoveredPartyRoleType ^property[=].valueBoolean = true
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_SubscriberCoveredPartyRoleType ^property[+].code = #child
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_SubscriberCoveredPartyRoleType ^property[=].valueCode = #COCBEN
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_SubscriberCoveredPartyRoleType ^property[+].code = #child
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_SubscriberCoveredPartyRoleType ^property[=].valueCode = #RETIREE
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_SubscriberCoveredPartyRoleType ^property[+].code = #child
* #_PolicyOrProgramCoverageRoleType #_CoveredPartyRoleType #_SubscriberCoveredPartyRoleType ^property[=].valueCode = #MIL
* #_ResearchSubjectRoleBasis "ResearchSubjectRoleBasis" "Specifies the administrative functionality within a formal experimental design for which the ResearchSubject role was established.  Examples: screening - role is used for pre-enrollment evaluation portion of the design; enrolled - role is used for subjects admitted to the active treatment portion of the design."
* #_ResearchSubjectRoleBasis ^property[0].code = #notSelectable
* #_ResearchSubjectRoleBasis ^property[=].valueBoolean = true
* #_ResearchSubjectRoleBasis #ERL "enrollment" "Definition:The specific role being played by a research subject participating in the active treatment or primary data collection portion of a research study."
* #_ResearchSubjectRoleBasis #SCN "screening" "Definition:The specific role being played by a research subject participating in the pre-enrollment evaluation portion of  a research study."
* #_ServiceDeliveryLocationRoleType "ServiceDeliveryLocationRoleType" "A role of a place that further classifies the setting (e.g., accident site, road side, work site, community location) in which services are delivered."
* #_ServiceDeliveryLocationRoleType ^property[0].code = #notSelectable
* #_ServiceDeliveryLocationRoleType ^property[=].valueBoolean = true
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType "DedicatedServiceDeliveryLocationRoleType" "A role of a place that further classifies a setting that is intended to house the provision of services."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType ^property[0].code = #notSelectable
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType ^property[=].valueBoolean = true
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType "DedicatedClinicalLocationRoleType" "A role of a place that further classifies the clinical setting (e.g., cardiology clinic, primary care clinic, rehabilitation hospital, skilled nursing facility) in which care is delivered during an encounter."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType ^property[0].code = #notSelectable
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType ^property[=].valueBoolean = true
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #DX "Diagnostics or therapeutics unit" "A practice setting where diagnostic procedures or therapeutic interventions are performed"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #DX #CVDX "Cardiovascular diagnostics or therapeutics unit" "A practice setting where cardiovascular diagnostic procedures or therapeutic interventions are performed (e.g., cardiac catheterization lab, echocardiography suite)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #DX #CVDX #CATH "Cardiac catheterization lab" "Cardiac catheterization lab"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #DX #CVDX #ECHO "Echocardiography lab" "Echocardiography lab"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #DX #GIDX "Gastroenterology diagnostics or therapeutics lab" "A practice setting where GI procedures (such as endoscopies) are performed"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #DX #GIDX #ENDOS "Endoscopy lab" "(X12N 261QD0000N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #DX #RADDX "Radiology diagnostics or therapeutics unit" "A practice setting where radiology services (diagnostic or therapeutic) are provided            (X12N 261QR0200N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #DX #RADDX #RADO "Radiation oncology unit" "(X12N 261QX0203N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #DX #RADDX #RNEU "Neuroradiology unit" "Neuroradiology unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP "Hospital" "An acute care institution that provides medical, surgical, or psychiatric care and treatment for the sick or the injured."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #CHR "Chronic Care Facility" "(1) A hospital including a physical plant and personnel that provides multidisciplinary diagnosis and treatment for diseases that have one or more of the following characteristics: is permanent; leaves residual disability; is caused by nonreversible pathological alteration; requires special training of the patient for rehabilitation; and/or may be expected to require a long period of supervision or care. In addition, patients require the safety, security, and shelter of these specialized inpatient or partial hospitalization settings. (2) A hospital that provides medical and skilled nursing services to patients with long-term illnesses who are not in an acute phase but who require an intensity of services not available in nursing homes"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #GACH "Hospitals; General Acute Care Hospital" "(X12N 282N00000N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #MHSP "Military Hospital" "A health care facility operated by the Department of Defense or other military operation."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #PSYCHF "Psychatric Care Facility" "Healthcare facility that cares for patients with psychiatric illness(s)."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #RH "Rehabilitation hospital" "(X12N 283X00000N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #RH #RHAT "addiction treatment center" "Description: A location that plays the role of delivering services which may include life training and/or social support to people with addictions."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #RH #RHII "intellectual impairment center" "Description: A location that plays the role of delivering services which may include adaptation, rehabilitation and social integration services for people with intellectual and/or pervasive development disorders such as autism or severe behaviour disorder."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #RH #RHMAD "parents with adjustment difficulties center" "Description: A location that plays the role of delivering services which may social support services for adolescents who are pregnant or have child and are experiencing adaptation issues/difficulties in their current or eventual parenting role."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #RH #RHPI "physical impairment center" "Description: A location that plays the role of delivering services which may include adaptation, rehabilitation and social integration services for people with physical impairments."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #RH #RHPI #RHPIH "physical impairment - hearing center" "Description: A location that plays the role of delivering services for people with hearing impairments."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #RH #RHPI #RHPIMS "physical impairment - motor skills center" "Description: A location that plays the role of delivering services for people with motor skill impairments."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #RH #RHPI #RHPIVS "physical impairment - visual skills center" "Description: A location that plays the role of delivering services for people with visual skill impairments."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HOSP #RH #RHYAD "youths with adjustment difficulties center" "Description: A location that plays the role of delivering services which may include life training and/or social support services for the adaption, rehabilitation and social integration of youths with adjustment difficulties."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU "Hospital unit" "Hospital unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #BMTU "Bone marrow transplant unit" "Bone marrow transplant unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #CCU "Coronary care unit" "Coronary care unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #CHEST "Chest unit" "A specialty unit in hospital that focuses on chronic respirator patients and pulmonary failure"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #EPIL "Epilepsy unit" "Epilepsy unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #ER "Emergency room" "The section of a health care facility for providing rapid treatment to victims of sudden illness or trauma."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #ER #ETU "Emergency trauma unit" "Emergency trauma unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #HD "Hemodialysis unit" "Hemodialysis unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #HLAB "hospital laboratory" "Description: A location that plays the role of delivering services which may include tests done based on clinical specimens to get health information about a patient as pertaining to the diagnosis, treatment and prevention of disease.  Hospital laboratories may be further divided into specialized units such as Anatomic Pathology, Microbiology, and Biochemistry."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #HLAB #INLAB "inpatient laboratory" "Description: A location that plays the role of delivering services which may include tests are done on clinical specimens to get health information about a patient pertaining to the diagnosis, treatment, and prevention of disease for a hospital visit longer than one day."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #HLAB #OUTLAB "outpatient laboratory" "Description: A location that plays the role of delivering services which may include tests are done on clinical specimens to get health information about a patient pertaining to the diagnosis, treatment, and prevention of disease for same day visits."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #HRAD "radiology unit" "Description: A location that plays the role of delivering services which may include the branch of medicine that uses ionizing and non-ionizing radiation to diagnose and treat diseases.  The radiology unit may be further divided into subspecialties such as Imaging, Cardiovascular, Thoracic, and Ultrasound."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #HUSCS "specimen collection site" "Description: A location that plays the role of delivering services which may include collecting specimens and/or samples from patients for laboratory testing purposes, but does not perform any tests or analysis functions."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #ICU "Intensive care unit" "Intensive care unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #ICU #PEDICU "Pediatric intensive care unit" "Pediatric intensive care unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #ICU #PEDICU #PEDNICU "Pediatric neonatal intensive care unit" "Pediatric neonatal intensive care unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #INPHARM "inpatient pharmacy" "Description: A location that plays the role of delivering services which may include providing judicious, safe, efficacious, appropriate and cost effective use of medicines for treatment of patients for visits longer than one day. The distinction between inpatient pharmacies and retail (or outpatient) pharmacies is that they are part of a patient's continuity of care while staying in the hospital."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #MBL "medical laboratory" "Description: A location that plays the role of delivering services which include biochemistry, hematology, microbiology, immunochemistry, and toxicology."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #NCCS "Neurology critical care and stroke unit" "Neurology critical care and stroke unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #NS "Neurosurgery unit" "Neurosurgery unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #OUTPHARM "outpatient pharmacy" "Description: A location that plays the role of delivering services which may include providing judicious, safe, efficacious, appropriate and cost effective use of medicines for treatment of patients for outpatient visits and may also be used for discharge prescriptions."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #PEDU "Pediatric unit" "Pediatric unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #PEDU ^property[0].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #PEDU ^property[=].valueCode = #PEDICU
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #PHU "Psychiatric hospital unit" "(X12N 273R00000N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #RHU "Rehabilitation hospital unit" "Rehabilitation hospital unit"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #HU #SLEEP "Sleep disorders unit" "(X12N 261QA1200N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #NCCF "Nursing or custodial care facility" "Nursing or custodial care facility"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #NCCF #SNF "Skilled nursing facility" "(X12N 314000000N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF "Outpatient facility" "Outpatient facility"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #ALL "Allergy clinic" "Allergy clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #AMPUT "Amputee clinic" "Amputee clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #BMTC "Bone marrow transplant clinic" "Bone marrow transplant clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #BREAST "Breast clinic" "Breast clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #CANC "Child and adolescent neurology clinic" "Child and adolescent neurology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #CAPC "Child and adolescent psychiatry clinic" "Child and adolescent psychiatry clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #CARD "Ambulatory Health Care Facilities; Clinic/Center; Rehabilitation: Cardiac Facilities" "Ambulatory Health Care Facilities; Clinic/Center; Rehabilitation: Cardiac Facilities"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #CARD #PEDCARD "Pediatric cardiology clinic" "Pediatric cardiology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #COAG "Coagulation clinic" "Coagulation clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #CRS "Colon and rectal surgery clinic" "Colon and rectal surgery clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #DERM "Dermatology clinic" "Dermatology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #ENDO "Endocrinology clinic" "Endocrinology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #ENDO #PEDE "Pediatric endocrinology clinic" "Pediatric endocrinology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #ENT "Otorhinolaryngology clinic" "Otorhinolaryngology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #FMC "Family medicine clinic" "Family medicine clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #GI "Gastroenterology clinic" "Gastroenterology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #GI #PEDGI "Pediatric gastroenterology clinic" "Pediatric gastroenterology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #GIM "General internal medicine clinic" "General internal medicine clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #GYN "Gynecology clinic" "Gynecology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #HEM "Hematology clinic" "Hematology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #HEM #PEDHEM "Pediatric hematology clinic" "Pediatric hematology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #HTN "Hypertension clinic" "Hypertension clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #IEC "Impairment evaluation center" "Focuses on assessing disability"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #INFD "Infectious disease clinic" "Infectious disease clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #INFD #PEDID "Pediatric infectious disease clinic" "Pediatric infectious disease clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #INV "Infertility clinic" "Infertility clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #LYMPH "Lympedema clinic" "Lympedema clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #MGEN "Medical genetics clinic" "Medical genetics clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #NEPH "Nephrology clinic" "Nephrology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #NEPH #PEDNEPH "Pediatric nephrology clinic" "Pediatric nephrology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #NEUR "Neurology clinic" "Neurology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #OB "Obstetrics clinic" "Obstetrics clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #OMS "Oral and maxillofacial surgery clinic" "Oral and maxillofacial surgery clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #ONCL "Medical oncology clinic" "Medical oncology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #ONCL #PEDHO "Pediatric oncology clinic" "Pediatric oncology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #OPH "Opthalmology clinic" "Opthalmology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #OPTC "optometry clinic" "Description: A location that plays the role of delivering services which may include examination, diagnosis, treatment, management, and prevention of diseases and disorders of the eye as well as prescribing and fitting appropriate corrective lenses (glasses or contact lenses) as needed.  Optometry clinics may also provide tests for visual field screening, measuring intra-ocular pressure and ophthalmoscopy, as and when required."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #ORTHO "Orthopedics clinic" "Orthopedics clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #ORTHO #HAND "Hand clinic" "Hand clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PAINCL "Pain clinic" "(X12N 261QP3300N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PC "Primary care clinic" "(X12N 261QP2300N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC "Pediatrics clinic" "Pediatrics clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[0].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[=].valueCode = #PEDCARD
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[+].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[=].valueCode = #PEDE
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[+].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[=].valueCode = #PEDGI
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[+].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[=].valueCode = #PEDHEM
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[+].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[=].valueCode = #PEDID
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[+].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[=].valueCode = #PEDNEPH
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[+].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC ^property[=].valueCode = #PEDHO
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PEDC #PEDRHEUM "Pediatric rheumatology clinic" "Pediatric rheumatology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #POD "Podiatry clinic" "(X12N 261QP1100N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PREV "Preventive medicine clinic" "Preventive medicine clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PROCTO "Proctology clinic" "Proctology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PROFF "Provider's Office" "Location where healthcare service was delivered, identified as the healthcare provider's practice office."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PROS "Prosthodontics clinic" "Prosthodontics clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PSI "Psychology clinic" "Psychology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #PSY "Psychiatry clinic" "Psychiatry clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #RHEUM "Rheumatology clinic" "Rheumatology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #RHEUM ^property[0].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #RHEUM ^property[=].valueCode = #PEDRHEUM
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #SPMED "Sports medicine clinic" "Sports medicine clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #SU "Surgery clinic" "Surgery clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #SU #PLS "Plastic surgery clinic" "Plastic surgery clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #SU #URO "Urology clinic" "Urology clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #TR "Transplant clinic" "Transplant clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #TRAVEL "Travel and geographic medicine clinic" "Travel and geographic medicine clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #OF #WND "Wound clinic" "Wound clinic"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #RTF "Residential treatment facility" "Residential treatment facility"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #RTF #PRC "Pain rehabilitation center" "Pain rehabilitation center"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedClinicalLocationRoleType #RTF #SURF "Substance use rehabilitation facility" "(X12N 324500000N)"
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType "DedicatedNonClinicalLocationRoleType" "A role of a place that further classifies a setting that is intended to house the provision of non-clinical services."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType ^property[0].code = #notSelectable
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType ^property[=].valueBoolean = true
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType #DADDR "Delivery Address" "Location address where medical supplies were transported to for use."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType #MOBL "Mobile Unit" "Location (mobile) where healthcare service was delivered."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType #MOBL #AMB "Ambulance" "Location (mobile) where healthcare service was delivered, identified specifically as an ambulance."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType #PHARM "Pharmacy" "Location where healthcare service was delivered, identified as a pharmacy."
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType #PHARM ^property[0].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType #PHARM ^property[=].valueCode = #INPHARM
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType #PHARM ^property[+].code = #child
* #_ServiceDeliveryLocationRoleType #_DedicatedServiceDeliveryLocationRoleType #_DedicatedNonClinicalLocationRoleType #PHARM ^property[=].valueCode = #OUTPHARM
* #_ServiceDeliveryLocationRoleType #_IncidentalServiceDeliveryLocationRoleType "IncidentalServiceDeliveryLocationRoleType" "IncidentalServiceDeliveryLocationRoleType"
* #_ServiceDeliveryLocationRoleType #_IncidentalServiceDeliveryLocationRoleType ^property[0].code = #notSelectable
* #_ServiceDeliveryLocationRoleType #_IncidentalServiceDeliveryLocationRoleType ^property[=].valueBoolean = true
* #_ServiceDeliveryLocationRoleType #_IncidentalServiceDeliveryLocationRoleType #ACC "accident site" "Location of an accident where healthcare service was delivered, such as a roadside."
* #_ServiceDeliveryLocationRoleType #_IncidentalServiceDeliveryLocationRoleType #COMM "Community Location" "Community location where healthcare is delivered."
* #_ServiceDeliveryLocationRoleType #_IncidentalServiceDeliveryLocationRoleType #COMM #CSC "community service center" "Description: A location that plays the role of delivering services which may include providing front-line services to the population of a defined geographic area such as: healthcare services and social services, preventive or curative, rehabilitation or reintegration."
* #_ServiceDeliveryLocationRoleType #_IncidentalServiceDeliveryLocationRoleType #PTRES "Patient's Residence" "location where healthcare was delivered which is the residence of the Patient."
* #_ServiceDeliveryLocationRoleType #_IncidentalServiceDeliveryLocationRoleType #SCHOOL "school" "Location where healthcare service was delivered, identified as a school or educational facility."
* #_ServiceDeliveryLocationRoleType #_IncidentalServiceDeliveryLocationRoleType #UPC "underage protection center" "Description: A location that plays the role of delivering services which may include: social emergency services required for a young person as required under any jurisdictional youth laws, child placement, and family mediation in the defined geographical area the SDL is responsible for. It may provide expertise in a judiciary setting on child custody, adoption and biological history research."
* #_ServiceDeliveryLocationRoleType #_IncidentalServiceDeliveryLocationRoleType #WORK "work site" "Location where healthcare service was delivered, identified as a work place."
* #_SpecimenRoleType "SpecimenRoleType" "SpecimenRoleType"
* #_SpecimenRoleType ^property[0].code = #notSelectable
* #_SpecimenRoleType ^property[=].valueBoolean = true
* #_SpecimenRoleType #C "Calibrator" "A specimen used for initial calibration settings of an instrument"
* #_SpecimenRoleType #G "Group" "A set of patient samples in which the individuals of the group may or may not be identified."
* #_SpecimenRoleType #L "Pool" "Aliquots of individual specimens combined to form a single specimen representing all of the included individuals."
* #_SpecimenRoleType #P "Patient" "A specimen that has been collected from a patient."
* #_SpecimenRoleType #Q "Quality Control" "A specimen specifically used to verify the sensitivity, specificity, accuracy or other perfomance parameter of a diagnostic test."
* #_SpecimenRoleType #Q #B "Blind" "Quality Control specimen submitted to the lab whose identity and composition is not known to the lab."
* #_SpecimenRoleType #Q #E "Electronic QC" "An electronically simulated QC specimen"
* #_SpecimenRoleType #Q #F "Filler Proficiency" "Specimen used for testing proficiency of an organization performing testing (how does this differ from O?)"
* #_SpecimenRoleType #Q #O "Operator Proficiency" "A specimen used for evaluation of operator proficiency (operator in what context?)"
* #_SpecimenRoleType #Q #V "Verifying" "A specimen used for periodic calibration checks of instruments"
* #_SpecimenRoleType #R "Replicate" "A portion of an original patent sample that is tested at the same time as the original sample"
* #CLAIM "claimant" "A party that makes a claim for coverage under a policy."
* #communityLaboratory "Community Laboratory" "Community Laboratory"
* #GT "Guarantor" "An individual or organization that makes or gives a promise, assurance, pledge to pay or has paid the healthcare service provider."
* #homeHealth "Home Health" "Home Health"
* #laboratory "Laboratory" "Laboratory"
* #pathologist "Pathologist" "Pathologist"
* #PH "Policy Holder" "Policy holder for the insurance policy."
* #phlebotomist "Phlebotomist" "Phlebotomist"
* #PROG "program eligible" "A party that meets the eligibility criteria for coverage under a program."
* #PT "Patient" "The recipient for the service(s) and/or product(s) when they are not the covered party."
* #subject "Self" "Self"
* #thirdParty "Third Party" "Third Party"
* #DEP
* #DEP ^property[0].code = #status
* #DEP ^property[=].valueCode = #retired
* #DEPEN "dependent" "A party covered under a policy based on association with a subscriber."
* #DEPEN ^property[0].code = #status
* #DEPEN ^property[=].valueCode = #retired
* #FM "Family Member" "A member of the covered party's family. This could be the spouse, a parent, a grand parent, a sibling, etc."
* #FM ^property[0].code = #status
* #FM ^property[=].valueCode = #retired
* #INDIV "individual" "A party covered under a policy as the policyholder."
* #INDIV ^property[0].code = #status
* #INDIV ^property[=].valueCode = #retired
* #NAMED "named insured" "A party to an insurance policy to whom the insurer agrees to indemnify for losses, provides benefits for, or renders services."
* #NAMED ^property[0].code = #status
* #NAMED ^property[=].valueCode = #retired
* #PSYCHCF
* #PSYCHCF ^property[0].code = #status
* #PSYCHCF ^property[=].valueCode = #retired
* #SUBSCR "subscriber" "A party covered under a policy based on association with a sponsor who is the policy holder, and whose association may provide for the eligibility of dependents for coverage"
* #SUBSCR ^property[0].code = #status
* #SUBSCR ^property[=].valueCode = #retired

Instance: ContactPoint
InstanceOf: StructureDefinition
Usage: #definition
* meta.versionId = "1"
* meta.lastUpdated = "2022-02-15T08:18:57.172+03:00"
* meta.source = "#rMQE1iMv80qInhAV"
* extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* extension[=].valueCode = #normative
* extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* extension[=].valueCode = #4.0.0
* url = "http://hl7.org/fhir/StructureDefinition/ContactPoint"
* version = "4.0.0"
* name = "ContactPoint"
* status = #active
* date = "2018-12-27T10:06:46-05:00"
* publisher = "HL7 FHIR Standard"
* contact.telecom.system = #url
* contact.telecom.value = "http://hl7.org/fhir"
* description = "Base StructureDefinition for ContactPoint Type: Details for all kinds of technology mediated contact points for a person or organization, including telephone, email, etc."
* purpose = "Need to track phone, fax, mobile, sms numbers, email addresses, twitter tags, etc."
* fhirVersion = #4.0.0
* mapping[0].identity = "v2"
* mapping[=].uri = "http://hl7.org/v2"
* mapping[=].name = "HL7 v2 Mapping"
* mapping[+].identity = "rim"
* mapping[=].uri = "http://hl7.org/v3"
* mapping[=].name = "RIM Mapping"
* mapping[+].identity = "servd"
* mapping[=].uri = "http://www.omg.org/spec/ServD/1.0/"
* mapping[=].name = "ServD"
* kind = #complex-type
* abstract = false
* type = "ContactPoint"
* baseDefinition = "http://hl7.org/fhir/StructureDefinition/Element"
* derivation = #specialization
* snapshot.element[0].id = "ContactPoint"
* snapshot.element[=].extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* snapshot.element[=].extension[=].valueCode = #normative
* snapshot.element[=].extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* snapshot.element[=].extension[=].valueCode = #4.0.0
* snapshot.element[=].path = "ContactPoint"
* snapshot.element[=].short = "Details of a Technology mediated contact point (phone, fax, email, etc.)"
* snapshot.element[=].definition = "Details for all kinds of technology mediated contact points for a person or organization, including telephone, email, etc."
* snapshot.element[=].min = 0
* snapshot.element[=].max = "*"
* snapshot.element[=].base.path = "ContactPoint"
* snapshot.element[=].base.min = 0
* snapshot.element[=].base.max = "*"
* snapshot.element[=].condition = "ele-1"
* snapshot.element[=].constraint[0].key = "ele-1"
* snapshot.element[=].constraint[=].severity = #error
* snapshot.element[=].constraint[=].human = "All FHIR elements must have a @value or children"
* snapshot.element[=].constraint[=].expression = "hasValue() or (children().count() > id.count())"
* snapshot.element[=].constraint[=].xpath = "@value|f:*|h:div"
* snapshot.element[=].constraint[=].source = "Element"
* snapshot.element[=].constraint[+].key = "cpt-2"
* snapshot.element[=].constraint[=].severity = #error
* snapshot.element[=].constraint[=].human = "A system is required if a value is provided."
* snapshot.element[=].constraint[=].expression = "value.empty() or system.exists()"
* snapshot.element[=].constraint[=].xpath = "not(exists(f:value)) or exists(f:system)"
* snapshot.element[=].isModifier = false
* snapshot.element[=].mapping[0].identity = "rim"
* snapshot.element[=].mapping[=].map = "n/a"
* snapshot.element[=].mapping[+].identity = "v2"
* snapshot.element[=].mapping[=].map = "XTN"
* snapshot.element[=].mapping[+].identity = "rim"
* snapshot.element[=].mapping[=].map = "TEL"
* snapshot.element[=].mapping[+].identity = "servd"
* snapshot.element[=].mapping[=].map = "ContactPoint"
* snapshot.element[+].id = "ContactPoint.id"
* snapshot.element[=].path = "ContactPoint.id"
* snapshot.element[=].representation = #xmlAttr
* snapshot.element[=].short = "Unique id for inter-element referencing"
* snapshot.element[=].definition = "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces."
* snapshot.element[=].min = 0
* snapshot.element[=].max = "1"
* snapshot.element[=].base.path = "Element.id"
* snapshot.element[=].base.min = 0
* snapshot.element[=].base.max = "1"
* snapshot.element[=].type.code = "string"
* snapshot.element[=].isModifier = false
* snapshot.element[=].isSummary = false
* snapshot.element[=].mapping.identity = "rim"
* snapshot.element[=].mapping.map = "n/a"
* snapshot.element[+].id = "ContactPoint.extension"
* snapshot.element[=].path = "ContactPoint.extension"
* snapshot.element[=].slicing.discriminator.type = #value
* snapshot.element[=].slicing.discriminator.path = "url"
* snapshot.element[=].slicing.description = "Extensions are always sliced by (at least) url"
* snapshot.element[=].slicing.rules = #open
* snapshot.element[=].short = "Additional content defined by implementations"
* snapshot.element[=].definition = "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension."
* snapshot.element[=].comment = "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone."
* snapshot.element[=].alias[0] = "extensions"
* snapshot.element[=].alias[+] = "user content"
* snapshot.element[=].min = 0
* snapshot.element[=].max = "*"
* snapshot.element[=].base.path = "Element.extension"
* snapshot.element[=].base.min = 0
* snapshot.element[=].base.max = "*"
* snapshot.element[=].type.code = "Extension"
* snapshot.element[=].isModifier = false
* snapshot.element[=].isSummary = false
* snapshot.element[=].mapping.identity = "rim"
* snapshot.element[=].mapping.map = "n/a"
* snapshot.element[+].id = "ContactPoint.system"
* snapshot.element[=].path = "ContactPoint.system"
* snapshot.element[=].short = "phone | fax | email | pager | url | sms | other"
* snapshot.element[=].definition = "Telecommunications form for contact point - what communications system is required to make use of the contact."
* snapshot.element[=].min = 0
* snapshot.element[=].max = "1"
* snapshot.element[=].base.path = "ContactPoint.system"
* snapshot.element[=].base.min = 0
* snapshot.element[=].base.max = "1"
* snapshot.element[=].type.code = "code"
* snapshot.element[=].condition = "cpt-2"
* snapshot.element[=].isModifier = false
* snapshot.element[=].isSummary = true
* snapshot.element[=].binding.extension.url = "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName"
* snapshot.element[=].binding.extension.valueString = "ContactPointSystem"
* snapshot.element[=].binding.strength = #required
* snapshot.element[=].binding.description = "Telecommunications form for contact point."
* snapshot.element[=].binding.valueSet = "http://hl7.org/fhir/ValueSet/contact-point-system|4.0.0"
* snapshot.element[=].mapping[0].identity = "v2"
* snapshot.element[=].mapping[=].map = "XTN.3"
* snapshot.element[=].mapping[+].identity = "rim"
* snapshot.element[=].mapping[=].map = "./scheme"
* snapshot.element[=].mapping[+].identity = "servd"
* snapshot.element[=].mapping[=].map = "./ContactPointType"
* snapshot.element[+].id = "ContactPoint.value"
* snapshot.element[=].path = "ContactPoint.value"
* snapshot.element[=].short = "The actual contact point details"
* snapshot.element[=].definition = "The actual contact point details, in a form that is meaningful to the designated communication system (i.e. phone number or email address)."
* snapshot.element[=].comment = "Additional text data such as phone extension numbers, or notes about use of the contact are sometimes included in the value."
* snapshot.element[=].requirements = "Need to support legacy numbers that are not in a tightly controlled format."
* snapshot.element[=].min = 0
* snapshot.element[=].max = "1"
* snapshot.element[=].base.path = "ContactPoint.value"
* snapshot.element[=].base.min = 0
* snapshot.element[=].base.max = "1"
* snapshot.element[=].type.code = "string"
* snapshot.element[=].isModifier = false
* snapshot.element[=].isSummary = true
* snapshot.element[=].mapping[0].identity = "v2"
* snapshot.element[=].mapping[=].map = "XTN.1 (or XTN.12)"
* snapshot.element[=].mapping[+].identity = "rim"
* snapshot.element[=].mapping[=].map = "./url"
* snapshot.element[=].mapping[+].identity = "servd"
* snapshot.element[=].mapping[=].map = "./Value"
* snapshot.element[+].id = "ContactPoint.use"
* snapshot.element[=].path = "ContactPoint.use"
* snapshot.element[=].short = "home | work | temp | old | mobile - purpose of this contact point"
* snapshot.element[=].definition = "Identifies the purpose for the contact point."
* snapshot.element[=].comment = "Applications can assume that a contact is current unless it explicitly says that it is temporary or old."
* snapshot.element[=].requirements = "Need to track the way a person uses this contact, so a user can choose which is appropriate for their purpose."
* snapshot.element[=].min = 0
* snapshot.element[=].max = "1"
* snapshot.element[=].base.path = "ContactPoint.use"
* snapshot.element[=].base.min = 0
* snapshot.element[=].base.max = "1"
* snapshot.element[=].type.code = "code"
* snapshot.element[=].isModifier = true
* snapshot.element[=].isModifierReason = "This is labeled as \"Is Modifier\" because applications should not mistake a temporary or old contact etc.for a current/permanent one"
* snapshot.element[=].isSummary = true
* snapshot.element[=].binding.extension.url = "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName"
* snapshot.element[=].binding.extension.valueString = "ContactPointUse"
* snapshot.element[=].binding.strength = #required
* snapshot.element[=].binding.description = "Use of contact point."
* snapshot.element[=].binding.valueSet = "http://hl7.org/fhir/ValueSet/contact-point-use|4.0.0"
* snapshot.element[=].mapping[0].identity = "v2"
* snapshot.element[=].mapping[=].map = "XTN.2 - but often indicated by field"
* snapshot.element[=].mapping[+].identity = "rim"
* snapshot.element[=].mapping[=].map = "unique(./use)"
* snapshot.element[=].mapping[+].identity = "servd"
* snapshot.element[=].mapping[=].map = "./ContactPointPurpose"
* snapshot.element[+].id = "ContactPoint.rank"
* snapshot.element[=].path = "ContactPoint.rank"
* snapshot.element[=].short = "Specify preferred order of use (1 = highest)"
* snapshot.element[=].definition = "Specifies a preferred order in which to use a set of contacts. ContactPoints with lower rank values are more preferred than those with higher rank values."
* snapshot.element[=].comment = "Note that rank does not necessarily follow the order in which the contacts are represented in the instance."
* snapshot.element[=].min = 0
* snapshot.element[=].max = "1"
* snapshot.element[=].base.path = "ContactPoint.rank"
* snapshot.element[=].base.min = 0
* snapshot.element[=].base.max = "1"
* snapshot.element[=].type.code = "positiveInt"
* snapshot.element[=].isModifier = false
* snapshot.element[=].isSummary = true
* snapshot.element[=].mapping[0].identity = "v2"
* snapshot.element[=].mapping[=].map = "n/a"
* snapshot.element[=].mapping[+].identity = "rim"
* snapshot.element[=].mapping[=].map = "n/a"
* snapshot.element[+].id = "ContactPoint.period"
* snapshot.element[=].path = "ContactPoint.period"
* snapshot.element[=].short = "Time period when the contact point was/is in use"
* snapshot.element[=].definition = "Time period when the contact point was/is in use."
* snapshot.element[=].min = 0
* snapshot.element[=].max = "1"
* snapshot.element[=].base.path = "ContactPoint.period"
* snapshot.element[=].base.min = 0
* snapshot.element[=].base.max = "1"
* snapshot.element[=].type.code = "Period"
* snapshot.element[=].isModifier = false
* snapshot.element[=].isSummary = true
* snapshot.element[=].mapping[0].identity = "v2"
* snapshot.element[=].mapping[=].map = "N/A"
* snapshot.element[=].mapping[+].identity = "rim"
* snapshot.element[=].mapping[=].map = "./usablePeriod[type=\"IVL<TS>\"]"
* snapshot.element[=].mapping[+].identity = "servd"
* snapshot.element[=].mapping[=].map = "./StartDate and ./EndDate"
* differential.element[0].id = "ContactPoint"
* differential.element[=].extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* differential.element[=].extension[=].valueCode = #normative
* differential.element[=].extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* differential.element[=].extension[=].valueCode = #4.0.0
* differential.element[=].path = "ContactPoint"
* differential.element[=].short = "Details of a Technology mediated contact point (phone, fax, email, etc.)"
* differential.element[=].definition = "Details for all kinds of technology mediated contact points for a person or organization, including telephone, email, etc."
* differential.element[=].min = 0
* differential.element[=].max = "*"
* differential.element[=].constraint.key = "cpt-2"
* differential.element[=].constraint.severity = #error
* differential.element[=].constraint.human = "A system is required if a value is provided."
* differential.element[=].constraint.expression = "value.empty() or system.exists()"
* differential.element[=].constraint.xpath = "not(exists(f:value)) or exists(f:system)"
* differential.element[=].mapping[0].identity = "v2"
* differential.element[=].mapping[=].map = "XTN"
* differential.element[=].mapping[+].identity = "rim"
* differential.element[=].mapping[=].map = "TEL"
* differential.element[=].mapping[+].identity = "servd"
* differential.element[=].mapping[=].map = "ContactPoint"
* differential.element[+].id = "ContactPoint.system"
* differential.element[=].path = "ContactPoint.system"
* differential.element[=].short = "phone | fax | email | pager | url | sms | other"
* differential.element[=].definition = "Telecommunications form for contact point - what communications system is required to make use of the contact."
* differential.element[=].min = 0
* differential.element[=].max = "1"
* differential.element[=].type.code = "code"
* differential.element[=].condition = "cpt-2"
* differential.element[=].isSummary = true
* differential.element[=].binding.extension.url = "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName"
* differential.element[=].binding.extension.valueString = "ContactPointSystem"
* differential.element[=].binding.strength = #required
* differential.element[=].binding.description = "Telecommunications form for contact point."
* differential.element[=].binding.valueSet = "http://hl7.org/fhir/ValueSet/contact-point-system|4.0.0"
* differential.element[=].mapping[0].identity = "v2"
* differential.element[=].mapping[=].map = "XTN.3"
* differential.element[=].mapping[+].identity = "rim"
* differential.element[=].mapping[=].map = "./scheme"
* differential.element[=].mapping[+].identity = "servd"
* differential.element[=].mapping[=].map = "./ContactPointType"
* differential.element[+].id = "ContactPoint.value"
* differential.element[=].path = "ContactPoint.value"
* differential.element[=].short = "The actual contact point details"
* differential.element[=].definition = "The actual contact point details, in a form that is meaningful to the designated communication system (i.e. phone number or email address)."
* differential.element[=].comment = "Additional text data such as phone extension numbers, or notes about use of the contact are sometimes included in the value."
* differential.element[=].requirements = "Need to support legacy numbers that are not in a tightly controlled format."
* differential.element[=].min = 0
* differential.element[=].max = "1"
* differential.element[=].type.code = "string"
* differential.element[=].isSummary = true
* differential.element[=].mapping[0].identity = "v2"
* differential.element[=].mapping[=].map = "XTN.1 (or XTN.12)"
* differential.element[=].mapping[+].identity = "rim"
* differential.element[=].mapping[=].map = "./url"
* differential.element[=].mapping[+].identity = "servd"
* differential.element[=].mapping[=].map = "./Value"
* differential.element[+].id = "ContactPoint.use"
* differential.element[=].path = "ContactPoint.use"
* differential.element[=].short = "home | work | temp | old | mobile - purpose of this contact point"
* differential.element[=].definition = "Identifies the purpose for the contact point."
* differential.element[=].comment = "Applications can assume that a contact is current unless it explicitly says that it is temporary or old."
* differential.element[=].requirements = "Need to track the way a person uses this contact, so a user can choose which is appropriate for their purpose."
* differential.element[=].min = 0
* differential.element[=].max = "1"
* differential.element[=].type.code = "code"
* differential.element[=].isModifier = true
* differential.element[=].isModifierReason = "This is labeled as \"Is Modifier\" because applications should not mistake a temporary or old contact etc.for a current/permanent one"
* differential.element[=].isSummary = true
* differential.element[=].binding.extension.url = "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName"
* differential.element[=].binding.extension.valueString = "ContactPointUse"
* differential.element[=].binding.strength = #required
* differential.element[=].binding.description = "Use of contact point."
* differential.element[=].binding.valueSet = "http://hl7.org/fhir/ValueSet/contact-point-use|4.0.0"
* differential.element[=].mapping[0].identity = "v2"
* differential.element[=].mapping[=].map = "XTN.2 - but often indicated by field"
* differential.element[=].mapping[+].identity = "rim"
* differential.element[=].mapping[=].map = "unique(./use)"
* differential.element[=].mapping[+].identity = "servd"
* differential.element[=].mapping[=].map = "./ContactPointPurpose"
* differential.element[+].id = "ContactPoint.rank"
* differential.element[=].path = "ContactPoint.rank"
* differential.element[=].short = "Specify preferred order of use (1 = highest)"
* differential.element[=].definition = "Specifies a preferred order in which to use a set of contacts. ContactPoints with lower rank values are more preferred than those with higher rank values."
* differential.element[=].comment = "Note that rank does not necessarily follow the order in which the contacts are represented in the instance."
* differential.element[=].min = 0
* differential.element[=].max = "1"
* differential.element[=].type.code = "positiveInt"
* differential.element[=].isSummary = true
* differential.element[=].mapping[0].identity = "v2"
* differential.element[=].mapping[=].map = "n/a"
* differential.element[=].mapping[+].identity = "rim"
* differential.element[=].mapping[=].map = "n/a"
* differential.element[+].id = "ContactPoint.period"
* differential.element[=].path = "ContactPoint.period"
* differential.element[=].short = "Time period when the contact point was/is in use"
* differential.element[=].definition = "Time period when the contact point was/is in use."
* differential.element[=].min = 0
* differential.element[=].max = "1"
* differential.element[=].type.code = "Period"
* differential.element[=].isSummary = true
* differential.element[=].mapping[0].identity = "v2"
* differential.element[=].mapping[=].map = "N/A"
* differential.element[=].mapping[+].identity = "rim"
* differential.element[=].mapping[=].map = "./usablePeriod[type=\"IVL<TS>\"]"
* differential.element[=].mapping[+].identity = "servd"
* differential.element[=].mapping[=].map = "./StartDate and ./EndDate"

CodeSystem: NameUse
Id: name-use
Title: "NameUse"
Description: "The use of a human name."
* ^meta.lastUpdated = "2022-06-14T13:46:01.394+00:00"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^url = "http://hl7.org/fhir/name-use"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.1.66"
* ^version = "4.6.0"
* ^status = #active
* ^experimental = false
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/name-use"
* ^content = #complete
* #usual "Usual" "Known as/conventional/the one you normally use."
* #official "Official" "The formal name as registered in an official (government) registry, but which name might not be commonly used. May be called \"legal name\"."
* #temp "Temp" "A temporary name. Name.period can provide more detailed information. This may also be used for temporary names assigned at birth or in emergency situations."
* #nickname "Nickname" "A name that is used to address the person in an informal manner, but is not part of their formal or usual name."
* #anonymous "Anonymous" "Anonymous assigned name, alias, or pseudonym (used to protect a person's identity for privacy reasons)."
* #old "Old" "This name is no longer in use (or was never correct, but retained for records)."
* #old #maiden "Name changed for Marriage" "A name used prior to changing name because of marriage. This name use is for use by applications that collect and store names that were used prior to a marriage. Marriage naming customs vary greatly around the world, and are constantly changing. This term is not gender specific. The use of this term does not imply any particular history for a person's name."

ValueSet: NameUse
Id: name-use
Title: "NameUse"
Description: "The use of a human name."
* ^meta.lastUpdated = "2022-06-14T13:46:01.394+00:00"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #fhir
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^url = "http://hl7.org/fhir/ValueSet/name-use"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.65"
* ^version = "4.6.0"
* ^status = #active
* ^experimental = false
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system NameUse

CodeSystem: AdministrativeGender
Id: administrative-gender
Title: "AdministrativeGender"
Description: "The gender of a person used for administrative purposes."
* ^meta.lastUpdated = "2022-06-14T13:46:01.394+00:00"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^url = "http://hl7.org/fhir/administrative-gender"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.1.2"
* ^version = "4.6.0"
* ^status = #active
* ^experimental = false
* ^caseSensitive = true
* ^valueSet = "http://hl7.org/fhir/ValueSet/administrative-gender"
* ^content = #complete
* #male "Male" "Male."
* #female "Female" "Female."
* #other "Other" "Other."
* #unknown "Unknown" "Unknown."

ValueSet: AdministrativeGender
Id: administrative-gender
Title: "AdministrativeGender"
Description: "The gender of a person used for administrative purposes."
* ^meta.lastUpdated = "2022-06-14T13:46:01.394+00:00"
* ^meta.profile = "http://hl7.org/fhir/StructureDefinition/shareablevalueset"
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #pa
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-standards-status"
* ^extension[=].valueCode = #normative
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-fmm"
* ^extension[=].valueInteger = 5
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-normative-version"
* ^extension[=].valueCode = #4.0.0
* ^url = "http://hl7.org/fhir/ValueSet/administrative-gender"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.4.642.3.1"
* ^version = "4.6.0"
* ^status = #active
* ^experimental = false
* ^publisher = "HL7 (FHIR Project)"
* ^contact.telecom[0].system = #url
* ^contact.telecom[=].value = "http://hl7.org/fhir"
* ^contact.telecom[+].system = #email
* ^contact.telecom[=].value = "fhir@lists.hl7.org"
* ^immutable = true
* include codes from system AdministrativeGender

CodeSystem: DegreeLicenseCertificate
Id: v2-0360
Title: "degreeLicenseCertificate"
Description: "Code system of concepts specifying an educational degree (e.g., MD).  Used in the CNN datatype (names and identifiers of clinicians) in Version 2 messaging.  Used in HL7 Version 2.x messaging in the CNN segment; note that in releases of HL7 prior to 2.3.1, was also used in person names (XPN), but this use was deprecated, then withdrawn in 2.7."
* ^extension[0].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #inm
* ^extension[+].url = "http://hl7.org/fhir/StructureDefinition/structuredefinition-wg"
* ^extension[=].valueCode = #oo
* ^url = "http://terminology.hl7.org/CodeSystem/v2-0360"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.18.220"
* ^version = "2.1.0"
* ^status = #active
* ^experimental = false
* ^date = "2019-12-01"
* ^publisher = "HL7, Inc"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "http://www.hl7.org/"
* ^purpose = "Underlying Master Code System for V2 table 0360 (Degree/License/Certificate)"
* ^copyright = "Copyright HL7. Licensed under creative commons public domain"
* ^caseSensitive = true
* ^valueSet = "http://terminology.hl7.org/ValueSet/v2-0360"
* ^hierarchyMeaning = #is-a
* ^compositional = false
* ^versionNeeded = false
* ^content = #complete
* ^property[0].code = #status
* ^property[=].uri = "http://terminology.hl7.org/CodeSystem/utg-concept-properties#status"
* ^property[=].description = "Status of the concept"
* ^property[=].type = #code
* ^property[+].code = #deprecated
* ^property[=].uri = "http://terminology.hl7.org/CodeSystem/utg-concept-properties#v2-table-deprecated"
* ^property[=].description = "Version of HL7 in which the code was deprecated"
* ^property[=].type = #code
* #PN "Advanced Practice Nurse" "Advanced Practice Nurse"
* #PN ^id = "3594"
* #PN ^property[0].code = #status
* #PN ^property[=].valueCode = #A
* #AAS "Associate of Applied Science" "Associate of Applied Science"
* #AAS ^id = "3595"
* #AAS ^property[+].code = #status
* #AAS ^property[=].valueCode = #A
* #AA "Associate of Arts" "Associate of Arts"
* #AA ^id = "3596"
* #AA ^property[+].code = #status
* #AA ^property[=].valueCode = #A
* #ABA "Associate of Business Administration" "Associate of Business Administration"
* #ABA ^id = "3597"
* #ABA ^property[+].code = #status
* #ABA ^property[=].valueCode = #A
* #AE "Associate of Engineering" "Associate of Engineering"
* #AE ^id = "3598"
* #AE ^property[+].code = #status
* #AE ^property[=].valueCode = #A
* #AS "Associate of Science" "Associate of Science"
* #AS ^id = "3599"
* #AS ^property[+].code = #status
* #AS ^property[=].valueCode = #A
* #BA "Bachelor of Arts" "Bachelor of Arts"
* #BA ^id = "3600"
* #BA ^property[+].code = #status
* #BA ^property[=].valueCode = #A
* #BBA "Bachelor of Business Administration" "Bachelor of Business Administration"
* #BBA ^id = "3601"
* #BBA ^property[+].code = #status
* #BBA ^property[=].valueCode = #A
* #BE "Bachelor or Engineering" "Bachelor or Engineering"
* #BE ^id = "3602"
* #BE ^property[+].code = #status
* #BE ^property[=].valueCode = #A
* #BFA "Bachelor of Fine Arts" "Bachelor of Fine Arts"
* #BFA ^id = "3603"
* #BFA ^property[+].code = #status
* #BFA ^property[=].valueCode = #A
* #BN "Bachelor of Nursing" "Bachelor of Nursing"
* #BN ^id = "3604"
* #BN ^property[+].code = #status
* #BN ^property[=].valueCode = #A
* #BS "Bachelor of Science" "Bachelor of Science"
* #BS ^id = "3605"
* #BS ^property[+].code = #status
* #BS ^property[=].valueCode = #A
* #BSL "Bachelor of Science - Law" "Bachelor of Science - Law"
* #BSL ^id = "3606"
* #BSL ^property[+].code = #status
* #BSL ^property[=].valueCode = #A
* #BSN "Bachelor on Science - Nursing" "Bachelor on Science - Nursing"
* #BSN ^id = "3607"
* #BSN ^property[+].code = #status
* #BSN ^property[=].valueCode = #A
* #BT "Bachelor of Theology" "Bachelor of Theology"
* #BT ^id = "3608"
* #BT ^property[+].code = #status
* #BT ^property[=].valueCode = #A
* #CER "Certificate" "Certificate"
* #CER ^id = "3609"
* #CER ^property[+].code = #status
* #CER ^property[=].valueCode = #A
* #CANP "Certified Adult Nurse Practitioner" "Certified Adult Nurse Practitioner"
* #CANP ^id = "3610"
* #CANP ^property[+].code = #status
* #CANP ^property[=].valueCode = #A
* #CMA "Certified Medical Assistant" "Certified Medical Assistant"
* #CMA ^id = "3611"
* #CMA ^property[+].code = #status
* #CMA ^property[=].valueCode = #A
* #CNP "Certified Nurse Practitioner" "Certified Nurse Practitioner"
* #CNP ^id = "3612"
* #CNP ^property[+].code = #status
* #CNP ^property[=].valueCode = #A
* #CNM "Certified Nurse Midwife" "Certified Nurse Midwife"
* #CNM ^id = "3613"
* #CNM ^property[+].code = #status
* #CNM ^property[=].valueCode = #A
* #CRN "Certified Registered Nurse" "Certified Registered Nurse"
* #CRN ^id = "3614"
* #CRN ^property[+].code = #status
* #CRN ^property[=].valueCode = #A
* #CNS "Certified Nurse Specialist" "Certified Nurse Specialist"
* #CNS ^id = "3615"
* #CNS ^property[+].code = #status
* #CNS ^property[=].valueCode = #A
* #CPNP "Certified Pediatric Nurse Practitioner" "Certified Pediatric Nurse Practitioner"
* #CPNP ^id = "3616"
* #CPNP ^property[+].code = #status
* #CPNP ^property[=].valueCode = #A
* #CTR "Certified Tumor Registrar" "Certified Tumor Registrar"
* #CTR ^id = "3617"
* #CTR ^property[+].code = #status
* #CTR ^property[=].valueCode = #A
* #DIP "Diploma" "Diploma"
* #DIP ^id = "3618"
* #DIP ^property[+].code = #status
* #DIP ^property[=].valueCode = #A
* #DBA "Doctor of Business Administration" "Doctor of Business Administration"
* #DBA ^id = "3619"
* #DBA ^property[+].code = #status
* #DBA ^property[=].valueCode = #A
* #DED "Doctor of Education" "Doctor of Education"
* #DED ^id = "3620"
* #DED ^property[+].code = #status
* #DED ^property[=].valueCode = #A
* #PharmD "Doctor of Pharmacy" "Doctor of Pharmacy"
* #PharmD ^id = "3621"
* #PharmD ^property[+].code = #status
* #PharmD ^property[=].valueCode = #A
* #PHE "Doctor of Engineering" "Doctor of Engineering"
* #PHE ^id = "3622"
* #PHE ^property[+].code = #status
* #PHE ^property[=].valueCode = #A
* #PHD "Doctor of Philosophy" "Doctor of Philosophy"
* #PHD ^id = "3623"
* #PHD ^property[+].code = #status
* #PHD ^property[=].valueCode = #A
* #PHS "Doctor of Science" "Doctor of Science"
* #PHS ^id = "3624"
* #PHS ^property[+].code = #status
* #PHS ^property[=].valueCode = #A
* #MD "Doctor of Medicine" "Doctor of Medicine"
* #MD ^id = "3625"
* #MD ^property[+].code = #status
* #MD ^property[=].valueCode = #A
* #DO "Doctor of Osteopathy" "Doctor of Osteopathy"
* #DO ^id = "3626"
* #DO ^property[+].code = #status
* #DO ^property[=].valueCode = #A
* #EMT "Emergency Medical Technician" "Emergency Medical Technician"
* #EMT ^id = "3627"
* #EMT ^property[+].code = #status
* #EMT ^property[=].valueCode = #A
* #EMTP "Emergency Medical Technician - Paramedic" "Emergency Medical Technician - Paramedic"
* #EMTP ^id = "3628"
* #EMTP ^property[+].code = #status
* #EMTP ^property[=].valueCode = #A
* #FPNP "Family Practice Nurse Practitioner" "Family Practice Nurse Practitioner"
* #FPNP ^id = "3629"
* #FPNP ^property[+].code = #status
* #FPNP ^property[=].valueCode = #A
* #HS "High School Graduate" "High School Graduate"
* #HS ^id = "3630"
* #HS ^property[+].code = #status
* #HS ^property[=].valueCode = #A
* #JD "Juris Doctor" "Juris Doctor"
* #JD ^id = "3631"
* #JD ^property[+].code = #status
* #JD ^property[=].valueCode = #A
* #MA "Master of Arts" "Master of Arts"
* #MA ^id = "3632"
* #MA ^property[+].code = #status
* #MA ^property[=].valueCode = #A
* #MBA "Master of Business Administration" "Master of Business Administration"
* #MBA ^id = "3633"
* #MBA ^property[+].code = #status
* #MBA ^property[=].valueCode = #A
* #MCE "Master of Civil Engineering" "Master of Civil Engineering"
* #MCE ^id = "3634"
* #MCE ^property[+].code = #status
* #MCE ^property[=].valueCode = #A
* #MDI "Master of Divinity" "Master of Divinity"
* #MDI ^id = "3635"
* #MDI ^property[+].code = #status
* #MDI ^property[=].valueCode = #A
* #MED "Master of Education" "Master of Education"
* #MED ^id = "3636"
* #MED ^property[+].code = #status
* #MED ^property[=].valueCode = #A
* #MEE "Master of Electrical Engineering" "Master of Electrical Engineering"
* #MEE ^id = "3637"
* #MEE ^property[+].code = #status
* #MEE ^property[=].valueCode = #A
* #ME "Master of Engineering" "Master of Engineering"
* #ME ^id = "3638"
* #ME ^property[+].code = #status
* #ME ^property[=].valueCode = #A
* #MFA "Master of Fine Arts" "Master of Fine Arts"
* #MFA ^id = "3639"
* #MFA ^property[+].code = #status
* #MFA ^property[=].valueCode = #A
* #MME "Master of Mechanical Engineering" "Master of Mechanical Engineering"
* #MME ^id = "3640"
* #MME ^property[+].code = #status
* #MME ^property[=].valueCode = #A
* #MS "Master of Science" "Master of Science"
* #MS ^id = "3641"
* #MS ^property[+].code = #status
* #MS ^property[=].valueCode = #A
* #MSL "Master of Science - Law" "Master of Science - Law"
* #MSL ^id = "3642"
* #MSL ^property[+].code = #status
* #MSL ^property[=].valueCode = #A
* #MSN "Master of Science - Nursing" "Master of Science - Nursing"
* #MSN ^id = "3643"
* #MSN ^property[+].code = #status
* #MSN ^property[=].valueCode = #A
* #MTH "Master of Theology" "Master of Theology"
* #MTH ^id = "3644"
* #MTH ^property[+].code = #status
* #MTH ^property[=].valueCode = #A
* #MDA "Medical Assistant" "Medical Assistant"
* #MDA ^id = "3645"
* #MDA ^property[+].code = #status
* #MDA ^property[=].valueCode = #A
* #MT "Medical Technician" "Medical Technician"
* #MT ^id = "3646"
* #MT ^property[+].code = #status
* #MT ^property[=].valueCode = #A
* #NG "Non-Graduate" "Non-Graduate"
* #NG ^id = "3647"
* #NG ^property[+].code = #status
* #NG ^property[=].valueCode = #A
* #NP "Nurse Practitioner" "Nurse Practitioner"
* #NP ^id = "3648"
* #NP ^property[+].code = #status
* #NP ^property[=].valueCode = #A
* #PA "Physician Assistant" "Physician Assistant"
* #PA ^id = "3649"
* #PA ^property[+].code = #status
* #PA ^property[=].valueCode = #A
* #RMA "Registered Medical Assistant" "Registered Medical Assistant"
* #RMA ^id = "3650"
* #RMA ^property[+].code = #status
* #RMA ^property[=].valueCode = #A
* #RN "Registered Nurse" "Registered Nurse"
* #RN ^id = "3651"
* #RN ^property[+].code = #status
* #RN ^property[=].valueCode = #A
* #RPH "Registered Pharmacist" "Registered Pharmacist"
* #RPH ^id = "3652"
* #RPH ^property[+].code = #status
* #RPH ^property[=].valueCode = #A
* #SEC "Secretarial Certificate" "Secretarial Certificate"
* #SEC ^id = "3653"
* #SEC ^property[+].code = #status
* #SEC ^property[=].valueCode = #A
* #TS "Trade School Graduate" "Trade School Graduate"
* #TS ^id = "3654"
* #TS ^property[+].code = #status
* #TS ^property[=].valueCode = #A

ValueSet: Hl7VSDegreeLicenseCertificate
Id: v2-0360
Title: "hl7VS-degreeLicenseCertificate"
Description: "Concepts specifying an educational degree (e.g., MD).  Used in the CNN datatype (names and identifiers of clinicians) in Version 2 messaging.  Used in Version 2 messaging; note that in releases of HL7 prior to 2.3.1, was also used in person names (XPN), but this use was deprecated, then withdrawn in 2.7."
* ^url = "http://terminology.hl7.org/ValueSet/v2-0360"
* ^identifier.system = "urn:ietf:rfc:3986"
* ^identifier.value = "urn:oid:2.16.840.1.113883.21.236"
* ^version = "2.0.0"
* ^status = #active
* ^experimental = false
* ^date = "2019-12-01"
* ^publisher = "HL7, Inc"
* ^contact.telecom.system = #url
* ^contact.telecom.value = "https://github.com/HL7/UTG"
* ^copyright = "Copyright HL7. Licensed under creative commons public domain"
* include codes from system http://terminology.hl7.org/CodeSystem/v2-0360|2.1.0