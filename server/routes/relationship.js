var express = require("express");
var router = express.Router();
const mixin = require("../mixin");

router.get("/describe/:relationship?", function(req, res, next) {
  let relationship = ''
  if(req.params.relationship) {
    relationship = req.params.relationship
  }
  mixin.getDefinition("Basic", relationship, (err, relationship) => {
    if(err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(relationship);
    }
  })
})

module.exports = router;
