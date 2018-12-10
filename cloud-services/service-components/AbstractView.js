import Dao from './Dao'

export default class AbstractView {
  constructor({ conn, id, dao, Models }) {
    if (dao) {
      this.dao = dao
    }
    else {
      this.dao = Dao.init(conn, { Models: Models, id: id })
    }
    this.conn = conn
  }

  id() {
    return JSON.parse(JSON.stringify(this.dao.id))
  }

  gqlType() {
    return this.type
  }

  static init({ conn, id, dao, type }) {
   const view =  new this({ conn, id, dao })
   view.type = type
   return view
  }
}
