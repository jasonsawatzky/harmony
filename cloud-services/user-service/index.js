const dao = require('./dao') //TODO Switch to import
const cognito = require('./cognito')
console.log(cognito)

export function get(id) {
  console.log("user service: get")
  console.log("dao", dao)
  return dao.get(id)
}

export function list() {
  return dao.getAll()
}

export async function create(user) {
  console.log("user service: create: user: ", user)

  cognito.signUp(user)

  return (await dao.create(user))._id
}

export async function getSession(credentials) {
  return cognito.signIn(credentials)
}
