var express = require('express');
var router = express.Router();
const nconf = require('../modules/config')

/* GET home page. */
router.get('/site', function(req, res, next) {
  const defaultUser = nconf.get("user:loggedout") || "ihris-user-loggedout"
  let site = nconf.get("site")
  if ( req.user ) {
    site.user = {}
    if ( req.user.id === defaultUser ) {
      site.user.loggedin = false
    } else {
      site.user.loggedin = true
      site.user.name = req.user.resource.name[0].text
    }
  } else {
    site.user = { loggedin: false }
  }
  res.status(200).json( site )
});

module.exports = router;
