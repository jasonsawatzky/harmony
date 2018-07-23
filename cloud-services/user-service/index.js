const dao = require('./dao')

export function get(id) {
  console.log("user service: get")
  return dao.get(id)
}

export function list() {
  return dao.getAll()
}

export async function create(user) {
  return (await dao.create(user))._id
}
