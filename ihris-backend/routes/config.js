var express = require('express')
var router = express.Router()
const axios = require('axios')
const URI = require('urijs');
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const outcomes = require('../config/operationOutcomes')
const fhirConfig = require('../modules/fhirConfig')
const fhirDefinition = require('../modules/fhirDefinition')
const crypto = require('crypto')
const winston = require('winston')

const getUKey = () => {
  return Math.random().toString(36).replace(/^[^a-z]+/,'') + Math.random().toString(36).substring(2,15)
}

/* GET home page. */
router.get('/site', function(req, res) {
  const defaultUser = nconf.get("user:loggedout") || "ihris-user-loggedout"
  let site = nconf.get("site") || {}
  if ( nconf.getBool("security:disabled") ) {
    site.security = {disabled: true}
  }
  if ( req.user ) {
    site.user = {}
    if ( req.user.resource.id === defaultUser ) {
      site.user.loggedin = false
    } else {
      site.user.loggedin = true
      site.user.name = req.user.resource.name[0].text
    }
  } else {
    site.user = { loggedin: false }
  }
  //site.updated = new Date().toISOString()
  res.status(200).json( site )
})

router.get('/reload', function(req,res) {
  nconf.loadRemote().then( () => {
    res.status(200).json({ok:true,conf:nconf.get()})
  } ).catch( err => {
    res.status(400).json({ok:false,err:err})
  } )
} )

const getDefinition = ( resource ) => {
  let structureDef = resource.split('/')
  return fhirAxios.read( structureDef[0], structureDef[1] )
}
const getProperties = ( resource ) => {
  let codeSystem = resource.split('/')
  return fhirAxios.search( codeSystem[0], { _id: codeSystem[1], _elements: "url,title,property" } )
}
const setupOrder = ( fields, sectionOrder ) => {
  for( let ord of fields ) {
    let lastDot = ord.lastIndexOf('.')
    let ordId = ord.substring(0,lastDot)
    let ordField = ord.substring(lastDot+1)
    if ( !sectionOrder.hasOwnProperty(ordId) ) {
      sectionOrder[ordId] = []
    }
    sectionOrder[ordId].push(ordField)
  }
}

