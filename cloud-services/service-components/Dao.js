import { ObjectID } from 'mongodb'

let models
let cmodel
let id

class Dao {
  constructor(conn, { model, Models, id }) {
    if (model) {
      this.cmodel = model
      this.id = this.cmodel.get('id')
      return
    }
    this.models = Models(conn)
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
}

export function initDao(...args) {
  return new Dao(...args)
}

export async function getByIndex (conn, Models, indexName, id) {
  const models = Models(conn)

  return models.find({
    [indexName]: ObjectID(id)
  })
}

export async function getByIndexList(conn, Models, indexName, id) {
  const models = Models(conn)

  return models.find({
    'members': {
      $in: [id]
    }
  })
}

export async function createDocument(conn, Models, props, id) {
  if (id) {
    props._id = id
  }

  const models = Models(conn)

  const model = (await models.create(props))

  return new Dao(conn, { Models, model, id} )
}
