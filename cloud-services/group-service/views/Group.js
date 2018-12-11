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

  static async create(conn, creator, description) {
   const dao = await  Dao.createDocument(conn, GroupModel, {
     creator: creator,
     members: [creator],
     description: description
   })
   return new this({ conn, dao })
  }

  async creator() {
    return UserGroupmateView.init({ conn: this.conn, id: (await this.dao.get('creator')), type: 'GroupMate' })
  }

  async members() {
    const memberIds = await this.dao.get('members')
    return memberIds.map(userId =>
      UserGroupmateView.init({ conn: this.conn, id: userId, type: 'GroupMate' })
    )
  }

  addMembers(memberIds) {
    return this.dao.set('members', members => members.push(memberIds))
  }

  description() {
    return this.dao.get('description')
  }


}
