const fs = require("fs")
const async = require("async")
const axios = require("axios")
const ihrissmartrequire = require("ihrissmartrequire")
let resourcesData = []
const nconf = ihrissmartrequire('modules/config')
const fhirAxios = nconf.fhirAxios
const fhirDefinition = ihrissmartrequire('modules/fhir/fhirDefinition');
let keys = ihrissmartrequire("locales/en_startup.json", );

let nxturl = true
function run() {
  return new Promise((resolve, reject) => {
    getResources().then(() => {
      const promises = []
      for(let resource of resourcesData) {
        resource = resource.resource
        promises.push(new Promise(async(resolve1, reject1) => {
          if(resource.resourceType === "Basic" && resource.meta && resource.meta.profile && resource.meta.profile.includes("http://ihris.org/fhir/StructureDefinition/ihris-page")) {
            extractFromPage(resource.id, ["resource", "search"]).then(() => {
              resolve1()
            }).catch(() => {
              resolve1()
            })
          } else if(resource.resourceType === "Questionnaire") {
            extractTextFromQuestionnaire(resource)
            resolve1()
          } else if(resource.id === "ihris-config") {
            let site = JSON.parse(JSON.stringify(nconf.get("site") || {}))
            if(site.title) {
              keys.App.title = site.title
            }
            if(site.site) {
              keys.App.site = site.site
            }
            if(site.nav && site.nav.menu) {
              extractMenus(site.nav.menu)
            }
            resolve1()
          } else if(resource.resourceType === "CodeSystem") {
            // extractTextFromCodeSystem(resource)
            resolve1()
          } else {
            resolve1()
          }
        }))
      }
      Promise.all(promises).then(async () => {
        try {
          let locales = ihrissmartrequire.path("locales/en_startup.json")
          locales = locales.split("/")
          locales.pop()
          locales = locales.join("/")
          await fs.writeFileSync(locales + "/en.json", JSON.stringify(keys, 0, 2))
          return resolve()
        } catch (error) {
          console.log(error);
          return reject()
        }
      })
    }).catch((err) => {
      console.log(err);
    })
  })
}

function getResources() {
  return new Promise((resolve) => {
    let resources = ["Basic", "Questionnaire", "Parameters"]
    const promises = []
    for(let resource of resources) {
      promises.push(new Promise((resolve1) => {
        let params = {}
        async.whilst(
          (callback) => {
            return callback(null, nxturl !== false)
          },
          (callback) => {
            if(Object.keys(params).length > 0) {
              resource = ""
            }
            search(resource, params).then((response) => {
              const next = response.link && response.link.find(link => link.relation === 'next');
              if(response.entry) {
                resourcesData = resourcesData.concat(response.entry)
              }
              params = {};
              nxturl = false
              if (next) {
                let paramsList = next.url.split("?")[1]
                paramsList = paramsList.split("&")
                for(let param of paramsList) {
                  params[param.split("=")[0]] = param.split("=")[1]
                }
                nxturl = true
              } else {
                nxturl = false
              }
              return callback(null, params);
            }).catch((err) => {
              console.log(err);
              return callback(err)
            })
          },
          (err) => {
            return resolve1()
          },
        );
      }))
    }
    Promise.all(promises).then(() => {
      return resolve()
    })
  })
}

function getFiles(builtResource) {
  return new Promise(async(resolve, reject) => {
    const dirs = await fs.readdirSync(`${__dirname}/${builtResource}`);
    let resources = []
    const promises1 = []
    for(let dir of dirs) {
      promises1.push(new Promise((resolve1, reject1) => {
        let files = [];
        if (dir.split('.').length >= 2 && dir.split('.')[dir.split('.').length - 1] === 'json') {
          files.push(dir);
          dir = null;
        } else {
          try {
            files = fs.readdirSync(`${__dirname}/${builtResource}/${dir}`);
          } catch (error) {
            console.error(error);
            errorOccured = true;
            return reject1()
          }
        }
        const promises2 = []
        for(let file of files) {
          promises2.push(new Promise((resolve2) => {
            let fullpath;
            if (dir) {
              fullpath = `${__dirname}/${builtResource}/${dir}/${file}`;
            } else {
              fullpath = `${__dirname}/${builtResource}/${file}`;
            }
            fs.readFile(fullpath, { encoding: 'utf8', flag: 'r' }, (err, data) => {
              resources.push(JSON.parse(data))
              return resolve2()
            })
          }))
        }
        Promise.all(promises2).then(() => {
          return resolve1()
        })
      }))
    }
    Promise.all(promises1).then(() => {
      return resolve(resources)
    }).catch(() => {
      return reject(resources)
    })
  })
}

