import Users from './model'
import { ObjectID } from 'mongodb'

let users

class UserDao {
  constructor(conn) {
    users = Users(conn)
  }

  async get(id) {
    const res = await users.findById(id)
    res.id =res._id
    delete res._id
    return res
  }

  async create(id, user) {
    const cutID = id.slice(0,12)
    user["_id"] = ObjectID(cutID)
    return (await users.create(user))._id
  }
}

export default function create(conn) {
  return new UserDao(conn)
}
