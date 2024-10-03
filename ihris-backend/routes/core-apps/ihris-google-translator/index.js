const express = require('express')
const router = express.Router()
const translate = require('@vitalets/google-translate-api');
const ihrissmartrequire = require("ihrissmartrequire")
const outcomes = ihrissmartrequire('config/operationOutcomes')
const async = require("async")
const fs = require("fs")
const nconf = ihrissmartrequire('modules/config')
const fhirAxios = nconf.fhirAxios

const extractTexts = require("./extractTexts")
const logger = require("../../../winston");

const onprogressTranslations = []

router.get("/languages", (req, res) => {
  let languages = []
  for(let key in translate.languages) {
    if(typeof translate.languages[key] === "string") {
      languages.push({
        locale: key,
        name: translate.languages[key]
      })
    }
  }
  return res.status(200).json(languages)
})

router.post("/addLanguage/:locale", async(req, res) => {
  if(req.user.resource && req.user.resource.id === 'ihris-user-loggedout') {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  let locale = req.params.locale
  let localesPath = getLocalePath()
  let enTrans = await fs.readFileSync(localesPath + "en.json", 'utf8')
  enTrans = JSON.parse(enTrans)
  let translation = enTrans
  truncateObjectValues(translation)
  await fs.writeFileSync(localesPath + locale + ".json", JSON.stringify(translation))
  return res.status(201).send()
})

router.get("/translate/:from/:to/:type?", async(req, res) => {
  if(req.user.resource && req.user.resource.id === 'ihris-user-loggedout') {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  let localesPath = getLocalePath()
  let from = ihrissmartrequire("locales/" + req.params.from + ".json")
  let translations = {}
  if(req.params.type === 'partial') {
    translations = await fs.readFileSync(localesPath + req.params.to + ".json", 'utf8')
    translations = JSON.parse(translations)
  }
  onprogressTranslations.push({
    locale: req.params.to,
    type: req.params.type
  })
  let interval
  translator(from, translations, req.params.from, req.params.to, req.params.type).then(async() => {
    let ind = onprogressTranslations.findIndex((loc) => {
      return loc.locale === req.params.to
    })
    onprogressTranslations.splice(ind, 1)
    let localesPath = getLocalePath()
    console.log('Done');
    await fs.writeFileSync(localesPath + req.params.to + ".json", JSON.stringify(translations, 0, 2))
    clearInterval(interval)
  })
  interval = setInterval(async() => {
    console.log('here');
    let localesPath = getLocalePath()
    await fs.writeFileSync(localesPath + req.params.to + ".json", JSON.stringify(translations, 0, 2))
  }, 1000);
  return res.status(200).json()
})

router.get("/translationCount/:from/:to", async(req, res) => {
  let transRunDet = onprogressTranslations.find((loc) => {
    return loc.locale === req.params.to
  })
  let running = true
  if(!transRunDet) {
    running = false
  }
  let totalFrom = {count: 0}
  let totalTo = {count: 0}
  let localesPath = getLocalePath()
  let from = await fs.readFileSync(localesPath + req.params.from + ".json", 'utf8')
  from = JSON.parse(from)
  let to = await fs.readFileSync(localesPath + req.params.to + ".json", 'utf8')
  to = JSON.parse(to)
  countTexts(from, totalFrom)
  countTexts(to, totalTo, true)
  return res.json({
    from: totalFrom.count,
    to: totalTo.count,
    running
  })
})

router.get("/getTranslatedLanguages", async(req, res) => {
  let localesPath = getLocalePath()
  const files = await fs.readdirSync(localesPath);
  let translations = []
  for(let file of files) {
    /*if(!translate.languages.isSupported(file.split(".")[0])) {
      continue
    }*/
    if(!translate.languages.isSupported(file.split(".")[0])) {
      if(file.split(".")[0] == "" || file.split(".")[0] == "en_startup"){
        continue
      } else {
        translations.push({
          locale: file.split(".")[0],
          language: file.split(".")[0]
        })
      }
      continue
    }
    translations.push({
      locale: file.split(".")[0],
      language: translate.languages[file.split(".")[0]]
    })
  }
  return res.json(translations)
})

router.get("/extractTexts/:locale", async(req, res) => {
  if(req.user.resource && req.user.resource.id === 'ihris-user-loggedout') {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  if(req.params.locale === 'en') {
    extractTexts().then(() => {
      return res.status(200).send()
    }).catch(() => {
      return res.status(500).send()
    })
  } else {
    let localesPath = getLocalePath()
    let translations = await fs.readFileSync(localesPath + req.params.locale + ".json", 'utf8')
    try {
      translations = JSON.parse(translations)
    } catch (err) {
      translations = {}
    }
    let enTrans = await fs.readFileSync(localesPath + "en.json", 'utf8')
    enTrans = JSON.parse(enTrans)
    build(enTrans, "")
    await fs.writeFileSync(localesPath + req.params.locale + ".json", JSON.stringify(translations, 0, 2))
    return res.status(200).json()
    
    function build(source, keys) {
      for(let key in source) {
        let translations_nav
        if(keys) {
          for(let ky of keys.split("___")) {
            if(translations_nav) {
              translations_nav = translations_nav[ky]
            } else {
              translations_nav = translations[ky]
            }
          }
        } else {
          translations_nav = translations
        }
        if(!translations_nav[key]) {
          translations_nav[key] = source[key]
          if(typeof translations_nav[key] === "object") {
            truncateObjectValues(translations_nav[key])
          } else {
            translations_nav[key] = ""
          }
        } else if(typeof source[key] === 'object') {
          let mod_keys
          if(keys) {
            mod_keys = keys + "___" + key
          } else {
            mod_keys = key
          }
          build(source[key], mod_keys)
        }
      }
    }
  }
})

router.get("/getLocale/:locale", async(req, res) => {
  let localesPath = getLocalePath()
  if(!translate.languages.isSupported(req.params.locale)) {
    return res.status(400).send()
  }
  let translations = await fs.readFileSync(localesPath + req.params.locale + ".json", 'utf8')
  translations = JSON.parse(translations)
  return res.json(translations)
})

router.get("/getLocales", async(req, res) => {
  let localesPath = getLocalePath()
  const files = await fs.readdirSync(localesPath);
  let locales = {
    locale: "en",
    fallbackLocale: "en",
    messages: {}
  }
  for(let file of files) {
    if(!translate.languages.isSupported(file.split(".")[0])) {
      continue
    }
    let locale = require(localesPath + file)
    locales.messages[file.split(".")[0]] = locale
  }
  return res.json(locales)
})

router.get("/getTranslations/:locale", async(req, res) => {
  let localesPath = getLocalePath()
  let otherLang
  /*if(!translate.languages.isSupported(req.params.locale)) {
    return res.status(400).send()
  }*/
  if(!translate.languages.isSupported(req.params.locale)) {
    await fs.access(localesPath + req.params.locale + ".json",(error) => {
      if(error){
        return res.status(400).send()
      } else {
        otherLang = req.params.locale
      }

    })
  }

  let flattranslations = []
  let language = ""
  let translations = await fs.readFileSync(localesPath + req.params.locale + ".json", 'utf8')
  translations = JSON.parse(translations)
  let enTrans = await fs.readFileSync(localesPath + "en.json", 'utf8')
  enTrans = JSON.parse(enTrans)
  build(enTrans, "")

  function build(texts, top) {
    for(let text in texts) {
      let top1 = text
      if(top) {
        top1 = top + "___" + top1
      }
      if(typeof texts[text] === "string") {
        let trans = "";
        for(let key of top1.split("___")) {
          if(trans) {
            trans = trans[key]
          } else {
            trans = translations[key]
          }
        }
        if(!trans) {
          trans = ""
        }
        flattranslations.push({
          key: top1,
          text: trans,
          en: texts[text]
        })
      } else {
        build(texts[text], top1)
      }
    }
  }
  if(otherLang){
    language = otherLang
  } else {
    language = translate.languages[req.params.locale]
  }  
  return res.json({
    language: language,
    translations: flattranslations
  })
})

router.put("/update", async(req, res) => {
  if(req.user.resource && req.user.resource.id === 'ihris-user-loggedout') {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  let localesPath = getLocalePath()
  let translations = await fs.readFileSync(localesPath + req.body.locale + ".json", 'utf8')
  translations = JSON.parse(translations)
  let enTrans = await fs.readFileSync(localesPath + "en.json", 'utf8')
  enTrans = JSON.parse(enTrans)
  let transPath = translations
  let enPath = enTrans
  for(let key of req.body.path.split("___")) {
    if(!transPath[key]) {
      transPath[key] = enPath[key]
      if(typeof transPath[key] === "object") {
        truncateObjectValues(transPath[key])
      }
    }
    if(typeof transPath[key] === "object") {
      transPath = transPath[key]
      enPath = enPath[key]
    } else {
      transPath[key] = req.body.text
      break
    }
  }
  await fs.writeFileSync(ihrissmartrequire.path("locales/" + req.body.locale + ".json"), JSON.stringify(translations, 0, 2))
  return res.status(200).send()
})

router.get("/export/:locale", async(req, res) => {
  if(req.user.resource && req.user.resource.id === 'ihris-user-loggedout') {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  let xlsx = require("json-as-xlsx")
  let localesPath = getLocalePath()
  let translations = await fs.readFileSync(localesPath + req.params.locale + ".json", 'utf8')
  translations = JSON.parse(translations)
  let enTrans = await fs.readFileSync(localesPath + "en.json", 'utf8')
  enTrans = JSON.parse(enTrans)
  let columns = [
    {label: 'Key', value: 'key'},
    {label: 'Translation', value: 'translation'},
    {label: 'English', value: 'en'}
  ]
  let content = []
  build(enTrans, "")
  let data = [{
    sheet: translate.languages[req.params.locale],
    columns,
    content
  }]
  const settings = {
    writeOptions: {
      type: "buffer",
      bookType: "xlsx",
    },
  }
  const buffer = xlsx(data, settings)
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-disposition": "attachment; filename=" + translate.languages[req.params.locale] + ".xlsx",
  })
  return res.end(buffer)

  function build(texts, top) {
    for(let text in texts) {
      let top1 = text
      if(top) {
        top1 = top + "___" + top1
      }
      if(typeof texts[text] === "string") {
        let trans = "";
        for(let key of top1.split("___")) {
          if(trans) {
            trans = trans[key]
          } else {
            trans = translations[key]
          }
        }
        if(!trans) {
          trans = ""
        }
        content.push({
          key: top1,
          translation: trans,
          en: texts[text]
        })
      } else {
        build(texts[text], top1)
      }
    }
  }
})

router.post('/import/:locale', async(req, res) => {
  if(req.user.resource && req.user.resource.id === 'ihris-user-loggedout') {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  const XLSX = require("xlsx")
  let workbook = XLSX.read(req.files.translation.data)
  let sheetname
  if(Object.keys(workbook.Sheets).length > 0) {
    sheetname = Object.keys(workbook.Sheets)[0]
  }
  let translations = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname])
  if(!translations || translations.length === 0) {
    return res.status(400).json()
  }

  let localesPath = getLocalePath()
  let enTrans = await fs.readFileSync(localesPath + "en.json", 'utf8')
  enTrans = JSON.parse(enTrans)
  let invalid = []
  let duplicated = []
  validate()
  if(invalid.length > 0 || duplicated.length > 0) {
    return res.status(400).json({
      invalid,
      duplicated
    })
  }

  let importedTranslations = {}
  for(let trans of translations) {
    let enTransCP = enTrans
    let importedTranslationsCP = importedTranslations
    for(let key of trans.Key.split("___")) {
      if(!importedTranslationsCP.hasOwnProperty(key)) {
        importedTranslationsCP[key] = enTransCP[key]
        if(typeof importedTranslationsCP[key] === "object") {
          truncateObjectValues(importedTranslationsCP[key])
        }
      }
      if(typeof importedTranslationsCP[key] === "object") {
        importedTranslationsCP = importedTranslationsCP[key]
        enTransCP = enTransCP[key]
      } else {
        importedTranslationsCP[key] = trans.Translation
        break
      }
    }
  }

  await fs.writeFileSync(ihrissmartrequire.path("locales/" + req.params.locale + ".json"), JSON.stringify(importedTranslations, 0, 2))
  return res.status(200).send()

  function validate() {
    let processedKeys = []
    for(let trans of translations) {
      let enTransCP = enTrans
      if(processedKeys.includes(trans.Key)) {
        duplicated.push(trans.Key)
        continue
      }
      processedKeys.push(trans.Key)
      for(let key of trans.Key.split("___")) {
        if(!enTransCP.hasOwnProperty(key)) {
          invalid.push(key)
          break
        }
        if(typeof enTransCP[key] === "object") {
          enTransCP = enTransCP[key]
        }
      }
    }
  }
})

router.get("/codeSystemTranslations/:locale/:id", async (req, res) => {
  let locale = req.params.locale
  let id = req.params.id
  let codeSystem = await fhirAxios.read("CodeSystem", id)
  codeSystem = await translatorCodeSystem(codeSystem, "en", locale)
  fhirAxios.update(codeSystem).then(() => {
     incrementValueSetVersion(codeSystem.url)
    return res.status(200).json({'success': true});
  }).catch((err) => {
    return res.status(400).json({'success': true, 'error': err});
  })
})

router.get("/translateAllCodeSystem/:locale", async (req, res) => {
  let locale = req.params.locale
  let codeSystems = await fhirAxios.search("CodeSystem", {_count: 200})
  for (let codeSystem of codeSystems.entry) {
    let translatedCodeSystem = await translatorCodeSystem(codeSystem.resource, "en", locale)
    await fhirAxios.update(translatedCodeSystem).then((results) => {
      incrementValueSetVersion(translatedCodeSystem.url)
      return res.status(200).json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    })

  }
  return res.status(200).json({'success': true});
})

router.put("/updateCodeSystem",(req,res)=> {
  if(req.user.resource && req.user.resource.id === 'ihris-user-loggedout') {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  let body = req.body
  if (!body) {
    return res.status(400).end();
  }else {
    fhirAxios.update(body).then((results) => {
      incrementValueSetVersion(body.url)
      return res.status(200).json(results);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
  }
})

function translator(texts, translations, from, to, type) {
  return new Promise((resolve, reject) => {
    let keys = Object.keys(texts)
    let errorOccured = false
    async.eachSeries(keys, (key, nxt) => {
      if(typeof texts[key] === "string") {
        if(type === 'partial' && translations[key]) {
          return nxt()
        }
        if(!key || !texts[key]) {
          return nxt()
        }
        translate(texts[key], {from, to}).then(res => {
          translations[key] = res.text
          return nxt()
        }).catch(err => {
          errorOccured = true
          console.error(err);
          return nxt()
        });
      } else {
        if(!translations[key]) {
          translations[key] = {}
        }
        translator(texts[key], translations[key], from, to, type).then(() => {
          return nxt()
        }).catch(() => {
          errorOccured = true
          return nxt()
        })
      }
    }, () => {
      if(errorOccured) {
        return reject()
      }
      return resolve()
    })
  })
}

function countTexts(texts, total, musttranslated = false) {
  for(let key in texts) {
    if(!key || !texts[key]) {
      continue
    }
    if(typeof texts[key] === "string") {
      if(texts[key] || !musttranslated) {
        total.count++
      }
    } else {
      countTexts(texts[key], total, musttranslated)
    }
  }
}

function truncateObjectValues(object) {
  for(let key in object) {
    if(typeof object[key] === "string") {
      object[key] = ""
    } else {
      truncateObjectValues(object[key])
    }
  }
}

function getLocalePath() {
  let localesPath = ihrissmartrequire.path("locales/en_startup.json")
  localesPath = localesPath.split("/")
  localesPath.pop()
  return localesPath.join("/") + "/"
}

function translatorCodeSystem(codeSystem, from, to) {
  return new Promise((resolve, reject) => {
    let errorOccured = false
    async.eachSeries(codeSystem.concept, (concept, nxt) => {
      translate(concept['display'], {from, to}).then(res => {
        if (concept?.designation) {
          let index = concept.designation.findIndex(designation => designation.language === to)
          if (index === -1) {
            concept.designation.push({
              "language": to, "use": {
                "system": "http://terminology.hl7.org/CodeSystem/designation-usage", "code": "display"
              }, "value": res.text
            })
          } else {
            concept.designation[index] = {
              "language": to, "use": {
                "system": "http://terminology.hl7.org/CodeSystem/designation-usage", "code": "display"
              }, "value": res.text
            }
          }
        } else {
          concept.designation = [{
            "language": to, "use": {
              "system": "http://terminology.hl7.org/CodeSystem/designation-usage", "code": "display"
            }, "value": res.text
          }]
        }
        return nxt()
      }).catch(err => {
        errorOccured = true
        console.error(err);
        return nxt()
      });
    }, () => {
      if (errorOccured) {
        return reject()
      }
      return resolve(codeSystem)
    })
  })
}

const incrementValueSetVersion = ( codeSystem ) => {
    const increment = (version) => {
      if ( !version ) return "0.0.1"
      try {
        let parts = version.split(".")
        if ( parts.length > 2 ) {
          let last = Number(parts.pop())
          parts.push( ++last )
        } else if ( parts.length === 2 ) {
          parts.push(1)
        } else if ( parts.length === 1 ) {
          parts.push(0)
          parts.push(1)
        }
        return parts.join(".")
      } catch (err) {
        return version + ".1"
      }
    }
    fhirAxios.search( "ValueSet", { reference: codeSystem, _count: "200" } ).then ( (bundle) => {
      if ( bundle.entry ) {
        for( let entry of bundle.entry ) {
          if ( !entry.resource ) continue
          entry.resource.version = increment( entry.resource.version )
          fhirAxios.update( entry.resource ).catch( (err) => {
            logger.error("Failed to update valueset to increment version: "+entry.resource.id)
          } )
        }
      }
    } ).catch( (err) => {
      logger.error("Unable to find valuesets to increment for "+codeSystem+": "+err.message)
    } )
  }

module.exports = router;