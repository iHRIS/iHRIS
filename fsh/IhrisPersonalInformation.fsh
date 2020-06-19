Profile:        IhrisPersonalInformation
Parent:         Practitioner
Id:             ihris-personal-information
Title:          "iHRIS Personal Information"
Description:    "iHRIS profile of Practitioner."

* identifier MS
* identifier ^label = "Identifier"
* identifier.system 0..0
/* identifier.system ^label = "System"*/
* identifier.value MS
* identifier.value ^label = "Value"
* identifier.type MS
* identifier.type ^label = "Type"
* identifier.type.coding 1..1 MS
* identifier.type from IhrisEthiopiaIdentifierValueSet
* name 1..1 MS
* name ^label = "Name"
* name.use MS
* name.use ^label = "Use"
* name.family 0..0
/* name.family ^label = "Family"*/
* name.given MS
* name.given ^label = "First Name"
* name.prefix 0..0
* name.extension contains IhrisPractitionerPrefix named ethiopiaPrefix 0..* MS
* name.extension[ethiopiaPrefix].valueCoding MS
* name.extension[ethiopiaPrefix] ^label = "Prefix"
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
* communication 0..* MS
* communication ^label = "Language"
* communication.coding 1..1 MS
* communication from IhrisEthiopiaLanguageValueSet
* name.extension contains IhrisPractitionerFamilyNames named familyNames 0..1 MS
* name.extension[familyNames].extension[fathers].valueString MS
* name.extension[familyNames] ^label = "Family Names"
* name.extension[familyNames].extension[mothers].valueString MS
* name.extension[familyNames].extension[fathersalternativelanguage].valueString MS
* name.extension[familyNames].extension[grandfatherslastname].valueString MS
* name.extension[familyNames].extension[grandfathersalternativelanguage].valueString MS
* extension contains
    IhrisPractitionerProfessionalLicenseCategory named professionalLicenseCategory 0..* MS and
    IhrisPractitionerMaritalStatus named maritalStatus 0..1 MS and
    IhrisPractitionerDependents named dependents 0..* MS and
    IhrisPractitionerSpecialTraining named specialTraining 0..* MS and
    IhrisPractitionerRemarkNote named remarkNote 0..* MS and
    IhrisPractitionerResidence named residence 0..1 MS and
    IhrisPractitionerNationality named nationality 0..1 MS and
    IhrisPractitionerEducationalMajor named educationalMajor 0..1 MS and
    IhrisPractitionerCategory named category 0..1 MS and
    IhrisPractitionerEthnicity named ethnicity 0..1 MS
* extension[residence].valueReference.reference MS
* extension[nationality].valueCoding MS
* extension[nationality] ^label = "Nationality"
* extension[dependents].valueString MS
* extension[dependents] ^label = "Dependents"
* extension[maritalStatus].valueCoding MS
* extension[maritalStatus] ^label = "Marital Status"
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
* ^context.expression = "Practitioner"
* extension contains
      fathers 0..1 MS and
      fathersalternativelanguage 0..1 MS and
      grandfatherslastname 0..1 MS and
      grandfathersalternativelanguage 0..1 MS and
      mothers 0..1 MS
* extension[fathers].value[x] only string
* extension[fathers].valueString 0..1 MS
* extension[fathers].valueString ^label = "Father's Name"
* extension[fathers] ^label = "Father's Name"
* extension[fathersalternativelanguage].value[x] only string
* extension[fathersalternativelanguage].valueString 0..1 MS
* extension[fathersalternativelanguage].valueString ^label = "Father's Name Alternative Language"
* extension[fathersalternativelanguage] ^label = "Father's Name Alternative Language"
* extension[mothers].value[x] only string
* extension[mothers].valueString 0..1 MS
* extension[mothers].valueString ^label = "Mother's Name"
* extension[mothers] ^label = "Mother's Name"
* extension[grandfatherslastname].value[x] only string
* extension[grandfatherslastname].valueString 0..1 MS
* extension[grandfatherslastname].valueString ^label = "Grandfather's Lastname"
* extension[grandfatherslastname] ^label = "Grandfather's Lastname"
* extension[grandfathersalternativelanguage].value[x] only string
* extension[grandfathersalternativelanguage].valueString 0..1 MS
* extension[grandfathersalternativelanguage].valueString ^label = "Grand Father's Name Alternative Language"
* extension[grandfathersalternativelanguage] ^label = "Grand Father's Name Alternative Language"

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

ValueSet:         IhrisEthiopiaLanguageValueSet
Id:               ihris-ethiopia-language-valueset
Title:            "iHRIS Ethiopia Language ValueSet"
* urn:ietf:bcp:47#en "English"
* urn:ietf:bcp:47#am "Amharic"
* urn:ietf:bcp:47#om "Afaan Oromoo"
* urn:ietf:bcp:47#so "Somali"
* urn:ietf:bcp:47#ti "Tigrinya"

Extension:      IhrisPractitionerPrefix
Id:             ihris-practitioner-prefix
Title:          "iHRIS Personal Information Prefix"
Description:    "iHRIS extension for Personal Prefix."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Prefix"
* valueCoding from IhrisEthiopiaPrefixValueSet (required)

ValueSet:         IhrisEthiopiaPrefixValueSet
Id:               ihris-ethiopia-prefix-valueset
Title:            "iHRIS Ethiopia Prefix ValueSet"
* codes from system IhrisEthiopiaPrefixCodeSystem

