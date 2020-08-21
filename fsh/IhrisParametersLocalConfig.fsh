Profile:        IhrisParametersLocalConfig
Parent:         Parameters
Id:             ihris-parameters-local-config
Title:          "iHRIS Parameters Local Config"
Description:    "Configuration Parameters to be loaded from a local file for iHRIS."
* parameter 3..3
* parameter ^slicing.discriminator.type = #pattern
* parameter ^slicing.discriminator.path = "name"
* parameter ^slicing.rules = #open
* parameter contains 
            FhirBase 1..1 and
            FhirUser 0..1 and
            FhirPass 0..1 and
            Config 1..1 and
            Keys 1..1 and
            Session 0..1
* parameter[FhirBase].name = "fhir:base"
* parameter[FhirBase].value[x] only string
* parameter[FhirBase].valueString 1..1
* parameter[FhirBase].part 0..0
* parameter[FhirBase].resource 0..0
* parameter[FhirUser].name = "fhir:username"
* parameter[FhirUser].value[x] only string
* parameter[FhirUser].valueString 1..1
* parameter[FhirUser].part 0..0
* parameter[FhirUser].resource 0..0
* parameter[FhirPass].name = "fhir:password"
* parameter[FhirPass].value[x] only string
* parameter[FhirPass].valueString 1..1
* parameter[FhirPass].part 0..0
* parameter[FhirPass].resource 0..0
* parameter[Config].name = "config"
* parameter[Config].value[x] 0..0
* parameter[Config].part ^slicing.discriminator.type = #pattern
* parameter[Config].part ^slicing.discriminator.path = "name"
* parameter[Config].part ^slicing.rules = #open
* parameter[Config].part contains
            ConfigId 1..*
* parameter[Config].part[ConfigId].name 1..1
* parameter[Config].part[ConfigId].value[x] only string
* parameter[Config].part[ConfigId].valueString 1..1
* parameter[Config].part[ConfigId].part 0..0
* parameter[Config].part[ConfigId].resource 0..0
* parameter[Config].value[x] 0..0
* parameter[Config].resource 0..0
* parameter[Keys].name = "keys"
* parameter[Keys].part ^slicing.discriminator.type = #pattern
* parameter[Keys].part ^slicing.discriminator.path = "name"
* parameter[Keys].part ^slicing.rules = #open
* parameter[Keys].part contains
            KeyId 1..*
* parameter[Keys].part[KeyId].name 1..1
* parameter[Keys].part[KeyId].value[x] only string
* parameter[Keys].part[KeyId].valueString 1..1
* parameter[Keys].part[KeyId].part 0..0
* parameter[Keys].part[KeyId].resource 0..0
* parameter[Keys].value[x] 0..0
* parameter[Keys].resource 0..0
* parameter[Session].name = "session"
* parameter[Session].part ^slicing.discriminator.type = #pattern
* parameter[Session].part ^slicing.discriminator.path = "name"
* parameter[Session].part ^slicing.rules = #open
* parameter[Session].part contains
            SessionConfig 1..*
* parameter[Session].part[SessionConfig].name 1..1
* parameter[Session].part[SessionConfig].value[x] only string
* parameter[Session].part[SessionConfig].valueString 1..1
* parameter[Session].part[SessionConfig].part 0..0
* parameter[Session].part[SessionConfig].resource 0..0
* parameter[Session].value[x] 0..0
* parameter[Session].resource 0..0

Instance:     ihris-base-config
InstanceOf:   IhrisParametersLocalConfig
Title:        "iHRIS Parameters Local Config Example"
Description:  "iHRIS Parameters Local Config Example"
Usage:        #example
* parameter[FhirBase].valueString = "http://localhost:8080/hapi/fhir"
* parameter[Config].part[ConfigId][0].name = "ihris"
* parameter[Config].part[ConfigId][0].valueString = "ihris-config"
* parameter[Keys].part[KeyId][0].name = "ihris"
* parameter[Keys].part[KeyId][0].valueString = "-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdeFrJr76IQ+SYAoAIw8crZKNW
ir2re7Z7Iu+XzeYYop5+36Ux6uEQKSXo7s1xY2ou9nCkVAddZ1qehBo0e2MCtk62
mQJbBT18fiZ3veQPvb0LC/9aFl64RuOguPrCZC+sbZLegQ6Wwf96UWyqmR49gaHO
EdXwdFdSVyBGyS7dmwIDAQAB
-----END PUBLIC KEY-----"
* parameter[Session].part[SessionConfig][0].name = "secret"
* parameter[Session].part[SessionConfig][0].valueString = "set some secret here"
