Profile:        IhrisPractitionerRole
Parent:         PractitionerRole
Id:             ihris-job-description
Title:          "iHRIS Job Description"
Description:    "iHRIS profile of Practitioner."
* identifier MS
* identifier ^label = "Identifier"
* identifier.system MS
* identifier.system ^label = "System"
* identifier.value MS
* identifier.value ^label = "Value"
* identifier.type MS
* identifier.type ^label = "Type"
* identifier.type.coding 1..1 MS
* active MS
* active ^label = "Status"
* practitioner MS
* practitioner ^label = "Practitioner"
* practitioner.reference ^label = "Practitioner"
* healthcareService 0..0
* telecom 0..0
* location 1..1 MS
* location ^label = "Duty Station"
* location.reference ^label = "Duty Station"
* extension contains
    IhrisPractitionerRoleJobTitle named jobTitle 1..1 MS and
    IhrisPractitionerRoleAbbreviatedJobTitle named abbreviatedJobTitle 0..1 MS and
    IhrisPractitionerRoleJobTitleAmharic named jobTitleAmharic 0..1 MS and
    IhrisPractitionerRoleShift named shift 0..1 MS and
    IhrisPractitionerRoleEmploymentStatus named employmentStatus 0..1 MS and
    IhrisPractitionerRoleJobType named jobType 0..1 MS and
    IhrisPractitionerRoleFirstEmploymentDate named firstEmploymentDate 1..1 MS and
    IhrisPractitionerRoleHiredDate named hiredDate 1..1 MS and
    IhrisPractitionerRoleEndDate named endDate 0..1 MS and
    IhrisPractitionerRoleJobInformationRemark named jobInformationRemark 0..1 MS
* extension[jobTitle].valueCoding MS
* extension[jobTitle] ^label = "Job Title"
* extension[abbreviatedJobTitle].valueCoding MS
* extension[abbreviatedJobTitle] ^label = "Abbreviated ob Title"
* extension[jobTitleAmharic].valueCoding MS
* extension[jobTitleAmharic] ^label = "Job Title Amharic"
* extension[shift].valueCoding MS
* extension[shift] ^label = "Shift"
* extension[employmentStatus].valueCoding MS
* extension[employmentStatus] ^label = "Employment Status"
* extension[jobType].valueCoding MS
* extension[jobType] ^label = "Job Type"
* extension[firstEmploymentDate].valueDate MS
* extension[firstEmploymentDate] ^label = "First Employment Date"
* extension[hiredDate].valueDate MS
* extension[hiredDate] ^label = "Hire Date"
* extension[endDate].valueDate MS
* extension[endDate] ^label = "End Date"
* extension[jobInformationRemark].valueString MS
* extension[jobInformationRemark] ^label = "Remark"

Extension:      IhrisPractitionerRoleJobTitle
Id:             ihris-practitionerrole-job-title
Title:          "iHRIS Job Description Job Title"
Description:    "iHRIS extension for Job Description Job Title."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Job Title"
* valueCoding from IhrisJobTitleValueSet (required)

CodeSystem:      IhrisJobTitleCodeSystem
Id:              ihris-job-title-codesystem
Title:           "iHRIS Job Title Code System"
* #nurse "Nurse" "Nurse"
* #doctor "Doctor" "Doctor"
* #surgeon "Surgeon" "Surgeon"
* #laboratoryTechnician "Laboratory Technician" "Laboratory Technician"
* #pediatrician "Pediatrician" "Pediatrician"
* #pharmacist "Pharmacist" "Pharmacist"

ValueSet:         IhrisJobTitleValueSet
Id:               ihris-job-title-valueset
Title:            "iHRIS Job Title Value Set"
* codes from system IhrisJobTitleCodeSystem

Extension:      IhrisPractitionerRoleAbbreviatedJobTitle
Id:             ihris-practitionerrole-abbreviated-job-title
Title:          "iHRIS Job Description Abbreviated Job Title"
Description:    "iHRIS extension for Job Description Abbreviated Job Title."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Abbreviated Job Title"
* valueCoding from IhrisAbbreviatedJobTitleValueSet (required)

CodeSystem:      IhrisAbbreviatedJobTitleCodeSystem
Id:              ihris-abbreviated-job-title-codesystem
Title:           "iHRIS Abbreviated Job Title Code System"
* #nurseAbbreviation "NR" "NR"
* #doctorAbbreviation "MD" "MD"
* #surgeonAbbreviation "SU" "SU"
* #laboratoryTechnicianAbbreviation "LA" "LA"
* #pediatricianAbbreviation "PED" "PED"
* #pharmacistAbbreviation "PH" "PH"

ValueSet:         IhrisAbbreviatedJobTitleValueSet
Id:               ihris-abbreviated-job-title-valueset
Title:            "iHRIS Abbreviated Job Title Value Set"
* codes from system IhrisAbbreviatedJobTitleCodeSystem