router.get('/page/:page/:type?', function(req, res) {
  let page = "ihris-page-"+req.params.page
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN )
  }
  let allowed = req.user.hasPermissionByName( "read", "Basic", page )
  // Limited access to these don't make sense so not allowing it for now
  if ( allowed !== true ) {
    return res.status(401).json( outcomes.DENIED )
  }

  fhirAxios.read( "Basic", page ).then ( async (resource) => {
    let pageDisplay = resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-page-display" )

    let pageResource = pageDisplay.extension.find( ext => ext.url === "resource" ).valueReference.reference
    let pageFields = {}
    try {
      pageDisplay.extension.filter( ext => ext.url === "field" ).map( ext => {
        let path = ext.extension.find( subext => subext.url === "path" ).valueString
        let type, readOnlyIfSet
        try {
          type = ext.extension.find( subext => subext.url === "type" ).valueString
        } catch(err) {}
        try {
          readOnlyIfSet = ext.extension.find( subext => subext.url === "readOnlyIfSet" ).valueBoolean
        } catch(err) {}
        pageFields[path] = { type: type, readOnlyIfSet: readOnlyIfSet }
      } )
    } catch(err) {}

    let pageSections = resource.extension.filter( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-page-section" )

    const createTemplate = async ( resource, structure ) => {
      winston.silly(JSON.stringify(structure,null,2))

      let links = []
      try {
        let linkExts = pageDisplay.extension.filter( ext => ext.url === "link" )

        for( let linkExt of linkExts ) {
          let field, text, button, icon

          let url = linkExt.extension.find( ext => ext.url === "url" ).valueUrl

          try {
            field = linkExt.extension.find( ext => ext.url === "field" ).valueString
          } catch(err) {}
          try {
            text = linkExt.extension.find( ext => ext.url === "text" ).valueString
          } catch(err) {}
          try {
            button = linkExt.extension.find( ext => ext.url === "button" ).valueBoolean
          } catch(err) {}
          try {
            icon = linkExt.extension.find( ext => ext.url === "icon" ).valueString
          } catch(err) {}

          links.push( { url: url, field: field, text: text, button: button, icon: icon } )

        }

      } catch(err) {}


      let sections = {}
      let sectionMap = {}
      for( let section of pageSections ) {
        let title, description, name, resourceExt, resource, linkfield, searchfield
        let fields = []
        let columns = []
        let actions = []
        try {
          title = section.extension.find( ext => ext.url === "title" ).valueString
        } catch(err) { }
        try {
          description = section.extension.find( ext => ext.url === "description" ).valueString
        } catch(err) { }
        try {
          name = section.extension.find( ext => ext.url === "name" ).valueString
        } catch(err) { }
        try {
          fields = section.extension.filter( ext => ext.url === "field" ).map( ext => ext.valueString )
        } catch(err) { }
        try {
          resourceExt = section.extension.find( ext => ext.url === "resource" ).extension

          resource = resourceExt.find( ext => ext.url === "resource" ).valueReference.reference
          if ( resource ) {
            linkfield = resourceExt.find( ext => ext.url === "linkfield" ).valueString
            try {
              searchfield = resourceExt.find( ext => ext.url === "searchfield" ).valueString
            } catch(err) { }
            let columnsExt = resourceExt.filter( ext => ext.url === "column" )
            for ( let column of columnsExt ) {
              try {
                let header = column.extension.find( ext => ext.url === "header" ).valueString
                let field = column.extension.find( ext => ext.url === "field" ).valueString
                if ( header && field ) {
                  /*
                let definition = await fhirDefinition.getFieldDefinition( resource +"#"+ field )
                let binding = ""
                if ( definition.binding ) {
                  binding = details.binding
                } else if ( details.type[0].code === "Coding" ) {
                  definition = await fhirDefinition.getFieldDefinition( resource +"#"+ field.substring( 0, field.lastIndexOf('.') ) )
                  if ( definition.binding ) {
                    binding = details.binding
                  }
                }
                */
                  columns.push( {text: header, value: field} )
                }
              } catch(err) { }
            }
            let actionsExt = resourceExt.filter( ext => ext.url === "action" )
            for ( let action of actionsExt ) {
              try {
                let link = action.extension.find( ext => ext.url === "link" ).valueString
                let text = action.extension.find( ext => ext.url === "text" ).valueString
                let row, condition, emptyDisplay
                let eleClass = "primary"
                try {
                  row = action.extension.find( ext => ext.url === "row" ).valueBoolean
                } catch(err) {}
                try {
                  condition = action.extension.find( ext => ext.url === "condition" ).valueString
                } catch(err) {}
                try {
                  emptyDisplay = action.extension.find( ext => ext.url === "emptyDisplay" ).valueBoolean
                } catch(err) {}
                try {
                  eleClass = action.extension.find( ext => ext.url === "class" ).valueString
                } catch(err) {}
                if ( link && text ) {
                  actions.push( {link: link, text: text, row: row,
                    condition: condition, emptyDisplay: emptyDisplay,
                    class: eleClass } )
                }
              } catch(err) { }
            }

          }

        } catch(err) { }

        let sectionOrder = {}
        setupOrder( fields, sectionOrder )
        for( let field of fields ) {
          sectionMap[field] = name
        }
        sections[name] = {
          title: title,
          description: description,
          fields: fields,
          order: sectionOrder,
          resource: resource,
          linkfield: linkfield,
          searchfield: searchfield,
          columns: columns,
          actions: actions,
          elements: {}
        }
      }
      let sdOrder = {}
      const getSortFunc = (sortArr) => {
        return (a,b) => {
          idxA = sortArr.indexOf(a)
          idxB = sortArr.indexOf(b)
          if ( idxA === idxB ) {
            return 0
          } else if ( idxA === -1 ) {
            return 1
          } else if ( idxB === -1 ) {
            return -1
          } else if ( idxA < idxB ) {
            return -1
          } else {
            return 1
          }
        }
      }

      let structureKeys = Object.keys( structure )
      let sectionMenu
      let allSubFields = {}
      let allColumns = {}
      let allActions = {}

      let vueOuput = "<template>"
      for ( let fhir of structureKeys ) {
        if ( !sections.hasOwnProperty(fhir) ) {
          sections[fhir] = {
            title: fhir,
            description: "",
            fields: [],
            order: {},
            resource: undefined,
            linkfield: undefined,
            searchfield: undefined,
            columns: [],
            actions: [],
            elements: {}
          }
        }
        let sectionKeys = Object.keys(sections)

        let resourceElement = "ihris-resource"
        if ( resource.resourceType === "CodeSystem" ) {
          resourceElement = "ihris-codesystem"
        }

        vueOutput = '<'+resourceElement+' :fhir-id="fhirId" :edit="isEdit" v-on:set-edit="setEdit($event)" profile="'+resource.url+'" :key="$route.params.page+($route.params.id || \'\')" page="'+req.params.page+'" field="'+fhir+'" title="'+sections[fhir].title+'"'
        if ( sectionKeys.length > 1 ) {
          sectionMenu = sectionKeys.map( name => { return { name: name, title: sections[name].title, desc: sections[name].description, secondary: !!sections[name].resource } } )
          vueOutput += " :section-menu='sectionMenu'"
        }
        if ( links.length > 0 ) {
          vueOutput += " :links='links'"
        }
        vueOutput += '><template #default=\"slotProps\">'+"\n"

        if ( structure[fhir].hasOwnProperty("fields") ) {
          let fieldKeys = Object.keys( structure[fhir].fields )
          for( let field of fieldKeys ) {
            if ( sectionMap.hasOwnProperty( structure[fhir].fields[field].id ) ) {
              sections[ sectionMap[ structure[fhir].fields[field].id ] ].elements[field] = structure[fhir].fields[field]
            } else {
              sections[ fhir ].elements[field] = structure[fhir].fields[field]
            }
          }
        }
        const processFields = (fields, base, order) => {
          let output = ""
          let fieldKeys = Object.keys( fields )
          if ( order[base] ) {
            fieldKeys.sort( getSortFunc( order[base] ) )
          }
          for( let field of fieldKeys ) {
            if ( fields[field]["max"] === "0" ) {
              continue
            }
            if ( !fields[field].code ) {
              winston.info("No datatype for "+base+" "+field+" so skipping",base,field)
              continue
            }
            let eleName = fhirDefinition.camelToKebab( fields[field].code )
            let attrs = [ "field", "sliceName", "targetProfile", "profile", "min", "max", "base-min",
              "base-max", "label", "path", "binding", "calendar" ]
            const minmax = [ "Date", "DateTime", "Instant", "Time", "Decimal", "Integer", "PositiveInt",
              "UnsignedInt" ]
            for( let mm of minmax ) {
              for( let type of [ "min", "max" ] ) {
                attrs.push( type+"Value"+mm )
              }
            }
            let isArray = false
            if ( fields[field]["max"] !== "1" ) {
              isArray = true
              output += "<ihris-array :edit=\"isEdit\" fieldType=\""+eleName+"\" :slotProps=\"slotProps\""
              const arr_attrs = [ "field", "label", "min", "max", "id", "path", "profile", "targetProfile", "sliceName" ]
              for ( let attr of arr_attrs ) {
                if ( fields[field].hasOwnProperty(attr) ) {
                  output += " "+attr+"=\""+fields[field][attr]+"\""
                }
              }
              output += ">\n<template #default=\"slotProps\">\n"
            } else {
              attrs.unshift("id")
            }
            output += "<fhir-"+eleName +" :slotProps=\"slotProps\" :edit=\"isEdit\""
            if ( pageFields.hasOwnProperty(fields[field].id) ) {
              if ( pageFields[ fields[field].id ].type ) {
                output += " displayType=\""+ pageFields[ fields[field].id ].type +"\""
              }
              if ( pageFields[ fields[field].id ].readOnlyIfSet ) {
                output += " :readOnlyIfSet=\""+ pageFields[ fields[field].id ].readOnlyIfSet +"\""
              }
            }
            for( let attr of attrs ) {
              if ( fields[field].hasOwnProperty(attr) ) {
                output += " "+attr+"=\""+fields[field][attr]+"\""
              } else if ( nconf.get("defaults:components:"+eleName+":"+attr) ) {
                output += " "+attr+"=\""
                  +nconf.get("defaults:components:"+eleName+":"+attr)+"\""
              }
            }
            let subFields
            if ( eleName === "reference" && fields[field].hasOwnProperty("fields") ) {
              let refFields = fields[field].fields
              subFields = {}
              let subAttrs = [ "id", "path", "label", "min", "max", "base-min", "base-max", "code" ]
              for( let refField of Object.keys(refFields) ) {
                subFields[refField] = {}
                winston.silly("refLOOP",refField,refFields)
                for( let attr of subAttrs ) {
                  if ( refFields[refField].hasOwnProperty(attr) ) {
                    if ( (attr === "id" || attr === "path") && fields[field].hasOwnProperty(attr) ) {
                      subFields[refField][attr] = refFields[refField][attr].replace( fields[field][attr]+".", "" )
                    } else {
                      subFields[refField][attr] = refFields[refField][attr]
                    }
                  }
                }
              }
            }
            if ( subFields ) {
              let subKey = getUKey()
              allSubFields[subKey] = subFields
              output += " :sub-fields='subFields." + subKey +"'"
            }
            output += ">\n"

            if ( !subFields && fields[field].hasOwnProperty("fields") ) {
              output += "<template #default=\"slotProps\">\n"
              output += processFields( fields[field].fields, base+"."+fields[field], order )
              output += "</template>\n"
            }

            output += "</fhir-"+eleName+">\n"
            if ( isArray ) {
              output += "</template>\n</ihris-array>\n"
            }
          }
          return output
        }
        for ( let name of sectionKeys ) {
          vueOutput += "<ihris-section :slotProps=\"slotProps\" :edit=\"isEdit\" name=\""+name+"\" title=\""+sections[name].title+"\" description=\""+sections[name].description+"\" :secondary=\""+!!sections[name].resource+"\">\n<template #default=\"slotProps\">\n"
          if ( sections[name].resource ) {
            let secondary = await getDefinition( sections[name].resource )

            if ( !secondary.hasOwnProperty("snapshot") ) {
              winston.error("StructureDefinitions (", sections[name].resource, ") must be saved with a snapshot.")
              continue
            }
            const secondaryStructure = fhirDefinition.parseStructureDefinition( secondary )
            let secondaryOrder = {}
            setupOrder( sections[name].fields, secondaryOrder )
            let secondaryKeys = Object.keys( secondaryStructure )
            for ( let second_fhir of secondaryKeys ) {
              let sectionKey = getUKey()
              allColumns[sectionKey] = sections[name].columns
              allActions[sectionKey] = sections[name].actions
              vueOutput += '<ihris-secondary :edit="isEdit" :link-id="fhirId" profile="'+secondary.url
                +'" field="'+second_fhir
                +'" title="'+sections[name].title
                +'" link-field="'+sections[name].linkfield
                +'" search-field="'+(sections[name].searchfield || "")
                +'" :columns=\'columns.'+sectionKey
                +'\' :actions=\'actions.'+sectionKey
                  +'\'><template #default="slotProps">' + "\n"
                  //vueOutput += processFields( secondaryStructure[second_fhir].fields, second_fhir, secondaryOrder )
                  vueOutput += "</template></ihris-secondary>"
                }

          } else {
            vueOutput += processFields( sections[name].elements, fhir, sections[name].order )
          }
          vueOutput += "</template></ihris-section>\n"
        }

        vueOutput += '</template></'+resourceElement+'>'+"\n"
      }
      vueOuput = "</template>"
      winston.debug(vueOutput)
      return res.status(200).json({ template: vueOutput, data: {
        sectionMenu: sectionMenu,
        subFields: allSubFields,
        columns: allColumns,
        actions: allActions,
        links: links
      } })
    }

    const createSearchTemplate = async ( resource, structure ) => {
      winston.silly(JSON.stringify(structure,null,2))

      let search = [ 'id' ]
      try {
        search = pageDisplay.extension.filter( ext => ext.url === "search" ).map( ext =>
          ext.valueString.match( /^([^|]*)\|?([^|]*)?\|?(.*)?$/ ).slice(1,4)
        )
      } catch(err) { }
      let filters = []
      try {
        filters = pageDisplay.extension.filter( ext => ext.url === "filter" ).map( ext =>
          ext.valueString.match( /^([^|]*)\|?([^|]*)?\|?(.*)?$/ ).slice(1,4)
        )
      } catch(err) { }
      let addLink = null
      try {
        let add = pageDisplay.extension.find( ext => ext.url === "add" )
        let url = add.extension.find( ext => ext.url === "url" ).valueUrl
        let icon, eleClass
        try {
          icon = add.extension.find( ext => ext.url === "icon" ).valueString
        } catch(err) {}
        try {
          eleClass = add.extension.find( ext => ext.url === "class" ).valueString
        } catch(err) {}
        addLink = { url: url, icon: icon, class: eleClass }
      } catch(err) {}

      winston.silly(filters)
      winston.silly(search)

      let searchElement = "ihris-search"
      if ( resource.resourceType === "CodeSystem" ) {
        searchElement += "-code"
      }

      let searchTemplate = '<'+searchElement+' :key="$route.params.page" page="'+req.params.page+'" label="'+(resource.title || resource.name)+'" :fields="fields" :terms="terms" resource="'+(resource.resourceType === "StructureDefinition" ? resource.type : resource.resourceType)+'" profile="'+resource.url+'"'
      if ( addLink ) {
        searchTemplate += " :add-link='addLink'"
      }
      searchTemplate += '>'+"\n"
      for( let filter of filters ) {
        searchTemplate += '<ihris-search-term v-on:termChange="searchData"'
        if ( filter[1] ) {
          searchTemplate += ' label="'+filter[0]+'" expression="'+filter[1]+'"'
        } else {
          searchTemplate += ' label="Search" expression="'+filter[0]+'"'
        }
        if ( filter[2] ) {
          searchTemplate += ' binding="'+filter[2]+'"'
        }
        searchTemplate += "></ihris-search-term>\n"
      }
      searchTemplate += "</"+searchElement+">\n"
      winston.debug(searchTemplate)


      return res.status(200).json({ template: searchTemplate, data: { fields: search, addLink: addLink } })
    }


    if ( pageResource.startsWith( "CodeSystem" ) ) {

      getProperties( pageResource ).then( (resource) => {
        if ( resource.total !== 1 ) {
          let outcome = { ...outcomes.ERROR }
          outcome.issue[0].diagnostics = "Unable to find codesystem: "+pageResource+"."
          return res.status(400).json( outcome )
        }
        resource = resource.entry[0].resource
        /*
        let property = []
        if ( resource.hasOwnProperty("property") ) {
          property = resource.property
        }
        */

        const structure = fhirDefinition.parseCodeSystem( resource )
        if ( req.params.type === "search" ) {
          return createSearchTemplate( resource, structure )
        } else {
          return createTemplate( resource, structure )
        }

      } ).catch( err => {
        winston.error(err.message)
        winston.error(err.stack)
        return res.status( err.response.status ).json( err.response.data )
      } )

    } else if ( pageResource.startsWith( "StructureDefinition" ) ) {

      getDefinition( pageResource ).then( (resource) => {
        if ( allowed !== true ) {
          // Can't think of a reason to have this level of permissions for
          // StructureDefinitions, but just in case...
          let objAllowed = req.user.hasPermissionByObject( "read", resource )
          if ( objAllowed !== true ) {
            // But don't allow field level restrictions.  It will complicated the requirements
            return res.status(401).json( outcomes.DENIED )
          }
        }

        if ( !resource.hasOwnProperty("snapshot") ) {
          let outcome = { ...outcomes.ERROR }
          outcome.issue[0].diagnostics = "StructureDefinitions must be saved with a snapshot."
          return res.status(404).json( outcome )
        }

        const structure = fhirDefinition.parseStructureDefinition( resource )
        if ( req.params.type === "search" ) {
          return createSearchTemplate( resource, structure )
        } else {
          return createTemplate( resource, structure )
        }

      } ).catch( (err) => {
        winston.error(err.message)
        winston.error(err.stack)
        //return res.status( err.response.status ).json( err.response.data )
        return res.status( 500 ).json( { error: err.message } )
      } )

    } else {

      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = "Unknown resource type for page: "+pageResource+"."
      return res.status(400).json( outcome )

    }

  } ).catch( (err) => {
    winston.error(err.message)
    winston.error(err.stack)
    return res.status( err.response.status ).json( err.response.data )
  } )

} )

