import Group from './Group'

export default class GroupMemberView extends Group {
  addMembers(memberIds) {
    console.log(`You aren't authorized to add members to a group you didn't create`)
    return null
  }
}