function extractMenus(nav) {
  for(let menu in nav) {
    if(nav[menu].text) {
      keys.App.menu[nav[menu].text] = nav[menu].text
      if(nav[menu].menu) {
        extractMenus(nav[menu].menu)
      }
    }
  }
}

function extractTextFromQuestionnaire(resource) {
  for(let item of resource.item) {
    if(item.type === "group") {
      let labels = item.text.split('|',2)
      for(let label of labels) {
        keys.App["ihris-questionnaire-section"][label] = label
      }
      processQuestionnaireItems(item)
    }
  }
}

function extractTextFromCodeSystem(resource) {
  _processConcept(resource.concept)

  function _processConcept(concepts) {
    for(let concept of concepts) {
      if(concept.concept) {
        return _processConcept(concept.concept)
      }
      // keys.App["fhir-string"]["Display"] = 
    }
  }
}

function processQuestionnaireItems(qitem) {
  for(let item of qitem.item) {
    if(item.repeats && !item.readOnly) {
      if(!keys.App["ihris-array"]) {
        keys.App["ihris-array"] = {}
      }
      keys.App["ihris-array"][item.text] = item.text
      keys.App["ihris-complex-card"][item.text] = item.text
    }
    if(item.type === "group") {
      let labels = item.text.split('|',2)
      for(let label of labels) {
        keys.App["ihris-questionnaire-group"][label] = label
      }
      processQuestionnaireItems(item)
    } else {
      let trans_type = "fhir-" + item.type
      if(item.type === "dateTime") {
        trans_type = "fhir-date-time"
      }
      if(!keys.App[trans_type]) {
        keys.App[trans_type] = {}
      }
      keys.App[trans_type][item.text] = item.text
    }
  }
}

