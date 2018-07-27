const jwt = require('jsonwebtoken')
const request = require('request')
const jwkToPem = require('jwk-to-pem')

process.env.DEPLOYMENT_STAGE = process.argv[2]
const cognito = require('deployment-config').cognito
let url = 'https://cognito-idp.{' + cognito.region + '}.amazonaws.com/{' + cognito.userPoolId + '}/.well-known/jwks.json'
console.log(url)

//Download the JWKs and save it as PEM
request({
    url: 'https://cognito-idp.' + cognito.region + '.amazonaws.com/' + cognito.userPoolId + '/.well-known/jwks.json',
    json: true
  },
  function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const pems = {}
      var keys = body['keys']
      for(var i = 0; i < keys.length; i++) {
        //Convert each key to PEM
        var key_id = keys[i].kid;
        var modulus = keys[i].n
        var exponent = keys[i].e
        var key_type = keys[i].kty
        var jwk = { kty: key_type, n: modulus, e: exponent}
        var pem = jwkToPem(jwk)
        pems[key_id] = pem
      }

      console.log(pems)
    }
  else {
    //Unable to download JWKs, fail the call
    console.log("Problem downlowding JWKs")
  }
})