router.get('/questionnaire/:questionnaire', function(req, res) {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let allowed = req.user.hasPermissionByName( "read", "Questionnaire", req.params.questionnaire )
  // Limited access to these don't make sense so not allowing it for now
  if ( allowed !== true ) {
    return res.status(401).json( outcomes.DENIED )
  }


  fhirAxios.read( "Questionnaire", req.params.questionnaire ).then ( async (resource) => {


    let vueOutput = '<ihris-questionnaire :edit=\"isEdit\" :view-page="viewPage" url="' + resource.url + '" id="' + resource.id
      + '" title="' + resource.title
      + '" description="' + resource.description + '" purpose="' + resource.purpose
      + '"__SECTIONMENU__>' + "\n"


    let sectionMenu = []
    let templateData = { sectionMenu: {}, hidden: {} }

    const processQuestionnaireItems = async ( items ) => {
      let vueOutput = ""
      for( let item of items ) {
        let displayType
        if ( item.linkId.includes('#') ) {
          let linkDetails = item.linkId.split('#')
          item.linkId = linkDetails[0]
          displayType = linkDetails[1]
        }
        if ( item.repeats && !item.readOnly ) {
          vueOutput += "<ihris-array :edit=\"isEdit\" path=\"" + item.linkId + "\" label=\""
            + item.text + "\" max=\"*\" min=\"" + ( item.required ? "1" : "0" ) + "\"><template #default=\"slotProps\">\n"
        }
        let itemType = fhirDefinition.camelToKebab( item.type )
        if ( itemType === "group" ) {
          let label = item.text.split('|',2)
          vueOutput += '<ihris-questionnaire-group :edit=\"isEdit\" path="' + item.linkId + '" label="' + label[0] + '"'
          if ( label.length === 2 ) {
            vueOutput += ' description="' + label[1] + '"'
          }
          vueOutput += ">\n\n"
          vueOutput += await processQuestionnaireItems( item.item )
          vueOutput += "</ihris-questionnaire-group>\n"
        } else if ( item.readOnly ) {
          vueOutput += "<ihris-hidden path=\"" + item.linkId + "\" label=\""
            + item.text + "\""
          if ( item.answerOption[0].initialSelected ) {
            let answerTypes = Object.keys( item.answerOption[0] )
            for( let answerType of answerTypes ) {
              if ( answerType.startsWith("value") ) {
                let answerKey = getUKey()
                templateData.hidden[answerKey] = item.answerOption[0][answerType]
                vueOutput += " :hiddenValue='hidden." + answerKey
                  + "' hiddenType='" + answerType.substring(5) + "'"
                  break
                }
            }
          }
          vueOutput += "></ihris-hidden>\n"
        } else {
          vueOutput += "<fhir-" + itemType + " :edit=\"isEdit\" path=\"" + item.linkId + "\""

          let field
          if ( item.definition ) {
            field = await fhirDefinition.getFieldDefinition(item.definition)
            if ( itemType === "reference" && field && field.type && field.type[0] && field.type[0].targetProfile ) {
              vueOutput += " targetProfile=\""+field.type[0].targetProfile[0]+"\""
            }
            const minmax = [ "Date", "DateTime", "Instant", "Time", "Decimal", "Integer", "PositiveInt",
              "UnsignedInt" ]
            for( let mm of minmax ) {
              for( let type of [ "min", "max" ] ) {
                let attr = type+"Value"+mm
                if ( field.hasOwnProperty(attr) ) {
                  vueOutput += " "+attr+"=\""+field[attr]+"\""
                } else if ( nconf.get("defaults:components:"+itemType+":"+attr) ) {
                  vueOutput += " "+attr+"=\""
                    +nconf.get("defaults:components:"+itemType+":"+attr)+"\""
                }
              }
            }
          }
          const def_attrs = [ "calendar" ]
          for( let attr of def_attrs ) {
            if ( nconf.get("defaults:components:"+itemType+":"+attr) ) {
              vueOutput += " "+attr+"=\""
                +nconf.get("defaults:components:"+itemType+":"+attr)+"\""
            }
          }

          if ( item.hasOwnProperty("text") ) {
            vueOutput += " label=\""+ item.text + "\""
          }
          if ( item.hasOwnProperty("answerValueSet") ) {
            vueOutput += " binding=\""+ item.answerValueSet + "\""
          }
          if ( displayType ) {
            vueOutput += " displayType=\""+ displayType +"\""
          }
          let attrs = [ "required" ]
          for( let attr of attrs ) {
            if ( item.hasOwnProperty(attr) ) {
              vueOutput += " " + attr + "=\""+ item[attr] + "\""
            }
          }
          vueOutput += "></fhir-" + itemType +">\n"

        }
        if ( item.repeats && !item.readOnly ) {
          vueOutput += "</template></ihris-array>\n"
        }
      }
      return vueOutput
    }

    for ( let item of resource.item ) {
      if ( item.type === "group" ) {
        let md5sum = crypto.createHash('md5')
        md5sum.update(item.text)
        md5sum.update(Math.random().toString(36).substring(2))
        let sectionId = md5sum.digest('hex')

        let label = item.text.split('|',2)
        vueOutput += '<ihris-questionnaire-section id="' + sectionId + '" path="' + item.linkId + '" label="' + label[0] + '"'
        if ( label.length === 2 ) {
          vueOutput += ' description="' + label[1] + '"'
        }
        sectionMenu.push( { title: label[0], desc: label[1] || "", id: sectionId } )
        vueOutput += ">\n"
        vueOutput += await processQuestionnaireItems( item.item )
        vueOutput += "</ihris-questionnaire-section>\n"
      } else {
        winston.warn("Invalid entry for questionnaire.  All top level items must be type group.")
      }
    }

    if ( sectionMenu.length < 2 ) {
      vueOutput = vueOutput.replace("__SECTIONMENU__", "")
    } else {
      vueOutput = vueOutput.replace("__SECTIONMENU__", " :section-menu='sectionMenu'")
      templateData.sectionMenu = sectionMenu
    }
    vueOutput += "</ihris-questionnaire>\n"

    winston.debug(vueOutput)
    return res.status(200).json({ template: vueOutput, data: templateData })

  } ).catch( (err) => {
    winston.error(err.message)
    winston.error(err.stack)
    let outcome = { ...outcomes.ERROR }
    outcome.issue[0].diagnostics = "Unable to read questionnaire: "+req.params.questionnaire+"."
    return res.status(400).json( outcome )
    //return res.status( err.response.status ).json( err.response.data )
  } )

} )

