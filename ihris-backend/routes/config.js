var express = require('express')
var router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const outcomes = require('../config/operationOutcomes')
const fhirConfig = require('../modules/fhirConfig')
const fhirDefinition = require('../modules/fhirDefinition')
const crypto = require('crypto')

/* GET home page. */
router.get('/site', function(req, res) {
  const defaultUser = nconf.get("user:loggedout") || "ihris-user-loggedout"
  let site = nconf.get("site")
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

router.get('/page/:page', function(req, res) {
  let page = "ihris-page-"+req.params.page
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let allowed = req.user.hasPermissionByName( "read", "Basic", page )
  // Limited access to these don't make sense so not allowing it for now
  if ( allowed !== true ) {
    return res.status(401).json( outcomes.DENIED )
  }

  fhirAxios.read( "Basic", page ).then ( async (resource) => {
    let pageDisplay = resource.extension.find( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-page-display" )
    let pageResource = pageDisplay.extension.find( ext => ext.url === "resource" ).valueReference.reference
    /*
    let order = []
    try {
      order = pageDisplay.extension.filter( ext => ext.url === "order" ).map( ext => ext.valueString )
    } catch(err) { }
    */
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
    let pageSections = resource.extension.filter( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-page-section" )

    //console.log(filters)
    //console.log(search)
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
              let row, condition
              let eleClass = "primary"
              try {
                row = action.extension.find( ext => ext.url === "row" ).valueBoolean
              } catch(err) {}
              try {
                condition = action.extension.find( ext => ext.url === "condition" ).valueString
              } catch(err) {}
              try {
                eleClass = action.extension.find( ext => ext.url === "class" ).valueString
              } catch(err) {}
              if ( link && text ) {
                actions.push( {link: link, text: text, row: row, condition: condition, eleClass: eleClass } )
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

    const createTemplates = async ( resource, structure ) => {
      //console.log(JSON.stringify(structure,null,2))

      let structureKeys = Object.keys( structure )

      let searchElement = "ihris-search"
      let resourceElement = "ihris-resource"
      if ( resource.resourceType === "CodeSystem" ) {
        searchElement += "-code"
        resourceElement = "ihris-codesystem"
      }

      let searchTemplate = '<'+searchElement+' :key="$route.params.page" page="'+req.params.page+'" label="'+(resource.title || resource.name)+'" :fields="fields" :terms="terms" resource="'+(resource.resourceType === "StructureDefinition" ? resource.type : resource.resourceType)+'" profile="'+resource.url+'">'+"\n"
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
      console.log(searchTemplate)


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
        let sectionMenu
        vueOutput = '<'+resourceElement+' :fhir-id="fhirId" :edit="isEdit" v-on:setEdit="setEdit($event)" profile="'+resource.url+'" :key="$route.params.page+($route.params.id || \'\')" page="'+req.params.page+'" field="'+fhir+'" title="'+sections[fhir].title+'"'
        if ( sectionKeys.length > 1 ) {
          sectionMenu = sectionKeys.map( name => { return { name: name, title: sections[name].title, desc: sections[name].description, secondary: !!sections[name].resource } } )
          vueOutput += " :section-menu='"+JSON.stringify(sectionMenu).replace(/'/g, "\'")+"'"
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
              console.log("No datatype for "+base+" "+field+" so skipping",base,field)
              continue
            }
            let eleName = fhirDefinition.camelToKebab( fields[field].code )
            let attrs = [ "field", "sliceName", "targetProfile", "profile", "min", "max", "base-min",
              "base-max", "label", "path", "binding" ]
            let isArray = false
            if ( fields[field]["max"] !== "1" ) {
              isArray = true
              output += "<ihris-array :edit=\"isEdit\" fieldType=\""+eleName+"\" :slotProps=\"slotProps\""
              let arr_attrs = [ "field", "label", "min", "max", "id", "path", "profile", "targetProfile", "sliceName" ]
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
            for( let attr of attrs ) {
              if ( fields[field].hasOwnProperty(attr) ) {
                output += " "+attr+"=\""+fields[field][attr]+"\""
              }
            }
            let subFields
            if ( eleName === "reference" && fields[field].hasOwnProperty("fields") ) {
              let refFields = fields[field].fields
              subFields = {}
              let subAttrs = [ "id", "path", "label", "min", "max", "base-min", "base-max", "code" ]
              for( let refField of Object.keys(refFields) ) {
                subFields[refField] = {}
                //console.log("refLOOP",refField,refFields)
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
              output += " :sub-fields='" + JSON.stringify( subFields ).replace(/'/g, "\'") +"'"
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
              console.log("StructureDefinitions (", sections[name].resource, ") must be saved with a snapshot.")
              continue
            }
            const secondaryStructure = fhirDefinition.parseStructureDefinition( secondary )
            let secondaryOrder = {}
            setupOrder( sections[name].fields, secondaryOrder )
            let secondaryKeys = Object.keys( secondaryStructure )
            for ( let second_fhir of secondaryKeys ) {
              vueOutput += '<ihris-secondary :edit="isEdit" :link-id="fhirId" profile="'+secondary.url
                +'" field="'+second_fhir
                +'" title="'+sections[name].title
                +'" link-field="'+sections[name].linkfield
                +'" search-field="'+(sections[name].searchfield || "")
                +'" :columns=\''+JSON.stringify(sections[name].columns).replace(/'/g, "\'")
                +'\' :actions=\''+JSON.stringify(sections[name].actions).replace(/'/g, "\'")
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
      console.log(vueOutput)
      return res.status(200).json({ search: searchTemplate, searchData: search, template: vueOutput })
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
        createTemplates( resource, structure )

      } ).catch( err => {
        console.log(err)
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
        createTemplates( resource, structure )

      } ).catch( (err) => {
        console.log(err)
        return res.status( err.response.status ).json( err.response.data )
      } )
    } else {
      let outcome = { ...outcomes.ERROR }
      outcome.issue[0].diagnostics = "Unknown resource type for page: "+pageResource+"."
      return res.status(400).json( outcome )
    }

  } ).catch( (err) => {
    console.log(err)
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

    const processQuestionnaireItems = async ( items ) => {
      let vueOutput = ""
      for( let item of items ) {
        if ( item.repeats && !item.readOnly ) {
          vueOutput += "<ihris-array :edit=\"isEdit\" path=\"" + item.linkId + "\" label=\""
            + item.text + "\" max=\"*\" min=\"" + ( item.required ? "1" : "0" ) + "\"><template #default=\"slotProps\">\n"
        }
        if ( item.type === "group" ) {
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
                vueOutput += " :hiddenValue='" + JSON.stringify( item.answerOption[0][answerType] ).replace(/'/g, "\'")
                  + "' hiddenType='" + answerType.substring(5) + "'"
                  break
                }
            }
          }
          vueOutput += "></ihris-hidden>\n"
        } else {
          vueOutput += "<fhir-" + item.type + " :edit=\"isEdit\" path=\"" + item.linkId + "\""

          if ( item.type === "reference" && item.definition ) {
            let field = await fhirDefinition.getFieldDefinition(item.definition)
            if ( field && field.type && field.type[0] && field.type[0].targetProfile ) {
              vueOutput += " targetProfile=\""+field.type[0].targetProfile[0]+"\""
            }
          }
          if ( item.hasOwnProperty("text") ) {
            vueOutput += " label=\""+ item.text + "\""
          }
          if ( item.hasOwnProperty("answerValueSet") ) {
            vueOutput += " binding=\""+ item.answerValueSet + "\""
          }
          let attrs = [ "required" ]
          for( let attr of attrs ) {
            if ( item.hasOwnProperty(attr) ) {
              vueOutput += " " + attr + "=\""+ item[attr] + "\""
            }
          }
          vueOutput += "></fhir-" + item.type +">\n"

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
        console.log("Invalid entry for questionnaire.  All top level items must be type group.")
      }
    }

    if ( sectionMenu.length < 2 ) {
      vueOutput = vueOutput.replace("__SECTIONMENU__", "")
    } else {
      vueOutput = vueOutput.replace("__SECTIONMENU__", " :section-menu='" + JSON.stringify(sectionMenu).replace(/'/g, "\'") + "'")
    }
    vueOutput += "</ihris-questionnaire>\n"

    console.log(vueOutput)
    return res.status(200).json({ template: vueOutput })

  } ).catch( (err) => {
    console.log(err)
    return res.status( err.response.status ).json( err.response.data )
  } )

} )

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
