import {cognito as cognitoConfig} from 'deployment-config'
import {CognitoIdentityServiceProvider} from 'aws-sdk'
import {AuthenticationDetails, CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js'

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

  console.log("params: ", params)
  console.log("user: ", user)

  cognito.signUp(params, function(err, result){
    if (err) {
        console.log(err)
        return
    }
    console.log("success: ", result)
  })
}

export async function signIn(credentials) {
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
      const res = await authenticateUser;
      return res.idToken.jwtToken
    }
    catch(e) {
      console.log(e)
    }
}
