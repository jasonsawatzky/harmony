import * as cognito from './cognito'
import Dao from './dao'

let dao

class UserService {
  constructor(conn) {
    dao = Dao(conn)
  }

  get(id) {
    return dao.get(id)
  }

  getCurrent(context) {
    console.log(`User Service: getCurrent`)
    return context.auth ? this.get(context.auth.id) :  `No user session`
  }

  list() {
    console.log()
    return dao.getAll()
  }

  async create(user) {
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

  async getSession(credentials) {
    console.log("User Service: getSession:", credentials.username)
    return cognito.signIn(credentials)
  }
}

export default function create(conn) {
  return new UserService(conn)
}
