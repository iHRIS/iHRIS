Profile:        IhrisPractitioner
Parent:         Practitioner
Id:             ihris-personal-information
Title:          "iHRIS Personal Information"
Description:    "iHRIS profile of Practitioner."
* identifier MS
* identifier.type MS
* identifier.system MS
* identifier.value MS
* name MS
* birthDate MS
* gender 1..1 MS
* telecom MS
* telecom.system MS
* telecom.use MS
* telecom.value MS
* name.prefix 0..1 MS
* name.suffix 0..* MS
* communication 0..0
* name.family.extension contains IhrisPractitionerFamilyNames named familyNames 1..1 MS
* extension contains
    IhrisPractitionerProfessionalLicenseCategory named professionalLicenseCategory 0..* MS and
    IhrisPractitionerMaritalStatus named maritalStatus 0..1 MS and
    IhrisPractitionerDependents named dependents 0..1 MS and
    IhrisPractitionerLanguage named language 0..* MS and
    IhrisPractitionerSpecialTraining named specialTraining 0..* MS and
    IhrisPractitionerRemarkNote named remarkNote 0..* MS and
    IhrisPractitionerResidence named residence 0..1 MS and
    IhrisPractitionerNationality named nationality 0..1 MS and
    IhrisPractitionerEducationalMajor named educationalMajor 0..1 MS and
    IhrisPractitionerCategory named category 0..1 MS

Extension:      IhrisPractitionerFamilyNames
Id:             ihris-practitioner-familynames
Title:          "iHRIS FamilyNames"
Description:    "iHRIS Family Names extension for Ethiopia."
* ^context.type = #element
* ^context.expression = "HumanName.family"
* extension contains
      fathers 1..1 MS and
      fathersalternativelanguage 0..1 MS and
      grandfatherslastname 1..1 MS and
      grandfathersalternativelanguage 0..1 MS and
      mothers 1..1 MS
* extension[fathers].value[x] only string
* extension[fathersalternativelanguage].value[x] only string
* extension[mothers].value[x] only string
* extension[grandfatherslastname].value[x] only string
* extension[grandfathersalternativelanguage].value[x] only string

Extension:      IhrisPractitionerProfessionalLicenseCategory
Id:             ihris-personal-information-professional-license-category
Title:          "iHRIS Personal Information Professional License Category"
Description:    "iHRIS extension for Professional License Category."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only string
* valueString 1..1 MS

Extension:      IhrisPractitionerSpecialTraining
Id:             ihris-personal-information-special-training
Title:          "iHRIS Personal Information Special Training"
Description:    "iHRIS extension for Special Training."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only string
* valueString 1..1 MS

Extension:      IhrisPractitionerRemarkNote
Id:             ihris-personal-information-remark-note
Title:          "iHRIS Personal Information Remark Note"
Description:    "iHRIS extension for Remark Note."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only string
* valueString 1..1 MS

Extension:      IhrisPractitionerResidence
Id:             ihris-practitioner-residence
Title:          "iHRIS Practitioner Residence "
Description:    "iHRIS extension for Practitioner Residence."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Reference
* valueReference 1..1 MS
* valueReference only Reference(Location)
* valueReference.reference 1..1 MS
* valueReference.type 0..0
* valueReference.identifier 0..0
* valueReference.display 0..0

Extension:      IhrisPractitionerLanguage
Id:             ihris-practitioner-language
Title:          "iHRIS Personal Information Language"
Description:    "iHRIS extension for Personal Information Language."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding from IhrisLanguageValueSet (required)

CodeSystem:      IhrisLanguageCodeSystem
Id:              ihris-language-codesystem
Title:           "iHRIS Language CodeSystem"
* #english "English" "English"
* #amharic "Amharic" "Amharic"
* #oromiffa "Afaan Oromoo" "Afaan Oromoo"
* #somali "Somali" "Somali"
* #tigrinya "Tigrinya" "Tigrinya"

ValueSet:         IhrisLanguageValueSet
Id:               ihris-language-valueset
Title:            "iHRIS Language ValueSet"
* codes from system IhrisLanguageCodeSystem

Extension:      IhrisPractitionerNationality
Id:             ihris-practitioner-nationality
Title:          "iHRIS Practitioner Nationality"
Description:    "iHRIS extension for Practitioner nationality."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding from http://hl7.org/fhir/ValueSet/iso3166-1-2 (required)

Extension:      IhrisPractitionerEducationalMajor
Id:             ihris-practitioner-educational-major
Title:          "iHRIS Personal Information Educational Major"
Description:    "iHRIS extension for Personal Information Educational Major."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding from IhrisEducationalMajorValueSet (required)

CodeSystem:      IhrisEducationalMajorCodeSystem
Id:              ihris-educational-major-codesystem
Title:           "iHRIS Educational Major CodeSystem"
* #emergencyMedicalTech "Emergency Medical Tech" "Emergency Medical Tech"
* #medicalSurgicalAssistant "Medical/Surgical Assistant" "Medical/Surgical Assistant"
* #medicalLabTech "Medical Lab/Tech" "Medical Lab/Tech"
* #medicine "Medicine" "Medicine"
* #nursing "Nursing" "Nursing"
* #pharmacy "Pharmacy" "Pharmacy"
* #otherHealthProfessions "Other Health Professions" "Other Health Professions"

ValueSet:         IhrisEducationalMajorValueSet
Id:               ihris-educational-major-valueset
Title:            "iHRIS Educational Major ValueSet"
* codes from system IhrisEducationalMajorCodeSystem

Extension:      IhrisPractitionerCategory
Id:             ihris-personal-Information-Category
Title:          "iHRIS Personal Information Category"
Description:    "iHRIS extension for Personal Information Category."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding from IhrisCategoryValueSet (required)

CodeSystem:      IhrisCategoryCodeSystem
Id:              ihris-category-codesystem
Title:           "iHRIS Category CodeSystem"
* #professional "Professional" "Professional"
* #administrative "Administrative" "Administrative"
* #academic "Academic" "Academic"

ValueSet:         IhrisCategoryValueSet
Id:               ihris-category-valueset
Title:            "iHRIS Category ValueSet"
* codes from system IhrisCategoryCodeSystem

Extension:      IhrisPractitionerMaritalStatus
Id:             ihris-practitioner-marital-status
Title:          "iHRIS Practitioner Marital Status"
Description:    "iHRIS extension for Practitioner marital status."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding from http://hl7.org/fhir/ValueSet/marital-status (required)

Extension:      IhrisPractitionerDependents
Id:             ihris-practitioner-dependents
Title:          "iHRIS Practitioner Dependents"
Description:    "iHRIS extension for Practitioner number of dependents."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only positiveInt
* valuePositiveInt 1..1 MS
