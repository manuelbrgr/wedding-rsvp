'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

/* POST /guests */
module.exports.submitGuest = async (event) => {
  const requestBody = JSON.parse(event.body);
  const {
    firstName,
    lastName,
    responded
  } = requestBody

  if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof responded !== 'boolean') {
    return buildResponse(400, 'Validation failed. Invalid input type(s)');
  }

  const guest = buildGuestItem(firstName, lastName, responded);

  await putGuest(guest);
  return buildResponse(200, guest)
}

/* Puts guest in dynamo table */
const putGuest = async function putGuestInDynamo(guest) {
  const guestItem = {
    TableName: process.env.GUESTS_TABLE,
    Item: guest,
  };

  await dynamoDb.put(guestItem).promise();
  return guest;
}

/* Creates a guest item */
const buildGuestItem = function buildGuestItemDynamoModel(firstName, lastName, responded) {
  return {
    id: uuid.v1(),
    'firstName': firstName,
    'lastName': lastName,
    'responded': responded,
  };
};


/* GET /guests */
module.exports.listGuests = async (event) => {
  let params = {
    TableName: process.env.GUESTS_TABLE,
    ProjectionExpression: "id, firstName, lastName, responded"
  };

  const data = await dynamoDb.scan(params).promise();

  return buildResponse(200, data.Items)
}

/*module.exports.deleteGuest = async (event) => {
  let uuid = `${event.pathParameters.uuid}`;
  let params = {
    TableName: process.env.GUESTS_TABLE,
    Key: {
      firstName: {"S": "Sally"},
      lastName: {"S": "Seashells"},
      responded: {"BOOL": false},
      'id': {'S': [uuid]}
    }
  }

  await dynamoDb.delete(params).promise()
  return buildResponse(200, `This works ${uuid}`)
}*/

const buildResponse = function buildHttpResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    },
    body: JSON.stringify({
      message: message
    })
  }
}