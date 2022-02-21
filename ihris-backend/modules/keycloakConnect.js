
const Keycloak = require('keycloak-connect');
const nconf = require('../modules/config');
const logger = require('../winston');

let _keycloak;

const keycloakConfig = {
  realm: nconf.get('keycloak:realm'),
  clientId: nconf.get('keycloak:backendClientId'),
  bearerOnly: true,
  serverUrl: nconf.get('keycloak:baseURL'),
};

function initKeycloak(store) {
  if (_keycloak) {
    logger.warn('Trying to init Keycloak again!');
    return _keycloak;
  }

  console.info('Initializing Keycloak...');
  _keycloak = new Keycloak({ store }, keycloakConfig);
  return _keycloak;
}

function getKeycloak() {
  if (!_keycloak) {
    console.error('Keycloak has not been initialized. Please called init first.');
  }
  console.info('Keycloak Initialized');
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
