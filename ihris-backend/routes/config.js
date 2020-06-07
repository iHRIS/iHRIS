var express = require('express');
var router = express.Router();
const nconf = require('../modules/config')

/* GET home page. */
router.get('/site', function(req, res, next) {
  console.log(req.headers)
  const defaultUser = nconf.get("user:loggedout") || "ihris-user-loggedout"
  let site = nconf.get("site")
  console.log(req.user)
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
  site.updated = new Date().toString()
  console.log(site)
  res.status(200).json( site )
});

module.exports = router;