Extension:      IhrisPractitionerRoleJobTitleAmharic
Id:             ihris-practitionerrole-job-title-amharic
Title:          "iHRIS Job Description Job Title Amharic"
Description:    "iHRIS extension for Job Description Job Title Amharic."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Job Title Amharic"
* valueCoding from IhrisJobTitleAmharicValueSet (required)

CodeSystem:      IhrisJobTitleAmharicCodeSystem
Id:              ihris-job-title-amharic-codesystem
Title:           "iHRIS Job Title Amharic Code System"
* #nurseAmharic "ነርስ" "ነርስ"
* #doctorAmharic "የሕክምና ዶክተር" "የሕክምና ዶክተር"
* #surgeonAmharic "የቀዶ ጥገና ሐኪም" "የቀዶ ጥገና ሐኪም"
* #laboratoryTechnicianAmharic "የላቦራቶሪ ቴክኒሽያን" "የላቦራቶሪ ቴክኒሽያን"
* #pediatricianAmharic "የሕፃናት ሐኪም" "የሕፃናት ሐኪም"
* #pharmacistAmharic "ፋርማሲስት" "ፋርማሲስት"

ValueSet:         IhrisJobTitleAmharicValueSet
Id:               ihris-job-title-amharic-valueset
Title:            "iHRIS Job Title Amharic Value Set"
* codes from system IhrisJobTitleAmharicCodeSystem

Extension:      IhrisPractitionerRoleShift
Id:             ihris-practitionerrole-shift
Title:          "iHRIS Job Description Shift"
Description:    "iHRIS extension for Job Description Shift."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Shift"
* valueCoding from IhrisShiftValueSet (required)

CodeSystem:      IhrisShiftCodeSystem
Id:              ihris-shift-codesystem
Title:           "iHRIS Shift Code System"
* #duty "Duty" "Duty"
* #work "Work" "Work"

ValueSet:         IhrisShiftValueSet
Id:               ihris-shift-valueset
Title:            "iHRIS Shift Value Set"
* codes from system IhrisShiftCodeSystem

Extension:      IhrisPractitionerRoleEmploymentStatus
Id:             ihris-practitionerrole-employment-status
Title:          "iHRIS Job Description Employment Status"
Description:    "iHRIS extension for Job Description Employment Status."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Employment Status"
* valueCoding from IhrisEmploymentStatusValueSet (required)

CodeSystem:      IhrisEmploymentStatusCodeSystem
Id:              ihris-employment-status-codesystem
Title:           "iHRIS Employment Status CodeSystem"
* #contract "Contract" "Contract"
* #fullTime "Full-time" "Full-time"
* #partTime "Part-Time" "Part-Time"
* #technicalAssistance  "Technical Assistance" "Technical Assistance"

ValueSet:         IhrisEmploymentStatusValueSet
Id:               ihris-employment-status-valueset
Title:            "iHRIS Employment Status ValueSet"
* codes from system IhrisEmploymentStatusCodeSystem

Extension:      IhrisPractitionerRoleJobType
Id:             ihris-practitionerrole-job-type
Title:          "iHRIS Job Description Job Type"
Description:    "iHRIS extension for Job Description Job Type."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only Coding
* valueCoding 1..1 MS
* valueCoding ^label = "Job Type"
* valueCoding from IhrisJobTypeValueSet (required)

CodeSystem:      IhrisJobTypeCodeSystem
Id:              ihris-job-type-codesystem
Title:           "iHRIS Job Type CodeSystem"
* #transfer "Transfer" "Transfer"
* #newHire "New Hire" "New Hire"
* #redeployment  "Redeployment" "Redeployment"

ValueSet:         IhrisJobTypeValueSet
Id:               ihris-job-type-valueset
Title:            "iHRIS Job Type ValueSet"
* codes from system IhrisJobTypeCodeSystem

Extension:      IhrisPractitionerRoleFirstEmploymentDate
Id:             ihris-practitionerrole-first-employment-date
Title:          "iHRIS Job Description First Employment Date"
Description:    "iHRIS extension for First Employment Date."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only date
* valueDate 1..1 MS
* valueDate ^label = "First Employment Date"

Extension:      IhrisPractitionerRoleHiredDate
Id:             ihris-practitionerrole-hired-date
Title:          "iHRIS Job Description Hired Date"
Description:    "iHRIS extension for Hired Date."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only date
* valueDate 1..1 MS
* valueDate ^label = "Hire Date"

Extension:      IhrisPractitionerRoleEndDate
Id:             ihris-practitionerrole-end-date
Title:          "iHRIS Job Description End Date"
Description:    "iHRIS extension for End Date."
* ^context.type = #element
* ^context.expression = "Practitioner"
* value[x] only date
* valueDate 1..1 MS
* valueDate ^label = "End Date"

Extension:      IhrisPractitionerRoleJobInformationRemark
Id:             ihris-practitionerrole-job-information-remark
Title:          "iHRIS Job Description Job Information Remark"
Description:    "iHRIS extension for Job Information Remark."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only string
* valueString 1..1 MS
* valueString ^label = "Job Information Remark"
