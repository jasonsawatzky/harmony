import * as dao from './dao'
import * as cognito from './cognito'

export function get(id) {
  return dao.get(id)
}

export function getCurrent(context) {
  console.log(context)
  return context.auth ? get(context.auth.id) :  `No user session`
}

export function list() {
  console.log()
  return dao.getAll()
}

export async function create(user) {
  console.log('User Service: create:', user)
  try {
    const cogUser = await cognito.signUp(user)
    const daoUser = await dao.create(cogUser.UserSub, user)
    return daoUser
  }
  catch(e) {
    console.log("create error", e)
  }
}

export async function getSession(credentials) {
  console.log("User Service: getSession:", credentials.id)
  return cognito.signIn(credentials)
}
