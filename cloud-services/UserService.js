const dynamodb = require('serverless-dynamodb-client');
const UserDAO = require('./dao/UserDAO.js');
const dao = new UserDAO(dynamodb, process.env.USER_TABLE_NAME);
const resourceName = "User";

module.exports.create = (event, context, callback) => {
  const resource = JSON.parse(event.body);

  dao.save(resource, (error, result) => {
    // Handle errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the ' + resourceName + '. Database error.',
      });
    }
    else {
      // Build a response
      const response = {
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    }
  });
};

module.exports.read = (event, context, callback) => {

  var id = event.pathParameters.id;
  dao.get(id, (error, result) => {
    // Handle errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t read the ' + this.resourceName + '.',
      });
    }
    else {
      // Build a response
      const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/javascript",
            "Access-Control-Allow-Origin" : "*", // Enable CORS
            "Access-Control-Allow-Credentials" : true // Allow credentials
        },
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    }
  });
}

module.exports.list = (event, context, callback) => {
  dao.list((error, result) => {
    // Handle errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t read the ' + this.resourceName + '.',
      });
    }
    else {
      // Build a response
      const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/javascript",
            "Access-Control-Allow-Origin" : "*", // Enable CORS
            "Access-Control-Allow-Credentials" : true // Allow credentials
        },
        body: JSON.stringify(result.Items),
      };
      callback(null, response);
    }
  });
}

module.exports.remove = (event, context, callback) => {
  var id = event.pathParameters.id;
  dao.delete(id, (error) => {
    // Handle errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t remove the ' + this.resourceName + '.',
      });
      return;
    }

    // Build a response
    const response = {
      statusCode: 200,
      body: JSON.stringify({}),
    };
    callback(null, response);
  });
}
