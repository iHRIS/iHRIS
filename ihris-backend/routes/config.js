var express = require('express')
var router = express.Router()
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const outcomes = require('../config/operationOutcomes')
const fhirConfig = require('../modules/fhirConfig')
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

const camelToKebab = (code) => {
  return code.replace(/([a-z0-9]|[A-Z]+)([A-Z])/g, '$1-$2').toLowerCase()
}

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

const processFields = ( fields, base, order ) => {
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
    let eleName = camelToKebab( fields[field].code )
    let attrs = [ "field", "sliceName", "targetProfile", "profile", "min", "max", "base-min", 
      "base-max", "label", "path", "binding" ]
    let isArray = false
    if ( fields[field]["max"] !== "1" ) {
      isArray = true
      output += "<ihris-array fieldType=\""+eleName+"\" :slotProps=\"slotProps\""
      let arr_attrs = [ "field", "label", "min", "max", "id", "path", "profile", "targetProfile", "sliceName" ]
      for ( let attr of arr_attrs ) {
        output += " "+attr+"=\""+fields[field][attr]+"\""
      }
      output += ">\n<template #default=\"slotProps\">\n"
    } else {
      attrs.unshift("id")
    }
    output += "<fhir-"+eleName +" :slotProps=\"slotProps\""
    /*
    output += "<fhir-"+eleName
    if ( isArray ) {
      output += " :slotProps=\"slotProps\""
    }
    */
    for( let attr of attrs ) {
      if ( fields[field].hasOwnProperty(attr) ) {
        output += " "+attr+"=\""+fields[field][attr]+"\""
      }
    }
    output += ">\n"


    if ( fields[field].hasOwnProperty("fields") ) {
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

const getDefinition = ( resource ) => {
  let structureDef = resource.split('/')
  return fhirAxios.read( structureDef[0], structureDef[1] )
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

  fhirAxios.read( "Basic", page ).then ( (resource) => {
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
      search = pageDisplay.extension.filter( ext => ext.url === "search" ).map( ext => ext.valueString.split('|') )
    } catch(err) { }
    let filters = []
    try {
      filters = pageDisplay.extension.filter( ext => ext.url === "filter" ).map( ext => ext.valueString.split('|') )
    } catch(err) { }
    let pageSections = resource.extension.filter( ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-page-section" )

    console.log(filters)
    console.log(search)
    let sections = {}
    let sectionMap = {}
    for( let section of pageSections ) {
      let title, description, name, resource, linkfield
      let fields = []
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
        resource = section.extension.find( ext => ext.url === "resource" ).valueReference.reference
      } catch(err) { }
      try {
        linkfield = section.extension.find( ext => ext.url === "linkfield" ).valueString
      } catch(err) { }

      let sectionOrder = {}
      setupOrder( fields, sectionOrder )
      /*
      for( let ord of fields ) {
        let lastDot = ord.lastIndexOf('.')
        let ordId = ord.substring(0,lastDot)
        let ordField = ord.substring(lastDot+1)
        if ( !sectionOrder.hasOwnProperty(ordId) ) {
          sectionOrder[ordId] = []
        }
        sectionOrder[ordId].push(ordField)
      }
      */
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
        elements: {}
      } 
    }
    let sdOrder = {}
    /*
    for( let ord of order ) {
      let lastDot = ord.lastIndexOf('.')
      let ordId = ord.substring(0,lastDot)
      let ordField = ord.substring(lastDot+1)
      if ( !sdOrder.hasOwnProperty(ordId) ) {
        sdOrder[ordId] = []
      }
      sdOrder[ordId].push(ordField)
    }
    */


    getDefinition( pageResource ).then( async (resource) => {
      /*
      if ( allowed !== true ) {
        // Can't think of a reason to have this level of permissions for 
        // StructureDefinitions, but just in case...
        let objAllowed = req.user.hasPermissionByObject( "read", resource )
        if ( objAllowed !== true ) {
          // But don't allow field level restrictions.  It will complicated the requirements
          return res.status(401).json( outcomes.DENIED )
        }
      }
      */

      if ( !resource.hasOwnProperty("snapshot") ) {
        let outcome = { ...outcomes.ERROR }
        outcome.issue[0].diagnostics = "StructureDefinitions must be saved with a snapshop."
        return res.status(404).json( outcome )
      }
      const structure = fhirConfig.parseStructureDefinition( resource )

      let structureKeys = Object.keys( structure )

      let searchTemplate = '<ihris-search page="'+req.params.page+'" label="'+structureKeys[0]+'" :fields="fields" :terms="terms" profile="'+resource.url+'">'+"\n"
      for( let filter of filters ) {
          searchTemplate += '<ihris-search-term v-on:termChange="searchData"'
        if ( filter.length == 1 ) {
          searchTemplate += ' label="Search" expression="'+filter[0]+'"'
        } else {
          searchTemplate += ' label="'+filter[0]+'" expression="'+filter[1]+'"'
        }
        searchTemplate += "></ihris-search-term>\n"
      }
      searchTemplate += "</ihris-search>\n"
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
            elements: {}
          }
        }
        let sectionKeys = Object.keys(sections)
        let sectionMenu
        vueOutput = '<ihris-resource profile="'+resource.url+'" page="'+req.params.page+'" field="'+fhir+'" title="'+sections[fhir].title+'"'
        if ( sectionKeys.length > 1 ) {
          sectionMenu = sectionKeys.map( name => { return { name: name, title: sections[name].title, desc: sections[name].description } } )
          vueOutput += " :section-menu='"+JSON.stringify(sectionMenu)+"'"
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
        for ( let name of sectionKeys ) {
          vueOutput += "<ihris-section :slotProps=\"slotProps\" name=\""+name+"\" title=\""+sections[name].title+"\" description=\""+sections[name].description+"\">\n<template #default=\"slotProps\">\n"
          if ( sections[name].resource ) {
            let secondary = await getDefinition( sections[name].resource )

            if ( !secondary.hasOwnProperty("snapshot") ) {
              console.log("StructureDefinitions (", sections[name].resource, ") must be saved with a snapshop.")
              continue
            }
            const secondaryStructure = fhirConfig.parseStructureDefinition( secondary )
            let secondaryOrder = {}
            setupOrder( sections[name].fields, secondaryOrder )
            let secondaryKeys = Object.keys( secondaryStructure )
            for ( let second_fhir of secondaryKeys ) {
              vueOutput += '<ihris-secondary profile="'+secondary.url+'" field="'+second_fhir+'" title="'
                +sections[name].title+'" link-field="'+sections[name].linkfield
                +'"><template #default="slotProps">' + "\n"
              vueOutput += processFields( secondaryStructure[second_fhir].fields, second_fhir, secondaryOrder )
              vueOutput += "</template></ihris-secondary>"
            }



          } else {
            vueOutput += processFields( sections[name].elements, fhir, sections[name].order )
          }
          vueOutput += "</template></ihris-section>\n"
        }
        /*
        if ( structure[fhir].hasOwnProperty("fields") ) {
          vueOutput += processFields( structure[fhir].fields, fhir, sdOrder )
        }
        */

        vueOutput += '</template></ihris-resource>'+"\n"
      }
      vueOuput = "</template>"
      console.log(vueOutput)
      return res.status(200).json({ search: searchTemplate, searchData: search, template: vueOutput })
    } ).catch( (err) => {
      console.log(err)
      return res.status( err.response.status ).json( err.response.data )
    } )

  } ).catch( (err) => {
    console.log(err)
    return res.status( err.response.status ).json( err.response.data )
  } )

  /*
  let allowed = req.user.hasPermissionByName( "read", "StructureDefinition", req.params.page )
  if ( !allowed ) {
    return res.status(401).json( outcomes.DENIED )
  }
  fhirAxios.read( "StructureDefinition", req.params.page ).then( (resource) => {
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
      outcome.issue[0].diagnostics = "StructureDefinitions must be saved with a snapshop."
      return res.status(404).json( outcome )
    }

    const structure = fhirConfig.parseStructureDefinition( resource )
    let vueOuput = ""
    for ( let fhir of Object.keys( structure ) ) {
      vueOutput = '<ihris-resource field="'+fhir+'"><template #default>'+"\n"

        if ( structure[fhir].hasOwnProperty("fields") ) {
          vueOutput += processFields( structure[fhir].fields, structure )
        }
      
      vueOutput += '</template></ihris-resource>'+"\n"
    }
    console.log(vueOutput)
    return res.status(200).send(vueOutput)
  } ).catch( (err) => {
    console.log(err)
    return res.status( err.response.status ).json( err.response.data )
  } )
    */
  
} )

