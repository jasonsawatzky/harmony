import users from './model'
import { ObjectID } from 'mongodb'
import { hash } from 'bcryptjs' //TODO Switch to less expensive hash

export function get(id) {
  const res = users.findById(id)
  return res
}

export function getAll() {
  return users.find()
}

export async function create(id, user) {
  const cutID = id.slice(0,12)
  user["_id"] = ObjectID(cutID)
  return (await users.create(user))._id
}