CodeSystem:         IhrisEthiopiaPrefixCodeSystem
Id:               ihris-ethiopia-pefix-codesystem
Title:            "iHRIS Ethiopia Prefix Codesystem"
* #mr "Mr"
* #mrs "Mrs"
* #ms "Ms"
* #dr "Dr"
* #ato "Ato"
* #ss "Sister"
* #prof "Professor"
* #eng "Enginner"
* #ro "W/ro"
* #rt "W/rt"

ValueSet:         IhrisEthiopiaIdentifierValueSet
Id:               ihris-ethiopia-identifier-valueset
Title:            "iHRIS Ethiopia Identifier ValueSet"
* codes from system IhrisEthiopiaIdentifierCodeSystem

CodeSystem:         IhrisEthiopiaIdentifierCodeSystem
Id:               ihris-ethiopia-identifier-codesystem
Title:            "iHRIS Ethiopia Identifier Codesystem"
* #employeeId "Employee Id"
* #pensionNumber "Pension Number"
* #tinNumber "Tin Number"
* #drivingLicenseId "Driving License"
* #civilServiceId "Civil Service Id"
* #licenseId "License Id"

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
Description:    "iHRIS extension for Practitioner dependents."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only string
* valueString 1..1 MS
* valueString ^label = "Dependents"

Extension:      IhrisPractitionerEthnicity
Id:             ihris-practitioner-ethnicity
Title:          "iHRIS Personal Information Ethnicity"
Description:    "iHRIS extension for Personal Information Ethnicity."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Ethnicity"
* valueCoding from IhrisEthnicityValueSet (required)

CodeSystem:      IhrisEthnicityCodeSystem
Id:              ihris-Ethnicity-codesystem
Title:           "iHRIS Ethnicity CodeSystem"
* #bench "Bench" "Bench"
* #berta "Berta" "Berta"
* #betaIsrael "Beta Israel" "Beta Israel"
* #bodi "Bodi" "Bodi"
* #brayle "Brayle" "Brayle"
* #burji "Burji" "Burji"
* #chara "Chara" "Chara"
* #daasanach "Daasanach" "Daasanach"
* #dawro "Dawro" "Dawro"
* #debaseGawwada "Debase/Gawwada" "Debase/Gawwada"
* #dime "Dime" "Dime"
* #dirashe "Dirashe" "Dirashe"
* #dizi "Dizi" "Dizi"
* #donga "Donga" "Donga"
* #fedashe "Fedashe" "Fedashe"
* #gamo "Gamo" "Gamo"
* #gebato "Gebato" "Gebato"
* #gedeo "Gedeo" "Gedeo"
* #gedicho "Gedicho" "Gedicho"
* #gidole "Gidole" "Gidole"
* #goffa "Goffa" "Goffa"
* #gumuz "Gumuz" "Gumuz"
* #gurage "Gurage" "Gurage"
* #hadiya "Hadiya" "Hadiya"
* #hamar "Hamar" "Hamar"
* #harari "Harari" "Harari"
* #irob "Irob" "Irob"
* #kafficho "Kafficho" "Kafficho"
* #kambaata "Kambaata" "Kambaata"
* #karo "Karo" "Karo"
* #komo "Komo" "Komo"
* #konso "Konso" "Konso"
* #konta "Konta" "Konta"
* #kontoma "Kontoma" "Kontoma"
* #koore "Koore" "Koore"
* #kunama "Kunama" "Kunama"
* #kusumie "Kusumie" "Kusumie"
* #kwegu "Kwegu" "Kwegu"
* #majangir "Majangir" "Majangir"
* #male "Male" "Male"
* #mao "Mao" "Mao"
* #mareqo "Mareqo" "Mareqo"
* #mashola "Mashola" "Mashola"
* #meen "Me'en" "Me'en"
* #merePeople "Mere people" "Mere people"
* #messengo "Messengo" "Messengo"
* #mossiye "Mossiye" "Mossiye"
* #murle "Murle" "Murle"
* #mursi "Mursi" "Mursi"
* #nao "Nao" "Nao"
* #nuer "Nuer" "Nuer"
* #nyangatom "Nyangatom" "Nyangatom"
* #oromo "Oromo" "Oromo"
* #oyda "Oyda" "Oyda"
* #qebena "Qebena" "Qebena"
* #qechem "Qechem" "Qechem"
* #qewama "Qewama" "Qewama"
* #she "She" "She"
* #shekecho "Shekecho" "Shekecho"
* #sheko "Sheko" "Sheko"
* #shinasha "Shinasha" "Shinasha"
* #shitaUpo "Shita/Upo" "Shita/Upo"
* #sidama "Sidama" "Sidama"
* #silte "Silt'e" "Silt'e"
* #somali "Somali" "Somali"
* #surma "Surma" "Surma"
* #tembaro "Tembaro" "Tembaro"
* #tigrinya "Tigrinya" "Tigrinya"
* #tsamai "Tsamai" "Tsamai"
* #welayta "Welayta" "Welayta"
* #werji "Werji" "Werji"
* #yem "Yem" "Yem"
* #zelmam "Zelmam" "Zelmam"
* #zeyese "Zeyese" "Zeyese"
* #otherUnknown "Other/unknown" "Other/unknown"
* #somalian "Somalian" "Somalian"
* #sudanese "Sudanese" "Sudanese"
* #eritrean "Eritrean" "Eritrean"
* #kenyan "Kenyan" "Kenyan"
* #djiboutian "Djiboutian" "Djiboutian"
* #otherForeigners "Other foreigners" "Other foreigners"

ValueSet:         IhrisEthnicityValueSet
Id:               ihris-Ethnicity-valueset
Title:            "iHRIS Ethnicity ValueSet"
* codes from system IhrisEthnicityCodeSystem
