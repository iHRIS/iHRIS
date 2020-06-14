Profile:        IhrisPractitioner
Parent:         Practitioner
Id:             ihris-personal-information
Title:          "iHRIS Personal Information"
Description:    "iHRIS profile of Practitioner."

* identifier MS
* identifier ^label = "Identifier"
* identifier.system MS
* identifier.system ^label = "System"
* identifier.value MS
* identifier.value ^label = "Value"
* identifier.type MS
* identifier.type ^label = "Type"
* name 1..1 MS
* name ^label = "Name"
* name.use MS
* name.use ^label = "Use"
* name.family MS
* name.family ^label = "Family"
* name.given MS
* name.given ^label = "Given Name"
* name.prefix MS
* name.prefix ^label = "Prefix"
* name.suffix MS
* name.suffix ^label = "Suffix"
* birthDate MS
* birthDate ^label = "Birth Date"
* gender 1..1 MS
* gender ^label = "Gender"
* telecom MS
* telecom ^label = "Telecom"
* telecom.system MS
* telecom.system ^label = "Type"
* telecom.value MS
* telecom.value ^label = "Value"
* telecom.use MS
* telecom.use ^label = "Use"
* communication 0..0
* name.family.extension contains IhrisPractitionerFamilyNames named familyNames 0..1 MS
* name.family.extension[familyNames].extension[fathers].valueString MS
* name.family.extension[familyNames] ^label = "Family Names"
* name.family.extension[familyNames].extension[mothers].valueString MS
* name.family.extension[familyNames].extension[fathersalternativelanguage].valueString MS
* name.family.extension[familyNames].extension[grandfatherslastname].valueString MS
* name.family.extension[familyNames].extension[grandfathersalternativelanguage].valueString MS
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
* extension[residence].valueReference.reference MS
* extension[nationality].valueCoding MS
* extension[nationality] ^label = "Nationality"
* extension[dependents].valuePositiveInt MS
* extension[dependents] ^label = "Dependents"
* extension[maritalStatus].valueCoding MS
* extension[maritalStatus] ^label = "Marital Status"
* extension[language].valueCoding MS
* extension[language] ^label = "Language"
* extension[specialTraining].valueString  MS
* extension[specialTraining] ^label = "Special Training"
* extension[professionalLicenseCategory].valueString MS
* extension[professionalLicenseCategory] ^label = "Professional License Category"
* extension[educationalMajor].valueCoding MS
* extension[educationalMajor] ^label = "Educational Major"
* extension[category].valueCoding MS
* extension[category] ^label = "Category"
* extension[remarkNote].valueString MS
* extension[remarkNote] ^label = "Remark Note"

Extension:      IhrisPractitionerFamilyNames
Id:             ihris-practitioner-familynames
Title:          "iHRIS FamilyNames"
Description:    "iHRIS Family Names extension for Ethiopia."
* ^context.type = #element
* ^context.expression = "HumanName.family"
* extension contains
      fathers 0..1 MS and
      fathersalternativelanguage 0..1 MS and
      grandfatherslastname 0..1 MS and
      grandfathersalternativelanguage 0..1 MS and
      mothers 0..1 MS
* extension[fathers].value[x] only string
* extension[fathers].valueString 0..1 MS
* extension[fathers].valueString ^label = "Fathers Name"
* extension[fathers] ^label = "Fathers Name"
* extension[fathersalternativelanguage].value[x] only string
* extension[fathersalternativelanguage].valueString 0..1 MS
* extension[fathersalternativelanguage].valueString ^label = "Fathers Name Alternative Language"
* extension[fathersalternativelanguage] ^label = "Fathers Name Alternative Language"
* extension[mothers].value[x] only string
* extension[mothers].valueString 0..1 MS
* extension[mothers].valueString ^label = "Mothers Name"
* extension[mothers] ^label = "Mothers Name"
* extension[grandfatherslastname].value[x] only string
* extension[grandfatherslastname].valueString 0..1 MS
* extension[grandfatherslastname].valueString ^label = "Grandfathers Lastname"
* extension[grandfatherslastname] ^label = "Grandfathers Lastname"
* extension[grandfathersalternativelanguage].value[x] only string
* extension[grandfathersalternativelanguage].valueString 0..1 MS
* extension[grandfathersalternativelanguage].valueString ^label = "Grand Father Name Alternative Language"
* extension[grandfathersalternativelanguage] ^label = "Grand Father Name Alternative Language"

Extension:      IhrisPractitionerProfessionalLicenseCategory
Id:             ihris-personal-information-professional-license-category
Title:          "iHRIS Personal Information Professional License Category"
Description:    "iHRIS extension for Professional License Category."
* ^context.type = #element
* ^context.expression = "Practitioner"
* valueString ^label = "Professional License Category"
* value[x] only string
* valueString 1..1 MS

Extension:      IhrisPractitionerSpecialTraining
Id:             ihris-personal-information-special-training
Title:          "iHRIS Personal Information Special Training"
Description:    "iHRIS extension for Special Training."
* ^context.type = #element
* ^context.expression = "Practitioner"
* valueString ^label = "Special Training"
* value[x] only string
* valueString 1..1 MS

Extension:      IhrisPractitionerRemarkNote
Id:             ihris-personal-information-remark-note
Title:          "iHRIS Personal Information Remark Note"
Description:    "iHRIS extension for Remark Note."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only string
* valueString ^label = "Remarks/Note"
* valueString 1..1 MS

Extension:      IhrisPractitionerResidence
Id:             ihris-practitioner-residence
Title:          "iHRIS Practitioner Residence "
Description:    "iHRIS extension for Practitioner Residence."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Reference
* valueReference 1..1 MS
* valueReference ^label = "Residence"
* valueReference only Reference(Location)
* valueReference.reference 1..1 MS
* valueReference.reference ^label = "Location"
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
* valueCoding ^label = "Language"
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
* valueCoding ^label = "Nationality"
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
* valueCoding ^label = "Educational Major"
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
* valueCoding ^label = "Category"
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
* valueCoding ^label = "Marital Status"
* valueCoding from http://hl7.org/fhir/ValueSet/marital-status (required)

Extension:      IhrisPractitionerDependents
Id:             ihris-practitioner-dependents
Title:          "iHRIS Practitioner Dependents"
Description:    "iHRIS extension for Practitioner number of dependents."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only positiveInt
* valuePositiveInt 1..1 MS
* valuePositiveInt ^label = "Number Of Dependents"