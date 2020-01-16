const appConfig = require('./src/config/config');
module.exports = {
  devServer: {
    //proxy: "http://localhost:3001"
    proxy:appConfig.backend
  }
};
