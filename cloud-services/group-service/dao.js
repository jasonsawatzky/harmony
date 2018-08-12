import Groups from './model'
import { ObjectId } from 'mongodb'

let groups

class GroupDao {
  constructor(conn) {
    groups = Groups(conn)
  }

  async addMembers(groupId, memberIds) {
    try {
      const group = await this.get(groupId)
      group.members.push(memberIds)
      group.save()

      return group.id
    }
    catch(e) {
      console.log("error getting group", e)
    }
  }

  async get(id) {
    const res = await groups.findById(id)
    res.id =res._id
    delete res._id
    return res
  }

  async getByOwner(ownerId) {
    const res = await groups.find({
      creator: ObjectId(ownerId)
    })

    res.id =res._id
    delete res._id
    console.log(res)

    return await res
  }

  async create(group) {
    return (await groups.create(group))._id
  }
}

export default function create(conn) {
  return new GroupDao(conn)
}
