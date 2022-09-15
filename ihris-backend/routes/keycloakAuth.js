const express = require('express')
const jwtDecode = require('jwt-decode');
const user = require('../modules/user');
const router = express.Router()
const logger = require('../winston')
const nconf = require('../modules/config')
const fhirAxios = nconf.fhirAxios
const kcadmin = require('../modules/keycloakAdminClient');

router.post('/', (req, res) => {
  let userResource = req.body;
  if (!userResource || !userResource.id) {
    const userDetails = jwtDecode(req.headers.authorization.split(' ')[1]);
    if (!userDetails.sub) {
      logger.error('User details are missing');
      return res.status(401).send();
    }
    userResource = {
      resourceType: 'Person',
      id: userDetails.sub,
      meta: {
        profile: ['http://gofr.org/fhir/StructureDefinition/gofr-person-user'],
      },
      active: true,
    };
    if (userDetails.name) {
      userResource.name = [{
        use: 'official',
        text: userDetails.name,
      }];
    }
    if (userDetails.email) {
      userResource.telecom = [{
        system: 'email',
        value: userDetails.email,
      }];
    }
  }
  fhirAxios.search('Person', { _id: userResource.id }).then((usersRes) => {
    if (!usersRes.entry || (usersRes.entry && usersRes.entry.length >= 0)) {
      fhirAxios.update(userResource).then((resp) => {
        kcadmin.populateRoleTasks({
          token: req.headers.authorization.split(' ')[1],
          user: resp,
        }).then((popResp) => {
          user.createUserInstance(resp, popResp.role).then((obj) => {
            res.status(200).json(obj);
          }).catch((err) => {
            logger.error(err);
            res.status(500).json();
          });
        }).catch((err) => {
          logger.error(err);
          return res.status(500).json();
        });
      }).catch((err) => {
        logger.error(err);
        res.status(500).send();
      });
    } else {
      kcadmin.populateRoleTasks({
        token: req.headers.authorization.split(' ')[1],
        user: usersRes.entry[0].resource,
      }).then(async (popResp) => {
        user.createUserInstance(usersRes.entry[0].resource, popResp.role).then((obj) => {
          res.status(200).json(obj);
        }).catch(() => {
          res.status(500).json();
        });
      }).catch((err) => {
        logger.error(err);
        return res.status(500).json();
      });
    }
  });
});

router.get('/test',
  ( req, res ) => {
    if ( !req.user.accesses ) req.user.accesses = 0
    req.user.accesses++
    res.status(200).json({user:req.user})
  }
)

module.exports = router