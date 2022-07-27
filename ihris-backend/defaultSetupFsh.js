/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const exec = require('child_process').exec;
const axios = require('axios');
const URI = require('urijs');
const async = require('async');
const nconf = require('./modules/config')
const mixin = require('./mixin/generalMixin');
const fhirAxios = require('./modules/fhir/fhirAxios');
const { sushiClient } = require('fsh-sushi')
 
const server = nconf.get("fhir:base")
const loadKeycloakData = () => new Promise((resolve, reject) => {
  const installed = nconf.get('app:installed');
  const idp = nconf.get('app:idp');
  if (installed === "true" || idp !== 'keycloak') {
    return resolve();
  }
 
  let keycloakInstalledLocation = nconf.get('keycloak:installedLocation');
  const last = keycloakInstalledLocation.slice(-1);
  if (last !== '/') {
    keycloakInstalledLocation += '/';
  }
  const kcadm = `${keycloakInstalledLocation}bin/kcadm.sh`;
  const keycloakBase = nconf.get('keycloak:baseURL');
  const adminUser = nconf.get('keycloak:adminUser');
  const adminPassword = nconf.get('keycloak:adminPassword');
  async.parallel({
    realm: (callback) => {
      exec(`sh ${kcadm} config credentials --server ${keycloakBase} --realm master --user ${adminUser} --password ${adminPassword}`, (err, stdout, stderr) => {
        if (err) {
          return callback(err);
        }
        if (stdout) {
          console.info(stdout);
        }
        if (stderr) {
          console.info(stderr);
        }
 
        exec(`sh ${kcadm} create realms -f ${__dirname}/../../resources/keycloak/realm.json`, (err, stdout, stderr) => {
          if (err) {
            return callback(err);
          }
          if (stdout) {
            console.info(stdout);
          }
          if (stderr) {
            console.info(stderr);
          }
          return callback();
        });
      });
    },
    theme: (callback) => {
      exec(`cp -r ${__dirname}/../../resources/keycloak/themes/ihris ${keycloakInstalledLocation}themes`, (err, stdout, stderr) => {
        if (err) {
          return callback(err);
        }
        if (stdout) {
          console.info(stdout);
        }
        if (stderr) {
          console.info(stderr);
        }
        return callback();
      });
    },
  }, (err) => {
    if (err) {
      return reject(err);
    }
    return resolve();
  });
});
 
/**
 * Loading Parameters and Other default files in resources 
 */

const loadDefaultConfig = () => new Promise((resolve, reject) => {
  const installed = nconf.get('app:installed');
  if (installed === "true" ) {
    return resolve();
  }
  const parameters = nconf.get('app:Parameters');
  let fullpath = `${__dirname}/${parameters}`;
    fs.readFile(fullpath, { encoding: 'utf8', flag: 'r' }, (err, data) => {
          if (err) {
            console.error(err);
            errorOccured = true;
          }
    const fhirParameters = JSON.parse(data);
    fhirAxios.update(fhirParameters).then(() => {
      console.info('General Config Saved');
      return resolve();
    }).catch((err) => {
      console.error(err);
      reject();
    });
  });
});
 
const loadFSHFiles = () => new Promise(async (resolvePar, rejectPar) => {
  const installed = nconf.get('app:installed');
  if (installed === "true" ) {
    return resolvePar();
  }
  const fshDir = nconf.get('FSHFIles');
  const dirs = await fs.readdirSync(`${__dirname}/${fshDir}`);
  let errorOccured = false;
  async.eachSeries(dirs, (dir, nxtDir) => {
    let files = [];
    if (dir.split('.').length >= 2 && dir.split('.')[dir.split('.').length - 1] === 'fsh') {
      files.push(dir);
      dir = null;
    } else {
      try {
        files = fs.readdirSync(`${__dirname}/${fshDir}/${dir}`);
      } catch (error) {
        console.error(error);
        errorOccured = true;
        return nxtDir();
      }
    }
    async.eachSeries(files, (file, nxtFile) => {
      let fullpath;
      if (dir) {
        fullpath = `${__dirname}/${fshDir}/${dir}/${file}`;
      } else {
        fullpath = `${__dirname}/${fshDir}/${file}`;
      }
      fs.readFile(fullpath, { encoding: 'utf8', flag: 'r' }, (err, data) => {
        if (err) {
          console.error(err);
          errorOccured = true;
        }
        /**
         * Build fsh file and load to fhir server
         */
        sushiClient.fshToFhir(data, {
           canonical: "http://ihris.org/fhir",
           version: "0.1.0",
           fhirVersion: "4.0.1",
           dependencies: [{ packageId: "hl7.fhir.r4.core", version: "4.0.1" }],
           logLevel: "error",
         })
         .then((results) => {
           let resources = results.fhir
           async.eachSeries(resources, (resource, nxtRes ) => {
            if (resource.resourceType === 'Bundle'
                && (resource.type === 'transaction' || resource.type === 'batch')) {
              console.info(`Saving ${resource.type}`);
              const url = new URI(server).toString();
              axios.post(url, resource).then((res) => {
                console.info(`${url}: ${res.status}`);
                console.info(JSON.stringify(res.data, null, 2));
                return nxtRes();
              }).catch((err) => {
                errorOccured = true;
                console.error(err);
                console.error(`fullpath ${JSON.stringify(err.response.data, null, 2)}`);
                return nxtRes();
              });
            } else {
              console.info(`Saving ${resource.resourceType} - ${resource.id}`);
              const url = new URI(server).segment(resource.resourceType).segment(resource.id).toString();
              console.log(url);
              axios.put(url, resource).then((res) => {
                console.info(`${url}: ${res.status}`);
                console.info(res.headers['content-location']);
                return nxtRes();
              }).catch((err) => {
                errorOccured = true;
                console.log(err.response);
                //console.error(`fullpath ${JSON.stringify(err.response, null, 2)}`);
                return nxtRes();
              });
            }
           })
           return nxtFile();
         })
         .catch((err) => {
           // handle thrown errors
           console.log(err)
           process.exit(1)
         });
      });
        
    }, () => nxtDir());
  }, () => {
    if (errorOccured) {
      return rejectPar(true);
    }
    return resolvePar();
  });
});

module.exports = {
  initialize: () => new Promise((resolve, reject) => {
    let errorOccured = false;
    async.series([
      (callback) => {
        loadKeycloakData().then(() => callback(null)).catch((err) => {
          errorOccured = true;
          console.error(err);
          return callback(null);
        });
      },
      (callback) => {
        Promise.all([loadDefaultConfig(),loadFSHFiles()]).then(() => {
          const idp = nconf.get('app:idp');
          if (idp === 'keycloak') {
            const kcadmin = require('./modules/keycloakAdminClient');
            setTimeout(() => {
              kcadmin.loadTasksToKeycloak().then(() => callback(null)).catch((err) => {
                errorOccured = true;
                console.error(err);
                return callback(null);
              });
            }, 1000);
          } else {
            return callback(null);
          }
        }).catch((err) => {
          errorOccured = true;
          console.error(err);
          return callback(null);
        });
      },
    ], () => {
      // if (errorOccured) {
      //   return reject();
      // }
      mixin.updateConfigFile(['app', 'installed'], true, () => {
        console.log('Done loading Default data');
        return resolve();
      });
    });
  }),
};