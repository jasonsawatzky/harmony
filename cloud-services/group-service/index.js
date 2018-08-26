import Dao, { createDocument, getByIndex } from '../Dao'
import GroupModel from './model'
import { getUser } from 'user-service'

let dao
let conn
class Group {
  constructor(conn, id, dao) {
    if (dao) {
      this.dao = dao
    }
    else {
      this.dao = Dao(conn, { Model: GroupModel, id: id })
    }
    this.conn = conn
  }

  id() {
    return this.dao.get('id')
  }

  async creator() {
    return getUser(this.conn, (await this.dao.get('creator')))
  }

  async members() {
    const memberIds = await this.dao.get('members')
    return memberIds.map(userId =>
      getUser(this.conn, userId)
    )
  }

  addMembers(memberIds) {
    return this.dao.set('members', members => members.push(memberIds))
  }

  description() {
    return this.dao.get('description')
  }
}

export default function (conn, id) {
  return new Group(conn, id)
}

export async function getGroupByOwner(conn, ownerId) {
  const models = await getByIndex(conn, GroupModel, 'creator', ownerId)
  const groups = models.map(model =>
    Dao(conn, { model: model, Model: GroupModel })
  ).map(dao =>
    new Group(conn, null, dao)
  )

  return groups
}

export function createGroup(conn, creator, description) {
  const dao = createDocument(conn, GroupModel, {
    creator: creator,
    description: description
  })
  return new Group(conn, null, dao)

}
