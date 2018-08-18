import * as cognito from './cognito'
import Dao from './dao'

let dao

class UserService {
  constructor(conn) {
    dao = Dao(conn)
  }

  get(context, id) {
    console.log("getUser:", id)
    return dao.get(id)
  }

  setDetail(context, userId, propName, value) {
    console.log(context.auth.id, userId)
    dao.setDetail(userId, propName, value)
  }

  getDetails(context, user) {
    return user.details
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
