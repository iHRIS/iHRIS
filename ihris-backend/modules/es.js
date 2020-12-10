const axios = require('axios')
const URI = require('urijs');
const async = require('async')
const nconf = require('./config')

const getData = ({indexName, searchQuery}, callback) => {
  let error = false
  let documents = []
  if(!searchQuery) {
    searchQuery = {}
  }
  searchQuery.size = 10000
  let url = URI(nconf.get('elasticsearch:base'))
    .segment(indexName)
    .segment('_search')
    .addQuery('scroll', '1m')
    .toString()
  let scroll_id = null
  async.doWhilst(
    (callback) => {
      axios({
        method: 'POST',
        url,
        data: searchQuery,
        auth: {
          username: nconf.get('elasticsearch:username'),
          password: nconf.get('elasticsearch:password'),
        }
      }).then((response) => {
        if(response.data.hits && response.data.hits.hits && Array.isArray(response.data.hits.hits)) {
          documents = documents.concat(response.data.hits.hits)
        }
        if(response.data.hits.hits.length === 0 || !response.data._scroll_id) {
          scroll_id = null
        } else {
          scroll_id = response.data._scroll_id
          url = URI(nconf.get('elasticsearch:base')).segment('_search').segment('scroll').toString()
          searchQuery = {
            scroll: '1m',
            scroll_id: scroll_id
          }
        }
        return callback(null)
      }).catch((err) => {
        error = err
        console.error(err);
        scroll_id = null
        return callback(null)
      })
    }, (callback) => {
      return callback(null, scroll_id !== null)
    }, () => {
      return callback(error, documents)
    }
  )
}

module.exports = {
  getData
}