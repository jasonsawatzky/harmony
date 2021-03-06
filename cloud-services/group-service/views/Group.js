import { AbstractView, Dao } from 'service-components'
import GroupModel from '../model'
import { User, UserGroupmateView } from 'user-service'

let dao
let conn

const Models = GroupModel

export default class Group extends AbstractView {
  constructor({ conn, id, dao }) {
    super({ conn, id, dao, Models: GroupModel })
  }

  static async getAll(conn) {
    return (await Dao.getAll(conn, GroupModel)).map(dao => new this({ conn, dao }))
  }

  static create(conn, creator, description) {
   const dao = Dao.createDocument(conn, GroupModel, {
     creator: creator,
     members: [creator],
     description: description
   })
   return new this({ conn, dao })
  }

  async creator() {
    return User.init({ conn: this.conn, id: (await this.dao.get('creator')) })
  }

  async members() {
    const memberIds = await this.dao.get('members')
    return memberIds.map(userId =>
      UserGroupmateView.init({ conn: this.conn, id: userId })
    )
  }

  addMembers(memberIds) {
    return this.dao.set('members', members => members.push(memberIds))
  }

  description() {
    return this.dao.get('description')
  }


}
