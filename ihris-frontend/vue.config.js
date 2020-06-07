module.exports = {
  devServer: {
    proxy: {
      '^/auth': {
        target: 'http://localhost:3000/'
      },
      '^/config': {
        target: 'http://localhost:3000/'
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
