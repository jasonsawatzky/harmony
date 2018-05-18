'use strict';

module.exports.status = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: "harmony-api is up!\n",
  };

  callback(null, response);
};
