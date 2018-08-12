import * as cognito from './cognito'
import Dao from './dao'

let dao

class UserService {
  constructor(conn) {
    dao = Dao(conn)
  }

  get(context, id) {
    return dao.get(id)
  }

  getCurrent(context) {
    return context.auth ? this.get(context, context.auth.id) :  `No user session`
  }

  async create(user) {
    try {
      const cogUser = await cognito.signUp(user)
      const daoUser = dao.create(cogUser.UserSub, user)
      return daoUser
    }
    catch(e) {
      console.log("create error", e)
    }
  }

  getSession(credentials) {
    return cognito.signIn(credentials)
  }
}

export default function create(conn) {
  return new UserService(conn)
}
