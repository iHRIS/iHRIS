const express = require('express')
const router = express.Router()
const axios = require('axios')
const URI = require('urijs');
const pluralize = require('pluralize')
const ihrissmartrequire = require('ihrissmartrequire')
ihrissmartrequire.ignore("*node_modules")
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const outcomes = ihrissmartrequire('config/operationOutcomes')
const fhirDefinition = require('../modules/fhir/fhirDefinition')
const mixin = require('../mixin/generalMixin')
const crypto = require('crypto')
const logger = require('../winston')
const winston = require("winston");
const package = require("../package.json")

const getUKey = () => {
    return Math.random().toString(36).replace(/^[^a-z]+/, '') + Math.random().toString(36).substring(2, 15)
}
const filterNavigation = (user, nav, prefix) => {
    let practRef = user.resource.extension.find((ext) => {
        return ext.url === 'http://ihris.org/fhir/StructureDefinition/ihris-practitioner-reference'
    })

    for (let key of Object.keys(nav.menu)) {
        let instance;
        if (prefix) {
            instance = prefix + "." + key;
        } else {
            instance = key;
        }
        if (nav.menu[key].menu) {
            filterNavigation(user, nav.menu[key], instance);
            if (Object.keys(nav.menu[key].menu).length === 0) {
                delete nav.menu[key];
            }
        } else if(instance === 'profile') {
            if(practRef) {
                if(!nav.menu[key].url.endsWith("/")) {
                    nav.menu[key].url += "/"
                }
                nav.menu[key].url += practRef.valueReference?.reference?.split('/').pop();
            } else {
                delete nav.menu[key];
            }
        } else {
            if (
                !user.hasPermissionByName("special", "navigation", instance) ||
                (nav.menu[key].exclusive == "true" && !user?.permissions?.special?.navigation?.id[instance])
            ) {
                delete nav.menu[key];
            }
        }
    }
};

/* GET home page. */
router.get("/site", async function (req, res) {
    const defaultUser = nconf.get("user:loggedout") || "ihris-user-loggedout";
    let site = JSON.parse(JSON.stringify(nconf.get("site") || {}));
    if(!site.auth) {
        site.auth = {}
    }
    site.version = package.version
    site.auth.signup = {...nconf.get("auth:signup")}
    site.fhirFlattener = nconf.get("fhir:flattener")
    if (nconf.getBool("security:disabled")) {
        site.security = {disabled: true};
    }
    if (req.user) {
        site.user = {};
        if (req.user.resource.id === defaultUser) {
            site.user.loggedin = false;
        } else {
            site.user.loggedin = true;
            site.user.name = req.user.resource.name[0].text;
            req.user.resource.extension.forEach((ext) => {
                if (
                    ext.url ===
                    "http://ihris.org/fhir/StructureDefinition/ihris-user-practitioner"
                ) {
                    site.user.reference = ext.valueReference.reference;
                }

                if (
                    ext.url ===
                    "http://ihris.org/fhir/StructureDefinition/ihris-assign-role"
                ) {
                    let _role = ext.valueReference.reference.split("/");
                    site.user.role = _role.pop();
                }
                if (ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-user-location" ) {
                    let _location = ext.valueReference.reference.split("/");
                    site.user.location = _location.pop();
                }

            });
            site.user.obj = JSON.parse(JSON.stringify(req.user, 0, 2))
            let passwd = site.user.obj.resource.extension.find((ext) => {
                return ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-password"
            })
            if(passwd) {
                let passwdExt = passwd.extension.findIndex((ext) => {
                    return ext.url === 'password'
                })
                if(passwdExt != -1) {
                    passwd.extension.splice(passwdExt, 1)
                }
                let saltExt = passwd.extension.findIndex((ext) => {
                    return ext.url === 'salt'
                })
                if(saltExt != -1) {
                    passwd.extension.splice(saltExt, 1)
                }
            }
            filterNavigation(req.user, site.nav);
        }
    } else {
        site.user = {loggedin: false};
        delete site.nav;
    }
    res.status(200).json(site);
});

router.get('/reload', function (req, res) {
    nconf.loadRemote().then(() => {
        res.status(200).json({ok: true, conf: nconf.get()})
    }).catch(err => {
        res.status(400).json({ok: false, err: err})
    })
})

router.get('/getParameters', (req, res) => {
    res.json(nconf.get(req.query.key))
})

const getDefinition = (resource) => {
    let structureDef = resource.split('/')
    return fhirAxios.read(structureDef[0], structureDef[1])
}
const profileResources = {}

const getLocationByRef = async (reference) => {
    return new Promise((resolve) => {
        if (reference && reference !== "") {
            let urlObj = reference.split("/");
            fhirAxios
                .read(urlObj[0], urlObj.pop())
                .then(async (resource) => {
                    resolve(resource.name);
                })
                .catch((err) => {
                    winston.error(err.message);
                    let outcome = {...outcomes.ERROR};
                    outcome.issue[0].diagnostics = err.message;
                    resolve("");
                });
        }
    });
};

const getProfileResource = (profile) => {
    return new Promise((resolve, reject) => {
        let id = profile.substring(profile.lastIndexOf('/') + 1)
        if (profileResources.hasOwnProperty(id)) {
            resolve(profileResources[id])
        } else {
            getDefinition("StructureDefinition/" + id).then((resource) => {
                if (resource.type) {
                    profileResources[id] = resource.type
                    resolve(resource.type)
                } else {
                    logger.error("Unable to get resource type from structure definition " + id)
                    reject(new Error("Unable to get resource.type for " + id))
                }
            }).catch((err) => {
                logger.error("Unable to get structure definition for " + id)
                reject(err)
            })
        }
    })
}
const getProperties = (resource) => {
    let codeSystem = resource.split('/')
    return fhirAxios.search(codeSystem[0], {_id: codeSystem[1], _elements: "url,title,property"})
}
const setupOrder = (fields, sectionOrder) => {
    for (let ord of fields) {
        let lastDot = ord.lastIndexOf('.')
        let ordId = ord.substring(0, lastDot)
        let ordField = ord.substring(lastDot + 1)
        if (!sectionOrder.hasOwnProperty(ordId)) {
            sectionOrder[ordId] = []
        }
        sectionOrder[ordId].push(ordField)
    }
}

const processUserFilter = (user, resource, regex_str, replace) => {
    let filters = user.getFilter(resource)
    try {
        let regex = new RegExp(regex_str)
        let output = filters.find(filter => regex.test(filter)).replace(regex, replace)
        return output
    } catch (err) {
        return undefined
    }
}

