var express = require('express');
var router = express.Router();
const nconf = require('../modules/config')

/* GET home page. */
router.get('/site', function(req, res, next) {
  const defaultUser = nconf.get("user:loggedout") || "ihris-user-loggedout"
  console.log(defaultUser)
  let site = nconf.get("site")
  if ( req.user ) {
    site.user = {}
    console.log(req.user.resource.id)
    if ( req.user.resource.id === defaultUser ) {
      console.log("user is loggedout user")
      site.user.loggedin = false
    } else {
      console.log("user is ok")
      site.user.loggedin = true
      site.user.name = req.user.resource.name[0].text
    }
  } else {
      console.log("no user")
    site.user = { loggedin: false }
  }
  site.updated = new Date().toISOString()
  res.status(200).json( site )
});

module.exports = router;
