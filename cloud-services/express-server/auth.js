import {promisify} from 'util'
import jwt from 'jsonwebtoken'
import{cognito as cognitoConfig} from 'deployment-config'
import { ObjectId } from 'mongodb'

// https://aws.amazon.com/blogs/mobile/integrating-amazon-cognito-user-pools-with-api-gateway/

/*
** Express middleware for authentication
*/
export async function authExpress(req, res, next) {
  try {
    const token = req.headers['x-access-token']
    req.auth = await (authenticateToken(token))
    next()
  }
  catch(e) {
    res.status(500).send({ error: e })
  }
}

export async function authenticateToken(token) {
  if (!token) {
    console.log('No token in request')
    return null // TODO Add appropriate message for client
  }

  const decodedJwt = jwt.decode(token, {complete: true})
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
      // Verify the validity of the token
      const verifyToken =  promisify(jwt.verify)
      const auth = await verifyToken(token, cognitoConfig.pems[decodedJwt.header.kid], { issuer: decodedJwt.payload.iss })

      auth.id = ObjectId(auth.sub.slice(0,12)) // Trim the cognito UserSub to a 12 character ID
      console.log('Verified user session:')
      return auth
    }
    catch(e) {
      console.log('Can not verify token')
      return null // TODO Add appropriate message for client
    }
  }
}