function extractFromPage(page_id, type) {
  return new Promise((resolve, reject) => {
    fhirAxios.read("Basic", page_id).then(async (resource) => {
      let pageDisplay = resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-page-display")
  
      let pageResource = pageDisplay.extension.find(ext => ext.url === "resource").valueReference.reference
      let pageFields = {}
        try {
          pageDisplay.extension.filter(ext => ext.url === "field").map(ext => {
            let path = ext.extension.find(subext => subext.url === "path").valueString
            let type, readOnlyIfSet
            try {
                type = ext.extension.find(subext => subext.url === "type").valueString
            } catch (err) {
            }
            try {
                readOnlyIfSet = ext.extension.find(subext => subext.url === "readOnlyIfSet").valueBoolean
            } catch (err) {
            }
            pageFields[path] = {type: type, readOnlyIfSet: readOnlyIfSet}
          })
        } catch (err) {
        }
        let pageSections = resource.extension.filter(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-page-section")
      if (pageResource.startsWith("CodeSystem")) {
        getProperties(pageResource).then((resource) => {
          if (resource.total !== 1) {
            console.log("Unable to find codesystem: " + pageResource + ".")
            return resolve()
          }
          resource = resource.entry[0].resource
          const structure = fhirDefinition.parseCodeSystem(resource)
          createSearchTemplate(resource, pageDisplay)
          createTemplate(resource, structure, pageSections)
          return resolve()
          if (type.includes("search")) {
            createSearchTemplate(resource, pageDisplay)
            return resolve()
          } else if(type.includes("resource")) {
            createTemplate(resource, structure, pageSections)
            return resolve()
          }
  
        }).catch(err => {
          console.error(err.message)
          console.error(err.stack)
          return resolve()
        })
  
      } else if (pageResource.startsWith("StructureDefinition")) {
        getDefinition(pageResource).then((resource) => {
          if (!resource.hasOwnProperty("snapshot")) {
            return resolve()
          }
          const structure = fhirDefinition.parseStructureDefinition(resource)
          createSearchTemplate(resource, pageDisplay)
          createTemplate(resource, structure, pageSections)
          return resolve()
          if (type.includes("search")) {
            
            return resolve()
          } 
          if(type.includes("resource")) {
            
          }
  
        }).catch((err) => {
          console.error(err.message)
          console.error(err.stack)
          return resolve()
        })
  
      } else {
        return resolve()
      }
    }).catch(() => {
      return reject()
    })
  })
}

const getDefinition = (resource) => {
  let structureDef = resource.split('/')
  return fhirAxios.read(structureDef[0], structureDef[1])
}

const getProperties = (resource) => {
  let codeSystem = resource.split('/')
  return fhirAxios.search(codeSystem[0], {_id: codeSystem[1], _elements: "url,title,property"})
}

const getUKey = () => {
  return Math.random().toString(36).replace(/^[^a-z]+/,'') + Math.random().toString(36).substring(2,15)
}

const createSearchTemplate = async (resource, pageDisplay) => {
  let fields = ['id']
  try {
    fields = pageDisplay.extension.filter(ext => ext.url === "search").map(ext =>
      ext.valueString.match(/^([^|]*)\|?([^|]*)?\|?(.*)?$/).slice(1, 4)
    )
  } catch (err) {
  }
  for(let field of fields) {
    keys.App["ihris-search"][field[0]] = field[0]
  }
  let filters = []
  try {
    filters = pageDisplay.extension.filter(ext => ext.url === "filter").map(ext =>
        ext.valueString.match(/^([^|]*)\|?([^|]*)?\|?(.*)?$/).slice(1, 4)
    )
  } catch (err) {
  }

  let searchElement = "ihris-search"
  if (resource.resourceType === "CodeSystem") {
    searchElement += "-code"
  }
  let label = (resource.title || resource.name)
  if(label) {
    keys.App[searchElement][label] = label
  }
  for (let filter of filters) {
      if (filter[1]) {
        keys.App["ihris-search-term"][filter[0]] = filter[0]
      } else {
        keys.App["ihris-search-term"]["Search"] = "Search"
      }
  }
}

const createTemplate = async (resource, structure, pageSections) => {
  return new Promise((resolve) => {
    let sections = {}
    let sectionMap = {}
    for (let section of pageSections) {
      let title, description, name, resourceExt, resource, linkfield, searchfield
      let fields = []
      let columns = []
      let actions = []
      try {
          title = section.extension.find(ext => ext.url === "title").valueString
      } catch (err) {
      }
      try {
          description = section.extension.find(ext => ext.url === "description").valueString
      } catch (err) {
      }
      try {
          name = section.extension.find(ext => ext.url === "name").valueString
      } catch (err) {
      }
      try {
          fields = section.extension.filter(ext => ext.url === "field").map(ext => ext.valueString)
      } catch (err) {
      }
      try {
        resourceExt = section.extension.find(ext => ext.url === "resource").extension

        resource = resourceExt.find(ext => ext.url === "resource").valueReference.reference
        if (resource) {
          linkfield = resourceExt.find(ext => ext.url === "linkfield").valueString
          try {
            searchfield = resourceExt.find(ext => ext.url === "searchfield").valueString
          } catch (err) {
          }
          let columnsExt = resourceExt.filter(ext => ext.url === "column")
          for (let column of columnsExt) {
            try {
              let header = column.extension.find(ext => ext.url === "header").valueString
              let field = column.extension.find(ext => ext.url === "field").valueString
              if (header && field) {
                columns.push({text: header, value: field})
              }
            } catch (err) {
            }
          }
          let actionsExt = resourceExt.filter(ext => ext.url === "action")
          for (let action of actionsExt) {
            try {
              let link = action.extension.find(ext => ext.url === "link").valueString
              let text = action.extension.find(ext => ext.url === "text").valueString
              if (link && text) {
                actions.push({
                  link: link, text: text
                })
              }
            } catch (err) {
            }
          }

        }

      } catch (err) {
      }

      let sectionOrder = {}
      for (let field of fields) {
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
    const getSortFunc = (sortArr) => {
      return (a, b) => {
        idxA = sortArr.indexOf(a)
        idxB = sortArr.indexOf(b)
        if (idxA === idxB) {
            return 0
        } else if (idxA === -1) {
            return 1
        } else if (idxB === -1) {
            return -1
        } else if (idxA < idxB) {
            return -1
        } else {
            return 1
        }
      }
    }

    let structureKeys = Object.keys(structure)
    let sectionMenu

    const promises1 = []
    for (let fhir of structureKeys) {
      promises1.push(new Promise((resolve1) => {
        if (!sections.hasOwnProperty(fhir)) {
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
        if (resource.resourceType === "CodeSystem") {
          resourceElement = "ihris-codesystem"
        }
  
        if (sectionKeys.length > 1) {
          sectionMenu = sectionKeys.map(name => {
            return {
              name: name,
              title: sections[name].title,
              desc: sections[name].description,
              secondary: !!sections[name].resource
            }
          })
        }
        if (structure[fhir].hasOwnProperty("fields")) {
          let fieldKeys = Object.keys(structure[fhir].fields)
          for (let field of fieldKeys) {
            if (sectionMap.hasOwnProperty(structure[fhir].fields[field].id)) {
              sections[sectionMap[structure[fhir].fields[field].id]].elements[field] = structure[fhir].fields[field]
            } else {
              sections[fhir].elements[field] = structure[fhir].fields[field]
            }
          }
        }
        const processFields = (fields, base, order) => {
          return new Promise(async (resolve3) => {
            let fieldKeys = Object.keys(fields)
            if (order[base]) {
                fieldKeys.sort(getSortFunc(order[base]))
            }
            const promises4 = []
            for (let field of fieldKeys) {
              promises4.push(new Promise(async(resolve4) => {
                if (fields[field]["max"] === "0") {
                  return resolve4()
                }
                if (!fields[field].code) {
                  console.info("No datatype for " + base + " " + field + " so skipping", base, field)
                  return resolve4()
                }
                let eleName = fhirDefinition.camelToKebab(fields[field].code)
                if (fields[field]["max"] !== "1") {
                  if(fields[field].label) {
                    keys.App["ihris-array"][fields[field].label] = fields[field].label
                    keys.App["ihris-complex-card"][fields[field].label] = fields[field].label
                  }
                }
                if(!keys.App["fhir-" + eleName]) {
                  keys.App["fhir-" + eleName] = {}
                }
                if(fields[field].label) {
                  keys.App["fhir-" + eleName][fields[field].label] = fields[field].label
                }
                let subFields
                if (eleName === "reference" && fields[field].hasOwnProperty("fields")) {
                  let refFields = fields[field].fields
                  subFields = {}
                  let subAttrs = ["id", "path", "label", "min", "max", "base-min", "base-max", "code"]
                  for (let refField of Object.keys(refFields)) {
                    subFields[refField] = {}
                    for (let attr of subAttrs) {
                      if (refFields[refField].hasOwnProperty(attr)) {
                        if ((attr === "id" || attr === "path") && fields[field].hasOwnProperty(attr)) {
                          subFields[refField][attr] = refFields[refField][attr].replace(fields[field][attr] + ".", "")
                        } else {
                          subFields[refField][attr] = refFields[refField][attr]
                        }
                      }
                    }
                  }
                }
    
                if (!subFields && fields[field].hasOwnProperty("fields")) {
                  await processFields(fields[field].fields, base + "." + fields[field], order)
                  return resolve4()
                }
                return resolve4()
              }))
            }
            Promise.all(promises4).then(() => {
              return resolve3()
            })
          })
        }
        const promises2 = []
        for (let name of sectionKeys) {
          promises2.push(new Promise(async(resolve2) => {
            if(!keys.App["ihris-section"]) {
              keys.App["ihris-section"] = {}
            }
            if(!keys.App["ihris-resource"]) {
              keys.App["ihris-resource"] = {}
            }
            if(sections[name].title) {
              keys.App["ihris-section"][sections[name].title] = sections[name].title
              keys.App["ihris-resource"][sections[name].title] = sections[name].title
            }
            if([sections[name].description]) {
              keys.App["ihris-section"][sections[name].description] = sections[name].description
              keys.App["ihris-resource"][sections[name].description] = sections[name].description
            }
            if (sections[name].resource) {
              if(!keys.App["ihris-secondary"]) {
                keys.App["ihris-secondary"] = {
                  table: {}
                }
              }
              if(sections[name].title) {
                keys.App["ihris-secondary"][sections[name].title] = sections[name].title
              }
              for(let action of sections[name].actions) {
                keys.App["ihris-secondary"][action.text] = action.text
              }
              for(let column of sections[name].columns) {
                keys.App["ihris-secondary"].table[column.text] = column.text
              }
            } else {
              await processFields(sections[name].elements, fhir, sections[name].order)
            }
            return resolve2()
          }))
        }
        Promise.all(promises2).then(() => {
          return resolve1()
        })
      }))
    }
    Promise.all(promises1).then(() => {
      return resolve()
    })
  })
}

function search( resource, params ) {
  return new Promise( (resolve, reject) => {
    let url = new URL(fhirAxios.baseUrl.href)
    if ( resource ) {
      url.pathname += resource
    }
    let auth = fhirAxios.__getAuth()

    //axios.get( url.href, { auth, params } ).then( (response) => {
    axios.get( url.href, { auth, params, headers: { 'Cache-Control': 'no-cache'} } ).then( (response) => {
      resolve( response.data )
    } ).catch( (err) => {
      reject( err )
    } )

  } )
}

module.exports = run