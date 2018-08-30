import { AbstractView, Dao } from 'service-components'
import QuestionModel from '../model'
import { Question } from 'user-service'

let dao
let conn

const Models = QuestionModel

export default class Question extends AbstractView {
  constructor({ conn, id, dao }) {
    super({ conn, id, dao, Models: QuestionModel })
  }

  static create(conn, text, required) {
   const dao = Dao.createDocument(conn, QuestionModel, {
     text: text,
     required: required
   })
   return new this({ conn, dao })
  }

  id() {
    return this.dao.getId()
  }

  text() {
    return this.dao.get('text')
  }

  required() {
    return this.dao.get('required')
  }
}
