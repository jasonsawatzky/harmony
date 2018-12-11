import UserModels from '../model'
import { Group, GroupMemberView, getByMember } from 'group-service'
import * as cognito from '../cognito'
import { AbstractView, Dao } from 'service-components'
import { Question } from 'question'

let dao
let conn
const undefRating = 3

const Models = UserModels

export default class User extends AbstractView {
  constructor({ conn, id, dao }) {
    super({ conn, id, dao, Models: Models })
  }

  async activeGroup() {
    const activeGroup = await this.dao.get('activeGroup')
    return activeGroup ? GroupMemberView.init({ conn: this.conn, id: activeGroup, requester: this }) : null
  }

  async setActiveGroup(id) {

    // const groups = (await this.groups()).map(group => group.id())

    // Enable after fixing User.groups
    // if (!(id in groups)) {
    //   return Error('User is not a member of this group')
    // }
    try {
      await this.dao.set('activeGroup', null, id)
      return 'Succesfully set ActiveGroup'
    }
    catch (e) {

    }
  }

  static auth(credentials) {
    return cognito.token(credentials)
  }

  static async initAuth(conn, credentials) {
    return this.init({ conn: conn, id: await cognito.userId(credentials), type: 'CurrentUser' })
  }

  static async getAll(conn) {
    return (await Dao.getAll(conn, UserModels)).map(dao => new this({ conn, dao }))
  }

  static async create(conn, input) {
   try {
     const cogUser = await cognito.signUp(input)
     const id = cogUser.UserSub.slice(0,12)
     const dao = await Dao.createDocument(conn, UserModels, input, id)
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

    if (!details) return

    const output = {}
    details.forEach((value, name) => output[name] = value)

    return output
  }

  setDetail(name, value) {
    return this.dao.set('details', details => details.set(name, value))
  }

  async groups() {
    const id = await this.id()
    const daos = await getByMember(this.conn, this)
    const groups = daos.map(async dao => {
      const creator = await dao.get('creator')
      if (JSON.stringify(creator) === JSON.stringify(id)) {
        return Group.init({ conn: this.conn, dao })
      }
      else {
        return GroupMemberView.init({ conn: this.conn, dao, requester: this })
      }
    })

    return groups
  }

  async group(id) {
    //TODO Check group membership
    return (await this.groups()).find(async group => await (await group).id() === id)
  }

  async startGroup(description) {
    return Group.create(this.conn, await this.id(), description)
  }

  async comparisonPoint(id) {
    return (await this.dao.get('comparisonPoints')).find(point =>
      this.dao.constructor.equals(point.question, id))
  }

  async answerQuestion(id, choice) {
      await this.dao.updateListElement(
        'comparisonPoints',
        'question',
        id,
        point => point.choice = choice,
        {
          question: id,
          choice
        }
      )

      return "Successfully answered Question"
  }

  async rateAnswer(question, answer, rating) {
    try {
      const model = await this.dao.model()

      if (!model.comparisonPoints) model.comparisonPoints = []

      const cp = model.comparisonPoints.find(cp => this.dao.equals(cp.question, question))

      if(!cp.answerRatings) cp.answerRatings = []

      const answerRating = cp.answerRatings.find(ans => this.dao.equals(ans.answer, answer))

      if (!answerRating) {
        cp.answerRatings.push({
          answer,
          rating
        })
      }
      else {
        answerRating.rating = rating
      }

      await model.save()
      return 'Succesfully rated Answer'
    }
    catch(e) {
      return 'Error rating answer: ' + e
    }
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
}
