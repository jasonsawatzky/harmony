import {promisify} from 'util'
import jwt from 'jsonwebtoken'
import{cognito as cognitoConfig} from 'deployment-config'

// https://aws.amazon.com/blogs/mobile/integrating-amazon-cognito-user-pools-with-api-gateway/

export async function authRequest(req, res, next) {
  try {
    req.auth = await (auth(req))
    next()
  }
  catch(e) {
    res.status(500).send({ error: e })
  }
}

export async function auth(req) {
  const token = req.headers['x-access-token'];
  if (!token) {
    req.user = null
    console.log('No AUTH in request')
    return req
  }

  const decodedJwt = jwt.decode(token, {complete: true});
  if (!decodedJwt) {
    throw 'Invalid token'
  }
  else if (decodedJwt.payload.iss != cognitoConfig.iss) {
    throw 'Invalid issuer'
  }
  // else if (decodedJwt.payload.token_use != 'access') {
  //   throw new Error('Not an access token')
  // }
  else if (!cognitoConfig.pems[decodedJwt.header.kid]) {
    throw 'Invalid access token'
  }
  else {
    try {
      const verifyToken =  promisify(jwt.verify)
      const res = await verifyToken(token, cognitoConfig.pems[decodedJwt.header.kid], { issuer: decodedJwt.payload.iss })
      console.log("Verified token: ", res)
      return res
    }
    catch(e) {
      throw 'Can not verify token'
    }
  }
}
