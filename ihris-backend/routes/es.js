const axios = require("axios");
const URI = require("urijs");
const async = require("async");
const winston = require("winston");
const os = require("os");
const fs = require("fs");
const { nanoid } = require("nanoid");
const express = require("express");
const router = express.Router();
const es = require("../modules/es");
const nconf = require("../modules/config");
const outcomes = require("../config/operationOutcomes");


router.post("/export/:format/:index", (req, res) => {
  console.log(JSON.stringify(req.body.selected));
  let searchQry = req.body.query;
  let headers = req.body.headers;
  let label = req.body.label;
  let isSelected = req.body.selected;
  console.log(JSON.stringify(req.body,null,2));
  if (isSelected && isSelected.length > 0) {
    let rows = "";
    for (let header of headers) {
      if (!rows) {
        rows = header.text;
      } else {
        rows += "," + header.text;
      }
    }
    rows += os.EOL;
    for (let doc of isSelected) {
      let row;
      for (let header of headers) {
        if (row === undefined) {
          if (doc[header.value] === null || doc[header.value] === undefined) {
            console.log("doc: ", doc, "header", header);
            row = " ";
          } else {
            row = '"' + doc[header.value] + '"';
          }
        } else {
          if (doc[header.value] === null || doc[header.value] === undefined) {
            row += ",";
          } else {
            row += "," + '"' + doc[header.value] + '"';
          }
        }
      }
      rows += row + os.EOL;
    }
    if (!fs.existsSync(`${__dirname}/../tmp`)) {
      fs.mkdirSync(`${__dirname}/../tmp`);
    }
    let fileName = `${__dirname}/../tmp/${label}-${nanoid(10)}.csv`;
    fs.writeFileSync(fileName, rows);
    if (fs.existsSync(fileName)) {
      res.download(fileName);
      setTimeout(() => {
        fs.unlinkSync(fileName);
      }, 240000);
      // res.send(fileName.replace(`${__dirname}/..`, ""));
    }
  } else {
    es.getData(
      { indexName: req.params.index, searchQuery: searchQry },
      (err, documents) => {
        if (err) {
          return res.status(500).send();
        }
        let rows = "";
        for (let header of headers) {
          if (!rows) {
            rows = header.text;
          } else {
            rows += "," + header.text;
          }
        }
        rows += os.EOL;
        for (let doc of documents) {
          let row;
          for (let header of headers) {
            if (row === undefined) {
              if (
                doc._source[header.value] === null ||
                doc._source[header.value] === undefined
              ) {
                row = " ";
              } else {
                row = '"' + doc._source[header.value] + '"';
              }
            } else {
              if (
                doc._source[header.value] === null ||
                doc._source[header.value] === undefined
              ) {
                row += ",";
              } else {
                row += "," + '"' + doc._source[header.value] + '"';
              }
            }
          }
          rows += row + os.EOL;
        }
        if (!fs.existsSync(`${__dirname}/../tmp`)) {
          fs.mkdirSync(`${__dirname}/../tmp`);
        }
        let fileName = `${__dirname}/../tmp/${label}-${nanoid(10)}.csv`;
        fs.writeFileSync(fileName, rows);
        if (fs.existsSync(fileName)) {
          res.download(fileName);
          setTimeout(() => {
            fs.unlinkSync(fileName);
          }, 240000);
          // res.send(fileName.replace(`${__dirname}/..`, ""));
        }
        //remove the file after 4 minutes
      }
    );
  }
});

router.get("/:index/:operation?", (req, res) => {
  let indexName = req.params.index;
  let operation = req.params.operation;
  let from = req.query.from;
  let size = req.query.size;
  let url = URI(nconf.get("elasticsearch:base")).segment(indexName);
  if (operation) {
    url = url.segment(operation);
  }
  if (from) {
    url = url.addQuery("from", from);
  }
  if (size) {
    url = url.addQuery("size", size);
  }
  url = url.toString();
  axios({
    method: "GET",
    url,
    auth: {
      username: nconf.get("elasticsearch:username"),
      password: nconf.get("elasticsearch:password"),
    },
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      winston.error(err.message);
      return res.status(500).send();
    });
});

