import { Dao } from 'service-components'
import GroupModel from './model'

import Group from './views/Group'
import GroupMemberView from './views/GroupMemberView'

export { Group, GroupMemberView }

export async function getByMember(conn, ownerId) {
  const models = await Dao.getByIndexList(conn, GroupModel, 'members', ownerId)
  const groups = models.map(model =>
    Dao.initDao(conn, { model: model, Model: GroupModel })
  )

  return groups
}