router.get('/page/:page/:type?', function (req, res) {
    let page = "ihris-page-" + req.params.page
    if (!req.user) {
        return res.status(401).json(outcomes.NOTLOGGEDIN)
    }
    let allowed = req.user.hasPermissionByName("read", "Basic", page)
    // Limited access to these don't make sense so not allowing it for now
    if (allowed !== true) {
        return res.status(401).json(outcomes.DENIED)
    }
    fhirAxios.read("Basic", page).then(async (resource) => {
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

        const createTemplate = async (resource, structure) => {
            logger.silly(JSON.stringify(structure, null, 2))

            let mounts = []
            try {
                let mountExts = pageDisplay.extension.filter(ext => ext.url === "mount")
                for(let mountExt of mountExts) {
                    let name = mountExt.extension.find(ext => ext.url === "name")?.valueString
                    let fromref = mountExt.extension.find(ext => ext.url === "fromref")?.valueString
                    if(name && fromref) {
                        mounts.push({
                            name,
                            fromref
                        })
                    }
                }
            } catch (error) {
                
            }
            let links = []
            try {
                let linkExts = pageDisplay.extension.filter(ext => ext.url === "link")
                for (let linkExt of linkExts) {
                    let field, text, button, icon, linkclass
                    let roles = linkExt.extension.filter(ext => ext.url === "role")
                    let tasks = linkExt.extension.filter(ext => ext.url === "task")
                    if(roles.length > 0 || tasks.length > 0) {
                        let hasRole = roles.find((role) => {
                            return req.user.roles.includes(role.valueId)
                        })
                        let hasTask
                        for(let task of tasks) {
                            await fhirAxios.read("Basic", task.valueId).then((taskResource) => {
                                let taskAttributes = taskResource?.extension?.find((ext) => {
                                    return ext.url === 'http://ihris.org/fhir/StructureDefinition/task-attributes'
                                })
                                let taskName = taskAttributes?.extension?.find((ext) => {
                                    return ext.url === 'instance'
                                })?.valueId
                                if(req.user?.permissions?.special?.special?.id[taskName] || req.user?.permissions?.special?.section?.id[taskName] || (req.user?.permissions["*"] && req.user?.permissions["*"]["*"])) {
                                    hasTask = true
                                }
                            })
                        }
                        if(!hasRole && !hasTask) {
                            continue
                        }
                    }
                    let url = linkExt.extension.find(ext => ext.url === "url").valueUrl

                    try {
                        field = linkExt.extension.find(ext => ext.url === "field").valueString
                    } catch (err) {
                    }
                    try {
                        text = linkExt.extension.find(ext => ext.url === "text").valueString
                    } catch (err) {
                    }
                    try {
                        button = linkExt.extension.find(ext => ext.url === "button").valueBoolean
                    } catch (err) {
                    }
                    try {
                        icon = linkExt.extension.find(ext => ext.url === "icon").valueString
                    } catch (err) {
                    }
                    try {
                        linkclass = linkExt.extension.find(ext => ext.url === "class").valueString
                    } catch (err) {
                    }

                    links.push({url: url, field: field, text: text, button: button, icon: icon, linkclass: linkclass})

                }

            } catch (err) {
            }


            let sections = {}
            let sectionMap = {}
            for (let section of pageSections) {
                let title, description, name, sectionEmptyDisplay, resourceExt, resource, linkfield, searchfield, searchfieldtarget
                let fields = []
                let hide = []
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
                sectionEmptyDisplay = section.extension.find(ext => ext.url === "emptyDisplay")?.valueBoolean
                try {
                    fields = section.extension.filter(ext => ext.url === "field").map(ext => ext.valueString)
                } catch (err) {
                }
                try {
                    hide = section.extension.filter(ext => ext.url === "hide").map(ext => ext.valueString)
                } catch (err) {
                }
                let allowed = req.user.hasPermissionByName("special", "section", name)
                if(!allowed) {
                    continue
                }
                try {
                    resourceExt = section.extension.find(ext => ext.url === "resource").extension

                    resource = resourceExt.find(ext => ext.url === "resource").valueReference.reference
                    if (resource) {
                        linkfield = resourceExt.find(ext => ext.url === "linkfield").valueString
                        try {
                            searchfield = resourceExt.find(ext => ext.url === "searchfield").valueString
                            searchfieldtarget = resourceExt.find(ext => ext.url === "searchfieldtarget").valueString
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
                                let roles = action.extension.filter(ext => ext.url === "role")
                                let tasks = action.extension.filter(ext => ext.url === "task")
                                if(roles.length > 0 || tasks.length > 0) {
                                    let hasRole = roles.find((role) => {
                                        return req.user.roles.includes(role.valueId)
                                    })
                                    let hasTask
                                    for(let task of tasks) {
                                        await fhirAxios.read("Basic", task.valueId).then((taskResource) => {
                                            let taskAttributes = taskResource?.extension?.find((ext) => {
                                                return ext.url === 'http://ihris.org/fhir/StructureDefinition/task-attributes'
                                            })
                                            let taskName = taskAttributes?.extension?.find((ext) => {
                                                return ext.url === 'instance'
                                            })?.valueId
                                            if(req.user?.permissions?.special?.special?.id[taskName] || req.user?.permissions?.special?.section?.id[taskName] || (req.user?.permissions["*"] && req.user?.permissions["*"]["*"])) {
                                                hasTask = true
                                            }
                                        })
                                    }
                                    if(!hasRole && !hasTask) {
                                        continue
                                    }
                                }
                                let row, condition, emptyDisplay
                                let eleClass = "primary"
                                try {
                                    row = action.extension.find(ext => ext.url === "row").valueBoolean
                                } catch (err) {
                                }
                                try {
                                    condition = action.extension.find(ext => ext.url === "condition").valueString
                                } catch (err) {
                                }
                                try {
                                    emptyDisplay = action.extension.find(ext => ext.url === "emptyDisplay").valueBoolean
                                } catch (err) {
                                }
                                try {
                                    eleClass = action.extension.find(ext => ext.url === "class").valueString
                                } catch (err) {
                                }
                                if (link && text) {
                                    actions.push({
                                        link: link, text: text, row: row,
                                        condition: condition, emptyDisplay: emptyDisplay,
                                        class: eleClass
                                    })
                                }
                            } catch (err) {
                            }
                        }

                    }

                } catch (err) {
                }

                let sectionOrder = {}
                setupOrder(fields, sectionOrder)
                for (let field of fields) {
                    sectionMap[field] = name
                }
                sections[name] = {
                    title: title,
                    description: description,
                    emptyDisplay: sectionEmptyDisplay,
                    fields: fields,
                    hide: hide,
                    order: sectionOrder,
                    resource: resource,
                    linkfield: linkfield,
                    searchfield: searchfield,
                    searchfieldtarget: searchfieldtarget,
                    columns: columns,
                    actions: actions,
                    elements: {}
                }
            }
            let sdOrder = {}
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
            let allSubFields = {}
            let allColumns = {}
            let allActions = {}
            let constraints = {}

            let vueOutput = "<template>"
            for (let fhir of structureKeys) {
                if (!sections.hasOwnProperty(fhir)) {
                    sections[fhir] = {
                        title: fhir,
                        description: "",
                        emptyDisplay: false,
                        fields: [],
                        hide: [],
                        order: {},
                        resource: undefined,
                        linkfield: undefined,
                        searchfield: undefined,
                        searchfieldtarget: undefined,
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

                vueOutput = '<' + resourceElement + ' :fhir-id="fhirId" :edit="isEdit" v-on:set-edit="setEdit($event)" profile="' + resource.url + '" :key="$route.params.page+($route.params.id || \'\')" page="' + req.params.page + '" field="' + fhir + '" title="' + sections[fhir].title + '" :constraints="constraints"'
                if (sectionKeys.length > 1) {
                    sectionMenu = sectionKeys.map(name => {
                        return {
                            name: name,
                            title: sections[name].title,
                            desc: sections[name].description,
                            secondary: !!sections[name].resource
                        }
                    })
                    vueOutput += " :section-menu='sectionMenu'"
                }
                if (links.length > 0) {
                    vueOutput += " :links='links'"
                }
                if (mounts.length > 0) {
                    vueOutput += " :mounts='mounts'"
                }
                vueOutput += '><template #default=\"slotProps\">' + "\n"
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
                const processFields = async (fields, base, order, hide) => {
                    let output = ""
                    let fieldKeys = Object.keys(fields)
                    if (order[base]) {
                        fieldKeys.sort(getSortFunc(order[base]))
                    }
                    for (let field of fieldKeys) {
                        if(fields[field].id && (hide.includes(fields[field].id))) {
                            continue
                        }
                        if (fields[field]["max"] === "0") {
                            continue
                        }
                        if (!fields[field].code) {
                            logger.info("No datatype for " + base + " " + field + " so skipping", base, field)
                            continue
                        }
                        let eleName = fhirDefinition.camelToKebab(fields[field].code)

                        if (fields[field].hasOwnProperty("targetProfile") && fields[field].targetProfile) {
                            fields[field].targetResource = await getProfileResource(fields[field].targetProfile)
                        }

                        let attrs = ["field", "sliceName", "targetProfile", "targetResource", "profile", "min", "max", "base-min",
                            "base-max", "label", "path", "binding", "calendar", "initialValue", "searchParameter", "report",
                            "reportReturnValue", "referenceDisplayPath", "initialProfile", "allowedProfiles", "pageTargetProfile"]
                        const minmax = ["Date", "DateTime", "Instant", "Time", "Decimal", "Integer", "PositiveInt",
                            "UnsignedInt", "Quantity", "Attachment"]
                        for (let mm of minmax) {
                            for (let type of ["min", "max"]) {
                                attrs.push(type + "Value" + mm)
                            }
                        }
                        let isArray = false
                        if (fields[field]["max"] !== "1") {
                            isArray = true
                            output += "<ihris-array :edit=\"isEdit\" fieldType=\"" + eleName + "\" :slotProps=\"slotProps\""
                            const arr_attrs = ["field", "label", "min", "max", "id", "path", "profile", "targetProfile", "targetResource", "sliceName"]
                            for (let attr of arr_attrs) {
                                if (fields[field].hasOwnProperty(attr)) {
                                    output += " " + attr + "=\"" + fields[field][attr] + "\""
                                }
                            }
                            output += ">\n<template #default=\"slotProps\">\n"
                        } else {
                            attrs.unshift("id")
                        }
                        output += "<fhir-" + eleName + " :slotProps=\"slotProps\" :edit=\"isEdit\""
                        let displayType, readOnlyIfSet
                        if (pageFields.hasOwnProperty(fields[field].id)) {
                            if (pageFields[fields[field].id].type) {
                                //output += " displayType=\""+ pageFields[ fields[field].id ].type +"\""
                                displayType = pageFields[fields[field].id].type
                            }
                            if (pageFields[fields[field].id].readOnlyIfSet) {
                                readOnlyIfSet = true
                            }
                        }
                        if (!readOnlyIfSet && nconf.get("defaults:fields:" + fields[field].id + ":readOnlyIfSet")) {
                            readOnlyIfSet = true
                        }
                        if (readOnlyIfSet) {
                            output += " :readOnlyIfSet=\"true\""
                        }

                        if(nconf.get("defaults:components:" + eleName + ":date-format" )){
                            output += " format=\"" + nconf.get("defaults:components:" + eleName + ":date-format") + "\""
                        }

                        if (!displayType) {
                            if (nconf.get("defaults:fields:" + fields[field].id + ":type")) {
                                displayType = nconf.get("defaults:fields:" + fields[field].id + ":type")
                            }
                        }
                        if (displayType) {
                            output += " displayType=\"" + displayType + "\""
                        }
                        if (nconf.get("defaults:fields:" + fields[field].id + ":user_filter")) {
                            let resource = fields[field].id.substring(0, fields[field].id.indexOf('.'))
                            let regex = "(.+)"
                            let replace = "$1"
                            if (nconf.get("defaults:fields:" + fields[field].id + ":user_filter:regex")) {
                                regex = nconf.get("defaults:fields:" + fields[field].id + ":user_filter:regex")
                            }
                            if (nconf.get("defaults:fields:" + fields[field].id + ":user_filter:replace")) {
                                replace = nconf.get("defaults:fields:" + fields[field].id + ":user_filter:replace")
                            }
                            if (nconf.get("defaults:fields:" + fields[field].id + ":user_filter:resource")) {
                                resource = nconf.get("defaults:fields:" + fields[field].id + ":user_filter:resource")
                            }
                            let overrideValue = processUserFilter(req.user, resource, regex, replace)
                            if (overrideValue) {
                                output += " overrideValue=\"" + overrideValue + "\""
                            }
                        }
                        if (fields[field].hasOwnProperty("constraint")) {
                            let constraintKeys = []
                            for (let constraint of fields[field].constraint) {
                                if (constraint.key && constraint.key.startsWith("ihris-")) {
                                    constraints[constraint.key] = constraint
                                    constraintKeys.push(constraint.key)
                                }
                            }
                            if (constraintKeys.length > 0) {
                                output += " constraints=\"" + constraintKeys.join(",") + "\""
                            }
                        }
                        for (let attr of attrs) {
                            if (fields[field].hasOwnProperty(attr)) {
                                if (fields[field][attr]
                                    && fields[field][attr].value && fields[field][attr].code) {
                                    output += " " + attr + "=\"" + fields[field][attr].value + fields[field][attr].code + "\""
                                } else {
                                    output += " " + attr + "=\"" + fields[field][attr] + "\""
                                }
                            } else if (nconf.get("defaults:fields:" + fields[field].id + ":" + attr)) {
                                output += " " + attr + "=\""
                                    + nconf.get("defaults:fields:" + fields[field].id + ":" + attr) + "\""
                            } else if (nconf.get("defaults:page:" + req.params.page + ":fields:" +  fields[field].id + ":" + attr)) {
                                output += " " + attr + "=\""
                                    + nconf.get("defaults:page:" + req.params.page + ":fields:" +  fields[field].id + ":" + attr) + "\""
                            } else if (nconf.get("defaults:components:" + eleName + ":" + attr)) {
                                output += " " + attr + "=\""
                                    + nconf.get("defaults:components:" + eleName + ":" + attr) + "\""
                            }
                        }

                        let subFields
                        if (eleName === "reference" && fields[field].hasOwnProperty("fields")) {
                            let refFields = fields[field].fields
                            subFields = {}
                            let subAttrs = ["id", "path", "label", "min", "max", "base-min", "base-max", "code"]
                            for (let refField of Object.keys(refFields)) {
                                subFields[refField] = {}
                                logger.silly("refLOOP", refField, refFields)
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
                        if (subFields) {
                            let subKey = getUKey()
                            allSubFields[subKey] = subFields
                            output += " :sub-fields='subFields." + subKey + "'"
                        }
                        output += ">\n"

                        if (!subFields && fields[field].hasOwnProperty("fields")) {
                            output += "<template #default=\"slotProps\">\n"
                            output += await processFields(fields[field].fields, base + "." + fields[field], order, hide)
                            output += "</template>\n"
                        }
                        output += "</fhir-" + eleName + ">\n"
                        if (isArray) {
                            output += "</template>\n</ihris-array>\n"
                        }
                    }
                    return output
                }
                vueOutput +=
                    '<div><ihris-practitioner-intro :slotProps="slotProps" :isQuestionnaire="false">\n' +
                    "</ihris-practitioner-intro></div>\n" +
                    '<div class="ihris-intro-float"></div>\n';

                for (let name of sectionKeys) {
                    if(Object.keys(sections[name].elements).length === 0 && sections[name].columns.length === 0 && sections[name].fields.length === 0) {
                        continue
                    }
                    vueOutput += "<ihris-section :slotProps=\"slotProps\" :edit=\"isEdit\" name=\"" + name + "\" title=\"" + sections[name].title + "\" description=\"" + sections[name].description + "\" :secondary=\"" + !!sections[name].resource + "\">\n<template #default=\"slotProps\">\n"
                    if (sections[name].resource) {
                        let secondary = await getDefinition(sections[name].resource)

                        if (!secondary.hasOwnProperty("snapshot")) {
                            logger.error("StructureDefinitions (", sections[name].resource, ") must be saved with a snapshot.")
                            continue
                        }
                        const secondaryStructure = fhirDefinition.parseStructureDefinition(secondary)
                        let secondaryOrder = {}
                        setupOrder(sections[name].fields, secondaryOrder)
                        let secondaryKeys = Object.keys(secondaryStructure)
                        for (let second_fhir of secondaryKeys) {
                            let sectionKey = getUKey()
                            allColumns[sectionKey] = sections[name].columns
                            allActions[sectionKey] = sections[name].actions
                            let dateFormat = (nconf.get("defaults:components:ihris-secondary:date-format")) ? '" dateFormat="' + nconf.get("defaults:components:ihris-secondary:date-format")  : ''
                            vueOutput += '<ihris-secondary :edit="isEdit" :link-id="fhirId" profile="' + secondary.url
                                + '" field="' + second_fhir
                                + '" title="' + sections[name].title
                                + dateFormat
                                + '" emptyDisplay="' + sections[name].emptyDisplay
                                + '" link-field="' + sections[name].linkfield
                                + '" search-field="' + (sections[name].searchfield || "")
                                + '" search-field-target="' + (sections[name].searchfieldtarget || "")
                                + '" :columns=\'columns.' + sectionKey
                                + '\' :actions=\'actions.' + sectionKey
                                + '\'><template #default="slotProps">' + "\n"
                            //vueOutput += await processFields( secondaryStructure[second_fhir].fields, second_fhir, secondaryOrder )
                            vueOutput += "</template></ihris-secondary>"
                        }

                    } else {
                        vueOutput += await processFields(sections[name].elements, fhir, sections[name].order, sections[name].hide)
                    }
                    vueOutput += "</template></ihris-section>\n"
                }

                vueOutput += '</template></' + resourceElement + '>' + "\n"
            }
            vueOutput += "</template>"
            logger.debug(vueOutput)
            return res.status(200).json({
                template: vueOutput, data: {
                    sectionMenu: sectionMenu,
                    subFields: allSubFields,
                    columns: allColumns,
                    actions: allActions,
                    links: links,
                    mounts: mounts,
                    constraints: constraints
                }
            })
        }

        const createSearchTemplate = async (resource, structure) => {
            logger.silly(JSON.stringify(structure, null, 2))
            let search = ['id']
            try {
                search = pageDisplay.extension.filter(ext => ext.url === "search").map(ext =>
                    ext.valueString.match(/^([^|]*)\|?([^|]*)?\|?(.*)?$/).slice(1, 4)
                )
            } catch (err) {
            }
            let filters = []
            try {
                filters = pageDisplay.extension.filter(ext => ext.url === "filter").map(ext =>
                    ext.valueString.match(/^([^|]*)\|?([^|]*)?\|?(.*)?$/).slice(1, 4)
                )
            } catch (err) {
            }
            let addLink = null
            try {
                let add = pageDisplay.extension.find(ext => ext.url === "add")
                let url = add.extension.find(ext => ext.url === "url").valueUrl
                let icon, eleClass
                try {
                    icon = add.extension.find(ext => ext.url === "icon").valueString
                } catch (err) {
                }
                try {
                    eleClass = add.extension.find(ext => ext.url === "class").valueString
                } catch (err) {
                }
                let roles = add.extension.filter(ext => ext.url === "role")
                let tasks = add.extension.filter(ext => ext.url === "task")
                let hasPermission
                if(roles.length > 0) {
                    let userRole = req.user.resource.extension.find((ext) => {
                        return ext.url === 'http://ihris.org/fhir/StructureDefinition/ihris-assign-role'
                    })
                    if(userRole) {
                        userRole = userRole.valueReference.reference.split("/")[1]
                        hasPermission = roles.find((role) => {
                            return role.valueId === userRole
                        })
                    }
                }
                if(!hasPermission && tasks.length > 0) {
                    for(let task of tasks) {
                        await fhirAxios.read("Basic", task.valueId).then((taskResource) => {
                            let taskAttributes = taskResource?.extension?.find((ext) => {
                                return ext.url === 'http://ihris.org/fhir/StructureDefinition/task-attributes'
                            })
                            let taskName = taskAttributes?.extension?.find((ext) => {
                                return ext.url === 'instance'
                            })?.valueId
                            if(req.user?.permissions?.special?.special?.id[taskName] || req.user?.permissions?.special?.section?.id[taskName] || (req.user?.permissions["*"] && req.user?.permissions["*"]["*"])) {
                                hasPermission = true
                            }
                        })
                    }
                }
                if(hasPermission || roles.length == 0) {
                    addLink = {url: url, icon: icon, class: eleClass}
                } else if(roles.length > 0 || tasks.length > 0) {
                    //hide if roles specified but user has no that role
                    addLink = {url: url, icon: icon, class: eleClass, hide: true}
                }
            } catch (err) {
            }

            logger.silly(filters)
            logger.silly(search)

            let searchElement = "ihris-search"
            if (resource.resourceType === "CodeSystem") {
                searchElement += "-code"
            }

            let searchTemplate = '<' + searchElement + ' :key="$route.params.page" page="' + req.params.page + '" label="' + (resource.title || resource.name) + '" :fields="fields" :terms="terms" resource="' + (resource.resourceType === "StructureDefinition" ? resource.type : resource.resourceType) + '" profile="' + resource.url + '"'
            if (addLink) {
                searchTemplate += " :add-link='addLink'"
            }

            if(nconf.get("defaults:components:" + searchElement + ":date-format" )){
                searchTemplate += " dateFormat=\"" + nconf.get("defaults:components:" + searchElement + ":date-format") + "\""
            }
            searchTemplate += '>' + "\n"
            for (let filter of filters) {
                searchTemplate += '<ihris-search-term v-on:termChange="searchData"'
                if (filter[1]) {
                    searchTemplate += ' label="' + filter[0] + '" expression="' + filter[1] + '"'
                } else {
                    searchTemplate += ' label="Search" expression="' + filter[0] + '"'
                }
                if (filter[2]) {
                    searchTemplate += ' binding="' + filter[2] + '"'
                }
                searchTemplate += "></ihris-search-term>\n"
            }
            searchTemplate += "</" + searchElement + ">\n"
            logger.debug(searchTemplate)


            return res.status(200).json({template: searchTemplate, data: {fields: search, addLink: addLink}})
        }


        if (pageResource.startsWith("CodeSystem")) {

            getProperties(pageResource).then((resource) => {
                if (resource.total !== 1) {
                    let outcome = {...outcomes.ERROR}
                    outcome.issue[0].diagnostics = "Unable to find codesystem: " + pageResource + "."
                    return res.status(400).json(outcome)
                }
                resource = resource.entry[0].resource
                /*
                let property = []
                if ( resource.hasOwnProperty("property") ) {
                  property = resource.property
                }
                */

                const structure = fhirDefinition.parseCodeSystem(resource)
                if (req.params.type === "search") {
                    return createSearchTemplate(resource, structure)
                } else {
                    return createTemplate(resource, structure)
                }

            }).catch(err => {
                logger.error(err.message)
                logger.error(err.stack)
                return res.status(err.response.status).json(err.response.data)
            })

        } else if (pageResource.startsWith("StructureDefinition")) {

            getDefinition(pageResource).then((resource) => {
                if (allowed !== true) {
                    // Can't think of a reason to have this level of permissions for
                    // StructureDefinitions, but just in case...
                    let objAllowed = req.user.hasPermissionByObject("read", resource)
                    if (objAllowed !== true) {
                        // But don't allow field level restrictions.  It will complicated the requirements
                        return res.status(401).json(outcomes.DENIED)
                    }
                }

                if (!resource.hasOwnProperty("snapshot")) {
                    let outcome = {...outcomes.ERROR}
                    outcome.issue[0].diagnostics = "StructureDefinitions must be saved with a snapshot."
                    return res.status(404).json(outcome)
                }

                const structure = fhirDefinition.parseStructureDefinition(resource)
                if (req.params.type === "search") {
                    return createSearchTemplate(resource, structure)
                } else {
                    return createTemplate(resource, structure)
                }

            }).catch((err) => {
                logger.error(err.message)
                logger.error(err.stack)
                //return res.status( err.response.status ).json( err.response.data )
                return res.status(500).json({error: err.message})
            })

        } else {

            let outcome = {...outcomes.ERROR}
            outcome.issue[0].diagnostics = "Unknown resource type for page: " + pageResource + "."
            return res.status(400).json(outcome)

        }

    }).catch((err) => {
        logger.error(err.message)
        logger.error(err.stack)
        return res.status(err.response.status).json(err.response.data)
    })

})

router.get('/questionnaire/:questionnaire/:page', async function (req, res) {
    let page = "ihris-page-" + req.params.page
    if (!req.user) {
        return res.status(401).json(outcomes.NOTLOGGEDIN)
    }
    let allowed = req.user.hasPermissionByName("read", "Questionnaire", req.params.questionnaire)
    // Limited access to these don't make sense so not allowing it for now
    if (allowed !== true) {
        return res.status(401).json(outcomes.DENIED)
    }
    let primaryResourceType = ""
    let primaryResourceProfile = ""
    let primaryResourceDef = ""
    let sections = {}
    let pageFields = {}
    function getDisplayCondition(qItem) {
        let displayCondition = ''
        if(qItem.enableWhen) {
            for(let when of qItem.enableWhen) {
                const condKeys = Object.keys(when)
                let answKeyInd = condKeys.findIndex((cond) => {
                    return cond.startsWith('answer')
                })
                if(displayCondition) {
                    displayCondition += '+='
                }
                let answer = ""
                if(condKeys[answKeyInd] === "answerReference") {
                    answer = when[condKeys[answKeyInd]].reference
                } else if(condKeys[answKeyInd] === "answerCoding") {
                    answer = when[condKeys[answKeyInd]].system + "#" + when[condKeys[answKeyInd]].code
                } else {
                    answer = when[condKeys[answKeyInd]]
                }
                displayCondition += when.question + '|' + when.operator + '|' + answer
            }
        }
        return displayCondition
    }
    function getContentTypes(qItem) {
        let contentTypes = []
        if(qItem.code) {
            qItem.code.forEach(codeItem => {
                if (codeItem.system === "attachment-format") {
                    contentTypes.push(codeItem.code);
                }
              });
              return contentTypes;
        }
    }
    await fhirAxios.read("Basic", page).then(async(resource) => {
        let pageDisplay = resource.extension.find(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-page-display")

        let pageResource = pageDisplay.extension.find(ext => ext.url === "resource").valueReference.reference
        primaryResourceDef = pageResource
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
        if (pageResource.startsWith("CodeSystem")) {

            await getProperties(pageResource).then((resource) => {
                if (resource.total !== 1) {
                    let outcome = {...outcomes.ERROR}
                    outcome.issue[0].diagnostics = "Unable to find codesystem: " + pageResource + "."
                    return res.status(400).json(outcome)
                }
                resource = resource.entry[0].resource

                const structure = fhirDefinition.parseCodeSystem(resource)
                let structureKeys = Object.keys(structure)
                primaryResourceType = structureKeys[0]
                primaryResourceProfile = resource.url
            }).catch(err => {
                logger.error(err.message)
                logger.error(err.stack)
                return res.status(err.response.status).json(err.response.data)
            })

        } else if (pageResource.startsWith("StructureDefinition")) {
            await getDefinition(pageResource).then((resource) => {
                if (allowed !== true) {
                    // Can't think of a reason to have this level of permissions for
                    // StructureDefinitions, but just in case...
                    let objAllowed = req.user.hasPermissionByObject("read", resource)
                    if (objAllowed !== true) {
                        // But don't allow field level restrictions.  It will complicated the requirements
                        return res.status(401).json(outcomes.DENIED)
                    }
                }

                if (!resource.hasOwnProperty("snapshot")) {
                    let outcome = {...outcomes.ERROR}
                    outcome.issue[0].diagnostics = "StructureDefinitions must be saved with a snapshot."
                    return res.status(404).json(outcome)
                }
                const structure = fhirDefinition.parseStructureDefinition(resource)
                let structureKeys = Object.keys(structure)
                primaryResourceType = structureKeys[0]
                primaryResourceProfile = resource.url

            }).catch((err) => {
                logger.error(err.message)
                logger.error(err.stack)
                //return res.status( err.response.status ).json( err.response.data )
                return res.status(500).json({error: err.message})
            })

        } else {

            let outcome = {...outcomes.ERROR}
            outcome.issue[0].diagnostics = "Unknown resource type for page: " + pageResource + "."
            return res.status(400).json(outcome)

        }
        let pageSections = resource.extension.filter(ext => ext.url === "http://ihris.org/fhir/StructureDefinition/ihris-page-section")
        for (let section of pageSections) {
            let resourceExt, resource, linkfield, searchfield, searchfieldtarget
            let name = section.extension.find(ext => ext.url === "name")?.valueString
            try {
                resourceExt = section.extension.find(ext => ext.url === "resource").extension

                resource = resourceExt.find(ext => ext.url === "resource").valueReference.reference
                if (resource) {
                    linkfield = resourceExt.find(ext => ext.url === "linkfield").valueString
                    try {
                        searchfield = resourceExt.find(ext => ext.url === "searchfield").valueString
                        searchfieldtarget = resourceExt.find(ext => ext.url === "searchfieldtarget").valueString
                    } catch (err) {
                    }
                }

            } catch (err) {
            }

            sections[name] = {
                resource: resource,
                linkfield: linkfield,
                searchfield: searchfield,
                searchfieldtarget: searchfieldtarget
            }
        }
    })
    fhirAxios.read("Questionnaire", req.params.questionnaire).then(async (resource) => {
        let vueOutput = '<ihris-questionnaire :fhir-id="fhirId" field="' + primaryResourceType + '" profile="' + primaryResourceProfile + '" :edit=\"isEdit\" :view-page="viewPage" :constraints="constraints" url="' + resource.url + '" id="' + resource.id
            + '" title="' + resource.title
            + '" description="' + resource.description + '" purpose="' + resource.purpose
            + '"__SECTIONMENU__>' + "\n<template #default=\"slotProps\">\n"


        let sectionMenu = []
        let templateData = {sectionMenu: {}, hidden: {}, initials: {}, constraints: {}}

        const processConstraints = (extension, fieldDef) => {
            let constraintKeys = []
            if (fieldDef && fieldDef.hasOwnProperty("constraint")) {
                for (let constraint of fieldDef.constraint) {
                    if (constraint.key && constraint.key.startsWith('ihris-')) {
                        templateData.constraints[constraint.key] = constraint
                        constraintKeys.push(constraint.key)
                    }
                }
            }
            if (extension) {
                let itemConstraints = extension.filter(ext => ext.url === "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint")
                for (let itemCon of itemConstraints) {
                    let constraint = {}
                    try {
                        let key = itemCon.extension.find(ext => ext.url === "key").valueId
                        let severity = itemCon.extension.find(ext => ext.url === "severity").valueCode
                        let expression = itemCon.extension.find(ext => ext.url === "expression").valueString
                        let human = itemCon.extension.find(ext => ext.url === "human").valueString
                        if (key.startsWith("ihris-")) {
                            constraint = {key, severity, expression, human}
                            templateData.constraints[constraint.key] = constraint
                            constraintKeys.push(constraint.key)
                        }
                    } catch (err) {
                        logger.error("Failed to get constraints on " + item.linkId)
                        logger.error(err.message)
                    }
                }
            }
            if (constraintKeys.length > 0) {
                return constraintKeys.join(",")
            } else {
                return null
            }
        }
        const processQuestionnaireItems = async (items, group) => {
            let vueOutput = ""
            for (let item of items) {
                let displayCondition = getDisplayCondition(item)
                let contentTypes = getContentTypes(item)
                let enableBehavior = item.enableBehavior
                let displayType
                if (item.linkId.includes('#') && item.type !== 'group') {
                    let linkDetails = item.linkId.split('#')
                    item.linkId = linkDetails[0]
                    displayType = linkDetails[1]
                }
                let limit = ""
                let isLimitSet = false
                if(item.type === 'group' && item.linkId && item.linkId.includes("#") && item.linkId.split("#").length === 2) {
                    limit = item.linkId.split("#")[1]
                    item.linkId = item.linkId.split("#")[0]
                }
                let itemType = fhirDefinition.camelToKebab(item.type)
                if(itemType === 'text') {
                    displayType = 'text'
                    itemType = 'string'
                }
                if (item.repeats && !item.readOnly) {
                    let fieldPath = item.definition.split("#")[1]
                    let fieldPathSlices = fieldPath.split(".")
                    let field = fieldPathSlices[fieldPathSlices.length-1]
                    let definition = item.definition
                    if(field.startsWith("value[x]:value")) {
                        definition = item.definition.replace("." + field, "")
                    }
                    let fieldDef = await fhirDefinition.getFieldDefinition(definition)
                    let extension = fieldDef.type.find((type) => {
                        return type.code === 'Extension'
                    })
                    vueOutput += `<ihris-array limit="${limit}" field="${field}" fieldType="${itemType}" :edit="isEdit" :slotProps="slotProps" path="${item.linkId}" 
                    label="${item.text}" max="*" min="${(item.required ? "1" : "0")}"`
                    if(extension) {
                        let profile
                        if(extension.profile && extension.profile.length > 0) {
                            profile = extension.profile[0]
                        } else {
                            profile = fieldDef.sliceName
                        }
                        vueOutput += ' profile="' + profile + '"'
                        vueOutput += ' sliceName="' + fieldDef.sliceName + '"'
                    }
                    vueOutput += `><template #default="slotProps">\n`
                    isLimitSet = true
                }
                if (itemType === "group") {
                    let label = item.text.split('|', 2)
                    vueOutput += '<ihris-questionnaire-group :slotProps="slotProps" :edit=\"isEdit\" path="' + item.linkId + '" label="' + label[0] + '" displayCondition="' + displayCondition + '"'
                    if(item.enableBehavior) {
                        vueOutput += ' enableBehavior="' + item.enableBehavior + '"'
                    }
                    if(!isLimitSet) {
                        vueOutput += ' limit="' + limit + '"'
                        isLimitSet = true
                    }
                    if (label.length === 2) {
                        vueOutput += ' description="' + label[1] + '"'
                    }
                    if (item.extension) {
                        let constraintList = processConstraints(item.extension)
                        if (constraintList) {
                            vueOutput += ' constraints="' + constraintList + '"'
                        }
                    }
                    let fieldDef = await fhirDefinition.getFieldDefinition(item.definition)
                    if(item.definition.includes("#")) {
                        let extension = fieldDef.type.find((type) => {
                            return type.code === 'Extension'
                        })
                        if(extension && extension.profile && extension.profile.length > 0) {
                            let idSlices = fieldDef.id.split(".")
                            let field
                            for(let slice of idSlices) {
                                if(slice.includes("extension:")) {
                                    field = slice
                                }
                            }
                            vueOutput += ' profile="' + extension.profile[0] + '"'
                            vueOutput += ' sliceName="' + fieldDef.sliceName + '"'
                            vueOutput += ' field="' + field + '"'
                        } else {
                            let fieldDefSlices = fieldDef.id.split(".")
                            vueOutput += ` field="${fieldDefSlices[fieldDefSlices.length-1]}"`
                        }
                    }
                    vueOutput += ">\n\n<template #default=\"slotProps\">\n"
                    let fieldType = fieldDef.type.find((type) => {
                        return type.code
                    })?.code
                    let fieldPath = item.definition.split("#")[1]
                    let fieldPathSlices = fieldPath.split(".")
                    let itemFieldPath = fieldPathSlices.pop()
                    if(fieldType === 'HumanName') {
                        vueOutput += `<fhir-human-name :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    } else if(fieldType === 'CodeableConcept') {
                        vueOutput += `<fhir-codeable-concept :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}" id="${fieldDef.id}" binding="${fieldDef.binding.valueSet}">
                        \n<template #default="slotProps">`
                        itemFieldPath = 'coding'
                    } else if(fieldType === 'ContactPoint') {
                        vueOutput += `<fhir-contact-point :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${item.linkId}">
                        \n<template #default="slotProps">`
                    } else if(fieldType === 'Period') {
                        vueOutput += `<fhir-period :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    } else if(fieldType === 'Address') {
                        vueOutput += `<fhir-address :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    } else if(fieldType === 'BackboneElement') {
                        vueOutput += `<fhir-backbone-element :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    } else if(fieldType === 'Identifier') {
                        vueOutput += `<fhir-identifier :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    }
                    vueOutput += await processQuestionnaireItems(item.item, fieldPath)
                    if(fieldType === 'CodeableConcept') {
                        vueOutput += "\n</template></fhir-codeable-concept>\n"
                    } else if(fieldType === 'HumanName') {
                        vueOutput += "\n</template></fhir-human-name>\n"
                    } else if(fieldType === 'ContactPoint') {
                        vueOutput += "\n</template></fhir-contact-point>\n"
                    } else if(fieldType === 'Period') {
                        vueOutput += "\n</template></fhir-period>\n"
                    } else if(fieldType === 'Address') {
                        vueOutput += "\n</template></fhir-address>\n"
                    } else if(fieldType === 'BackboneElement') {
                        vueOutput += "\n</template></fhir-backbone-element>\n"
                    } else if(fieldType === 'Identifier') {
                        vueOutput += "\n</template></fhir-identifier>\n"
                    }
                    vueOutput += "</template>\n</ihris-questionnaire-group>\n"
                } else if(itemType === 'display') {
                    vueOutput += "<ihris-display text='" + item.text + "'"
                    if(displayType) {
                        vueOutput +=  " type='" + displayType + "'"
                    }
                    vueOutput += "/>"
                } else if (item.readOnly) {
                    vueOutput += "<ihris-hidden path=\"" + item.linkId + "\" label=\""
                        + item.text + "\""
                    if (item.answerOption[0].initialSelected) {
                        let answerTypes = Object.keys(item.answerOption[0])
                        for (let answerType of answerTypes) {
                            if (answerType.startsWith("value")) {
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
                    let fieldPath = item.definition.split("#")[1]
                    let baseProfile = item.definition.split("#")[0]
                    let readOnlyIfSet = false
                    if(pageFields[fieldPath]) {
                        readOnlyIfSet = pageFields[fieldPath].readOnlyIfSet
                    }
                    let idSlices = fieldPath.split(".")
                    let itemFieldPath = idSlices.pop()
                    let fieldDef = await fhirDefinition.getFieldDefinition(item.definition)
                    let fieldType = fieldDef.type.find((type) => {
                        return type.code
                    })?.code
                    if(fieldPath.includes("extension:")) {
                        let fieldDef = await fhirDefinition.getFieldDefinition(baseProfile + '#' + idSlices.join("."))
                        vueOutput += "<fhir-extension :slotProps=\"slotProps\" id=\"" + idSlices.join(".") + "\" field=\"" + idSlices[idSlices.length-1] + "\""
                        let extension = fieldDef.type.find((type) => {
                            return type.code === 'Extension'
                        })
                        vueOutput += ' sliceName="' + fieldDef.sliceName + '"'
                        if(extension && extension.profile && extension.profile.length > 0) {
                            vueOutput += ' profile="' + extension.profile[0] + '"'
                        }
                        vueOutput += "><template #default=\"slotProps\">\n\n"
                    } else if(fieldType === 'CodeableConcept') {
                        vueOutput += `<fhir-codeable-concept :slotProps="slotProps" id="${fieldDef.id}" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}" binding="${fieldDef.binding.valueSet}">
                        \n<template #default="slotProps">`
                        itemFieldPath = 'coding'
                    } else if(fieldType === 'HumanName') {
                        vueOutput += `<fhir-human-name :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    } else if(fieldType === 'ContactPoint') {
                        vueOutput += `<fhir-contact-point :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    } else if(fieldType === 'Period') {
                        vueOutput += `<fhir-period :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    } else if(fieldType === 'Address') {
                        vueOutput += `<fhir-address :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    } else if(fieldType === 'BackboneElement') {
                        vueOutput += `<fhir-backbone-element :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    } else if(fieldType === 'Identifier') {
                        vueOutput += `<fhir-identifier :slotProps="slotProps" field="${itemFieldPath}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                        \n<template #default="slotProps">`
                    } else {
                        if(!fieldPath.includes("extension:") && idSlices.length > 1) {
                            let parentPath = idSlices.join(".")
                            if(group !== parentPath) {
                                let fieldDef = await fhirDefinition.getFieldDefinition(baseProfile + '#' + parentPath)
                                let fieldType = fieldDef.type.find((type) => {
                                    return type.code
                                })?.code
                                if(fieldType) {
                                    let eleName = fhirDefinition.camelToKebab(fieldType)
                                    let attrs = ["field", "sliceName", "targetProfile", "targetResource", "profile", "min", "max", "base-min",
                                        "base-max", "label", "path", "binding", "calendar", "initialValue", "searchParameter"]
                                    const minmax = ["Date", "DateTime", "Instant", "Time", "Decimal", "Integer", "PositiveInt", "UnsignedInt", "Quantity","Attachment"]
                                    for (let mm of minmax) {
                                        for (let type of ["min", "max"]) {
                                            attrs.push(type + "Value" + mm)
                                        }
                                    }
                                    vueOutput += `<fhir-${eleName} sliceName="${idSlices[idSlices.length-1]}" :slotProps="slotProps" field="${idSlices[idSlices.length-1]}" min="${fieldDef.min}" max="${fieldDef.max}" base-min="${fieldDef.base.min}" base-max="${fieldDef.base.max}" label="${fieldDef.label}" path="${fieldDef.path}">
                                    \n<template #default="slotProps">`
                                }
                            }
                        }
                    }
                    vueOutput += "<fhir-" + itemType + " field=\"" + itemFieldPath + "\"" + " :slotProps=\"slotProps\" :edit=\"isEdit\" path=\"" + item.linkId + "\"" + "displayCondition=\"" + displayCondition + "\""
                    if(enableBehavior) {
                        vueOutput += ' enableBehavior="' + enableBehavior + '"'
                    }
                    //if(contentTypes.length > 0) {
                    if(contentTypes) {
                        vueOutput += ' contentTypes="' + contentTypes.join(",") + '"'
                    }
                    if(item.initial && item.initial.length) {
                        let answVal = Object.keys(item.initial[0])[0]
                        if(answVal) {
                            let answerKey = getUKey()
                            templateData.initials[answerKey] = item.initial[0][answVal]
                            vueOutput += " :initial=\"initials." + answerKey + "\""
                        }
                    }
                    if(readOnlyIfSet) {
                        vueOutput += " :readOnlyIfSet=\"true\""
                    }
                    let field
                    const minmax = ["Date", "DateTime", "Instant", "Time", "Decimal", "Integer", "PositiveInt",
                        "UnsignedInt", "Quantity", "Attachment"]
                    if (item.definition) {
                        field = await fhirDefinition.getFieldDefinition(item.definition)
                        vueOutput += " id=\"" + field.id + "\""
                        vueOutput += " definition=\"" + item.definition + "\""
                        if (itemType === "reference" && field && field.type && field.type[0] && field.type[0].targetProfile) {
                            let targetProfile = field.type[0].targetProfile.join(",")
                            vueOutput += " targetProfile=\"" + targetProfile + "\""
                            let targetResources = []
                            for(let prof of field.type[0].targetProfile) {
                                let targetResource = await getProfileResource(prof)
                                targetResources.push(targetResource)
                            }
                            targetResources = targetResources.join(",")
                            vueOutput += " targetResource=\"" + targetResources + "\""
                        }
                        for (let mm of minmax) {
                            for (let type of ["min", "max"]) {
                                let attr = type + "Value" + mm
                                if (field.hasOwnProperty(attr)) {
                                    if (field[attr]
                                        && field[attr].value && field[attr].code) {
                                        vueOutput += " " + attr + "=\"" + field[attr].value + field[attr].code + "\""
                                    } else {
                                        vueOutput += " " + attr + "=\"" + field[attr] + "\""
                                    }
                                } else if (nconf.get("defaults:components:" + itemType + ":" + attr)) {
                                    vueOutput += " " + attr + "=\""
                                        + nconf.get("defaults:components:" + itemType + ":" + attr) + "\""
                                }
                            }
                        }

                        if(nconf.get("defaults:components:" + itemType + ":date-format" )){
                            vueOutput += " format=\"" + nconf.get("defaults:components:" + itemType + ":date-format") + "\""
                        }

                        if (!displayType) {
                            if (nconf.get("defaults:fields:" + field.id + ":type")) {
                                displayType = nconf.get("defaults:fields:" + field.id + ":type")
                            }
                        }


                        if (nconf.get("defaults:fields:" + field.id + ":user_filter")) {
                            let resource = field.id.substring(0, field.id.indexOf('.'))
                            let regex = "(.+)"
                            let replace = "$1"
                            if (nconf.get("defaults:fields:" + field.id + ":user_filter:regex")) {
                                regex = nconf.get("defaults:fields:" + field.id + ":user_filter:regex")
                            }
                            if (nconf.get("defaults:fields:" + field.id + ":user_filter:replace")) {
                                replace = nconf.get("defaults:fields:" + field.id + ":user_filter:replace")
                            }
                            if (nconf.get("defaults:fields:" + field.id + ":user_filter:resource")) {
                                resource = nconf.get("defaults:fields:" + field.id + ":user_filter:resource")
                            }
                            let overrideValue = processUserFilter(req.user, resource, regex, replace)
                            if (overrideValue) {
                                vueOutput += " overrideValue=\"" + overrideValue + "\""
                            }
                        }
                        const field_attrs = ["initialValue", "report", "reportReturnValue", "referenceDisplayPath", "searchParameter", "initialProfile", "allowedProfiles", "pageTargetProfile"]
                        for (let attr of field_attrs) {
                            if (nconf.get("defaults:fields:" + field.id + ":" + attr)) {
                                vueOutput += " " + attr + "=\""
                                    + nconf.get("defaults:fields:" + field.id + ":" + attr) + "\""
                            } else if (nconf.get("defaults:page:" + req.params.page + ":fields:" + field.id + ":" + attr)) {
                                vueOutput += " " + attr + "=\""
                                    + nconf.get("defaults:page:" + req.params.page + ":fields:" + field.id + ":" + attr) + "\""
                            }
                        }

                    } else {
                        for (let mm of minmax) {
                            for (let type of ["min", "max"]) {
                                let attr = type + "Value" + mm
                                if (nconf.get("defaults:components:" + itemType + ":" + attr)) {
                                    vueOutput += " " + attr + "=\""
                                        + nconf.get("defaults:components:" + itemType + ":" + attr) + "\""
                                }
                            }
                        }
                    }
                    const def_attrs = ["calendar"]
                    for (let attr of def_attrs) {
                        if (nconf.get("defaults:fields:" + field.id + ":" + attr)) {
                            vueOutput += " " + attr + "=\""
                                + nconf.get("defaults:fields:" + field.id + ":" + attr) + "\""
                        } else if (nconf.get("defaults:components:" + itemType + ":" + attr)) {
                            vueOutput += " " + attr + "=\""
                                + nconf.get("defaults:components:" + itemType + ":" + attr) + "\""
                        }
                    }

                    if (item.extension || (field && field.hasOwnProperty("constraint"))) {
                        let constraintList = processConstraints(item.extension, field)
                        if (constraintList) {
                            vueOutput += ' constraints="' + constraintList + '"'
                        }
                    }

                    if (item.hasOwnProperty("text")) {
                        vueOutput += " label=\"" + item.text + "\""
                    }
                    if (item.hasOwnProperty("answerValueSet")) {
                        vueOutput += " binding=\"" + item.answerValueSet + "\""
                    }
                    if (displayType) {
                        vueOutput += " displayType=\"" + displayType + "\""
                    }
                    if (item.required) {
                        vueOutput += ' min="1"'
                    } else {
                        vueOutput += ' min="0"'
                    }
                    if (item.repeats) {
                        vueOutput += ' max="*"'
                    } else {
                        vueOutput += ' max="1"'
                    }
                    /*
                    let attrs = [ "required" ]
                    for( let attr of attrs ) {
                      if ( item.hasOwnProperty(attr) ) {
                        vueOutput += " " + attr + "=\""+ item[attr] + "\""
                      }
                    }
                    */
                    vueOutput += "></fhir-" + itemType + ">\n"
                    if(fieldPath.includes("extension:")) {
                        vueOutput += "\n</template></fhir-extension>\n"
                    } else if(fieldType === 'CodeableConcept') {
                        vueOutput += "\n</template></fhir-codeable-concept>\n"
                    } else if(fieldType === 'HumanName') {
                        vueOutput += "\n</template></fhir-human-name>\n"
                    } else if(fieldType === 'ContactPoint') {
                        vueOutput += "\n</template></fhir-contact-point>\n"
                    } else if(fieldType === 'Period') {
                        vueOutput += "\n</template></fhir-period>\n"
                    } else if(fieldType === 'Address') {
                        vueOutput += "\n</template></fhir-address>\n"
                    } else if(fieldType === 'BackboneElement') {
                        vueOutput += "\n</template></fhir-backbone-element>\n"
                    } else if(fieldType === 'Identifier') {
                        vueOutput += "\n</template></fhir-identifier>\n"
                    } else {
                        if(!fieldPath.includes("extension:") && idSlices.length > 1) {
                            let parentPath = idSlices.join(".")
                            if(group !== parentPath) {
                                let fieldDef = await fhirDefinition.getFieldDefinition(baseProfile + '#' + parentPath)
                                let fieldType = fieldDef.type.find((type) => {
                                    return type.code
                                })?.code
                                if(fieldType) {
                                    let eleName = fhirDefinition.camelToKebab(fieldType)
                                    vueOutput += `\n</template></fhir-${eleName}>\n`
                                }
                            }
                        }
                    }

                }
                if (item.repeats && !item.readOnly) {
                    vueOutput += "</template></ihris-array>\n"
                }
            }
            return vueOutput
        }

        for (let item of resource.item) {
            if (item.type === "group") {
                let displayCondition = getDisplayCondition(item)
                let md5sum = crypto.createHash('md5')
                md5sum.update(item.text)
                md5sum.update(Math.random().toString(36).substring(2))
                let sectionId = md5sum.digest('hex')
                let limit = ""
                if(item.definition && item.definition.includes("#") && item.definition.split("#").length === 3) {
                    limit = item.definition.split("#")[2]
                }
                let label = item.text.split('|', 2)
                vueOutput += '<ihris-questionnaire-section :slotProps="slotProps" id="' + sectionId + '" path="' + item.linkId + '" label="' + label[0] + '" displayCondition="' + displayCondition + '"'
                if(item.enableBehavior) {
                    vueOutput += ' enableBehavior="' + item.enableBehavior + '"'
                }
                if (label.length === 2) {
                    vueOutput += ' description="' + label[1] + '"'
                }
                if (limit) {
                    vueOutput += ' limit="' + limit + '"'
                }
                //handle editing of secondary resources
                if(!item.definition.includes("#")) {
                    let thisdef = item.definition.split("/")
                    thisdef = "StructureDefinition/" + thisdef[thisdef.length-1]
                    if(thisdef !== primaryResourceDef) {
                        let section = {}
                        for(let sect in sections) {
                            if(sections[sect].resource && sections[sect].resource === thisdef) {
                                section = sections[sect]
                                break
                            }
                        }
                        if(section.resource) {
                            let secondary = await getDefinition(section.resource)
                            const secondaryStructure = fhirDefinition.parseStructureDefinition(secondary)
                            let secondaryKeys = Object.keys(secondaryStructure)
                            vueOutput += ' profile="' + secondary.url + '"'
                            vueOutput += ' field="' + secondaryKeys[0] + '"'
                            vueOutput += ' link-field="' + section.linkfield + '"'
                            vueOutput += ' search-field="' + section.searchfield + '"'
                            vueOutput += ' search-field-target="' + section.searchfieldtarget + '"'
                            vueOutput += ' :link-id="fhirId"'
                        }
                    }
                }
                let sectionPath = ""
                if(item.definition.includes("#")) {
                    sectionPath = item.definition.split("#")[1]
                    let fieldDef = await fhirDefinition.getFieldDefinition(item.definition)
                    let extension = fieldDef.type.find((type) => {
                        return type.code === 'Extension'
                    })
                    if(extension && extension.profile && extension.profile.length > 0) {
                        let idSlices = fieldDef.id.split(".")
                        let field
                        for(let slice of idSlices) {
                            if(slice.includes("extension:")) {
                                field = slice
                            }
                        }
                        vueOutput += ' profile="' + extension.profile[0] + '"'
                        vueOutput += ' sliceName="' + fieldDef.sliceName + '"'
                        vueOutput += ' field="' + field + '"'
                    }
                }
                if (item.extension) {
                    let constraintList = processConstraints(item.extension)
                    if (constraintList) {
                        vueOutput += ' constraints="' + constraintList + '"'
                    }
                }
                sectionMenu.push({title: label[0], desc: label[1] || "", id: sectionId})
                vueOutput += ">\n<template #default=\"slotProps\">\n"
                vueOutput += await processQuestionnaireItems(item.item, sectionPath)
                vueOutput += "</template></ihris-questionnaire-section>\n"
            } else {
                logger.warn("Invalid entry for questionnaire.  All top level items must be type group.")
            }
        }

        if (sectionMenu.length < 2) {
            vueOutput = vueOutput.replace("__SECTIONMENU__", "")
        } else {
            vueOutput = vueOutput.replace("__SECTIONMENU__", " :section-menu='sectionMenu'")
            templateData.sectionMenu = sectionMenu
        }
        vueOutput += "</template></ihris-questionnaire>\n"
        logger.debug(vueOutput)
        return res.status(200).json({template: vueOutput, data: templateData})

    }).catch((err) => {
        logger.error(err.message)
        logger.error(err.stack)
        let outcome = {...outcomes.ERROR}
        outcome.issue[0].diagnostics = "Unable to read questionnaire: " + req.params.questionnaire + "."
        return res.status(400).json(outcome)
        //return res.status( err.response.status ).json( err.response.data )
    })

})

router.get('/report/es/:report', (req, res) => {
    let report = req.params.report
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
            displayCheckbox: false,
            locationBasedConstraint: false
        }
        for (let extension of resource.extension) {
            let reportElements = extension.extension.filter((ext) => {
                if (extension.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails' && ext.url === 'label') {
                    reportName = ext.valueString
                }
                if (extension.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails' && ext.url === 'name') {
                    indexName = ext.valueString
                }
                if (extension.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails' && ext.url === 'displayCheckbox') {
                    reportData.displayCheckbox = ext.valueBoolean
                }
                if (extension.url === 'http://ihris.org/fhir/StructureDefinition/iHRISReportDetails' && ext.url === 'locationBasedConstraint') {
                    reportData.locationBasedConstraint = ext.valueBoolean
                }
                return ext.url === "http://ihris.org/fhir/StructureDefinition/iHRISReportElement"
            })
            for (let element of reportElements) {
                let displayName, esField, fieldOrder
                let label = element.extension.find((ext) => {
                    return ext.url === 'name'
                })
                let type = element.extension.find((ext) => {
                    return ext.url === 'type'
                })
                let display = element.extension.find((ext) => {
                    return ext.url === 'display'
                })
                let order = element.extension.find((ext) => {
                    return ext.url === 'order'
                })
                if (!display) {
                    continue;
                }
                let filter = element.extension.find((ext) => {
                    return ext.url === 'filter' && ext.valueBoolean === true
                })
                if (filter) {
                    let dropDownFilter = element.extension.find((ext) => {
                        return ext.url === 'dropDownFilter' && ext.valueBoolean === true
                    })
                    let isDropDown = false
                    if (dropDownFilter) {
                        isDropDown = true
                    }
                    let filterParams = {
                        field: label.valueString,
                        display: display.valueString,
                        isDropDown: isDropDown
                    }
                    if(nconf.get("fhir:flattener") === "fhir2sql") {
                        filterParams.field = mixin.formatSQLColumn(filterParams.field)
                    }
                    if(type) {
                        filterParams.dataType = type.valueString
                    }
                    reportData.filters.push(filterParams)
                }
                esField = label.valueString
                if(nconf.get("fhir:flattener") === "fhir2sql") {
                    esField = mixin.formatSQLColumn(label.valueString)
                }
                displayName = display.valueString
                if(order) {
                    fieldOrder = order.valueInteger
                }
                reportData.fieldsDetails.push([displayName, esField, fieldOrder])
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
        if(nconf.get("fhir:flattener") !== "fhir2sql") {
            await axios(options).then((mappings) => {
                reportData.mappings = mappings.data[indexName]
                for (let index in reportData.filters) {
                    let field = reportData.filters[index].field
                    if (!mappings.data[indexName].mappings.properties[field]) {
                        logger.error('Field ' + field + 'not found on elasticsearch mapping')
                        continue
                    }
                    let dataType = mappings.data[indexName].mappings.properties[field].type
                    if(!reportData.filters[index].dataType) {
                        reportData.filters[index].dataType = dataType
                    }
                }
            }).catch((err) => {
                logger.error(err.message);
                logger.error(err.stack);
                return res.status(500).send()
            })
        }
        reportData.indexName = indexName
        let reportComp = "ihris-es-report"
        let searchTermComp = "ihris-es-search-term"
        if(nconf.get("fhir:flattener") === "fhir2sql") {
            reportComp = "ihris-sql-report"
            searchTermComp = "ihris-sql-search-term"
            reportData.indexName = pluralize(indexName)
        }
        let template = `<${reportComp} @rowSelected='rowSelected' :key="$route.params.report" page="${req.params.report}" label="${reportName}" :reportData="reportData" :terms="terms" :termsConditions="termsConditions" :hideCheckboxes="hideCheckboxes" :hideLabel="hideLabel" :hideExport="hideExport" :hideReportCustomization="hideReportCustomization" :disableOpenResourcePage="disableOpenResourcePage">`
        for (let filter of reportData.filters) {
            if (filter.isDropDown) {
                template += `<${searchTermComp} v-on:termChange="searchData" label="${filter.display}" expression="${filter.field}" isDropDown="${filter.isDropDown}" :reportData="reportData" :hideFilters="hideFilters"></${searchTermComp}>\n`
            } else {
                template += `<${searchTermComp} v-on:termChange="searchData" label="${filter.display}" expression="${filter.field}" :reportData="reportData" :hideFilters="hideFilters"></${searchTermComp}>\n`
            }
        }
        template += `</${reportComp}>`
        return res.status(200).json({
            reportTemplate: template,
            reportData: reportData
        })
    }).catch((err) => {
        console.log(err);
        return res.status(404).send()
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
            if (resource.link && Array.isArray(resource.link)) {
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
                if (thisFilter.length > 0) {
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
router.get('/app', (req, res) => {
    logger.info('Received a request to get general configuration');
    const otherConfig = {
        idp: nconf.get('app:idp'),
        keycloak: {
            baseURL: nconf.get('keycloak:baseURL'),
            realm: nconf.get('keycloak:realm'),
            UIClientId: nconf.get('keycloak:UIClientId'),
        },
    };
    res.status(200).json(otherConfig);
});

router.get("/getUserManual", (req, res) => {
    let p = path.join(
      __dirname,
      "../",
      "file/iHRIS User Manual.pdf"
    );
    res.download(p);
  });

module.exports = router;