router.get('/report/es/:report', (req, res) => {
  let report = "ihris-es-report-" + req.params.report
  if (!req.user) {
    return res.status(401).json(outcomes.NOTLOGGEDIN)
  }
  let allowed = req.user.hasPermissionByName("read", "Basic", report)
  // Limited access to these don't make sense so not allowing it for now
  if (allowed !== true) {
    return res.status(401).json(outcomes.DENIED)
  }
  fhirAxios.read("Basic", report).then(async (resource) => {
    let reportName
    let indexName
    let reportData = {
      fieldsDetails: [],
      filters: [],
      displayCheckbox: false
    }
    for(let extension of resource.extension) {
      let reportElements = extension.extension.filter((ext) => {
        if(extension.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails' && ext.url === 'label') {
          reportName = ext.valueString
        }
        if(extension.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails' && ext.url === 'name') {
          indexName = ext.valueString
        }
        if(extension.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails' && ext.url === 'displayCheckbox') {
          reportData.displayCheckbox = ext.valueBoolean
        }
        return ext.url === "http://ihris.org/fhir/StructureDefinition/iHRISReportElement"
      })
      for(let element of reportElements) {
        let displayName, esField
        let label = element.extension.find((ext) => {
          return ext.url === 'label'
        })
        let display = element.extension.find((ext) => {
          return ext.url === 'display'
        })
        if(!display) {
          continue;
        }
        let filter = element.extension.find((ext) => {
          return ext.url === 'filter' && ext.valueBoolean === true
        })
        if(filter) {
          let dropDownFilter = element.extension.find((ext) => {
            return ext.url === 'dropDownFilter' && ext.valueBoolean === true
          })
          let isDropDown = false
          if(dropDownFilter) {
            isDropDown = true
          }
          reportData.filters.push({
            field: label.valueString,
            display: display.valueString,
            isDropDown: isDropDown
          })
        }
        esField = label.valueString
        displayName = display.valueString
        reportData.fieldsDetails.push([displayName, esField])
      }
    }
    // populate data type of filters
    let url = URI(nconf.get('elasticsearch:base')).segment(indexName).segment('_mapping').toString()
    const options = {
      method: 'GET',
      url,
      auth: {
        username: nconf.get('elasticsearch:username'),
        password: nconf.get('elasticsearch:password'),
      }
    };
    axios(options).then((mappings) => {
      for(index in reportData.filters) {
        let field = reportData.filters[index].field
        if(!mappings.data[indexName].mappings.properties[field]) {
          winston.error('Field ' + field + 'not found on elasticsearch mapping')
          continue
        }
        let dataType = mappings.data[indexName].mappings.properties[field].type
        reportData.filters[index].dataType = dataType
      }
      reportData.indexName = indexName
      let template = `<ihris-es-report :key="$route.params.report" page="${req.params.report}" label="${reportName}" :reportData="reportData" :terms="terms" >`
      for (let filter of reportData.filters) {
        if(filter.isDropDown) {
          template += `<ihris-search-term v-on:termChange="searchData" label="${filter.display}" expression="${filter.field}" isDropDown="${filter.isDropDown}" :reportData="reportData"></ihris-search-term>\n`
        } else {
          template += `<ihris-search-term v-on:termChange="searchData" label="${filter.display}" expression="${filter.field}" :reportData="reportData"></ihris-search-term>\n`
        }
      }
      template += `</ihris-es-report>`
      return res.status(200).json({
        reportTemplate: template,
        reportData: reportData
      })
    }).catch((err) => {
      winston.error(err.message);
      winston.error(err.stack);
      return res.status(500).send()
    })
  })
})

