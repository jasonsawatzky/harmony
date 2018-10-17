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

  static init({ conn, id, dao }) {
   return new this({ conn, id, dao })
  }
}
