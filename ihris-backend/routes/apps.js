const express = require('express')
const router = express.Router()
const AdmZip = require("adm-zip");
const fs = require("fs")

router.post("/install", async(req, res) => {
  await req.files.app.mv("./apps/" + req.files.app.name)
  const zip = new AdmZip("./apps/" + req.files.app.name)
  const appName = req.files.app.name.split('.zip')[0]
  zip.extractAllToAsync("./apps/" + appName, true, true, (err) => {
    if(err) {
      console.log(err);
      return res.status(500).send("Error occured while extracting your iHRIS App")
    }
    fs.unlinkSync("./apps/" + req.files.app.name)
    getAppMetadata(appName).then((manifest) => {
      if(!manifest.name) {
        fs.unlinkSync("./apps/" + appName)  
        return res.status(400).send("Your manifest.webapp has no name")
      }
      return res.json(manifest)
    }).catch(() => {
      fs.rmSync("./apps/" + appName, { recursive: true, force: true });
      return res.status(400).send("Invalid App")
    })
  });
});

function getAppMetadata(app) {
  console.log("Getting metadata for iHRIS app " + app);
  return new Promise((resolve, reject) => {
    fs.readFile("./apps/" + app + "/manifest.webapp", (err, data) => {
      if(err) {
        console.log(err);
        return reject()
      }
      let manifest = {}
      try {
        manifest = JSON.parse(data)
      } catch (error) {
        console.log(error);
        return reject()
      }
      return resolve(manifest)
    })
  })
}

module.exports = router
