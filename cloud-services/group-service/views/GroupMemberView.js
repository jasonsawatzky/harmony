import Group from './Group'
import GroupSuggestedView from './GroupSuggestedView'
import Match from './Match'
import { agnes, Cluster, ClusterLeaf } from '../../ml-hclust'
import MatchModel from '../match-model'
import { getMatchByGroup } from 'group-service'
const undefRating = 3

export default class GroupMemberView extends Group {
  static init({ conn, id, dao, Models, requester }) {
    const that = Group.init.bind(this)({ conn, id, dao, Models })
    that.requester = requester
    return that
  }

  addMembers(memberIds) {
    console.log(`You aren't authorized to add members to a group you didn't create`)
    return null
  }

  async setSuggestedStatus(group, status) {
    if (!(await this.dao.updateListElement('suggested', 'group', group.id(), suggested => suggested.status = status))) {
      return Error('This group has not been recommended')
    }
  }

  like(group, selfStatus) {
    this.setSuggestedStatus(group, 'like')
    if(selfStatus === 'like') {
      this.matchWith(group)
    }
  }

  dislike(group) {
    this.setSuggestedStatus(group, 'dislike')
  }

  async matchWith(group) {
    const Match = MatchModel(this.conn)

    let match = await this.match(group)
    match = 0

    if (!match) {
     Match.create({
       groups: [
         group.id(),
         this.id()
       ],
       conversation: [],
       time: new Date().toString()
     })
    }
  }

  async match(id) {
    return Match.init({ conn: this.conn, id, requester: this.requester })
  }

  async matches() {
   const daos = await getMatchByGroup(this.conn, this)

   return await Promise.all(daos.map(async dao =>
     Match.init({ conn: this.conn, dao })
   ))
 }

  async suggested(id) {
    const suggested = await this.dao.getListElement('suggested', 'group', id)

    return suggested ? GroupSuggestedView.init({ conn: this.conn, id: suggested.group, requester: this }) : Error('This group was not suggested')
  }

  static userDistance(userA, userB) {
    const differences = userA.points.map(pointA => {
      const pointB = userB.points.find(point => equals(point.question, pointA.question))

      return pointB ? this.pointDistance(pointA, pointB) : undefRating
    })

    return differences.reduce((total, diff) => parseInt(JSON.stringify(total)) + parseInt(JSON.stringify(diff)), 0)
  }

  static pointDistance(pointA, pointB) {
    if (!pointB.answerRatings || !pointA.choice) return undefRating

    const choiceRating = pointB.answerRatings.find(rating => equals(rating.answer, pointA.choice))

    return parseInt(JSON.stringify(choiceRating ? 5 - choiceRating.rating : undefRating))
  }

  static async comparisonPoints(conn) {
    const others =  await this.getAll(conn)
    return await Promise.all(others.map(async other => other.comparisonPoints()))
  }

  async topSuggestions() {
    const user = await this.comparisonPoints()
    const others = await this.constructor.comparisonPoints(this.conn)
    const userDistances = others.map(other => { return {
        user: other.user,
        distance: this.constructor.userDistance(user, other)
      }
    })
    const orderedUserRatings = userDistances.sort((user1, user2) => user1.distance - user2.distance)
    return orderedUserRatings
  }

  addSuggested(group) {
    return this.dao.set(
      'suggested',
      suggested => suggested.push({
        group
      }),
      [{ group }]
    )
  }

  async suggestion() {
    const cluster = await this.constructor.clusters(this.conn)
    const id = await this.id()

    const path = await cluster.findPath(async cluster =>
      !(cluster instanceof ClusterLeaf) && cluster.value && equals(await cluster.value.id(), id))

    if (path.length > 2) {
      let res = path[1].children[0].value

      if (this.dao.equals(res.id(), this.dao.constructor.ObjectId(this.id()))) {
        res = path[1].children[1].value
      }

      this.addSuggested(res.id())
      return res
    }

  }

  static async clusters(conn) {
    const groups = await Group.getAll(conn)
    const users = []

    const clusters = await Promise.all(groups.map(async group => {
      const members = await group.members()
      const clusters = await Promise.all(members.map(async member => {
        const points = await member.comparisonPoints()
        users.push(points)
        return new ClusterLeaf(users.length - 1, member)
      }))

      const cluster = new Cluster(group)
      cluster.index = clusters
      cluster.children = clusters
      cluster.distance = 0
      return cluster
    }))



    const cluster = new agnes(
      users,
      {
        disFunc: this.userDistance.bind(this),
        clusters: await Promise.all(clusters)
      }
    )

    return cluster
  }
}

function equals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}
