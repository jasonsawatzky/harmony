import Users from './model'
import { ObjectID } from 'mongodb'

let users

class UserDao {
  constructor(conn) {
    users = Users(conn)
  }

  async get(id) {
    const user = {}
    const res = await users.findById(id).exec()

    user.id =res._id

    if (res.details) {
      user.details = {}
      res.details.forEach((value, key) => {
        user.details[key] = value
      })
    }

    const keys = [`firstName`, `lastName`, `userName`, `email`]
    keys.forEach(key => {
      user[key] = res.get(key)
    })

    return user
  }

  async create(id, user) {
    const cutID = id.slice(0,12)
    user["_id"] = ObjectID(cutID)
    return (await users.create(user))._id
  }

  async setDetail(userId, propName, value) {
    try {
      // const user = await this.get(userId)
      const user = await users.findById(userId).exec()

      user.set(`details.` + propName, value)

      await user.save()

      return user.id
    }
    catch(e) {
      console.log("Error setting User Detail", e)
    }
  }
}

export default function create(conn) {
  return new UserDao(conn)
}
