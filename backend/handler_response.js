"use strict";

const uuid = require("uuid");
const AWS = require("aws-sdk");
AWS.config.setPromisesDependency(require("bluebird"));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

/* POST /responses/accept */
module.exports.submitResponse = async (event) => {
  const requestBody = JSON.parse(event.body);
  const {
    firstName,
    attendingCeremony,
    eatingMeat,
    dietaryRestrictions,
    guests,
  } = requestBody;

  if (
    typeof firstName !== "string" ||
    typeof attendingCeremony !== "boolean" ||
    typeof eatingMeat !== "boolean" ||
    typeof dietaryRestrictions !== "string" ||
    Array.isArray(guests) === false
  ) {
    return buildResponse(400, "Validation failed. Invalid input type(s)");
  }

  const response = buildResponseItem(
    firstName,
    attendingCeremony,
    eatingMeat,
    dietaryRestrictions,
    guests
  );

  await putResponse(response);
  return buildResponse(200, response);
};

/* Puts response in dynamo table */
const putResponse = async function putResponseInDynamo(response) {
  const responseItem = {
    TableName: process.env.RESPONSES_TABLE,
    Item: response,
  };

  await dynamoDb.put(responseItem).promise();
  return response;
};

/* Creates response item */
const buildResponseItem = function buildResponseItemDynamoModel(
  firstName,
  attendingCeremony,
  eatingMeat,
  dietaryRestrictions,
  guests
) {
  let timestamp = new Date().toLocaleString();
  return {
    id: uuid.v1(),
    firstName: firstName,
    attendingCeremony: attendingCeremony,
    eatingMeat: eatingMeat,
    dietaryRestrictions: dietaryRestrictions,
    guests: guests,
    timestamp: timestamp,
  };
};

/* GET /responses */
module.exports.listResponses = async (event) => {
  let params = {
    TableName: process.env.RESPONSES_TABLE,
    ExpressionAttributeNames: { "#t": "timestamp" },
    ProjectionExpression:
      "id, firstName, attendingCeremony, eatingMeat, dietaryRestrictions, guests, #t",
  };

  const data = await dynamoDb.scan(params).promise();
  return buildResponse(200, data.Items);
};

const buildResponse = function buildHttpResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    },
    body: JSON.stringify({
      message: message,
    }),
  };
};
