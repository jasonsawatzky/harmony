import { Dao } from 'service-components'
import GroupModel from './model'
import MatchModel from './match-model'

import Group from './views/Group'
import GroupMemberView from './views/GroupMemberView'
import GroupSuggestedView from './views/GroupSuggestedView'

export { Group, GroupMemberView, GroupSuggestedView }

export async function getByMember(conn, owner) {
  return Dao.getByIndexList(conn, GroupModel, 'members', owner)

}

export async function getMatchByGroup(conn, group) {
  return Dao.getByIndexList(conn, MatchModel, 'groups', group)

}
