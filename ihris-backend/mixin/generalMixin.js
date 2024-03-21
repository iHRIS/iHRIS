const fs = require('fs');
const nconf = require('../modules/config')
const ihrissmartrequire = require('ihrissmartrequire')

const formatSQLColumn = (name) => {
  if(name.startsWith('__') || name == 'id') {
    return name
  }
  name = name.toLowerCase()
  name = 'ihris_' + name
  name = name.split("-").join("_")
  return name
}

const flattenComplex = (extension) => {
  let results = {};
  for (let ext of extension) {
    let value = '';
    for (let key of Object.keys(ext)) {
      if (key !== 'url') {
        value = ext[key];
      }
    }
    if (results[ext.url]) {
      if (Array.isArray(results[ext.url])) {
        results[ext.url].push(value);
      } else {
        results[ext.url] = [results[ext.url], value];
      }
    } else {
      if (Array.isArray(value)) {
        results[ext.url] = [value];
      } else {
        results[ext.url] = value;
      }
    }
  }
  return results;
}

const removeDir = function(path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);

    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename);
        } else {
          fs.unlinkSync(path + "/" + filename);
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.rmdirSync(path);
    }
  }
};
const getFilesFromDir = (searchDir) => {
  return new Promise(async (resolve, reject) => {
    const filesPath = [];
    let dirs;
    try {
      dirs = await fs.readdirSync(searchDir);
    } catch (error) {
      return reject();
    }
    const dirsPromises = [];
    dirs.forEach((dir) => {
      if (!fs.lstatSync(`${searchDir}/${dir}`).isDirectory()) {
        filesPath.push(`${searchDir}/${dir}`);
        return
      }
      dirsPromises.push(new Promise((dresolve, dreject) => {
        fs.readdir(`${searchDir}/${dir}`, (err, files) => {
          if (err) {
            return dreject();
          }
          files.forEach((file) => {
            filesPath.push(`${searchDir}/${dir}/${file}`);
            return dresolve();
          });
        });
      }));
    });
    Promise.all(dirsPromises).then(() => resolve(filesPath)).catch(() => reject());
  });
};
const updateConfigFile = function (path, newValue, callback) {
  
  let pathString = path.join(':');
  nconf.set(pathString, newValue);
  console.info('Updating config file');
  let configFile = ihrissmartrequire.path('config/baseConfig.json');
  let configString = fs.readFileSync( configFile )
  let configData = JSON.parse( configString )
  let index = configData.parameter.findIndex( param => {
    return param.name === pathString
  })
  configData.parameter[index].valueString = ""+newValue
  fs.writeFile(configFile, JSON.stringify(configData, 0, 2), (err) => {
    if (err) {
      throw err;
    }
    console.info('Done updating config file');
    return callback();
  });
}

module.exports = {
  removeDir,
  getFilesFromDir,
  updateConfigFile,
  flattenComplex,
  formatSQLColumn
}