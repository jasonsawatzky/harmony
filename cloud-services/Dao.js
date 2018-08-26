import { ObjectID } from 'mongodb'

let models
let cmodel
let id

class Dao {
  constructor(conn, { model, Model, id }) {
    if (model) {
      this.cmodel = model
      return
    }
    this.models = Model(conn)
    this.id = id
  }

  async model() {
    if (!this.cmodel) {
      this.cmodel = this.models.findById(this.id).exec()
    }

    return await this.cmodel
  }

  async get(prop) {
    if (prop === 'id') {
      prop = '_id'
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
}

export default function (...args) {
  return new Dao(...args)
}

export async function getByIndex (conn, Models, indexName, id) {
  const models = Models(conn)

  return models.find({
    [indexName]: ObjectID(id)
  })
}

export async function createDocument(conn, Models, props, id) {
  if (id) {
    props._id = id
  }

  const model = Models(conn)

  id = (await model.create(props))._id

  return new Dao(conn, { model, id} )
}
