module.exports = {
  "resourceType": "StructureDefinition",
  "id": "ihris-test-practitioner",
  "url": "http://ihris.org/fhir/StructureDefinition/ihris-test-practitioner",
  "version": "0.1.0",
  "name": "IhrisTestPractitioner",
  "title": "Health Worker",
  "status": "active",
  "description": "iHRIS profile of Practitioner for tests.",
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
  "type": "Practitioner",
  "baseDefinition": "http://hl7.org/fhir/StructureDefinition/Practitioner",
  "derivation": "constraint",
  "snapshot": {
    "element": [
      {
        "id": "Practitioner",
        "path": "Practitioner",
        "short": "A person with a  formal responsibility in the provisioning of healthcare or related services",
        "definition": "A person who is directly or indirectly involved in the provisioning of healthcare.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "Practitioner",
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
            "map": "Provider"
          }
        ]
      },
      {
        "id": "Practitioner.id",
        "path": "Practitioner.id",
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
        "id": "Practitioner.meta",
        "path": "Practitioner.meta",
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
        "id": "Practitioner.implicitRules",
        "path": "Practitioner.implicitRules",
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
        "id": "Practitioner.language",
        "path": "Practitioner.language",
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
        "id": "Practitioner.text",
        "path": "Practitioner.text",
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
        "id": "Practitioner.contained",
        "path": "Practitioner.contained",
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
        "id": "Practitioner.extension",
        "path": "Practitioner.extension",
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
        "min": 0,
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
        "id": "Practitioner.extension:residence",
        "path": "Practitioner.extension",
        "sliceName": "residence",
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
              "http://ihris.org/fhir/StructureDefinition/ihris-test-residence"
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
        "id": "Practitioner.extension:residence.id",
        "path": "Practitioner.extension.id",
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
        "id": "Practitioner.extension:residence.extension",
        "path": "Practitioner.extension.extension",
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
        "id": "Practitioner.extension:residence.url",
        "path": "Practitioner.extension.url",
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
        "fixedUri": "http://ihris.org/fhir/StructureDefinition/ihris-test-residence",
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
        "id": "Practitioner.extension:residence.value[x]",
        "path": "Practitioner.extension.value[x]",
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
            "code": "Reference"
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
        "id": "Practitioner.extension:residence.value[x]:valueReference",
        "path": "Practitioner.extension.value[x]",
        "sliceName": "valueReference",
        "label": "Residence",
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
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "Practitioner.extension:residence.value[x]:valueReference.id",
        "path": "Practitioner.extension.value[x].id",
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
        "id": "Practitioner.extension:residence.value[x]:valueReference.extension",
        "path": "Practitioner.extension.value[x].extension",
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
        "id": "Practitioner.extension:residence.value[x]:valueReference.reference",
        "path": "Practitioner.extension.value[x].reference",
        "label": "Location",
        "short": "Literal reference, Relative, internal or absolute URL",
        "definition": "A reference to a location at which the other resource is found. The reference may be a relative reference, in which case it is relative to the service base URL, or an absolute URL that resolves to the location where the resource is found. The reference may be version specific or not. If the reference is not to a FHIR RESTful server, then it should be assumed to be version specific. Internal fragment references (start with '#') refer to contained resources.",
        "comment": "Using absolute URLs provides a stable scalable approach suitable for a cloud/web context, while using relative/logical references provides a flexible approach suitable for use when trading across closed eco-system boundaries.   Absolute URLs do not need to point to a FHIR RESTful server, though this is the preferred approach. If the URL conforms to the structure \"/[type]/[id]\" then it should be assumed that the reference is to a FHIR RESTful server.",
        "min": 1,
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
        "mustSupport": true,
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
        "id": "Practitioner.extension:residence.value[x]:valueReference.type",
        "path": "Practitioner.extension.value[x].type",
        "short": "Type the reference refers to (e.g. \"Patient\")",
        "definition": "The expected type of the target of the reference. If both Reference.type and Reference.reference are populated and Reference.reference is a FHIR URL, both SHALL be consistent.\n\nThe type is the Canonical URL of Resource Definition that is the type this reference refers to. References are URLs that are relative to http://hl7.org/fhir/StructureDefinition/ e.g. \"Patient\" is a reference to http://hl7.org/fhir/StructureDefinition/Patient. Absolute URLs are only allowed for logical models (and can only be used in references in logical models, not resources).",
        "comment": "This element is used to indicate the type of  the target of the reference. This may be used which ever of the other elements are populated (or not). In some cases, the type of the target may be determined by inspection of the reference (e.g. a RESTful URL) or by resolving the target of the reference; if both the type and a reference is provided, the reference SHALL resolve to a resource of the same type as that specified.",
        "min": 0,
        "max": "0",
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
        "id": "Practitioner.extension:residence.value[x]:valueReference.identifier",
        "path": "Practitioner.extension.value[x].identifier",
        "short": "Logical reference, when literal reference is not known",
        "definition": "An identifier for the target resource. This is used when there is no way to reference the other resource directly, either because the entity it represents is not available through a FHIR server, or because there is no way for the author of the resource to convert a known identifier to an actual location. There is no requirement that a Reference.identifier point to something that is actually exposed as a FHIR instance, but it SHALL point to a business concept that would be expected to be exposed as a FHIR instance, and that instance would need to be of a FHIR resource type allowed by the reference.",
        "comment": "When an identifier is provided in place of a reference, any system processing the reference will only be able to resolve the identifier to a reference if it understands the business context in which the identifier is used. Sometimes this is global (e.g. a national identifier) but often it is not. For this reason, none of the useful mechanisms described for working with references (e.g. chaining, includes) are possible, nor should servers be expected to be able resolve the reference. Servers may accept an identifier based reference untouched, resolve it, and/or reject it - see CapabilityStatement.rest.resource.referencePolicy. \n\nWhen both an identifier and a literal reference are provided, the literal reference is preferred. Applications processing the resource are allowed - but not required - to check that the identifier matches the literal reference\n\nApplications converting a logical reference to a literal reference may choose to leave the logical reference present, or remove it.\n\nReference is intended to point to a structure that can potentially be expressed as a FHIR resource, though there is no need for it to exist as an actual FHIR resource instance - except in as much as an application wishes to actual find the target of the reference. The content referred to be the identifier must meet the logical constraints implied by any limitations on what resource types are permitted for the reference.  For example, it would not be legitimate to send the identifier for a drug prescription if the type were Reference(Observation|DiagnosticReport).  One of the use-cases for Reference.identifier is the situation where no FHIR representation exists (where the type is Reference (Any).",
        "min": 0,
        "max": "0",
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
        "id": "Practitioner.extension:residence.value[x]:valueReference.display",
        "extension": [
          {
            "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-translatable",
            "valueBoolean": true
          }
        ],
        "path": "Practitioner.extension.value[x].display",
        "short": "Text alternative for the resource",
        "definition": "Plain text narrative that identifies the resource in addition to the resource reference.",
        "comment": "This is generally not the same as the Resource.text of the referenced resource.  The purpose is to identify what's being referenced, not to fully describe it.",
        "min": 0,
        "max": "0",
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
        "id": "Practitioner.extension:dependent",
        "path": "Practitioner.extension",
        "sliceName": "dependent",
        "label": "Dependent Details",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "DomainResource.extension",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-test-dependent"
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
        "id": "Practitioner.extension:dependent.id",
        "path": "Practitioner.extension.id",
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
        "id": "Practitioner.extension:dependent.extension",
        "path": "Practitioner.extension.extension",
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
        "min": 3,
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
        "id": "Practitioner.extension:dependent.extension:name",
        "path": "Practitioner.extension.extension",
        "sliceName": "name",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 1,
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
        "mustSupport": true,
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
        "id": "Practitioner.extension:dependent.extension:name.id",
        "path": "Practitioner.extension.extension.id",
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
        "id": "Practitioner.extension:dependent.extension:name.extension",
        "path": "Practitioner.extension.extension.extension",
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
        "id": "Practitioner.extension:dependent.extension:name.url",
        "path": "Practitioner.extension.extension.url",
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
        "fixedUri": "name",
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
        "id": "Practitioner.extension:dependent.extension:name.value[x]",
        "path": "Practitioner.extension.extension.value[x]",
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
        "id": "Practitioner.extension:dependent.extension:name.value[x]:valueString",
        "path": "Practitioner.extension.extension.value[x]",
        "sliceName": "valueString",
        "label": "Dependent's Name",
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
        "id": "Practitioner.extension:dependent.extension:birthDate",
        "path": "Practitioner.extension.extension",
        "sliceName": "birthDate",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 1,
        "max": "1",
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
        "mustSupport": true,
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
        "id": "Practitioner.extension:dependent.extension:birthDate.id",
        "path": "Practitioner.extension.extension.id",
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
        "id": "Practitioner.extension:dependent.extension:birthDate.extension",
        "path": "Practitioner.extension.extension.extension",
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
        "id": "Practitioner.extension:dependent.extension:birthDate.url",
        "path": "Practitioner.extension.extension.url",
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
        "fixedUri": "birthDate",
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
        "id": "Practitioner.extension:dependent.extension:birthDate.value[x]",
        "path": "Practitioner.extension.extension.value[x]",
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
        "id": "Practitioner.extension:dependent.extension:birthDate.value[x]:valueDate",
        "path": "Practitioner.extension.extension.value[x]",
        "sliceName": "valueDate",
        "label": "Dependent's Date of Birth",
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
        "id": "Practitioner.extension:dependent.extension:gender",
        "path": "Practitioner.extension.extension",
        "sliceName": "gender",
        "short": "Additional content defined by implementations",
        "definition": "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.",
        "comment": "There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.",
        "alias": [
          "extensions",
          "user content"
        ],
        "min": 1,
        "max": "1",
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
        "mustSupport": true,
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
        "id": "Practitioner.extension:dependent.extension:gender.id",
        "path": "Practitioner.extension.extension.id",
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
        "id": "Practitioner.extension:dependent.extension:gender.extension",
        "path": "Practitioner.extension.extension.extension",
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
        "id": "Practitioner.extension:dependent.extension:gender.url",
        "path": "Practitioner.extension.extension.url",
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
        "fixedUri": "gender",
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
        "id": "Practitioner.extension:dependent.extension:gender.value[x]",
        "path": "Practitioner.extension.extension.value[x]",
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
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "Practitioner.extension:dependent.extension:gender.value[x]:valueCode",
        "path": "Practitioner.extension.extension.value[x]",
        "sliceName": "valueCode",
        "label": "Dependent's Gender",
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
        "mustSupport": true,
        "isModifier": false,
        "isSummary": false,
        "binding": {
          "strength": "required",
          "valueSet": "http://hl7.org/fhir/ValueSet/administrative-gender"
        },
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "Practitioner.extension:dependent.url",
        "path": "Practitioner.extension.url",
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
        "fixedUri": "http://ihris.org/fhir/StructureDefinition/ihris-test-dependent",
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
        "id": "Practitioner.extension:dependent.value[x]",
        "path": "Practitioner.extension.value[x]",
        "short": "Value of extension",
        "definition": "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).",
        "min": 0,
        "max": "0",
        "base": {
          "path": "Extension.value[x]",
          "min": 0,
          "max": "1"
        },
        "type": [
          {
            "code": "base64Binary"
          },
          {
            "code": "boolean"
          },
          {
            "code": "canonical"
          },
          {
            "code": "code"
          },
          {
            "code": "date"
          },
          {
            "code": "dateTime"
          },
          {
            "code": "decimal"
          },
          {
            "code": "id"
          },
          {
            "code": "instant"
          },
          {
            "code": "integer"
          },
          {
            "code": "markdown"
          },
          {
            "code": "oid"
          },
          {
            "code": "positiveInt"
          },
          {
            "code": "string"
          },
          {
            "code": "time"
          },
          {
            "code": "unsignedInt"
          },
          {
            "code": "uri"
          },
          {
            "code": "url"
          },
          {
            "code": "uuid"
          },
          {
            "code": "Address"
          },
          {
            "code": "Age"
          },
          {
            "code": "Annotation"
          },
          {
            "code": "Attachment"
          },
          {
            "code": "CodeableConcept"
          },
          {
            "code": "Coding"
          },
          {
            "code": "ContactPoint"
          },
          {
            "code": "Count"
          },
          {
            "code": "Distance"
          },
          {
            "code": "Duration"
          },
          {
            "code": "HumanName"
          },
          {
            "code": "Identifier"
          },
          {
            "code": "Money"
          },
          {
            "code": "Period"
          },
          {
            "code": "Quantity"
          },
          {
            "code": "Range"
          },
          {
            "code": "Ratio"
          },
          {
            "code": "Reference"
          },
          {
            "code": "SampledData"
          },
          {
            "code": "Signature"
          },
          {
            "code": "Timing"
          },
          {
            "code": "ContactDetail"
          },
          {
            "code": "Contributor"
          },
          {
            "code": "DataRequirement"
          },
          {
            "code": "Expression"
          },
          {
            "code": "ParameterDefinition"
          },
          {
            "code": "RelatedArtifact"
          },
          {
            "code": "TriggerDefinition"
          },
          {
            "code": "UsageContext"
          },
          {
            "code": "Dosage"
          },
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
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": "N/A"
          }
        ]
      },
      {
        "id": "Practitioner.modifierExtension",
        "path": "Practitioner.modifierExtension",
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
        "id": "Practitioner.identifier",
        "path": "Practitioner.identifier",
        "label": "Identifier",
        "short": "An identifier for the person as this agent",
        "definition": "An identifier that applies to this person in this role.",
        "requirements": "Often, specific identities are assigned for the agent.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "Practitioner.identifier",
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
            "map": "./id"
          },
          {
            "identity": "servd",
            "map": "./Identifiers"
          }
        ]
      },
      {
        "id": "Practitioner.identifier.id",
        "path": "Practitioner.identifier.id",
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
        "id": "Practitioner.identifier.extension",
        "path": "Practitioner.identifier.extension",
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
        "id": "Practitioner.identifier.use",
        "path": "Practitioner.identifier.use",
        "label": "Use",
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
        "mustSupport": true,
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
        "id": "Practitioner.identifier.type",
        "path": "Practitioner.identifier.type",
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
        "id": "Practitioner.identifier.type.id",
        "path": "Practitioner.identifier.type.id",
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
        "id": "Practitioner.identifier.type.extension",
        "path": "Practitioner.identifier.type.extension",
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
        "id": "Practitioner.identifier.type.coding",
        "path": "Practitioner.identifier.type.coding",
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
        "id": "Practitioner.identifier.type.text",
        "extension": [
          {
            "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-translatable",
            "valueBoolean": true
          }
        ],
        "path": "Practitioner.identifier.type.text",
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
        "id": "Practitioner.identifier.system",
        "path": "Practitioner.identifier.system",
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
        "id": "Practitioner.identifier.value",
        "path": "Practitioner.identifier.value",
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
        "id": "Practitioner.identifier.period",
        "path": "Practitioner.identifier.period",
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
        "id": "Practitioner.identifier.assigner",
        "path": "Practitioner.identifier.assigner",
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
        "id": "Practitioner.active",
        "path": "Practitioner.active",
        "short": "Whether this practitioner's record is in active use",
        "definition": "Whether this practitioner's record is in active use.",
        "comment": "If the practitioner is not in use by one organization, then it should mark the period on the PractitonerRole with an end date (even if they are active) as they may be active in another role.",
        "requirements": "Need to be able to mark a practitioner record as not to be used because it was created in error.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Practitioner.active",
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
        "isModifier": false,
        "isSummary": true,
        "mapping": [
          {
            "identity": "w5",
            "map": "FiveWs.status"
          },
          {
            "identity": "rim",
            "map": "./statusCode"
          }
        ]
      },
      {
        "id": "Practitioner.name",
        "path": "Practitioner.name",
        "label": "Name",
        "short": "The name(s) associated with the practitioner",
        "definition": "The name(s) associated with the practitioner.",
        "comment": "The selection of the use property should ensure that there is a single usual name specified, and others use the nickname (alias), old, or other values as appropriate.  \r\rIn general, select the value to be used in the ResourceReference.display based on this:\r\r1. There is more than 1 name\r2. Use = usual\r3. Period is current to the date of the usage\r4. Use = official\r5. Other order as decided by internal business rules.",
        "requirements": "The name(s) that a Practitioner is known by. Where there are multiple, the name that the practitioner is usually known as should be used in the display.",
        "min": 1,
        "max": "*",
        "base": {
          "path": "Practitioner.name",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "HumanName"
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
            "map": "XCN Components"
          },
          {
            "identity": "rim",
            "map": "./name"
          },
          {
            "identity": "servd",
            "map": "./PreferredName (GivenNames, FamilyName, TitleCode)"
          }
        ]
      },
      {
        "id": "Practitioner.name.id",
        "path": "Practitioner.name.id",
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
        "id": "Practitioner.name.extension",
        "path": "Practitioner.name.extension",
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
        "id": "Practitioner.name.use",
        "path": "Practitioner.name.use",
        "label": "Use",
        "short": "usual | official | temp | nickname | anonymous | old | maiden",
        "definition": "Identifies the purpose for this name.",
        "comment": "Applications can assume that a name is current unless it explicitly says that it is temporary or old.",
        "requirements": "Allows the appropriate name for a particular context of use to be selected from among a set of names.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "HumanName.use",
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
        "mustSupport": true,
        "isModifier": true,
        "isModifierReason": "This is labeled as \"Is Modifier\" because applications should not mistake a temporary or old name etc.for a current/permanent one",
        "isSummary": true,
        "binding": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              "valueString": "NameUse"
            }
          ],
          "strength": "required",
          "description": "The use of a human name.",
          "valueSet": "http://hl7.org/fhir/ValueSet/name-use|4.0.1"
        },
        "mapping": [
          {
            "identity": "v2",
            "map": "XPN.7, but often indicated by which field contains the name"
          },
          {
            "identity": "rim",
            "map": "unique(./use)"
          },
          {
            "identity": "servd",
            "map": "./NamePurpose"
          }
        ]
      },
      {
        "id": "Practitioner.name.text",
        "path": "Practitioner.name.text",
        "short": "Text representation of the full name",
        "definition": "Specifies the entire name as it should be displayed e.g. on an application UI. This may be provided instead of or as well as the specific parts.",
        "comment": "Can provide both a text representation and parts. Applications updating a name SHALL ensure that when both text and parts are present,  no content is included in the text that isn't found in a part.",
        "requirements": "A renderable, unencoded form.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "HumanName.text",
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
            "map": "implied by XPN.11"
          },
          {
            "identity": "rim",
            "map": "./formatted"
          }
        ]
      },
      {
        "id": "Practitioner.name.family",
        "path": "Practitioner.name.family",
        "label": "Family",
        "short": "Family name (often called 'Surname')",
        "definition": "The part of a name that links to the genealogy. In some cultures (e.g. Eritrea) the family name of a son is the first name of his father.",
        "comment": "Family Name may be decomposed into specific parts using extensions (de, nl, es related cultures).",
        "alias": [
          "surname"
        ],
        "min": 0,
        "max": "1",
        "base": {
          "path": "HumanName.family",
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
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "XPN.1/FN.1"
          },
          {
            "identity": "rim",
            "map": "./part[partType = FAM]"
          },
          {
            "identity": "servd",
            "map": "./FamilyName"
          }
        ]
      },
      {
        "id": "Practitioner.name.given",
        "path": "Practitioner.name.given",
        "label": "Given Name",
        "short": "Given names (not always 'first'). Includes middle names",
        "definition": "Given name.",
        "comment": "If only initials are recorded, they may be used in place of the full name parts. Initials may be separated into multiple given names but often aren't due to paractical limitations.  This element is not called \"first name\" since given names do not always come first.",
        "alias": [
          "first name",
          "middle name"
        ],
        "min": 0,
        "max": "*",
        "base": {
          "path": "HumanName.given",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "orderMeaning": "Given Names appear in the correct order for presenting the name",
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
            "map": "XPN.2 + XPN.3"
          },
          {
            "identity": "rim",
            "map": "./part[partType = GIV]"
          },
          {
            "identity": "servd",
            "map": "./GivenNames"
          }
        ]
      },
      {
        "id": "Practitioner.name.prefix",
        "path": "Practitioner.name.prefix",
        "label": "Prefix",
        "short": "Parts that come before the name",
        "definition": "Part of the name that is acquired as a title due to academic, legal, employment or nobility status, etc. and that appears at the start of the name.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "HumanName.prefix",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "orderMeaning": "Prefixes appear in the correct order for presenting the name",
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
            "map": "XPN.5"
          },
          {
            "identity": "rim",
            "map": "./part[partType = PFX]"
          },
          {
            "identity": "servd",
            "map": "./TitleCode"
          }
        ]
      },
      {
        "id": "Practitioner.name.suffix",
        "path": "Practitioner.name.suffix",
        "label": "Suffix",
        "short": "Parts that come after the name",
        "definition": "Part of the name that is acquired as a title due to academic, legal, employment or nobility status, etc. and that appears at the end of the name.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "HumanName.suffix",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "string"
          }
        ],
        "orderMeaning": "Suffixes appear in the correct order for presenting the name",
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
            "map": "XPN/4"
          },
          {
            "identity": "rim",
            "map": "./part[partType = SFX]"
          }
        ]
      },
      {
        "id": "Practitioner.name.period",
        "path": "Practitioner.name.period",
        "short": "Time period when name was/is in use",
        "definition": "Indicates the period of time when this name was valid for the named person.",
        "requirements": "Allows names to be placed in historical context.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "HumanName.period",
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
            "map": "XPN.13 + XPN.14"
          },
          {
            "identity": "rim",
            "map": "./usablePeriod[type=\"IVL<TS>\"]"
          },
          {
            "identity": "servd",
            "map": "./StartDate and ./EndDate"
          }
        ]
      },
      {
        "id": "Practitioner.telecom",
        "path": "Practitioner.telecom",
        "short": "A contact detail for the practitioner (that apply to all roles)",
        "definition": "A contact detail for the practitioner, e.g. a telephone number or an email address.",
        "comment": "Person may have multiple ways to be contacted with different uses or applicable periods.  May need to have options for contacting the person urgently and to help with identification.  These typically will have home numbers, or mobile numbers that are not role specific.",
        "requirements": "Need to know how to reach a practitioner independent to any roles the practitioner may have.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "Practitioner.telecom",
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
            "identity": "v2",
            "map": "PRT-15, STF-10, ROL-12"
          },
          {
            "identity": "rim",
            "map": "./telecom"
          },
          {
            "identity": "servd",
            "map": "./ContactPoints"
          }
        ]
      },
      {
        "id": "Practitioner.address",
        "path": "Practitioner.address",
        "short": "Address(es) of the practitioner that are not role specific (typically home address)",
        "definition": "Address(es) of the practitioner that are not role specific (typically home address). \rWork addresses are not typically entered in this property as they are usually role dependent.",
        "comment": "The PractitionerRole does not have an address value on it, as it is expected that the location property be used for this purpose (which has an address).",
        "requirements": "The home/mailing address of the practitioner is often required for employee administration purposes, and also for some rostering services where the start point (practitioners home) can be used in calculations.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "Practitioner.address",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Address"
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
            "map": "ORC-24, STF-11, ROL-11, PRT-14"
          },
          {
            "identity": "rim",
            "map": "./addr"
          },
          {
            "identity": "servd",
            "map": "./Addresses"
          }
        ]
      },
      {
        "id": "Practitioner.gender",
        "path": "Practitioner.gender",
        "label": "Gender",
        "short": "male | female | other | unknown",
        "definition": "Administrative Gender - the gender that the person is considered to have for administration and record keeping purposes.",
        "requirements": "Needed to address the person correctly.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Practitioner.gender",
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
        "mustSupport": true,
        "isModifier": false,
        "isSummary": true,
        "binding": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              "valueString": "AdministrativeGender"
            },
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-isCommonBinding",
              "valueBoolean": true
            }
          ],
          "strength": "required",
          "description": "The gender of a person used for administrative purposes.",
          "valueSet": "http://hl7.org/fhir/ValueSet/administrative-gender|4.0.1"
        },
        "mapping": [
          {
            "identity": "v2",
            "map": "STF-5"
          },
          {
            "identity": "rim",
            "map": "./administrativeGender"
          },
          {
            "identity": "servd",
            "map": "./GenderCode"
          }
        ]
      },
      {
        "id": "Practitioner.birthDate",
        "path": "Practitioner.birthDate",
        "label": "Birth Date",
        "short": "The date  on which the practitioner was born",
        "definition": "The date of birth for the practitioner.",
        "requirements": "Needed for identification.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Practitioner.birthDate",
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
        "isSummary": true,
        "mapping": [
          {
            "identity": "v2",
            "map": "STF-6"
          },
          {
            "identity": "rim",
            "map": "./birthTime"
          },
          {
            "identity": "servd",
            "map": "(not represented in ServD)"
          }
        ]
      },
      {
        "id": "Practitioner.photo",
        "path": "Practitioner.photo",
        "short": "Image of the person",
        "definition": "Image of the person.",
        "requirements": "Many EHR systems have the capability to capture an image of patients and personnel. Fits with newer social media usage too.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "Practitioner.photo",
          "min": 0,
          "max": "*"
        },
        "type": [
          {
            "code": "Attachment"
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
            "map": "./subjectOf/ObservationEvent[code=\"photo\"]/value"
          },
          {
            "identity": "servd",
            "map": "./ImageURI (only supports the URI reference)"
          }
        ]
      },
      {
        "id": "Practitioner.qualification",
        "path": "Practitioner.qualification",
        "short": "Certification, licenses, or training pertaining to the provision of care",
        "definition": "The official certifications, training, and licenses that authorize or otherwise pertain to the provision of care by the practitioner.  For example, a medical license issued by a medical board authorizing the practitioner to practice medicine within a certian locality.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "Practitioner.qualification",
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
            "identity": "v2",
            "map": "CER?"
          },
          {
            "identity": "rim",
            "map": ".playingEntity.playingRole[classCode=QUAL].code"
          },
          {
            "identity": "servd",
            "map": "./Qualifications"
          }
        ]
      },
      {
        "id": "Practitioner.qualification.id",
        "path": "Practitioner.qualification.id",
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
        "id": "Practitioner.qualification.extension",
        "path": "Practitioner.qualification.extension",
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
        "id": "Practitioner.qualification.modifierExtension",
        "path": "Practitioner.qualification.modifierExtension",
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
        "id": "Practitioner.qualification.identifier",
        "path": "Practitioner.qualification.identifier",
        "short": "An identifier for this qualification for the practitioner",
        "definition": "An identifier that applies to this person's qualification in this role.",
        "requirements": "Often, specific identities are assigned for the qualification.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "Practitioner.qualification.identifier",
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
        "isModifier": false,
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": ".playingEntity.playingRole[classCode=QUAL].id"
          }
        ]
      },
      {
        "id": "Practitioner.qualification.code",
        "path": "Practitioner.qualification.code",
        "short": "Coded representation of the qualification",
        "definition": "Coded representation of the qualification.",
        "min": 1,
        "max": "1",
        "base": {
          "path": "Practitioner.qualification.code",
          "min": 1,
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
        "isModifier": false,
        "isSummary": false,
        "binding": {
          "extension": [
            {
              "url": "http://hl7.org/fhir/StructureDefinition/elementdefinition-bindingName",
              "valueString": "Qualification"
            }
          ],
          "strength": "example",
          "description": "Specific qualification the practitioner has to provide a service.",
          "valueSet": "http://terminology.hl7.org/ValueSet/v2-2.7-0360"
        },
        "mapping": [
          {
            "identity": "rim",
            "map": ".playingEntity.playingRole[classCode=QUAL].code"
          },
          {
            "identity": "servd",
            "map": "./Qualifications.Value"
          }
        ]
      },
      {
        "id": "Practitioner.qualification.period",
        "path": "Practitioner.qualification.period",
        "short": "Period during which the qualification is valid",
        "definition": "Period during which the qualification is valid.",
        "requirements": "Qualifications are often for a limited period of time, and can be revoked.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Practitioner.qualification.period",
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
            "map": ".playingEntity.playingRole[classCode=QUAL].effectiveTime"
          },
          {
            "identity": "servd",
            "map": "./Qualifications.StartDate and ./Qualifications.EndDate"
          }
        ]
      },
      {
        "id": "Practitioner.qualification.issuer",
        "path": "Practitioner.qualification.issuer",
        "short": "Organization that regulates and issues the qualification",
        "definition": "Organization that regulates and issues the qualification.",
        "min": 0,
        "max": "1",
        "base": {
          "path": "Practitioner.qualification.issuer",
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
        "isSummary": false,
        "mapping": [
          {
            "identity": "rim",
            "map": ".playingEntity.playingRole[classCode=QUAL].scoper"
          }
        ]
      },
      {
        "id": "Practitioner.communication",
        "path": "Practitioner.communication",
        "short": "A language the practitioner can use in patient communication",
        "definition": "A language the practitioner can use in patient communication.",
        "comment": "The structure aa-BB with this exact casing is one the most widely used notations for locale. However not all systems code this but instead have it as free text. Hence CodeableConcept instead of code as the data type.",
        "requirements": "Knowing which language a practitioner speaks can help in facilitating communication with patients.",
        "min": 0,
        "max": "*",
        "base": {
          "path": "Practitioner.communication",
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
        },
        "mapping": [
          {
            "identity": "v2",
            "map": "PID-15, NK1-20, LAN-2"
          },
          {
            "identity": "rim",
            "map": "./languageCommunication"
          },
          {
            "identity": "servd",
            "map": "./Languages.LanguageSpokenCode"
          }
        ]
      }
    ]
  },
  "differential": {
    "element": [
      {
        "id": "Practitioner.extension",
        "path": "Practitioner.extension",
        "slicing": {
          "discriminator": [
            {
              "type": "value",
              "path": "url"
            }
          ],
          "ordered": false,
          "rules": "open"
        }
      },
      {
        "id": "Practitioner.extension:residence",
        "path": "Practitioner.extension",
        "sliceName": "residence",
        "min": 0,
        "max": "1",
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-test-residence"
            ]
          }
        ],
        "mustSupport": true
      },
      {
        "id": "Practitioner.extension:dependent",
        "path": "Practitioner.extension",
        "sliceName": "dependent",
        "label": "Dependent Details",
        "min": 0,
        "max": "*",
        "type": [
          {
            "code": "Extension",
            "profile": [
              "http://ihris.org/fhir/StructureDefinition/ihris-test-dependent"
            ]
          }
        ],
        "mustSupport": true
      },
      {
        "id": "Practitioner.identifier",
        "path": "Practitioner.identifier",
        "label": "Identifier",
        "mustSupport": true
      },
      {
        "id": "Practitioner.identifier.use",
        "path": "Practitioner.identifier.use",
        "label": "Use",
        "mustSupport": true
      },
      {
        "id": "Practitioner.identifier.type",
        "path": "Practitioner.identifier.type",
        "label": "Type",
        "mustSupport": true
      },
      {
        "id": "Practitioner.identifier.type.coding",
        "path": "Practitioner.identifier.type.coding",
        "min": 1,
        "max": "1",
        "mustSupport": true
      },
      {
        "id": "Practitioner.identifier.system",
        "path": "Practitioner.identifier.system",
        "label": "System",
        "mustSupport": true
      },
      {
        "id": "Practitioner.identifier.value",
        "path": "Practitioner.identifier.value",
        "label": "Value",
        "mustSupport": true
      },
      {
        "id": "Practitioner.name",
        "path": "Practitioner.name",
        "label": "Name",
        "min": 1,
        "mustSupport": true
      },
      {
        "id": "Practitioner.name.use",
        "path": "Practitioner.name.use",
        "label": "Use",
        "mustSupport": true
      },
      {
        "id": "Practitioner.name.family",
        "path": "Practitioner.name.family",
        "label": "Family",
        "mustSupport": true
      },
      {
        "id": "Practitioner.name.given",
        "path": "Practitioner.name.given",
        "label": "Given Name",
        "mustSupport": true
      },
      {
        "id": "Practitioner.name.prefix",
        "path": "Practitioner.name.prefix",
        "label": "Prefix",
        "mustSupport": true
      },
      {
        "id": "Practitioner.name.suffix",
        "path": "Practitioner.name.suffix",
        "label": "Suffix",
        "mustSupport": true
      },
      {
        "id": "Practitioner.gender",
        "path": "Practitioner.gender",
        "label": "Gender",
        "min": 1,
        "mustSupport": true
      },
      {
        "id": "Practitioner.birthDate",
        "path": "Practitioner.birthDate",
        "label": "Birth Date",
        "mustSupport": true
      }
    ]
  }
}
