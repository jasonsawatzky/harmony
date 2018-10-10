import { ObjectId } from 'mongodb'

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

  static ObjectId(id) {
    return ObjectId(id)
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

  async set(propName, setFunction, value) {
    const model = await this.model()

    if (value) {
      model[propName] = value
    }
    else {
      setFunction(model[propName])
    }

    await model.save()

    return model.id
  }

  static async getByIndex (conn, Models, indexName, id) {
    const models = Models(conn)

    return models.find({
      [indexName]: ObjectId(id)
    })
  }

  static async getByIndexList(conn, Models, indexName, id) {
    const models = Models(conn)

    return models.find({
      indexName: {
        $in: [id]
      }
    })
  }

  async getListElement(list, index, id) {
    // return this.models.findById(this.id).select({ [list]: {$elemMatch: { [index]: id }}})

    const suggestions = (await this.model())[list]
    return suggestions.find(suggestion =>
      this.equals(suggestion[index], id)
    )
  }

  async updateListElement(list, indexName, index, updateFunction, newItem) {
    const elements = await this.get(list)
    const model = await this.model()

    const found = elements.find(element => {
      if (this.equals(element[indexName], index)) {
        updateFunction(element)
        model.save()
        return true
      }
      else {
        return false
      }
    })
    if (!found) {
      elements.push(newItem)
    }

    return found || newItem
  }

  static async createDocument(conn, Models, props, id) {
    if (id) {
      props._id = id
    }

    const models = Models(conn)

    const model = (await models.create(props))

    return new Dao(conn, { Models, model, id} )
  }

  equals(a, b) {
    // console.log('equals: ', a, '|', b)
    return JSON.stringify(a) === JSON.stringify(b)
  }
}
