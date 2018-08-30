// import Dao, { createDocument } from '../../Dao'
import UserModels from '../model'
import { Group, GroupMemberView, getByMember } from 'group-service'
import * as cognito from '../cognito'
import { AbstractView, Dao } from 'service-components'

let dao
let conn

export default class User extends AbstractView {
  constructor({ conn, id, dao }) {
    super({ conn, id, dao, Models: UserModels })
  }

  static getSession(credentials) {
    return cognito.signIn(credentials)
  }

  static async create(conn, input) {
   try {
     const cogUser = await cognito.signUp(input)
     const id = cogUser.UserSub.slice(0,12)
     const dao = Dao.createDocument(conn, UserModels, input, id)
     return new this({ conn, dao })
   }
   catch(e) {
     console.log(`Error creating new user`, e)
   }
 }

  id() {
    return this.dao.get('id')
  }

  firstName() {
    return this.dao.get('firstName')
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
    const id = await this.id()
    const daos = await getByMember(this.conn, id)
    const groups = daos.map(async dao => {
      const creator = await dao.get('creator')
      if (JSON.stringify(creator) === JSON.stringify(id)) {
        return Group.init({ conn: this.conn, dao })
      }
      else {
        return GroupMemberView.init({ conn: this.conn, dao })
      }
    })

    return groups
  }

  async group(id) {
    return (await this.groups()).find(async group => await (await group).id() === id)
  }

  async startGroup(description) {
    return Group.create(this.conn, await this.id(), description)
  }
}
