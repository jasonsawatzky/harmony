import { AbstractView, Dao } from 'service-components'
import QuestionModel from '../model'

let dao
let conn

const Models = QuestionModel

export default class Question extends AbstractView {
  constructor({ conn, id, dao }) {
    super({ conn, id, dao, Models: QuestionModel })
  }

  static create(conn, text, required, answers) {
   const dao = Dao.createDocument(conn, QuestionModel, {
     text: text,
     required: required,
     answers: answers.map(answer => {
       return { text: answer }
     })
   })
   return new this({ conn, dao })
  }

  static async getAll(conn) {
    return (await Dao.getAll(conn, Models)).map(dao => new this({ conn, dao }))
  }

  async id() {
    return (await this.dao).get('id')
  }

  text() {
    return this.dao.get('text')
  }

  required() {
    return this.dao.get('required')
  }

  async answers() {
    return this.dao.get('answers')

  }
}
