import { cognito as cognitoConfig } from 'deployment-config'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import { promisify } from 'util'

const cognito = new CognitoIdentityServiceProvider({
  region: cognitoConfig.region
})

export async function signUp(user) {
  const params = {
    ClientId: cognitoConfig.clientId, /* required */
    Password: user.password, /* required */
    Username: user.username, /* required */
    UserAttributes: [
      {
        Name: 'given_name',
        Value: user.firstName + ' ' + user.lastName
      },
      {
        Name: 'email',
        Value: user.email
      },
      {
        Name: 'phone_number',
        Value: '+1111111111'
      },
    ]
  }

  const promise = new Promise(function (resolve, reject) {
    cognito.signUp(params, function(err, res) {
      if (err) {
        reject(err)
      }
      else {
        resolve(res)
      }
    })
  })

  try {
    const res = await promise
    console.log(`Cognito: User signed up:`, res)
    return res
  }
  catch(e) {
    console.log(`Cognito: Error signing up user:`, e)
  }
}

async function verifyCredentials(credentials) {
  const authenticationData = {
      Username : credentials.username,
      Password : credentials.password,
    }

    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
      UserPoolId : cognitoConfig.userPoolId,
      ClientId : cognitoConfig.clientId
    }
    const userPool = new CognitoUserPool(poolData)
    const userData = {
        Username : credentials.username,
        Pool : userPool
    }
    const cognitoUser = new CognitoUser(userData);

    const authenticateUser = new Promise(function(resolve, reject) {
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result)=>resolve(result),
          onFailure: (error)=>reject(error)
      })
    })

    try {
      return await authenticateUser;
    }
    catch(e) {
      console.log(`Cognito: Error verifying User credentials:`, e)
    }
}

export async function token(credentials) {
  return (await verifyCredentials(credentials)).idToken.jwtToken
}

export async function userId(credentials) {
  const subscriberId = (await verifyCredentials(credentials)).idToken.payload.sub
  return subscriberId.slice(0,12) // Trim the cognito UserSub to a 12 character ID

  return (await verifyCredentials(credentials))
}
