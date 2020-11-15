const axios = require('axios')
const URI = require('urijs');
const async = require('async')
const express = require('express')
const router = express.Router()
const nconf = require('../modules/config')

router.get('/:index/:operation?', (req, res) => {
  let indexName = req.params.index
  let operation = req.params.operation
  let from = req.query.from
  let size = req.query.size
  let url = URI(nconf.get('elasticsearch:base')).segment(indexName)
  if(operation) {
    url = url.segment(operation)
  }
  if(from) {
    url = url.addQuery('from', from)
  }
  if(size) {
    url = url.addQuery('size', size)
  }
  url = url.toString()
  axios({
    method: 'GET',
    url,
    auth: {
      username: nconf.get('elasticsearch:username'),
      password: nconf.get('elasticsearch:password'),
    }
  }).then((response) => {
    res.status(200).json(response.data)
  }).catch((err) => {
    console.log(err);
    return res.status(500).send()
  })
})

router.post('/:index/:operation?', (req, res) => {
  let indexName = req.params.index
  let operation = req.params.operation
  let body = req.body
  let from = req.query.from
  let size = req.query.size
  let url = URI(nconf.get('elasticsearch:base')).segment(indexName)
  if(operation) {
    url = url.segment(operation)
  }
  if(from) {
    url = url.addQuery('from', from)
  }
  if(size) {
    url = url.addQuery('size', size)
  }
  url = url.toString()
  console.log(JSON.stringify(body,0,2));
  console.log(url);
  axios({
    method: 'GET',
    url,
    auth: {
      username: nconf.get('elasticsearch:username'),
      password: nconf.get('elasticsearch:password'),
    },
    data: body
  }).then((response) => {
    res.status(200).json(response.data)
  }).catch((err) => {
    console.log(err);
    return res.status(500).send()
  })
})

router.get('/populateFilter/:index/:field', (req, res) => {
  let indexName = req.params.index
  let field = req.params.field

  //get filter data type
  let url = URI(nconf.get('elasticsearch:base')).segment(indexName).segment('_mapping').toString()
  const options = {
    method: 'GET',
    url,
    auth: {
      username: nconf.get('elasticsearch:username'),
      password: nconf.get('elasticsearch:password'),
    }
  };
  axios(options).then((mappings) => {
    let dataType = mappings.data[indexName].mappings.properties[field].type
    if(dataType === 'text') {
      field = `${field}.keyword`
    }
    let body = {
      size: 0,
      aggs: {
        uniq_values: {
          composite: {
            sources: [
              { value: { terms: { field: field } } }
            ]
          }
        }
      }
    }
    let url = URI(nconf.get('elasticsearch:base')).segment(indexName).segment('_search').toString()
    let next = true
    let buckets = []
    async.whilst(
      callback1 => {
        return callback1(null, next !== false);
      },
      callback => {
        let options = {
          method: 'GET',
          url,
          auth: {
            username: nconf.get('elasticsearch:username'),
            password: nconf.get('elasticsearch:password'),
          },
          data: body
        };
        next = false;
        axios(options).then((response) => {
          buckets = buckets.concat(response.data.aggregations.uniq_values.buckets)
          if(response.data.aggregations.uniq_values.buckets.length > 0) {
            body.aggs.uniq_values.composite.after = {}
            body.aggs.uniq_values.composite.after.value = response.data.aggregations.uniq_values.after_key.value
            next = true
          }
          return callback(null, next);
        }).catch((err) => {
          console.log(err);
          return res.status(500).send()
        })
      }, () => {
        return res.status(200).json(buckets)
      }
    );
  }).catch((err) => {
    console.log(err);
    return res.status(500).send()
  })


})
module.exports = router