const appConfig = require("./src/config/config");
module.exports = {
  devServer: {
    proxy: appConfig.backend
  }
};
