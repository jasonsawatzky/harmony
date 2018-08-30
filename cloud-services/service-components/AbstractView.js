import { initDao } from './Dao'

export default class AbstractView {
  constructor({ conn, id, dao, Models }) {
    if (dao) {
      this.dao = dao
    }
    else {
      this.dao = initDao(conn, { Models: Models, id: id })
    }
    this.conn = conn
}

  static init({ conn, id, dao }) {
   return new this({ conn, id, dao })
  }
}
