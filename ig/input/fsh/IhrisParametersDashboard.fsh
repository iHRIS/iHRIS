Instance: ihris-dashboard
InstanceOf: Parameters
Usage: #example
* meta.profile = "http://ihris.org/fhir/StructureDefinition/ihris-parameters-remote-config"
* parameter[0].name = "signature"
* parameter[=].valueSignature.type = urn:iso-astm:E1762-95:2013#1.2.840.10065.1.12.1.14
* parameter[=].valueSignature.when = "2020-08-21T07:40:23.650Z"
* parameter[=].valueSignature.who = Reference(http://ihris.org/fhir/Organization/ihris)
* parameter[=].valueSignature.data = "CsPT1RCVT1SWuH4Es/D2xCvqjsK4rry7VVl12rZAwHunaypOBgXbSmnBiFxk24h1VI3LLro6nlASS58eM8vdPW26QN2r+q9r4Ite212lxcqrLagK+2QFtJq+LrILUAL7aH1zke2NDCrnjXDv3oLMU1WNFKVvQ6bkPFeL0A3Iknk="
* parameter[+].name = "config"
* parameter[=].part[0].name = "site:nav:menu:dashboard:text"
* parameter[=].part[=].valueString = "Dashboard"
* parameter[=].part[+].name = "site:nav:menu:dashboard:order"
* parameter[=].part[=].valueString = "5"
* parameter[=].part[+].name = "site:nav:menu:dashboard:icon"
* parameter[=].part[=].valueString = "mdi-poll-box"
* parameter[=].part[+].name = "site:nav:menu:dashboard:menu:staff:text"
* parameter[=].part[=].valueString = "Staff"
* parameter[=].part[+].name = "site:nav:menu:dashboard:menu:staff:url"
* parameter[=].part[=].valueString = "/dashboard/02a830b0-682f-11ea-b869-59440bc44685"