
const nconf = require('../modules/config')

let authRoutes;
if (nconf.get('app:idp') === 'keycloak') {
  authRoutes = require('./keycloakAuth');
} else {
  authRoutes = require('./passportAuth');
}


module.exports = authRoutes;