const processQuestionnaireItems = ( items ) => {
  let vueOutput = ""
  for( let item of items ) {
    if ( item.repeats && !item.readOnly ) {
      vueOutput += "<ihris-array path=\"" + item.linkId + "\" label=\""
        + item.text + "\" max=\"*\" min=\"" + ( item.required ? "1" : "0" ) + "\"><template #default=\"slotProps\">\n"
    }
    if ( item.type === "group" ) {
      let label = item.text.split('|',2)
      vueOutput += '<ihris-questionnaire-group path="' + item.linkId + '" label="' + label[0] + '"'
      if ( label.length === 2 ) {
        vueOutput += ' description="' + label[1] + '"'
      }
      vueOutput += ">\n\n"
      vueOutput += processQuestionnaireItems( item.item )
      vueOutput += "</ihris-questionnaire-group>\n"
    } else if ( item.readOnly ) {
      vueOutput += "<ihris-hidden path=\"" + item.linkId + "\" label=\""
        + item.text + "\""
      if ( item.answerOption[0].initialSelected ) {
        let answerTypes = Object.keys( item.answerOption[0] )
        for( let answerType of answerTypes ) {
          if ( answerType.startsWith("value") ) {
            vueOutput += " :hiddenValue='" + JSON.stringify( item.answerOption[0][answerType] ) 
              + "' hiddenType='" + answerType.substring(5) + "'"
            break
          }
        }
      }
      vueOutput += "></ihris-hidden>\n"
    } else {
     vueOutput += "<fhir-" + item.type 

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

router.get('/questionnaire/:questionnaire', function(req, res) {
  if ( !req.user ) {
    return res.status(401).json( outcomes.NOTLOGGEDIN)
  }
  let allowed = req.user.hasPermissionByName( "read", "Questionnaire", req.params.questionnaire )
  // Limited access to these don't make sense so not allowing it for now
  if ( allowed !== true ) {
    return res.status(401).json( outcomes.DENIED )
  }


  fhirAxios.read( "Questionnaire", req.params.questionnaire ).then ( (resource) => {


    let vueOutput = '<ihris-questionnaire id="' + resource.id + '" title="' + resource.title 
      + '" description="' + resource.description + '" purpose="' + resource.purpose 
      + '"__SECTIONMENU__>' + "\n"

    
    let sectionMenu = []
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
        vueOutput += ">\n\n"
        vueOutput += processQuestionnaireItems( item.item )
        vueOutput += "</ihris-questionnaire-section>\n"
      } else {
        console.log("Invalid entry for questionnaire.  All top level items must be type group.")
      }
    }

    if ( sectionMenu.length < 2 ) {
      vueOutput = vueOutput.replace("__SECTIONMENU__", "")
    } else {
      vueOutput = vueOutput.replace("__SECTIONMENU__", " :section-menu='" + JSON.stringify(sectionMenu) + "'")
    }
    vueOutput += "</ihris-questionnaire>\n"

    console.log(vueOutput)
    return res.status(200).json({ template: vueOutput })

  } ).catch( (err) => {
    console.log(err)
    return res.status( err.response.status ).json( err.response.data )
  } )

} )

module.exports = router;
