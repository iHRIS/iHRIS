Profile:        IhrisParametersRemoteConfig
Parent:         Parameters
Id:             ihris-parameters-remote-config
Title:          "iHRIS Parameters Remote Config"
Description:    "Configuration Parameters to be loaded from a remote file for iHRIS."
* parameter 2..2
* parameter ^slicing.discriminator.type = #value
* parameter ^slicing.discriminator.path = "name"
* parameter ^slicing.rules = #closed
* parameter contains 
            Signature 1..1 and
            Config 1..1 
* parameter[Signature].name = "signature"
* parameter[Signature].value[x] only Signature
* parameter[Signature].value[x] ^slicing.rules = #closed
* parameter[Signature].valueSignature 1..1
* parameter[Signature].valueSignature.type 1..1
* parameter[Signature].valueSignature.type = urn:iso-astm:E1762-95:2013#1.2.840.10065.1.12.1.14
* parameter[Signature].valueSignature.data 1..1
* parameter[Signature].part 0..0
* parameter[Signature].resource 0..0
* parameter[Config].name = "config"
* parameter[Config].part ^slicing.discriminator.type = #value
* parameter[Config].part ^slicing.discriminator.path = "name"
* parameter[Config].part ^slicing.rules = #closed
* parameter[Config].part contains
            ConfigId 1..*
* parameter[Config].part[ConfigId].name 1..1
* parameter[Config].part[ConfigId].value[x] only string
* parameter[Config].part[ConfigId].value[x] ^slicing.rules = #closed
* parameter[Config].part[ConfigId].valueString 1..1
* parameter[Config].part[ConfigId].part 0..0
* parameter[Config].part[ConfigId].resource 0..0
* parameter[Config].value[x] 0..0
* parameter[Config].resource 0..0

Instance:     ihris-config
InstanceOf:   IhrisParametersRemoteConfig
Title:        "iHRIS Parameters Remote Config Example"
Description:  "iHRIS Parameters Remote Config Example"
Usage:        #example
* parameter[Signature].valueSignature.data = "aTfS/8J0hl6k75tR5NawJgXZtDFACvNEolmriRmHrf6uu2EnrMfqXwzveZOQ1yrZ3Sf6cCLqIaYKsZKIfn+GLX0rVFsBBj4jLppQizZ5v/nPSh4s1opKTiFchrvN+rEGDAN5nFT3JselHgruXu/zBPNYnDbCub1x88zw5IxHAaY="
* parameter[Signature].valueSignature.when = "2020-05-13T00:00:00Z"
* parameter[Signature].valueSignature.who = Reference(http://ihris.org/fhir/Organization/ihris)
* parameter[Config].part[ConfigId][0].name = "site:title"
* parameter[Config].part[ConfigId][0].valueString = "iHRIS"
* parameter[Config].part[ConfigId][1].name = "site:logo"
* parameter[Config].part[ConfigId][1].valueString = "ihris-logo.png"
