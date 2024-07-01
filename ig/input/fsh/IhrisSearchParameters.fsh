Instance: basic-location-constraint
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/basic-location-constraint"
* name = "Search Parameter on related location constraint resources for role"
* status = #active
* description = "Search by related location for a Basic resource Role."
* code = #locationconstraint
* base = #Basic
* type = #string
* expression = "Basic.extension('http://ihris.org/fhir/StructureDefinition/ihris-task').extension('constraint')"
* xpathUsage = #normal

Instance: basic-name
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/basic-name"
* name = "Search Parameter on a name extension on Basic resources"
* status = #active
* description = "Search by name for a Basic resource."
* code = #name
* base = #Basic
* type = #string
* expression = "Basic.extension('http://ihris.org/fhir/StructureDefinition/ihris-basic-name')"
* xpath = "f:Basic/f:extension[@url='http://ihris.org/fhir/StructureDefinition/ihris-basic-name']"
* xpathUsage = #normal

Instance: basic-practitioner
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/basic-practitioner"
* name = "Search Parameter on an practitioner extension on Basic resources"
* status = #active
* description = "Search by practitioner for a Basic resource."
* code = #practitioner
* base = #Basic
* type = #reference
* expression = "Basic.extension('http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference')"
* xpath = "f:Basic/f:extension[@url='http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference']"
* xpathUsage = #normal
* target = #Practitioner

Instance: basic-related-location
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/basic-related-location"
* name = "Search Parameter on related location resources for security"
* status = #active
* description = "Search by related location for a Basic resource."
* code = #related-location
* base = #Basic
* type = #string
* expression = "Basic.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('location') | Basic.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('location').empty()"
* xpathUsage = #normal

Instance: basic-related-practitioner
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/basic-related-practitioner"
* name = "Search Parameter on related practitioner resources for security"
* status = #active
* description = "Search by related practitioner for a Basic resource."
* code = #related-practitioner
* base = #Basic
* type = #string
* expression = "Basic.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('practitioner')"
* xpathUsage = #normal

Instance: gofr-search-isbroadcast
InstanceOf: SearchParameter
Usage: #definition
* url = "http://gofr.org/fhir/SearchParameter/gofr-search-isbroadcast"
* description = "search parameter for broadcasted messages"
* name = "search parameter for broadcasted messages"
* status = #active
* experimental = false
* code = #isbroadcast
* base = #CommunicationRequest
* type = #token
* expression = "CommunicationRequest.extension('http://mhero.org/fhir/StructureDefinition/mhero-comm-req-broadcast-starts').exists()"
* xpath = "f:CommunicationRequest/f:extension[@url='http://mhero.org/fhir/StructureDefinition/mhero-comm-req-broadcast-starts']/f:exists"

Instance: gofr-search-isflowstart
InstanceOf: SearchParameter
Usage: #definition
* url = "http://gofr.org/fhir/SearchParameter/gofr-search-isflowstart"
* description = "search parameter for flow starts"
* name = "search parameter for flow starts"
* status = #active
* experimental = false
* code = #isflowstart
* base = #CommunicationRequest
* type = #token
* expression = "CommunicationRequest.extension('http://mhero.org/fhir/StructureDefinition/mhero-comm-req-flow-starts').exists()"
* xpath = "f:CommunicationRequest/f:extension[@url='http://mhero.org/fhir/StructureDefinition/mhero-comm-req-flow-starts']/f:exists"

Instance: leaveperiod-search
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/leaveperiod-search"
* name = "Search Parameter for a practitioner's Leave Period"
* status = #active
* description = "Search for a practitioner's Leave Period"
* code = #leaveperiod
* base = #Basic
* type = #date
* expression = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-ethiopia-leave').extension.where(url='period')"
* xpath = "f:Basic/f:extension[@url='http://ihris.org/fhir/StructureDefinition/ihris-ethiopia-leave']/f:extension[@url='period']"
* xpathUsage = #normal

Instance: leavetype-search
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/leavetype-search"
* name = "Search Parameter for a practitioner's Leave Type"
* status = #active
* description = "Search for a practitioner's Leave Type."
* code = #leavetype
* base = #Basic
* type = #token
* expression = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-ethiopia-leavea').extension.where(url='leave-type')"
* xpath = "f:Basic/f:extension[@url='http://ihris.org/fhir/StructureDefinition/ihris-ethiopia-leave']/f:extension[@url='leave-type']"
* xpathUsage = #normal

Instance: location-related-location
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/location-related-location"
* name = "Search Parameter on related location resources for security"
* status = #active
* description = "Search by related location for a Location resource."
* code = #related-location
* base = #Location
* type = #string
* expression = "Location.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('location') | Location.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('location').empty()"
* xpathUsage = #normal

