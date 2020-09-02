Profile:        IhrisJobDescription
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
* active 1..1 MS
* active ^label = "Status"
* practitioner MS
* practitioner ^label = "Health Worker"
* practitioner.reference ^label = "Health Worker"
* healthcareService 0..0
* telecom 0..0
* location MS
* location ^label = "Duty Station"
* location.reference ^label = "Duty Station"
* code 1..* MS
* code ^label = "Job"
* code from IhrisJobEthiopiaValueset (required)
* code.coding 1..1 MS
* period 1..1 MS
* period.start 1..1 MS
* period.start ^label = "Hired Date"
* period.end 0..1 MS
* period.end ^label = "End Date"
* extension contains
    IhrisPractitionerRoleShift named shift 0..1 MS and
    IhrisPractitionerRoleEmploymentStatus named employmentStatus 0..1 MS and
    IhrisPractitionerRoleJobType named jobType 0..1 MS and
    IhrisPractitionerRoleFirstEmploymentDate named firstEmploymentDate 1..1 MS and
    IhrisPractitionerRoleJobInformationRemark named jobInformationRemark 0..1 MS
* extension[shift].valueCoding MS
* extension[shift] ^label = "Shift"
* extension[employmentStatus].valueCoding MS
* extension[employmentStatus] ^label = "Employment Status"
* extension[jobType].valueCoding MS
* extension[jobType] ^label = "Job Type"
* extension[firstEmploymentDate].valueDate MS
* extension[firstEmploymentDate] ^label = "First Employment Date"
* extension[jobInformationRemark].valueString MS
* extension[jobInformationRemark] ^label = "Remark"

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

Extension:      IhrisPractitionerRoleJobInformationRemark
Id:             ihris-practitionerrole-job-information-remark
Title:          "iHRIS Job Description Job Information Remark"
Description:    "iHRIS extension for Job Information Remark."
* ^context.type = #element
* ^context.expression = "PractitionerRole"
* value[x] only string
* valueString 1..1 MS
* valueString ^label = "Job Information Remark"

ValueSet:         IhrisJobEthiopiaValueset
Id:               ihris-job-ethiopia
Title:            "iHRIS Job Title Value Set"
Description:      "iHRIS ValueSet for: iHRISJobEthiopia"
* codes from system IhrisJobEthiopiaCodeSystem

