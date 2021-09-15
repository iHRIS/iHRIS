const fs = require('fs');
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
}

module.exports = {
  removeDir,
  getFilesFromDir
}