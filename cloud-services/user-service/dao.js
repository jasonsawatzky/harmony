const users = require('./schema')
console.log("dao", users)
export function get (id) {
  console.log("userdao : get")
  return users.findOne({ id })
}

export function getAll() {
  return users.find()
}

export async function create(user) {
  console.log("userdao : create")
  return (await User.create(user))._id
}