CodeSystem:      IhrisJobEthiopiaCodeSystem
Id:              ihris-job-ethiopia
Title:           "iHRIS Job Title Code System for Ethiopia"
* ^concept[0].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[0].designation[0].value = "ደረጃ 3 ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን I"
* ^concept[0].display = "Level 3: Prosthetic Orthotic Technique I"
* ^concept[0].code = #POTI3
* ^concept[1].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[1].designation[0].value = "ደረጃ 3 ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን II"
* ^concept[1].display = "Level 3: Prosthetic Orthotic Technique II"
* ^concept[1].code = #POTII3
* ^concept[2].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[2].designation[0].value = "ደረጃ 3 ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን III"
* ^concept[2].display = "Level 3: Prosthetic Orthotic Technique III"
* ^concept[2].code = #POTIII3
* ^concept[3].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[3].designation[0].value = "ደረጃ 3 ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን IV"
* ^concept[3].display = "Level 3: Prosthetic Orthotic Technique IV"
* ^concept[3].code = #POTIV3
* ^concept[4].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[4].designation[0].value = "ደረጃ 4ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን I"
* ^concept[4].display = "Level 4: Prosthetic Orthotic Technique I"
* ^concept[4].code = #POTI4
* ^concept[5].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[5].designation[0].value = "ደረጃ 4ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን II"
* ^concept[5].display = "Level 4: Prosthetic Orthotic Technique II"
* ^concept[5].code = #POTII4
* ^concept[6].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[6].designation[0].value = "ደረጃ 4ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን III"
* ^concept[6].display = "Level 4: Prosthetic Orthotic Technique III"
* ^concept[6].code = #POTIII4
* ^concept[7].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[7].designation[0].value = "ደረጃ 4ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን IV"
* ^concept[7].display = "Level 4: Prosthetic Orthotic Technique IV"
* ^concept[7].code = #POTIV4
* ^concept[8].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[8].designation[0].value = "ደረጃ 5 ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን I"
* ^concept[8].display = "Level 5: Prosthetic Orthotic Technique I"
* ^concept[8].code = #POTI5
* ^concept[9].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[9].designation[0].value = "ደረጃ 5 ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን II"
* ^concept[9].display = "Level 5: Prosthetic Orthotic Technique II"
* ^concept[9].code = #POTII5
* ^concept[10].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[10].designation[0].value = "ደረጃ 5 ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን III"
* ^concept[10].display = "Level 5: Prosthetic Orthotic Technique III"
* ^concept[10].code = #POTIII5
* ^concept[11].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[11].designation[0].value = "ደረጃ 5 ፕሮስቴቲክ ኦርቶቲክ ቴክኒሻን IV"
* ^concept[11].display = "Level 5: Prosthetic Orthotic Technique IV"
* ^concept[11].code = #POTIV5
* ^concept[12].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[12].designation[0].value = "ደረጃ 4 ሚድዋይፈሪ I"
* ^concept[12].display = "Level 4 Midwifery I"
* ^concept[12].code = #LMI
* ^concept[13].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[13].designation[0].value = "ደረጃ 4 ሚድዋይፈሪ II"
* ^concept[13].display = "Level 4 Midwife II"
* ^concept[13].code = #LMII.
* ^concept[14].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[14].designation[0].value = "ደረጃ 4 ሚድዋይፈሪ III"
* ^concept[14].display = "Level 4 Midwife III"
* ^concept[14].code = #LMIII
* ^concept[15].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[15].designation[0].value = "ደረጃ 4 ሚድዋይፈሪ IV"
* ^concept[15].display = "Level 4 Midwife IV"
* ^concept[15].code = #LMIV
* ^concept[16].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[16].designation[0].value = "ደረጃ 4 አካባቢ ጤና አጠባበቅ ቴክኒሽያን I"
* ^concept[16].display = "Level 4 Environmental Health Technician I"
* ^concept[16].code = #EHTI4
* ^concept[17].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[17].designation[0].value = "ደረጃ 4 አካባቢ ጤና አጠባበቅ ቴክኒሽያን II"
* ^concept[17].display = "Level 4 Environmental Health Technician II"
* ^concept[17].code = #EHTII4
* ^concept[18].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[18].designation[0].value = "ደረጃ 4 አካባቢ ጤና አጠባበቅ ቴክኒሽያን III"
* ^concept[18].display = "Level 4 Environmental Health Technician III"
* ^concept[18].code = #EHTIII4
* ^concept[19].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[19].designation[0].value = "ደረጃ 4 አካባቢ ጤና አጠባበቅ ቴክኒሽያን IV"
* ^concept[19].display = "Level 4 Environmental Health Technician IV"
* ^concept[19].code = #EHTIV4
* ^concept[20].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[20].designation[0].value = "ደረጃ 4 ጤና ኤክስቴንሽን I"
* ^concept[20].display = "Level 4 Health Extension I"
* ^concept[20].code = #LHEI4
* ^concept[21].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[21].designation[0].value = "ደረጃ 4 ጤና ኤክስቴንሽን II"
* ^concept[21].display = "Level 4 Health Extension II"
* ^concept[21].code = #LHEII4
* ^concept[22].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[22].designation[0].value = "ደረጃ 4 ጤና ኤክስቴንሽን III"
* ^concept[22].display = "Level 4 Health Extension III"
* ^concept[22].code = #LHEIII4
* ^concept[23].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[23].designation[0].value = "ደረጃ 4 ጤና ኤክስቴንሽን IV"
* ^concept[23].display = "Level 4 Health Extension IV"
* ^concept[23].code = #LHEIV4
* ^concept[24].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[24].designation[0].value = "ደረጃ 3 ጤና ኤክስቴሽን ሰራተኛ I"
* ^concept[24].display = "Level 3 Health Extension Worker I"
* ^concept[24].code = #LHEWI3
* ^concept[25].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[25].designation[0].value = "ደረጃ 3 ጤና ኤክስቴሽን ሰራተኛII"
* ^concept[25].display = "Level 3 Health Extension Worker II"
* ^concept[25].code = #LHEWII3
* ^concept[26].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[26].designation[0].value = "ደረጃ 3 ጤና ኤክስቴሽን ሰራተኛ III"
* ^concept[26].display = "Level 3 Health Extension Worker III"
* ^concept[26].code = #LHEWIII3
* ^concept[27].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[27].designation[0].value = "ደረጃ 3 ጤና ኤክስቴሽን ሰራተኛ IV"
* ^concept[27].display = "Level 3 Health Extension Worker IV"
* ^concept[27].code = #LHEWIV3
* ^concept[28].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[28].designation[0].value = "ህብረተሰብ ጤና አጠባበቅ (HO) I"
* ^concept[28].display = "Community Health Organization (HO) I"
* ^concept[28].code = #CHOI
* ^concept[29].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[29].designation[0].value = "ህብረተሰብ ጤና አጠባበቅ (HO) II"
* ^concept[29].display = "Community Health Organization (HO) II"
* ^concept[29].code = #CHOII
* ^concept[30].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[30].designation[0].value = "ህብረተሰብ ጤና አጠባበቅ (HO) III"
* ^concept[30].display = "Community Health Organization (HO) III"
* ^concept[30].code = #CHOIII
* ^concept[31].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[31].designation[0].value = "ህብረተሰብ ጤና አጠባበቅ (HO) IV"
* ^concept[31].display = "Community Health Organization (HO) IV"
* ^concept[31].code = #CHOIV
* ^concept[32].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[32].designation[0].value = "ፐብሊክ ሄልዝ ፕሮፌሽናል ስፔሻሊሰት I"
* ^concept[32].display = "Public Health Professional Specialist I"
* ^concept[32].code = #PHPSI.
* ^concept[33].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[33].designation[0].value = "ፐብሊክ ሄልዝ ፕሮፌሽናል ስፔሻሊሰት II"
* ^concept[33].display = "Public Health Professional Specialist II"
* ^concept[33].code = #PHPSII
* ^concept[34].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[34].designation[0].value = "ፐብሊክ ሄልዝ ፕሮፌሽናል ስፔሻሊሰት III"
* ^concept[34].display = "Public Health Professional Specialist III"
* ^concept[34].code = #PHPSIII
* ^concept[35].designation[0].language = #urn:ietf:bcp:47#am
* ^concept[35].designation[0].value = "ፐብሊክ ሄልዝ ፕሮፌሽናል ስፔሻሊሰት IV"
* ^concept[35].display = "Public Health Professional Specialist IV"
* ^concept[35].code = #PHPSIV
