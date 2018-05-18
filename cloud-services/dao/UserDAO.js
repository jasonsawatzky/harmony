const uuidv1 = require('uuid/v1');

class UserDAO {
  constructor(db, tableName) {
    this.db = db.doc
    this.tableName = tableName;
  }

  save(user, callback) {
    const timestamp = new Date().getTime();

    var id = (user.id != null ? user.id : uuidv1());
    console.log(user)
    console.log("TEST")
    const params = {
      TableName: this.tableName,
      Item: {
        id: id,
        name: user.name,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };

    this.db.put(params, callback);
  }

  get(id, callback) {
    const params = {
      TableName: this.tableName,
      Key: {
        id : id
      },
    };

    this.db.get(params, callback);
  }

  list(callback) {
    const params = {
      TableName: this.tableName,
    };

    this.db.scan(params, callback);
  }

  delete(id, callback) {

    const params = {
      TableName: this.tableName,
      Key: {
        id : id
      },
    };

    this.db.delete(params, callback);
  }
}

module.exports = UserDAO;
