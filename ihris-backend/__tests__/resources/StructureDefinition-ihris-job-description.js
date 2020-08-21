module.exports = {
  "resourceType": "StructureDefinition",
  "id": "ihris-job-description",
  "url": "http://ihris.org/fhir/StructureDefinition/ihris-job-description",
  "version": "0.1.0",
  "name": "IhrisPractitionerRole",
  "title": "iHRIS Job Description",
  "status": "active",
  "description": "iHRIS profile of Practitioner.",
  "fhirVersion": "4.0.1",
  "mapping": [
    {
      "identity": "v2",
      "uri": "http://hl7.org/v2",
      "name": "HL7 v2 Mapping"
    },
    {
      "identity": "rim",
      "uri": "http://hl7.org/v3",
      "name": "RIM Mapping"
    },
    {
      "identity": "servd",
      "uri": "http://www.omg.org/spec/ServD/1.0/",
      "name": "ServD"
    },
    {
      "identity": "w5",
      "uri": "http://hl7.org/fhir/fivews",
      "name": "FiveWs Pattern Mapping"
    }
  ],
  "kind": "resource",
  "abstract": false,
  "type": "PractitionerRole",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/PractitionerRole",
  "derivation": "constraint",
  "snapshot": {
    "element": [
      {
        "id": "PractitionerRole",
        "path": "PractitionerRole",
        "short": "Roles/organizations the practitioner is associated with",
        "definition": "A specific set of Roles/Locations/specialties/services that a practitioner may perform at an organization for a period of time.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "PractitionerRole",
          "min": 0,
          "max": "*"
        },
        "constraint": [
          {
            "key": "dom-2",
            "severity": "error",
            "human": "If the resource is contained in another resource, it SHALL NOT contain nested Resources",
            "expression": "contained.contained.empty()",
            "xpath": "not(parent::f:contained and f:contained)",
            "source": "http://hl7.org/fhir/StructureDefinition/DomainResource"
          },
          {
            "key": "dom-3",
            "severity": "error",
            "human": "If the resource is contained in another resource, it SHALL be referred to from elsewhere in the resource or SHALL refer to the containing resource",
            "expression": "contained.where((('#'+id in (%resource.descendants().reference | %resource.descendants().as(canonical) | %resource.descendants().as(uri) | %resource.descendants().as(url))) or descendants().where(reference = '#').exists() or descendants().where(as(canonical) = '#').exists() or descendants().where(as(canonical) = '#').exists()).not()).trace('unmatched', id).empty()",
            "xpath": "not(exists(for $id in f:contained/*/f:id/@value return $contained[not(parent::*/descendant::f:reference/@value=concat('#', $contained/*/id/@value) or descendant::f:reference[@value='#'])]))",
            "source": "http://hl7.org/fhir/StructureDefinition/DomainResource"
          },
          {
            "key": "dom-4",
            "severity": "error",
            "human": "If a resource is contained in another resource, it SHALL NOT have a meta.versionId or a meta.lastUpdated",
            "expression": "contained.meta.versionId.empty() and contained.meta.lastUpdated.empty()",
            "xpath": "not(exists(f:contained/*/f:meta/f:versionId)) and not(exists(f:contained/*/f:meta/f:lastUpdated))",
            "source": "http://hl7.org/fhir/StructureDefinition/DomainResource"
          },
          {
            "key": "dom-5",
            "severity": "error",
            "human": "If a resource is contained in another resource, it SHALL NOT have a security label",
            "expression": "contained.meta.security.empty()",
            "xpath": "not(exists(f:contained/*/f:meta/f:security))",
            "source": "http://hl7.org/fhir/StructureDefinition/DomainResource"
          },
          {
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bestpractice",
                "valueBoolean": true
              },
              {
                "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bestpractice-explanation",
                "valueMarkdown": "When a resource has no narrative, only systems that fully understand the data can display the resource to a human safely. Including a human readable representation in the resource makes for a much more robust eco-system and cheaper handling of resources by intermediary systems. Some ecosystems restrict distribution of resources to only those systems that do fully understand the resources, and as a consequence implementers may believe that the narrative is superfluous. However experience shows that such eco-systems often open up to new participants over time."
              }
            ],
            "key": "dom-6",
            "severity": "warning",
            "human": "A resource should have narrative for robust management",
            "expression": "text.`div`.exists()",
            "xpath": "exists(f:text/h:div)",
            "source": "http://hl7.org/fhir/StructureDefinition/DomainResource"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "Entity. Role, or Act"
          },
          {
            "identity": "v2",
            "map": "PRD (as one example)"
          },
          {
            "identity": "rim",
            "map": "Role"
          },
          {
            "identity": "servd",
            "map": "ServiceSiteProvider"
          }
        ]
      },
      {
        "id": "PractitionerRole.id",
        "path": "PractitionerRole.id",
        "short": "Logical id of this artifact",
        "definition": "The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.",
        "comment": "The only time that a resource does not have an id is when it is being submitted to the server using a create operation.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Resource.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": true
      },
      {
        "id": "PractitionerRole.meta",
        "path": "PractitionerRole.meta",
        "short": "Metadata about the resource",
        "definition": "The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Resource.meta",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Meta"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true
      },
      {
        "id": "PractitionerRole.implicitRules",
        "path": "PractitionerRole.implicitRules",
        "short": "A set of rules under which this content was created",
        "definition": "A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.",
        "comment": "Asserting this rule set restricts the content to be only understood by a limited set of trading partners. This inherently limits the usefulness of the data in the long term. However, the existing health eco-system is highly fractured, and not yet ready to define, collect, and exchange data in a generally computable sense. Wherever possible, implementers and/or specification writers should avoid using this element. Often, when used, the URL is a reference to an implementation guide that defines these special rules as part of it's narrative along with other profiles, value sets, etc.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Resource.implicitRules",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "uri"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": true,
        "isModifierReason": "This element is labeled as a modifier because the implicit rules may provide additional knowledge about the resource that modifies it's meaning or interpretation",
        "isSummary": true
      },
      {
        "id": "PractitionerRole.language",
        "path": "PractitionerRole.language",
        "short": "Language of the resource content",
        "definition": "The base language in which the resource is written.",
        "comment": "Language is provided to support indexing and accessibility (typically, services such as text to speech use the language tag). The html language tag in the narrative applies  to the narrative. The language tag on the resource may be used to specify the language of other presentations generated from the data in the resource. Not all the content has to be in the base language. The Resource.language should not be assumed to apply to the narrative automatically. If a language is specified, it should it also be specified on the div element in the html (see rules in HTML5 for information about the relationship between xml:lang and the html lang attribute).",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Resource.language",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "code"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "binding": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-maxValueSet",
              "valueCanonical": "http://hl7.org/fhir/ValueSet/all-languages"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              "valueString": "Language"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-isCommonBinding",
              "valueBoolean": true
            }
          ],
          "strength": "preferred",
          "description": "A human language.",
          "valueSet": "http://hl7.org/fhir/ValueSet/languages"
        }
      },
      {
        "id": "PractitionerRole.text",
        "path": "PractitionerRole.text",
        "short": "Text summary of the resource, for human interpretation",
        "definition": "A human-readable narrative that contains a summary of the resource and can be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it \"clinically safe\" for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.",
        "comment": "Contained resources do not have narrative. Resources that are not contained SHOULD have a narrative. In some cases, a resource may only have text with little or no additional discrete data (as long as all minOccurs=1 elements are satisfied).  This may be necessary for data from legacy systems where information is captured as a \"text blob\" or where text is additionally entered raw or narrated and encoded information is added later.",
        "alias": [
          "narrative",
          "html",
          "xhtml",
          "display"
        ],
        "min": 0,
        "max": "1",
        "base": {
          "path": "DomainResource.text",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Narrative"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "Act.text?"
          }
        ]
      },
      {
        "id": "PractitionerRole.contained",
        "path": "PractitionerRole.contained",
        "short": "Contained, inline Resources",
        "definition": "These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.",
        "comment": "This should never be done when the content can be identified properly, as once identification is lost, it is extremely difficult (and context dependent) to restore it again. Contained resources may have profiles and tags In their meta elements, but SHALL NOT have security labels.",
        "alias": [
          "inline resources",
          "anonymous resources",
          "contained resources"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "DomainResource.contained",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Resource"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension",
        "path": "PractitionerRole.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "ordered": false,
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 1,
        "max": "*",
        "base": {
          "path": "DomainResource.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:shift",
        "path": "PractitionerRole.extension",
        "sliceName": "shift",
        "label": "Shift",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "1",
        "base": {
          "path": "DomainResource.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-shift"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:shift.id",
        "path": "PractitionerRole.extension.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:shift.extension",
        "path": "PractitionerRole.extension.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "0",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:shift.url",
        "path": "PractitionerRole.extension.url",
        "representation": [
          "xmlAttr"
        ],
        "short": "identifies the meaning of the extension",
        "definition": "Source of the definition for the extension code - a logical name or a URL.",
        "comment": "The definition may point directly to a computable or human-readable definition of the extensibility codes, or it may be a logical URI as declared in some other specification. The definition SHALL be a URI for the Structure Definition defining the extension.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.url",
          "min": 1,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "uri"
              }
            ]
          }
        ],
        "fixedUri": "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-shift",
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:shift.value[x]",
        "path": "PractitionerRole.extension.value[x]",
        "slicing": {
          "discriminator": [
            {
              "type": "type",
              "path": "$this"
            }
          ],
          "ordered": false,
          "rules": "open"
        },
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Coding"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:shift.value[x]:valueCoding",
        "path": "PractitionerRole.extension.value[x]",
        "sliceName": "valueCoding",
        "label": "Shift",
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Coding"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "binding": {
          "strength": "required",
          "valueSet": "http://ihris.org/fhir/ValueSet/ihris-shift-valueset"
        },
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:employmentStatus",
        "path": "PractitionerRole.extension",
        "sliceName": "employmentStatus",
        "label": "Employment Status",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "1",
        "base": {
          "path": "DomainResource.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:employmentStatus.id",
        "path": "PractitionerRole.extension.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:employmentStatus.extension",
        "path": "PractitionerRole.extension.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "0",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:employmentStatus.url",
        "path": "PractitionerRole.extension.url",
        "representation": [
          "xmlAttr"
        ],
        "short": "identifies the meaning of the extension",
        "definition": "Source of the definition for the extension code - a logical name or a URL.",
        "comment": "The definition may point directly to a computable or human-readable definition of the extensibility codes, or it may be a logical URI as declared in some other specification. The definition SHALL be a URI for the Structure Definition defining the extension.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.url",
          "min": 1,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "uri"
              }
            ]
          }
        ],
        "fixedUri": "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status",
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:employmentStatus.value[x]",
        "path": "PractitionerRole.extension.value[x]",
        "slicing": {
          "discriminator": [
            {
              "type": "type",
              "path": "$this"
            }
          ],
          "ordered": false,
          "rules": "open"
        },
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Coding"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:employmentStatus.value[x]:valueCoding",
        "path": "PractitionerRole.extension.value[x]",
        "sliceName": "valueCoding",
        "label": "Employment Status",
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Coding"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "binding": {
          "strength": "required",
          "valueSet": "http://ihris.org/fhir/ValueSet/ihris-employment-status-valueset"
        },
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobType",
        "path": "PractitionerRole.extension",
        "sliceName": "jobType",
        "label": "Job Type",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "1",
        "base": {
          "path": "DomainResource.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-job-type"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobType.id",
        "path": "PractitionerRole.extension.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobType.extension",
        "path": "PractitionerRole.extension.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "0",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobType.url",
        "path": "PractitionerRole.extension.url",
        "representation": [
          "xmlAttr"
        ],
        "short": "identifies the meaning of the extension",
        "definition": "Source of the definition for the extension code - a logical name or a URL.",
        "comment": "The definition may point directly to a computable or human-readable definition of the extensibility codes, or it may be a logical URI as declared in some other specification. The definition SHALL be a URI for the Structure Definition defining the extension.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.url",
          "min": 1,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "uri"
              }
            ]
          }
        ],
        "fixedUri": "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-job-type",
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobType.value[x]",
        "path": "PractitionerRole.extension.value[x]",
        "slicing": {
          "discriminator": [
            {
              "type": "type",
              "path": "$this"
            }
          ],
          "ordered": false,
          "rules": "open"
        },
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Coding"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobType.value[x]:valueCoding",
        "path": "PractitionerRole.extension.value[x]",
        "sliceName": "valueCoding",
        "label": "Job Type",
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Coding"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "binding": {
          "strength": "required",
          "valueSet": "http://ihris.org/fhir/ValueSet/ihris-job-type-valueset"
        },
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:firstEmploymentDate",
        "path": "PractitionerRole.extension",
        "sliceName": "firstEmploymentDate",
        "label": "First Employment Date",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 1,
        "max": "1",
        "base": {
          "path": "DomainResource.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-first-employment-date"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:firstEmploymentDate.id",
        "path": "PractitionerRole.extension.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:firstEmploymentDate.extension",
        "path": "PractitionerRole.extension.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "0",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:firstEmploymentDate.url",
        "path": "PractitionerRole.extension.url",
        "representation": [
          "xmlAttr"
        ],
        "short": "identifies the meaning of the extension",
        "definition": "Source of the definition for the extension code - a logical name or a URL.",
        "comment": "The definition may point directly to a computable or human-readable definition of the extensibility codes, or it may be a logical URI as declared in some other specification. The definition SHALL be a URI for the Structure Definition defining the extension.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.url",
          "min": 1,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "uri"
              }
            ]
          }
        ],
        "fixedUri": "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-first-employment-date",
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:firstEmploymentDate.value[x]",
        "path": "PractitionerRole.extension.value[x]",
        "slicing": {
          "discriminator": [
            {
              "type": "type",
              "path": "$this"
            }
          ],
          "ordered": false,
          "rules": "open"
        },
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "date"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:firstEmploymentDate.value[x]:valueDate",
        "path": "PractitionerRole.extension.value[x]",
        "sliceName": "valueDate",
        "label": "First Employment Date",
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "date"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobInformationRemark",
        "path": "PractitionerRole.extension",
        "sliceName": "jobInformationRemark",
        "label": "Remark",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "1",
        "base": {
          "path": "DomainResource.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-job-information-remark"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobInformationRemark.id",
        "path": "PractitionerRole.extension.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobInformationRemark.extension",
        "path": "PractitionerRole.extension.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "0",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobInformationRemark.url",
        "path": "PractitionerRole.extension.url",
        "representation": [
          "xmlAttr"
        ],
        "short": "identifies the meaning of the extension",
        "definition": "Source of the definition for the extension code - a logical name or a URL.",
        "comment": "The definition may point directly to a computable or human-readable definition of the extensibility codes, or it may be a logical URI as declared in some other specification. The definition SHALL be a URI for the Structure Definition defining the extension.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.url",
          "min": 1,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "uri"
              }
            ]
          }
        ],
        "fixedUri": "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-job-information-remark",
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobInformationRemark.value[x]",
        "path": "PractitionerRole.extension.value[x]",
        "slicing": {
          "discriminator": [
            {
              "type": "type",
              "path": "$this"
            }
          ],
          "ordered": false,
          "rules": "open"
        },
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.extension:jobInformationRemark.value[x]:valueString",
        "path": "PractitionerRole.extension.value[x]",
        "sliceName": "valueString",
        "label": "Job Information Remark",
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.modifierExtension",
        "path": "PractitionerRole.modifierExtension",
        "short": "Extensions that cannot be ignored",
        "definition": "May be used to represent additional information that is not part of the basic definition of the resource and that modifies the understanding of the element that contains it and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.\n\nModifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "requirements": "Modifier extensions allow for extensions that *cannot* be safely ignored to be clearly distinguished from the vast majority of extensions which can be safely ignored.  This promotes interoperability by eliminating the need for implementers to prohibit the presence of extensions. For further information, see the [definition of modifier extensions](extensibility.html#modifierExtension).",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "DomainResource.modifierExtension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": true,
        "isModifierReason": "Modifier extensions are expected to modify the meaning or interpretation of the resource that contains them",
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier",
        "path": "PractitionerRole.identifier",
        "label": "Identifier",
        "short": "Business Identifiers that are specific to a role/location",
        "definition": "Business Identifiers that are specific to a role/location.",
        "requirements": "Often, specific identities are assigned for the agent.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "PractitionerRole.identifier",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Identifier"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "w5",
            "map": "FiveWs.identifier"
          },
          {
            "identity": "v2",
            "map": "PRD-7 (or XCN.1)"
          },
          {
            "identity": "rim",
            "map": ".id"
          },
          {
            "identity": "servd",
            "map": "./Identifiers"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.id",
        "path": "PractitionerRole.identifier.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.extension",
        "path": "PractitionerRole.identifier.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.use",
        "path": "PractitionerRole.identifier.use",
        "short": "usual | official | temp | secondary | old (If known)",
        "definition": "The purpose of this identifier.",
        "comment": "Applications can assume that an identifier is permanent unless it explicitly says that it is temporary.",
        "requirements": "Allows the appropriate identifier for a particular context of use to be selected from among a set of identifiers.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Identifier.use",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "code"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": true,
        "isModifierReason": "This is labeled as \"Is Modifier\" because applications should not mistake a temporary id for a permanent one.",
        "isSummary": true,
        "binding": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              "valueString": "IdentifierUse"
            }
          ],
          "strength": "required",
          "description": "Identifies the purpose for this identifier, if known .",
          "valueSet": "http://hl7.org/fhir/ValueSet/identifier-use|4.0.1"
        },
        "mapping": [
          {
            "identity": "v2",
            "map": "N/A"
          },
          {
            "identity": "rim",
            "map": "Role.code or implied by context"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.type",
        "path": "PractitionerRole.identifier.type",
        "label": "Type",
        "short": "Description of identifier",
        "definition": "A coded type for the identifier that can be used to determine which identifier to use for a specific purpose.",
        "comment": "This element deals only with general categories of identifiers.  It SHOULD not be used for codes that correspond 1..1 with the Identifier.system. Some identifiers may fall into multiple categories due to common usage.   Where the system is known, a type is unnecessary because the type is always part of the system definition. However systems often need to handle identifiers where the system is not known. There is not a 1:1 relationship between type and system, since many different systems have the same type.",
        "requirements": "Allows users to make use of identifiers when the identifier system is not known.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Identifier.type",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "CodeableConcept"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "binding": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              "valueString": "IdentifierType"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-isCommonBinding",
              "valueBoolean": true
            }
          ],
          "strength": "extensible",
          "description": "A coded type for an identifier that can be used to determine which identifier to use for a specific purpose.",
          "valueSet": "http://hl7.org/fhir/ValueSet/identifier-type"
        },
        "mapping": [
          {
            "identity": "v2",
            "map": "CX.5"
          },
          {
            "identity": "rim",
            "map": "Role.code or implied by context"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.type.id",
        "path": "PractitionerRole.identifier.type.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.type.extension",
        "path": "PractitionerRole.identifier.type.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.type.coding",
        "path": "PractitionerRole.identifier.type.coding",
        "short": "Code defined by a terminology system",
        "definition": "A reference to a code defined by a terminology system.",
        "comment": "Codes may be defined very casually in enumerations, or code lists, up to very formal definitions such as SNOMED CT - see the HL7 v3 Core Principles for more information.  Ordering of codings is undefined and SHALL NOT be used to infer meaning. Generally, at most only one of the coding values will be labeled as UserSelected = true.",
        "requirements": "Allows for alternative encodings within a code system, and translations to other code systems.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "CodeableConcept.coding",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Coding"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "C*E.1-8, C*E.10-22"
          },
          {
            "identity": "rim",
            "map": "union(., ./translation)"
          },
          {
            "identity": "orim",
            "map": "fhir:CodeableConcept.coding rdfs:subPropertyOf dt:CD.coding"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.type.text",
        "extension": [
          {
            "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-translatable",
            "valueBoolean": true
          }
        ],
        "path": "PractitionerRole.identifier.type.text",
        "short": "Plain text representation of the concept",
        "definition": "A human language representation of the concept as seen/selected/uttered by the user who entered the data and/or which represents the intended meaning of the user.",
        "comment": "Very often the text is the same as a displayName of one of the codings.",
        "requirements": "The codes from the terminologies do not always capture the correct meaning with all the nuances of the human using them, or sometimes there is no appropriate code at all. In these cases, the text is used to capture the full meaning of the source.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "CodeableConcept.text",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "C*E.9. But note many systems use C*E.2 for this"
          },
          {
            "identity": "rim",
            "map": "./originalText[mediaType/code=\"text/plain\"]/data"
          },
          {
            "identity": "orim",
            "map": "fhir:CodeableConcept.text rdfs:subPropertyOf dt:CD.originalText"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.system",
        "path": "PractitionerRole.identifier.system",
        "label": "System",
        "short": "The namespace for the identifier value",
        "definition": "Establishes the namespace for the value - that is, a URL that describes a set values that are unique.",
        "comment": "Identifier.system is always case sensitive.",
        "requirements": "There are many sets  of identifiers.  To perform matching of two identifiers, we need to know what set we're dealing with. The system identifies a particular set of unique identifiers.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Identifier.system",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "uri"
          }
        ],
        "example": [
          {
            "label": "General",
            "valueUri": "http://www.acme.com/identifiers/patient"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "CX.4 / EI-2-4"
          },
          {
            "identity": "rim",
            "map": "II.root or Role.id.root"
          },
          {
            "identity": "servd",
            "map": "./IdentifierType"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.value",
        "path": "PractitionerRole.identifier.value",
        "label": "Value",
        "short": "The value that is unique",
        "definition": "The portion of the identifier typically relevant to the user and which is unique within the context of the system.",
        "comment": "If the value is a full URI, then the system SHALL be urn:ietf:rfc:3986.  The value's primary purpose is computational mapping.  As a result, it may be normalized for comparison purposes (e.g. removing non-significant whitespace, dashes, etc.)  A value formatted for human display can be conveyed using the [Rendered Value extension](extension-rendered-value.html). Identifier.value is to be treated as case sensitive unless knowledge of the Identifier.system allows the processer to be confident that non-case-sensitive processing is safe.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Identifier.value",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "example": [
          {
            "label": "General",
            "valueString": "123456"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "CX.1 / EI.1"
          },
          {
            "identity": "rim",
            "map": "II.extension or II.root if system indicates OID or GUID (Or Role.id.extension or root)"
          },
          {
            "identity": "servd",
            "map": "./Value"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.period",
        "path": "PractitionerRole.identifier.period",
        "short": "Time period when id is/was valid for use",
        "definition": "Time period during which identifier is/was valid for use.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Identifier.period",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Period"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "CX.7 + CX.8"
          },
          {
            "identity": "rim",
            "map": "Role.effectiveTime or implied by context"
          },
          {
            "identity": "servd",
            "map": "./StartDate and ./EndDate"
          }
        ]
      },
      {
        "id": "PractitionerRole.identifier.assigner",
        "path": "PractitionerRole.identifier.assigner",
        "short": "Organization that issued id (may be just text)",
        "definition": "Organization that issued/manages the identifier.",
        "comment": "The Identifier.assigner may omit the .reference element and only contain a .display element reflecting the name or other textual information about the assigning organization.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Identifier.assigner",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Reference",
            "targetProfile": [
              "http://hl7.org/fhir/StructureDefinition/Organization"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "CX.4 / (CX.4,CX.9,CX.10)"
          },
          {
            "identity": "rim",
            "map": "II.assigningAuthorityName but note that this is an improper use by the definition of the field.  Also Role.scoper"
          },
          {
            "identity": "servd",
            "map": "./IdentifierIssuingAuthority"
          }
        ]
      },
      {
        "id": "PractitionerRole.active",
        "path": "PractitionerRole.active",
        "label": "Status",
        "short": "Whether this practitioner role record is in active use",
        "definition": "Whether this practitioner role record is in active use.",
        "comment": "If this value is false, you may refer to the period to see when the role was in active use. If there is no period specified, no inference can be made about when it was active.",
        "requirements": "Need to be able to mark a practitioner role record as not to be used because it was created in error, or otherwise no longer in active use.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "PractitionerRole.active",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "boolean"
          }
        ],
        "meaningWhenMissing": "This resource is generally assumed to be active if no value is provided for the active element",
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "w5",
            "map": "FiveWs.status"
          },
          {
            "identity": "v2",
            "map": "STF-7"
          },
          {
            "identity": "rim",
            "map": ".statusCode"
          }
        ]
      },
      {
        "id": "PractitionerRole.period",
        "path": "PractitionerRole.period",
        "short": "The period during which the practitioner is authorized to perform in these role(s)",
        "definition": "The period during which the person is authorized to act as a practitioner in these role(s) for the organization.",
        "requirements": "Even after the agencies is revoked, the fact that it existed must still be recorded.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "PractitionerRole.period",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Period"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "w5",
            "map": "FiveWs.done[x]"
          },
          {
            "identity": "v2",
            "map": "PRD-8/9 / PRA-5.4"
          },
          {
            "identity": "rim",
            "map": ".performance[@typeCode <= 'PPRF'].ActDefinitionOrEvent.effectiveTime"
          },
          {
            "identity": "servd",
            "map": "(ServD maps Practitioners and Organizations via another entity, so this concept is not available)"
          }
        ]
      },
      {
        "id": "PractitionerRole.period.id",
        "path": "PractitionerRole.period.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.period.extension",
        "path": "PractitionerRole.period.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.period.start",
        "path": "PractitionerRole.period.start",
        "label": "Hired Date",
        "short": "Starting time with inclusive boundary",
        "definition": "The start of the period. The boundary is inclusive.",
        "comment": "If the low element is missing, the meaning is that the low boundary is not known.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Period.start",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "dateTime"
          }
        ],
        "condition": [
          "per-1"
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "DR.1"
          },
          {
            "identity": "rim",
            "map": "./low"
          }
        ]
      },
      {
        "id": "PractitionerRole.period.end",
        "path": "PractitionerRole.period.end",
        "label": "End Date",
        "short": "End time with inclusive boundary, if not ongoing",
        "definition": "The end of the period. If the end of the period is missing, it means no end was known or planned at the time the instance was created. The start may be in the past, and the end date in the future, which means that period is expected/planned to end at that time.",
        "comment": "The high value includes any matching date/time. i.e. 2012-02-03T10:00:00 is in a period that has an end value of 2012-02-03.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Period.end",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "dateTime"
          }
        ],
        "meaningWhenMissing": "If the end of the period is missing, it means that the period is ongoing",
        "condition": [
          "per-1"
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "DR.2"
          },
          {
            "identity": "rim",
            "map": "./high"
          }
        ]
      },
      {
        "id": "PractitionerRole.practitioner",
        "path": "PractitionerRole.practitioner",
        "label": "Health Worker",
        "short": "Practitioner that is able to provide the defined services for the organization",
        "definition": "Practitioner that is able to provide the defined services for the organization.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "PractitionerRole.practitioner",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Reference",
            "targetProfile": [
              "http://hl7.org/fhir/StructureDefinition/Practitioner"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": ".player"
          }
        ]
      },
      {
        "id": "PractitionerRole.practitioner.id",
        "path": "PractitionerRole.practitioner.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.practitioner.extension",
        "path": "PractitionerRole.practitioner.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.practitioner.reference",
        "path": "PractitionerRole.practitioner.reference",
        "label": "Health Worker",
        "short": "Literal reference, Relative, internal or absolute URL",
        "definition": "A reference to a location at which the other resource is found. The reference may be a relative reference, in which case it is relative to the service base URL, or an absolute URL that resolves to the location where the resource is found. The reference may be version specific or not. If the reference is not to a FHIR RESTful server, then it should be assumed to be version specific. Internal fragment references (start with '#') refer to contained resources.",
        "comment": "Using absolute URLs provides a stable scalable approach suitable for a cloud/web context, while using relative/logical references provides a flexible approach suitable for use when trading across closed eco-system boundaries.   Absolute URLs do not need to point to a FHIR RESTful server, though this is the preferred approach. If the URL conforms to the structure \"/[type]/[id]\" then it should be assumed that the reference is to a FHIR RESTful server.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Reference.reference",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "condition": [
          "ref-1"
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.practitioner.type",
        "path": "PractitionerRole.practitioner.type",
        "short": "Type the reference refers to (e.g. \"Patient\")",
        "definition": "The expected type of the target of the reference. If both Reference.type and Reference.reference are populated and Reference.reference is a FHIR URL, both SHALL be consistent.\n\nThe type is the Canonical URL of Resource Definition that is the type this reference refers to. References are URLs that are relative to http://hl7.org/fhir/StructureDefinition/ e.g. \"Patient\" is a reference to http://hl7.org/fhir/StructureDefinition/Patient. Absolute URLs are only allowed for logical models (and can only be used in references in logical models, not resources).",
        "comment": "This element is used to indicate the type of  the target of the reference. This may be used which ever of the other elements are populated (or not). In some cases, the type of the target may be determined by inspection of the reference (e.g. a RESTful URL) or by resolving the target of the reference; if both the type and a reference is provided, the reference SHALL resolve to a resource of the same type as that specified.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Reference.type",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "uri"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "binding": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              "valueString": "FHIRResourceTypeExt"
            }
          ],
          "strength": "extensible",
          "description": "Aa resource (or, for logical models, the URI of the logical model).",
          "valueSet": "http://hl7.org/fhir/ValueSet/resource-types"
        },
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.practitioner.identifier",
        "path": "PractitionerRole.practitioner.identifier",
        "short": "Logical reference, when literal reference is not known",
        "definition": "An identifier for the target resource. This is used when there is no way to reference the other resource directly, either because the entity it represents is not available through a FHIR server, or because there is no way for the author of the resource to convert a known identifier to an actual location. There is no requirement that a Reference.identifier point to something that is actually exposed as a FHIR instance, but it SHALL point to a business concept that would be expected to be exposed as a FHIR instance, and that instance would need to be of a FHIR resource type allowed by the reference.",
        "comment": "When an identifier is provided in place of a reference, any system processing the reference will only be able to resolve the identifier to a reference if it understands the business context in which the identifier is used. Sometimes this is global (e.g. a national identifier) but often it is not. For this reason, none of the useful mechanisms described for working with references (e.g. chaining, includes) are possible, nor should servers be expected to be able resolve the reference. Servers may accept an identifier based reference untouched, resolve it, and/or reject it - see CapabilityStatement.rest.resource.referencePolicy. \n\nWhen both an identifier and a literal reference are provided, the literal reference is preferred. Applications processing the resource are allowed - but not required - to check that the identifier matches the literal reference\n\nApplications converting a logical reference to a literal reference may choose to leave the logical reference present, or remove it.\n\nReference is intended to point to a structure that can potentially be expressed as a FHIR resource, though there is no need for it to exist as an actual FHIR resource instance - except in as much as an application wishes to actual find the target of the reference. The content referred to be the identifier must meet the logical constraints implied by any limitations on what resource types are permitted for the reference.  For example, it would not be legitimate to send the identifier for a drug prescription if the type were Reference(Observation|DiagnosticReport).  One of the use-cases for Reference.identifier is the situation where no FHIR representation exists (where the type is Reference (Any).",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Reference.identifier",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Identifier"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": ".identifier"
          }
        ]
      },
      {
        "id": "PractitionerRole.practitioner.display",
        "extension": [
          {
            "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-translatable",
            "valueBoolean": true
          }
        ],
        "path": "PractitionerRole.practitioner.display",
        "short": "Text alternative for the resource",
        "definition": "Plain text narrative that identifies the resource in addition to the resource reference.",
        "comment": "This is generally not the same as the Resource.text of the referenced resource.  The purpose is to identify what's being referenced, not to fully describe it.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Reference.display",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.organization",
        "path": "PractitionerRole.organization",
        "short": "Organization where the roles are available",
        "definition": "The organization where the Practitioner performs the roles associated.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "PractitionerRole.organization",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Reference",
            "targetProfile": [
              "http://hl7.org/fhir/StructureDefinition/Organization"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": ".scoper"
          }
        ]
      },
      {
        "id": "PractitionerRole.code",
        "path": "PractitionerRole.code",
        "label": "Job",
        "short": "Roles which this practitioner may perform",
        "definition": "Roles which this practitioner is authorized to perform for the organization.",
        "comment": "A person may have more than one role.",
        "requirements": "Need to know what authority the practitioner has - what can they do?",
        "min": 1,
        "max": "*",
        "base": {
          "path": "PractitionerRole.code",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "CodeableConcept"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "binding": {
          "strength": "required",
          "valueSet": "http://ihris.org/fhir/ValueSet/ihris-job-ethiopia"
        },
        "mapping": [
          {
            "identity": "v2",
            "map": "PRD-1 / STF-18  / PRA-3  / PRT-4  / ROL-3 / ORC-12 / OBR-16 / PV1-7 / PV1-8 / PV1-9 / PV1-17"
          },
          {
            "identity": "rim",
            "map": ".code"
          },
          {
            "identity": "servd",
            "map": "(ServD maps Practitioners and Organizations via another entity, so this concept is not available)"
          }
        ]
      },
      {
        "id": "PractitionerRole.code.id",
        "path": "PractitionerRole.code.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.code.extension",
        "path": "PractitionerRole.code.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.code.coding",
        "path": "PractitionerRole.code.coding",
        "short": "Code defined by a terminology system",
        "definition": "A reference to a code defined by a terminology system.",
        "comment": "Codes may be defined very casually in enumerations, or code lists, up to very formal definitions such as SNOMED CT - see the HL7 v3 Core Principles for more information.  Ordering of codings is undefined and SHALL NOT be used to infer meaning. Generally, at most only one of the coding values will be labeled as UserSelected = true.",
        "requirements": "Allows for alternative encodings within a code system, and translations to other code systems.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "CodeableConcept.coding",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Coding"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "C*E.1-8, C*E.10-22"
          },
          {
            "identity": "rim",
            "map": "union(., ./translation)"
          },
          {
            "identity": "orim",
            "map": "fhir:CodeableConcept.coding rdfs:subPropertyOf dt:CD.coding"
          }
        ]
      },
      {
        "id": "PractitionerRole.code.text",
        "extension": [
          {
            "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-translatable",
            "valueBoolean": true
          }
        ],
        "path": "PractitionerRole.code.text",
        "short": "Plain text representation of the concept",
        "definition": "A human language representation of the concept as seen/selected/uttered by the user who entered the data and/or which represents the intended meaning of the user.",
        "comment": "Very often the text is the same as a displayName of one of the codings.",
        "requirements": "The codes from the terminologies do not always capture the correct meaning with all the nuances of the human using them, or sometimes there is no appropriate code at all. In these cases, the text is used to capture the full meaning of the source.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "CodeableConcept.text",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "C*E.9. But note many systems use C*E.2 for this"
          },
          {
            "identity": "rim",
            "map": "./originalText[mediaType/code=\"text/plain\"]/data"
          },
          {
            "identity": "orim",
            "map": "fhir:CodeableConcept.text rdfs:subPropertyOf dt:CD.originalText"
          }
        ]
      },
      {
        "id": "PractitionerRole.specialty",
        "path": "PractitionerRole.specialty",
        "short": "Specific specialty of the practitioner",
        "definition": "Specific specialty of the practitioner.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "PractitionerRole.specialty",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "CodeableConcept"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "binding": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              "valueString": "PractitionerSpecialty"
            }
          ],
          "strength": "preferred",
          "description": "Specific specialty associated with the agency.",
          "valueSet": "http://hl7.org/fhir/ValueSet/c80-practice-codes"
        },
        "mapping": [
          {
            "identity": "v2",
            "map": "PRA-5"
          },
          {
            "identity": "rim",
            "map": ".player.HealthCareProvider[@classCode = 'PROV'].code"
          },
          {
            "identity": "servd",
            "map": "./Specialty"
          }
        ]
      },
      {
        "id": "PractitionerRole.location",
        "path": "PractitionerRole.location",
        "label": "Duty Station",
        "short": "The location(s) at which this practitioner provides care",
        "definition": "The location(s) at which this practitioner provides care.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "PractitionerRole.location",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Reference",
            "targetProfile": [
              "http://hl7.org/fhir/StructureDefinition/Location"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "w5",
            "map": "FiveWs.where[x]"
          },
          {
            "identity": "rim",
            "map": ".performance.ActDefinitionOrEvent.ServiceDeliveryLocation[@classCode = 'SDLOC']"
          },
          {
            "identity": "servd",
            "map": "(ServD maps Practitioners and Organizations via another entity, so this concept is not available)<br/> However these are accessed via the Site.ServiceSite.ServiceSiteProvider record. (The Site has the location)"
          }
        ]
      },
      {
        "id": "PractitionerRole.location.id",
        "path": "PractitionerRole.location.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.location.extension",
        "path": "PractitionerRole.location.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "description": "Extensions are always sliced by (at least) url",
          "rules": "open"
        },
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.location.reference",
        "path": "PractitionerRole.location.reference",
        "label": "Duty Station",
        "short": "Literal reference, Relative, internal or absolute URL",
        "definition": "A reference to a location at which the other resource is found. The reference may be a relative reference, in which case it is relative to the service base URL, or an absolute URL that resolves to the location where the resource is found. The reference may be version specific or not. If the reference is not to a FHIR RESTful server, then it should be assumed to be version specific. Internal fragment references (start with '#') refer to contained resources.",
        "comment": "Using absolute URLs provides a stable scalable approach suitable for a cloud/web context, while using relative/logical references provides a flexible approach suitable for use when trading across closed eco-system boundaries.   Absolute URLs do not need to point to a FHIR RESTful server, though this is the preferred approach. If the URL conforms to the structure \"/[type]/[id]\" then it should be assumed that the reference is to a FHIR RESTful server.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Reference.reference",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "condition": [
          "ref-1"
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.location.type",
        "path": "PractitionerRole.location.type",
        "short": "Type the reference refers to (e.g. \"Patient\")",
        "definition": "The expected type of the target of the reference. If both Reference.type and Reference.reference are populated and Reference.reference is a FHIR URL, both SHALL be consistent.\n\nThe type is the Canonical URL of Resource Definition that is the type this reference refers to. References are URLs that are relative to http://hl7.org/fhir/StructureDefinition/ e.g. \"Patient\" is a reference to http://hl7.org/fhir/StructureDefinition/Patient. Absolute URLs are only allowed for logical models (and can only be used in references in logical models, not resources).",
        "comment": "This element is used to indicate the type of  the target of the reference. This may be used which ever of the other elements are populated (or not). In some cases, the type of the target may be determined by inspection of the reference (e.g. a RESTful URL) or by resolving the target of the reference; if both the type and a reference is provided, the reference SHALL resolve to a resource of the same type as that specified.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Reference.type",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "uri"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "binding": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              "valueString": "FHIRResourceTypeExt"
            }
          ],
          "strength": "extensible",
          "description": "Aa resource (or, for logical models, the URI of the logical model).",
          "valueSet": "http://hl7.org/fhir/ValueSet/resource-types"
        },
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.location.identifier",
        "path": "PractitionerRole.location.identifier",
        "short": "Logical reference, when literal reference is not known",
        "definition": "An identifier for the target resource. This is used when there is no way to reference the other resource directly, either because the entity it represents is not available through a FHIR server, or because there is no way for the author of the resource to convert a known identifier to an actual location. There is no requirement that a Reference.identifier point to something that is actually exposed as a FHIR instance, but it SHALL point to a business concept that would be expected to be exposed as a FHIR instance, and that instance would need to be of a FHIR resource type allowed by the reference.",
        "comment": "When an identifier is provided in place of a reference, any system processing the reference will only be able to resolve the identifier to a reference if it understands the business context in which the identifier is used. Sometimes this is global (e.g. a national identifier) but often it is not. For this reason, none of the useful mechanisms described for working with references (e.g. chaining, includes) are possible, nor should servers be expected to be able resolve the reference. Servers may accept an identifier based reference untouched, resolve it, and/or reject it - see CapabilityStatement.rest.resource.referencePolicy. \n\nWhen both an identifier and a literal reference are provided, the literal reference is preferred. Applications processing the resource are allowed - but not required - to check that the identifier matches the literal reference\n\nApplications converting a logical reference to a literal reference may choose to leave the logical reference present, or remove it.\n\nReference is intended to point to a structure that can potentially be expressed as a FHIR resource, though there is no need for it to exist as an actual FHIR resource instance - except in as much as an application wishes to actual find the target of the reference. The content referred to be the identifier must meet the logical constraints implied by any limitations on what resource types are permitted for the reference.  For example, it would not be legitimate to send the identifier for a drug prescription if the type were Reference(Observation|DiagnosticReport).  One of the use-cases for Reference.identifier is the situation where no FHIR representation exists (where the type is Reference (Any).",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Reference.identifier",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Identifier"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": ".identifier"
          }
        ]
      },
      {
        "id": "PractitionerRole.location.display",
        "extension": [
          {
            "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-translatable",
            "valueBoolean": true
          }
        ],
        "path": "PractitionerRole.location.display",
        "short": "Text alternative for the resource",
        "definition": "Plain text narrative that identifies the resource in addition to the resource reference.",
        "comment": "This is generally not the same as the Resource.text of the referenced resource.  The purpose is to identify what's being referenced, not to fully describe it.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Reference.display",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.healthcareService",
        "path": "PractitionerRole.healthcareService",
        "short": "The list of healthcare services that this worker provides for this role's Organization/Location(s)",
        "definition": "The list of healthcare services that this worker provides for this role's Organization/Location(s).",
        "min": 0,
        "max": "0",
        "base": {
          "path": "PractitionerRole.healthcareService",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Reference",
            "targetProfile": [
              "http://hl7.org/fhir/StructureDefinition/HealthcareService"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "v2",
            "map": "EDU-2 / AFF-3"
          },
          {
            "identity": "rim",
            "map": ".player.QualifiedEntity[@classCode = 'QUAL'].code"
          }
        ]
      },
      {
        "id": "PractitionerRole.telecom",
        "path": "PractitionerRole.telecom",
        "short": "Contact details that are specific to the role/location/service",
        "definition": "Contact details that are specific to the role/location/service.",
        "requirements": "Often practitioners have a dedicated line for each location (or service) that they work at, and need to be able to define separate contact details for each of these.",
        "min": 0,
        "max": "0",
        "base": {
          "path": "PractitionerRole.telecom",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "ContactPoint"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": ".telecom"
          }
        ]
      },
      {
        "id": "PractitionerRole.availableTime",
        "path": "PractitionerRole.availableTime",
        "short": "Times the Service Site is available",
        "definition": "A collection of times the practitioner is available or performing this role at the location and/or healthcareservice.",
        "comment": "More detailed availability information may be provided in associated Schedule/Slot resources.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "PractitionerRole.availableTime",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "BackboneElement"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": ".effectiveTime"
          }
        ]
      },
      {
        "id": "PractitionerRole.availableTime.id",
        "path": "PractitionerRole.availableTime.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.availableTime.extension",
        "path": "PractitionerRole.availableTime.extension",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.availableTime.modifierExtension",
        "path": "PractitionerRole.availableTime.modifierExtension",
        "short": "Extensions that cannot be ignored even if unrecognized",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element and that modifies the understanding of the element in which it is contained and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.\n\nModifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "requirements": "Modifier extensions allow for extensions that *cannot* be safely ignored to be clearly distinguished from the vast majority of extensions which can be safely ignored.  This promotes interoperability by eliminating the need for implementers to prohibit the presence of extensions. For further information, see the [definition of modifier extensions](extensibility.html#modifierExtension).",
        "alias": [
          "extensions",
          "user content",
          "modifiers"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "BackboneElement.modifierExtension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": true,
        "isModifierReason": "Modifier extensions are expected to modify the meaning or interpretation of the element that contains them",
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.availableTime.daysOfWeek",
        "path": "PractitionerRole.availableTime.daysOfWeek",
        "short": "mon | tue | wed | thu | fri | sat | sun",
        "definition": "Indicates which days of the week are available between the start and end Times.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "PractitionerRole.availableTime.daysOfWeek",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "code"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "binding": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              "valueString": "DaysOfWeek"
            }
          ],
          "strength": "required",
          "description": "The days of the week.",
          "valueSet": "http://hl7.org/fhir/ValueSet/days-of-week|4.0.1"
        },
        "mapping": [
          {
            "identity": "rim",
            "map": ".effectiveTime"
          }
        ]
      },
      {
        "id": "PractitionerRole.availableTime.allDay",
        "path": "PractitionerRole.availableTime.allDay",
        "short": "Always available? e.g. 24 hour service",
        "definition": "Is this always available? (hence times are irrelevant) e.g. 24 hour service.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "PractitionerRole.availableTime.allDay",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "boolean"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": ".effectiveTime"
          }
        ]
      },
      {
        "id": "PractitionerRole.availableTime.availableStartTime",
        "path": "PractitionerRole.availableTime.availableStartTime",
        "short": "Opening time of day (ignored if allDay = true)",
        "definition": "The opening time of day. Note: If the AllDay flag is set, then this time is ignored.",
        "comment": "The timezone is expected to be for where this HealthcareService is provided at.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "PractitionerRole.availableTime.availableStartTime",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "time"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": ".effectiveTime"
          }
        ]
      },
      {
        "id": "PractitionerRole.availableTime.availableEndTime",
        "path": "PractitionerRole.availableTime.availableEndTime",
        "short": "Closing time of day (ignored if allDay = true)",
        "definition": "The closing time of day. Note: If the AllDay flag is set, then this time is ignored.",
        "comment": "The timezone is expected to be for where this HealthcareService is provided at.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "PractitionerRole.availableTime.availableEndTime",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "time"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": ".effectiveTime"
          }
        ]
      },
      {
        "id": "PractitionerRole.notAvailable",
        "path": "PractitionerRole.notAvailable",
        "short": "Not available during this time due to provided reason",
        "definition": "The practitioner is not available or performing this role during this period of time due to the provided reason.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "PractitionerRole.notAvailable",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "BackboneElement"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": ".effectiveTime"
          }
        ]
      },
      {
        "id": "PractitionerRole.notAvailable.id",
        "path": "PractitionerRole.notAvailable.id",
        "representation": [
          "xmlAttr"
        ],
        "short": "Unique id for inter-element referencing",
        "definition": "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Element.id",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "http://hl7.org/fhirpath/System.String",
            "extension": [
              {
                "url": "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type",
                "valueUrl": "string"
              }
            ]
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.notAvailable.extension",
        "path": "PractitionerRole.notAvailable.extension",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "Element.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.notAvailable.modifierExtension",
        "path": "PractitionerRole.notAvailable.modifierExtension",
        "short": "Extensions that cannot be ignored even if unrecognized",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element and that modifies the understanding of the element in which it is contained and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.\n\nModifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "requirements": "Modifier extensions allow for extensions that *cannot* be safely ignored to be clearly distinguished from the vast majority of extensions which can be safely ignored.  This promotes interoperability by eliminating the need for implementers to prohibit the presence of extensions. For further information, see the [definition of modifier extensions](extensibility.html#modifierExtension).",
        "alias": [
          "extensions",
          "user content",
          "modifiers"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "BackboneElement.modifierExtension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          },
          {
            "key": "ext-1",
            "severity": "error",
            "human": "Must have either extensions or value[x], not both",
            "expression": "extension.exists() != value.exists()",
            "xpath": "exists(f:extension)!=exists(f:*[starts-with(local-name(.), \"value\")])",
            "source": "http://hl7.org/fhir/StructureDefinition/Extension"
          }
        ],
        "isModifier": true,
        "isModifierReason": "Modifier extensions are expected to modify the meaning or interpretation of the element that contains them",
        "isSummary": true,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "PractitionerRole.notAvailable.description",
        "path": "PractitionerRole.notAvailable.description",
        "short": "Reason presented to the user explaining why time not available",
        "definition": "The reason that can be presented to the user as to why this time is not available.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "PractitionerRole.notAvailable.description",
          "min": 1,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      },
      {
        "id": "PractitionerRole.notAvailable.during",
        "path": "PractitionerRole.notAvailable.during",
        "short": "Service not available from this date",
        "definition": "Service is not available (seasonally or for a public holiday) from this date.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "PractitionerRole.notAvailable.during",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "Period"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": ".effectiveTime"
          }
        ]
      },
      {
        "id": "PractitionerRole.availabilityExceptions",
        "path": "PractitionerRole.availabilityExceptions",
        "short": "Description of availability exceptions",
        "definition": "A description of site availability exceptions, e.g. public holiday availability. Succinctly describing all possible exceptions to normal site availability as details in the available Times and not available Times.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "PractitionerRole.availabilityExceptions",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": ".effectiveTime"
          }
        ]
      },
      {
        "id": "PractitionerRole.endpoint",
        "path": "PractitionerRole.endpoint",
        "short": "Technical endpoints providing access to services operated for the practitioner with this role",
        "definition": "Technical endpoints providing access to services operated for the practitioner with this role.",
        "requirements": "Organizations have multiple systems that provide various services and ,ay also be different for practitioners too.\r\rSo the endpoint satisfies the need to be able to define the technical connection details for how to connect to them, and for what purpose.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "PractitionerRole.endpoint",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Reference",
            "targetProfile": [
              "http://hl7.org/fhir/StructureDefinition/Endpoint"
            ]
          }
        ],
        "constraint": [
          {
            "key": "ele-1",
            "severity": "error",
            "human": "All FHIR elements must have a @value or children",
            "expression": "hasValue() or (children().count() > id.count())",
            "xpath": "@value|f:*|h:div",
            "source": "http://hl7.org/fhir/StructureDefinition/Element"
          }
        ],
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "n/a"
          }
        ]
      }
    ]
  },
  "differential": {
    "element": [
      {
        "id": "PractitionerRole",
        "path": "PractitionerRole"
      },
      {
        "id": "PractitionerRole.extension",
        "path": "PractitionerRole.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "ordered": false,
          "rules": "open"
        },
        "min": 1
      },
      {
        "id": "PractitionerRole.extension:shift",
        "path": "PractitionerRole.extension",
        "sliceName": "shift",
        "label": "Shift",
        "min": 0,
        "max": "1",
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-shift"
            ]
          }
        ],
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.extension:employmentStatus",
        "path": "PractitionerRole.extension",
        "sliceName": "employmentStatus",
        "label": "Employment Status",
        "min": 0,
        "max": "1",
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-employment-status"
            ]
          }
        ],
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.extension:jobType",
        "path": "PractitionerRole.extension",
        "sliceName": "jobType",
        "label": "Job Type",
        "min": 0,
        "max": "1",
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-job-type"
            ]
          }
        ],
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.extension:firstEmploymentDate",
        "path": "PractitionerRole.extension",
        "sliceName": "firstEmploymentDate",
        "label": "First Employment Date",
        "min": 1,
        "max": "1",
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-first-employment-date"
            ]
          }
        ],
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.extension:jobInformationRemark",
        "path": "PractitionerRole.extension",
        "sliceName": "jobInformationRemark",
        "label": "Remark",
        "min": 0,
        "max": "1",
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-practitionerrole-job-information-remark"
            ]
          }
        ],
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.identifier",
        "path": "PractitionerRole.identifier",
        "label": "Identifier",
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.identifier.type",
        "path": "PractitionerRole.identifier.type",
        "label": "Type",
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.identifier.type.coding",
        "path": "PractitionerRole.identifier.type.coding",
        "min": 1,
        "max": "1",
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.identifier.system",
        "path": "PractitionerRole.identifier.system",
        "label": "System",
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.identifier.value",
        "path": "PractitionerRole.identifier.value",
        "label": "Value",
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.active",
        "path": "PractitionerRole.active",
        "label": "Status",
        "min": 1,
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.period",
        "path": "PractitionerRole.period",
        "min": 1,
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.period.start",
        "path": "PractitionerRole.period.start",
        "label": "Hired Date",
        "min": 1,
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.period.end",
        "path": "PractitionerRole.period.end",
        "label": "End Date",
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.practitioner",
        "path": "PractitionerRole.practitioner",
        "label": "Health Worker",
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.practitioner.reference",
        "path": "PractitionerRole.practitioner.reference",
        "label": "Health Worker"
      },
      {
        "id": "PractitionerRole.code",
        "path": "PractitionerRole.code",
        "label": "Job",
        "min": 1,
        "mustSupport": true,
        "binding": {
          "strength": "required",
          "valueSet": "http://ihris.org/fhir/ValueSet/ihris-job-ethiopia"
        }
      },
      {
        "id": "PractitionerRole.code.coding",
        "path": "PractitionerRole.code.coding",
        "min": 1,
        "max": "1",
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.location",
        "path": "PractitionerRole.location",
        "label": "Duty Station",
        "mustSupport": true
      },
      {
        "id": "PractitionerRole.location.reference",
        "path": "PractitionerRole.location.reference",
        "label": "Duty Station"
      },
      {
        "id": "PractitionerRole.healthcareService",
        "path": "PractitionerRole.healthcareService",
        "max": "0"
      },
      {
        "id": "PractitionerRole.telecom",
        "path": "PractitionerRole.telecom",
        "max": "0"
      }
    ]
  }
}
