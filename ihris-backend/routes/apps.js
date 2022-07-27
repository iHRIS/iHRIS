const express = require('express')
const router = express.Router()
const AdmZip = require("adm-zip");
const fs = require("fs")
const appsBasePath = __dirname + "/../apps/"

router.post("/install", async(req, res) => {
  await req.files.app.mv(appsBasePath + req.files.app.name)
  const zip = new AdmZip(appsBasePath + req.files.app.name)
  const appName = req.files.app.name.split('.zip')[0]
  zip.extractAllToAsync(appsBasePath + appName, true, true, (err) => {
    if(err) {
      console.log(err);
      return res.status(500).send("Error occured while extracting your iHRIS App")
    }
    fs.unlinkSync(appsBasePath + req.files.app.name)
    getAppMetadata(appName).then((manifest) => {
      if(!manifest.name) {
        fs.unlinkSync(appsBasePath + appName)  
        return res.status(400).send("Your manifest.webapp has no name")
      }
      return res.json(manifest)
    }).catch(() => {
      fs.rmSync(appsBasePath + appName, { recursive: true, force: true });
      return res.status(400).send("Invalid App")
    })
  });
});

router.get("/installed", (req, res) => {
  let apps = []
  fs.readdir((appsBasePath), {
    withFileTypes: true
  }, (err, folders) => {
  if(err) {
    console.log(err);
    return res.status(500).send()
  }
  const appsDirs = folders.reduce((a, c) => {
    c.isDirectory() && a.push(c.name)
    return a
  }, [])
  if(appsDirs.length === 0) {
    return res.json(apps)
  }
  const promises = []
  for(let dir of appsDirs) {
    promises.push(new Promise((resolve, reject) => {
      getAppMetadata(dir).then((manifest) => {
        if(manifest.icons && manifest.icons["48"]) {
          fs.readFile(appsBasePath + dir + "/" + manifest.icons["48"], 'base64', (err, data) => {
            manifest.iconBase64 = "data:image;base64," + data
            apps.push(manifest)
            return resolve()
          });
        } else {
          apps.push(manifest)
          return resolve()
        }
      }).catch(() => {
        return reject()
      })
    }))
  }
  Promise.all(promises).then(() => {
    return res.json(apps)
  }).catch(() => {
    return res.status(500).json(apps)
  })
 })
})

router.delete("/uninstall/:name", (req, res) => {
  let name = req.params.name
  fs.rm(appsBasePath + name, { recursive: true, force: true }, (err) => {
    if(err) {
      return res.status(500).json()
    }
    return res.json({})
  })
})

function getAppMetadata(app) {
  return new Promise((resolve, reject) => {
    fs.readFile(appsBasePath + app + "/manifest.webapp", (err, data) => {
      if(err) {
        console.log(err);
        return reject()
      }
      let manifest = {}
      try {
        manifest = JSON.parse(data)
        manifest.app_short_name = app
      } catch (error) {
        console.log(error);
        return reject()
      }
      return resolve(manifest)
    })
  })
}

module.exports = router
