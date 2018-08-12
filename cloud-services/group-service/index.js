import Dao from './dao'
import UserService from 'user-service'

let dao

class GroupService {
  constructor(conn) {
    dao = Dao(conn)
  }

  get(context, id) {
    return dao.get(id)
  }

  getUserGroups(context, userId) {
    console.log("getUserGroups")
    return dao.getByOwner(userId)
  }

  addMembers(context, group, memberIds) {
    // TODO Check permissions
    // if (group.creator !== context.auth.id) {
    // }

    return dao.addMembers(group.id, memberIds)
  }

  getMembers(context, group) {
    const userService = UserService(context.conn)

    const users = group.members.map(member => {
      return userService.get(context, member)
    })

    return users
  }

  create(context, owner, description) {
    try {

      // TODO Check permissions
      // if (owner !== context.auth.id) {
      // }

      const group = dao.create({
        creator: owner,
        description: description
      })
      return group
    }
    catch(e) {
      console.log("Error creating group", e)
    }
  }
}

export default function create(conn) {
  return new GroupService(conn)
}
