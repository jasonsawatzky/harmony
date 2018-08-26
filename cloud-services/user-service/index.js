import Dao, { createDocument } from '../Dao'
import UserModel from './model'
import { getGroupByOwner, createGroup } from 'group-service'
import * as cognito from './cognito'

let dao
let conn

class User {
  constructor(conn, id, dao) {
    if (dao) {
      this.dao = dao
    }
    else {
      this.dao = Dao(conn, { Model: UserModel, id: id })
    }
    this.conn = conn
  }

  id() {
    return this.dao.get('id')
  }

  firstName() {
    return this.dao.get('firstName')
  }

  setFirstName() {
  }

  lastName() {
    return this.dao.get('lastName')
  }

  username() {
    return this.dao.get('username')
  }

  email() {
    return this.dao.get('email')
  }

  birthdate() {
    return this.dao.get('birthdate')
  }

  async details() {
    const details = await this.dao.get('details')
    const output = {}
    details.forEach((value, name) => output[name] = value)

    return output
  }

  setDetail(name, value) {
    return this.dao.set('details', details => details.set(name, value))
  }

  async groups() {
    return getGroupByOwner(this.conn, await this.id())
  }

  async group(id) {
    return (await this.groups()).find(async group => await group.id() === id)
  }

  async startGroup(description) {
    return createGroup(this.conn, await this.id(), description)
  }
}

export default function (conn, id) {
  return new User(conn, id)
}

export async function create(conn, input) {
  try {
    const cogUser = await cognito.signUp(input)
    const id = cogUser.UserSub.slice(0,12)
    const dao = createDocument(conn, UserModels, input, id)
    return new User(conn, null, dao)
  }
  catch(e) {
    console.log(`Error creating new user`, e)
  }
}

export function getUser(conn, id) {
  return new User(conn, id)
}

export function getSession(credentials) {
  return cognito.signIn(credentials)
}
