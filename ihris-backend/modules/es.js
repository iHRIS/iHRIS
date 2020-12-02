const axios = require('axios')
const URI = require('urijs');
const nconf = require('./config')

const getData = ({indexName, searchQuery}, callback) => {
  let url = URI(nconf.get('elasticsearch:base')).segment(indexName).segment('_search')
  url = url.toString()
  axios({
    method: 'GET',
    url,
    auth: {
      username: nconf.get('elasticsearch:username'),
      password: nconf.get('elasticsearch:password'),
    },
    data: searchQuery
  }).then((response) => {
    return callback(false, response.data)
  }).catch((err) => {
    return callback(err)
  })
}

module.exports = {
  getData
}