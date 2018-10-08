// import Dao, { createDocument } from '../../Dao'
import { UserGroupmateView } from 'user-service'
import UserModels from '../model'
import { Group, GroupMemberView, getByMember } from 'group-service'
import * as cognito from '../cognito'
import { AbstractView, Dao } from 'service-components'
import { Question } from 'question'
import { agnes, Cluster, ClusterLeaf } from '../../ml-hclust'

let dao
let conn
const undefRating = 3

const Models = UserModels

export default class User extends AbstractView {
  constructor({ conn, id, dao }) {
    super({ conn, id, dao, Models: Models })
  }

  static getSession(credentials) {
    return cognito.signIn(credentials)
  }

  static async getAll(conn) {
    return (await Dao.getAll(conn, UserModels)).map(dao => new this({ conn, dao }))
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

  async comparisonPoint(id) {
    return (await this.dao.get('comparisonPoints')).find(point =>
      JSON.stringify(point.question) === JSON.stringify(id))
  }

  updateListItem(items, indexName, index, updateFunction, newItem) {
    const found = items.find(item => {
      if (JSON.stringify(item[indexName]) === JSON.stringify(index)) {
        updateFunction(item)
        return true
      }
      else {
        return false
      }
    })
    if (!found) {
      items.push(newItem)
    }
  }


  answerQuestion(id, choice) {
    this.dao.set('comparisonPoints', points =>
      this.updateListItem(
        points,
        'question',
        id,
        point => point.choice = choice,
        {
          question: id,
          choice
        }
      )
    )
  }

  rateAnswer(question, answer, rating) {
    this.dao.set('comparisonPoints', points => this.updateListItem(
        points,
        'question',
        question,
        point => this.updateListItem(
          point.answerRatings,
          'answer',
          answer,
          answerRating => answerRating.rating = rating,
          {
            answer,
            rating
          }
        ),
        {
          question,
          answerRatings: []
        }
      )
    )
  }

  async comparisonPoints() {
    const pointModels = await this.dao.get('comparisonPoints')
    const points = pointModels.map(point =>
      Object.assign(
        {},
        {
          question: point.question,
          choice: point.choice,
          answerRatings: point.answerRatings
        }
      ))

    return {
      user: this.id(),
      points
    }
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

  async suggestion() {
    const cluster = await this.constructor.clusters(this.conn)
    const id = await this.id()

    const path = cluster.findPath(async cluster =>
      cluster instanceof ClusterLeaf && cluster.value && await cluster.value.id() === id)

    if (path.length > 2) {
      return path[1].value
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

function extractPropList(list, propName) {
  return list.map(item => item[propName])
    .reduce((values, value) => values.concat(value), [])
}

function equals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}
