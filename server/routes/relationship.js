const async = require("async");
var express = require("express");
var router = express.Router();
const mixin = require("../mixin");

router.get("/describe/:relationship?", (req, res) => {
  let relationship = ''
  if(req.params.relationship) {
    relationship = req.params.relationship
  }
  mixin.getDefinition("Basic", relationship, (err, relationship) => {
    if(err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(relationship);
    }
  })
})

router.get("/getLinkableResources", (req, res) => {
  let resource = req.query.resource
  let resourceDefinitionId = resource
  if(!resource) {
    return res.status(400).send('Resource to get linkable resources not included')
  }
  let resources = []
  async.parallel({
    reverse: (callback) => {
      mixin.getDefinition("StructureDefinition", '', (err, definitions) => {
        let resrcStrDef = definitions.entry.find((entry) => {
          return entry.resource.id === resource
        })
        let baseDefinition = resrcStrDef.resource.baseDefinition.split("/").pop()
        if(baseDefinition != "DomainResource") {
          resourceDefinitionId = baseDefinition
        }
        async.each(definitions.entry, (definition, nxtDef) => {
          let id = definition.resource.id
          let baseDefinition = definition.resource.baseDefinition.split("/").pop()
          if(baseDefinition !== "DomainResource") {
            id = baseDefinition
          }
          let reference = definition.resource.differential.element.find(element => {
            return element.id === id + "." + resourceDefinitionId.toLowerCase()
          })
          if(reference) {
            resources.push({
              field: reference.id.split('.').pop(),
              type: 'reverse',
              resource: definition.resource.id
            })
          }
          return nxtDef()
        }, () => {
          return callback(null)
        })
      })
    },
    direct: (callback) => {
      mixin.getDefinition("StructureDefinition", resource, (err, definition) => {
        let references = definition.differential.element.filter(element => {
          if(!element.type) {
            return false
          }
          return element.type.find(type => {
            let length = element.id.split('.').length
            return length == 2 && type.code === "Reference"
          })
        })
        async.each(references, (reference, nxtRef) => {
          let targetProfile = reference.type.find(type => {
            return type.code === "Reference"
          })
          let profiles = targetProfile.targetProfile.map((prof) => {
            return prof.split("/").pop()
          })
          profiles.forEach(profile => {
            resources.push({
              field: reference.id.split('.').pop(),
              type: 'direct',
              resource: profile
            })
          })
          return nxtRef()
        }, () => {
          return callback(null)
        })
      })
    }
  }, () => {
    res.status(201).json(resources)
  })
})

module.exports = router;