router.post("/:index/:operation?", (req, res) => {
  if (!req.user) {
    return res.status(401).json(outcomes.NOTLOGGEDIN);
  }
  let indexName = req.params.index;
  let operation = req.params.operation;
  let reportOptions = req.body.reportOptions;
  delete req.body.reportOptions;
  let body = req.body;
  if (reportOptions.locationBasedConstraint) {
    let userLocExt =
      req.user.resource.extension &&
      req.user.resource.extension.find((ext) => {
        return (
          ext.url ===
          "http://ihris.org/fhir/StructureDefinition/ihris-user-location"
        );
      });
    if (userLocExt) {
      let userLoc = userLocExt.valueReference.reference;
      if (userLoc) {
        body.query.bool.must.push({
          script: {
            script: {
              source: `if(doc['ihris-related-group.keyword'].size() != 0) {if(doc['ihris-related-group.keyword'].value.contains('${userLoc}')){return true}}`,
              lang: "painless",
            },
          },
        });
      }
    }
  }
  let from = req.query.from;
  let size = req.query.size;
  let url = URI(nconf.get("elasticsearch:base")).segment(indexName);
  if (operation) {
    url = url.segment(operation);
  }
  if (from) {
    url = url.addQuery("from", from);
  }
  if (size) {
    url = url.addQuery("size", size);
  }
  url = url.toString();
  axios({
    method: "GET",
    url,
    auth: {
      username: nconf.get("elasticsearch:username"),
      password: nconf.get("elasticsearch:password"),
    },
    data: body,
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      winston.error(err.message);
      return res.status(500).send();
    });
});

router.get("/populateFilter/:index/:field", (req, res) => {
  let indexName = req.params.index;
  let field = req.params.field;

  //get filter data type
  let url = URI(nconf.get("elasticsearch:base"))
    .segment(indexName)
    .segment("_mapping")
    .toString();
  const options = {
    method: "GET",
    url,
    auth: {
      username: nconf.get("elasticsearch:username"),
      password: nconf.get("elasticsearch:password"),
    },
  };
  axios(options)
    .then((mappings) => {
      let dataType = mappings.data[indexName].mappings.properties[field].type;
      if (dataType === "text") {
        field = `${field}.keyword`;
      }
      let body = {
        size: 0,
        aggs: {
          uniq_values: {
            composite: {
              sources: [{ value: { terms: { field: field } } }],
            },
          },
        },
      };
      let url = URI(nconf.get("elasticsearch:base"))
        .segment(indexName)
        .segment("_search")
        .toString();
      let next = true;
      let buckets = [];
      async.whilst(
        (callback1) => {
          return callback1(null, next !== false);
        },
        (callback) => {
          let options = {
            method: "GET",
            url,
            auth: {
              username: nconf.get("elasticsearch:username"),
              password: nconf.get("elasticsearch:password"),
            },
            data: body,
          };
          next = false;
          axios(options)
            .then((response) => {
              buckets = buckets.concat(
                response.data.aggregations.uniq_values.buckets
              );
              if (response.data.aggregations.uniq_values.buckets.length > 0) {
                body.aggs.uniq_values.composite.after = {};
                body.aggs.uniq_values.composite.after.value =
                  response.data.aggregations.uniq_values.after_key.value;
                next = true;
              }
              return callback(null, next);
            })
            .catch((err) => {
              winston.error(err.message);
              return res.status(500).send();
            });
        },
        () => {
          return res.status(200).json(buckets);
        }
      );
    })
    .catch((err) => {
      winston.error(err.message);
      return res.status(500).send();
    });
});
module.exports = router;
