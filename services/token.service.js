'use strict'

const axios = require('axios')
const config = require('config')
const tokenMgmtConfig = config.get('tokenMgmtService')

const verifyToken = async (token) => {
  let url = tokenMgmtConfig.protocol + '://' + tokenMgmtConfig.host + ':' + tokenMgmtConfig.port + tokenMgmtConfig.verifyToken
  url = url.replace(':token', token)
  const apiConfig = {
    method: 'GET',
    url: url,
    headers: {
      Accept: 'application/json'
    },
    timeout: 3000,
    maxContentLength: 1000
  }

  try {
    const response = await axios(apiConfig).then(function (response) {
      return response.data
    })
    return response
  } catch (error) {
    console.error('Error while verifying token: %s %j', error, error)
    throw error
  }
}

module.exports = {
  verifyToken
}
