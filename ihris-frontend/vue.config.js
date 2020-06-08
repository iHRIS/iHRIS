module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '^/auth': {
        target: 'http://localhost:3000/'
      },
      '^/config': {
        target: 'http://localhost:3000/'
      },
      '^/fhir': {
        target: 'http://localhost:3000/'
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