Instance: performanceperiod-search
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/performanceperiod-search"
* name = "Search Parameter for a practitioner's Performance Period"
* status = #active
* description = "Search for a practitioner's Performance Period"
* code = #performanceperiod
* base = #Basic
* type = #date
* expression = "Basic.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-performance').extension.where(url='period')"
* xpath = "f:Basic/f:extension[@url='http://ihris.org/fhir/StructureDefinition/ihris-performance']/f:extension[@url='period']"
* xpathUsage = #normal

Instance: practitioner-renewrole
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/practitioner-renewrole"
* name = "Search Parameter on  employee id for practitioner"
* status = #active
* description = "Search by employee ID for a practitioner resource."
* code = #renewrole
* base = #Practitioner
* type = #string
* expression = "Practitioner.identifier.where(type.coding.code='PractitionerRole.period.start').value"
* xpathUsage = #normal

Instance: practitioner-phone
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/practitioner-phone"
* name = "Search Parameter on a name extension on Basic resources"
* status = #active
* description = "Search by phone for a Practitioner resource."
* code = #phonenumber
* base = #Practitioner
* target = #Practitioner
* type = #string
* expression = "Practitioner.telecom.where(system='phone').value"
* xpath = "f:Practitioner/f:telecom[@system='phone']/value"
* xpathUsage = #normal

Instance: practitioner-related-location
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/practitioner-related-location"
* name = "Search Parameter on related location resources for security"
* status = #active
* description = "Search by related location for a Practitioner resource."
* code = #related-location
* base = #Practitioner
* type = #string
* expression = "Practitioner.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('location') | Practitioner.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('location').empty()"
* xpathUsage = #normal

Instance: practitioner-related-practitioner
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/practitioner-related-practitioner"
* name = "Search Parameter on related practitioner resources for security"
* status = #active
* description = "Search by related practitioner for a Practitioner resource."
* code = #related-practitioner
* base = #Practitioner
* type = #string
* expression = "Practitioner.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('practitioner')"
* xpathUsage = #normal

Instance: employment-status-search
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/employment-status-search"
* name = "Search Parameter for a practitionerRole employment-status"
* status = #active
* description = "Search for a practitionerRole employment-status."
* code = #employmentstatus
* base = #PractitionerRole
* type = #token
* expression = "PractitionerRole.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status')"
* xpath = "f:PractitionerRole/f:extension[@url='http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status']"
* xpathUsage = #normal

Instance: job-search
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/job-search"
* name = "Search Parameter for a practitionerRole job"
* status = #active
* description = "Search for a practitionerRole job."
* code = #job
* base = #PractitionerRole
* type = #token
* expression = "PractitionerRole.code"
* xpath = "f:PractitionerRole/f:code"
* xpathUsage = #normal

Instance: position-status-search
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/position-status-search"
* name = "Search Parameter for a practitionerRole position status"
* status = #active
* description = "Search for a practitionerRole position status."
* code = #positionstatus
* base = #PractitionerRole
* type = #token
* expression = "PractitionerRole.extension.where(url='http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-position-status')"
* xpath = "f:PractitionerRole/f:extension[@url='http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-position-status']"
* xpathUsage = #normal

Instance: practitionerrole-related-location
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/practitionerrole-related-location"
* name = "Search Parameter on related location resources for security"
* status = #active
* description = "Search by related location for a PractitionerRole resource."
* code = #related-location
* base = #PractitionerRole
* type = #string
* expression = "PractitionerRole.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('location') | PractitionerRole.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('location').empty()"
* xpathUsage = #normal

Instance: practitionerrole-related-practitioner
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/practitionerrole-related-practitioner"
* name = "Search Parameter on related practitioner resources for security"
* status = #active
* description = "Search by related practitioner for a PractitionerRole resource."
* code = #related-practitioner
* base = #PractitionerRole
* type = #string
* expression = "PractitionerRole.extension('http://ihris.org/fhir/StructureDefinition/ihris-related-group').extension('practitioner')"
* xpathUsage = #normal

Instance: practitioner-birthdate
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/practitioner-birthdate"
* name = "Search Parameter on birthdate resources for practioner"
* status = #active
* description = "Search by birthdate for a Practitioner resource."
* code = #birthDate
* base = #Practitioner
* type = #date
* expression = "Practitioner.birthDate"
* xpathUsage = #normal

Instance: practitioner-employeeNumber
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/practitioner-employeeNumber"
* name = "Search Parameter on employee Number for practitioner"
* status = #active
* description = "Search by employee number for a practitioner resource."
* code = #employeeNumber
* base = #Practitioner
* type = #string
* expression = "Practitioner.identifier.where(type.coding.code='EN').value"
* xpathUsage = #normal

Instance: active-user
InstanceOf: SearchParameter
Usage: #definition
* url = "http://ihris.org/fhir/SearchParameter/active-user"
* name = "Search Parameter on active person resources for security"
* status = #active
* description = "Search by active status for a Person resource."
* code = #active
* base = #Person
* type = #token
* expression = "Person.active"
* xpath = "f:Person/f:active"
* xpathUsage = #normal
