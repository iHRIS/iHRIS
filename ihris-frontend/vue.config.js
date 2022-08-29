module.exports = {
  runtimeCompiler: true,

  devServer: {
    proxy: {
      '^/fhir': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/auth': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/config': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/kibana': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/mhero': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/es': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/users': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/apps': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/ihrisapp': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/dictionary': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      },
      '^/tmp': {
        target: 'http://localhost:3000/',
        logLevel: 'debug'
      }
    }
  },

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      includeLocales: false,
      enableBridge: true
    }
  }
};