router.get('/report/:report', function (req, res) {
  let report = "ihris-report-" + req.params.report
  if (!req.user) {
    return res.status(401).json(outcomes.NOTLOGGEDIN)
  }
  let allowed = req.user.hasPermissionByName("read", "Basic", report)
  // Limited access to these don't make sense so not allowing it for now
  if (allowed !== true) {
    return res.status(401).json(outcomes.DENIED)
  }
  fhirAxios.read("Basic", report).then(async (resource) => {
    let reportDetails = resource.extension.find((ext) => {
      return ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-report-details"
    })
    if (!reportDetails) {
      return res.status(500).send()
    }
    let reportName
    let displayCheckbox
    let queryParam = '?'
    let reportData = {
      fieldsDetails: []
    }
    let filters = []
    const parseGraphDefinition = (resource, graphData) => {
      let hiddenFields = {
        fields: []
      }
      if (resource.start) {
        hiddenFields.resourceType = resource.start
      } else {
        hiddenFields.resourceType = resource.type
      }
      if(resource.link && Array.isArray(resource.link)) {
        for (let link of resource.link) {
          hiddenFields.fields.push([link.path, link.path])
          for (let target of link.target) {
            let linkElement, linkTo
            if (target.params) {
              linkElement = target.params
            } else {
              linkElement = target.type + '.id'
            }
            linkTo = link.path
            graphData.links.push({
              resourceType: target.type,
              linkElement,
              linkTo
            })
            if (target.link) {
              parseGraphDefinition(target, graphData)
            }
          }
        }
      }
      graphData.hiddenFields.push(hiddenFields)
    }

    for (let extensions of reportDetails.extension) {
      if (extensions.url === 'name') {
        reportName = extensions.valueString
      } else if (extensions.url === "displayCheckbox") {
        displayCheckbox = extensions.valueBoolean
      } else if (extensions.url === "http://ihris.org/fhir/StructureDefinition/ihris-resource-relationships") {
        let fieldsDetails = {
          fields: []
        }
        let thisFilter = extensions.extension.filter(ext => ext.url === "filter").map(ext => ext.valueString.split('|'))
        if(thisFilter.length > 0) {
          filters = filters.concat(thisFilter)
        }
        for (let relData of extensions.extension) {
          if (relData.url === 'query') {
            if (!queryParam) {
              queryParam = '?' + relData.valueString
            } else {
              queryParam += relData.valueString + '&'
            }
          }
          if (relData.url === 'name') {
            fieldsDetails.resourceType = relData.valueString
          } else if (relData.url === 'field') {
            let fieldData = relData.valueString.split('|')
            fieldsDetails.fields.push([fieldData[0], fieldData[1]])
          }
        }
        reportData.fieldsDetails.push(fieldsDetails)
      }
    }
    let template = `<ihris-report :key="$route.params.report" page="${req.params.report}" label="${reportName}" :reportData="reportData" :terms="terms" :dataURL="dataURL">`
    for (let filter of filters) {
      template += '<ihris-search-term v-on:termChange="searchData"'
      if (filter.length == 1) {
        template += ' label="Search" expression="' + filter[0] + '"'
      } else {
        template += ' label="' + filter[0] + '" expression="' + filter[1] + '"'
      }
      template += "></ihris-search-term>\n"
    }
    template += `</ihris-report>`
    fhirAxios.read("GraphDefinition", report).then(async (resource) => {
      let graphData = {
        hiddenFields: [],
        links: []
      }
      parseGraphDefinition(resource, graphData)
      // merge graphData to reportData
      for (let hiddenFields of graphData.hiddenFields) {
        for (let index in reportData.fieldsDetails) {
          if (reportData.fieldsDetails[index].resourceType === hiddenFields.resourceType) {
            reportData.fieldsDetails[index].hiddenFields = hiddenFields.fields
          }
        }
      }
      let dataURL = resource.start + queryParam
      reportData.resourcesConnections = graphData.links
      reportData.primaryResource = resource.start
      reportData.displayCheckbox = displayCheckbox
      return res.status(200).json({
        reportTemplate: template,
        reportData: reportData,
        dataURL: dataURL
      })
    })
  })
})


module.exports = router;
