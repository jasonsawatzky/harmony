import { ObjectID } from 'mongodb'

let models
let cmodel
let id

export default class Dao {
  constructor(conn, { model, Models, id, map }) {
    if (model) {
      this.cmodel = model
      this.id = this.cmodel.get('id')
      return
    }
    this.models = Models(conn)
    this.id = id
  }

  static init(...args) {
    return new Dao(...args)
  }

  static async getAll(conn, Models) {
    const res = await (await Models(conn)).find().exec()
    return res.map(model =>
      new Dao(conn, { Models, model} )
    )
  }

  async model() {
    if (!this.cmodel) {
      this.cmodel = this.models.findById(this.id).exec()
    }

    return await this.cmodel
  }

  async get(prop) {
    if (prop === 'id') {
      return this.id
    }

    const model = await this.model()
    return await model[prop]
  }

  async set(propName, setFunction) {
    const model = await this.model()
    setFunction(model[propName])

    await model.save()

    return model.id
  }

  static async getByIndex (conn, Models, indexName, id) {
    const models = Models(conn)

    return models.find({
      [indexName]: ObjectID(id)
    })
  }

  static async getByIndexList(conn, Models, indexName, id) {
    const models = Models(conn)

    return models.find({
      'members': {
        $in: [id]
      }
    })
  }

  static async createDocument(conn, Models, props, id) {
    if (id) {
      props._id = id
    }

    const models = Models(conn)

    const model = (await models.create(props))

    return new Dao(conn, { Models, model, id} )
  }
}
