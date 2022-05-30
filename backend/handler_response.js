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
    lastName,
    attending,
    eatingMeat,
    dietaryRestrictions,
    message,
    guests,
  } = requestBody;

  const responseOptionAttending = ["yes", "no"];
  const responseOptionEatingMeat = ["yes", "no", ""];

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    !responseOptionAttending.includes(attending) ||
    !responseOptionEatingMeat.includes(eatingMeat) ||
    typeof dietaryRestrictions !== "string" ||
    typeof message !== "string" ||
    Array.isArray(guests) === false
  ) {
    return buildResponse(400, "Validation failed. Invalid input type(s)");
  }

  const response = buildResponseItem(
    firstName,
    lastName,
    attending,
    eatingMeat,
    dietaryRestrictions,
    message,
    guests
  );

  await putResponse(response);
  await sendEmail({
    firstName,
    lastName,
    attending,
    eatingMeat,
    dietaryRestrictions,
    message,
    guests,
  });
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

const createEmailResponse = (guests) => {
  console.log("JSON here: " + JSON.stringify(guests) + " pure " + guests);
  return guests.map((guestList) => {
    const {
      firstName,
      lastName,
      attending,
      eatingMeat,
      dietaryRestrictions,
      message,
    } = guestList;

    return `<b>${firstName} ${lastName}</b><br>attending: ${attending}${
      attending !== "no" && eatingMeat ? "<br>eatingMeat: " + eatingMeat : ""
    }
    ${
      attending !== "no" && dietaryRestrictions
        ? "<br>dietaryRestrictions: " + dietaryRestrictions
        : ""
    }${message ? "<br>message: " + message : ""}<br><br>`;
  });
};

const sendEmail = async function sendEmail({
  firstName,
  lastName,
  attending,
  eatingMeat,
  dietaryRestrictions,
  message,
  guests,
}) {
  const ses = new AWS.SES({ region: "us-east-1" });
  guests.unshift({
    firstName,
    lastName,
    attending,
    eatingMeat,
    dietaryRestrictions,
    message,
  });

  var params = {
    Destination: {
      ToAddresses: ["manuel@brgr.rocks", "angelika@brgr.rocks"],
    },
    Message: {
      Body: {
        Html: {
          Data: createEmailResponse(guests).join(""),
        },
      },

      Subject: { Data: `RSVP from ${firstName} ${lastName}` },
    },
    Source: "noreply@brgr.rocks",
  };

  return ses.sendEmail(params).promise();
};

/* Creates response item */
const buildResponseItem = function buildResponseItemDynamoModel(
  firstName,
  lastName,
  attending,
  eatingMeat,
  dietaryRestrictions,
  message,
  guests
) {
  let timestamp = new Date().toLocaleString();
  return {
    id: uuid.v1(),
    firstName: firstName,
    lastName: lastName,
    attending: attending === "yes",
    eatingMeat: attending ? eatingMeat === "yes" : "",
    dietaryRestrictions: attending ? dietaryRestrictions : "",
    message: message,
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
      "id, firstName, lastName, attending, eatingMeat, dietaryRestrictions, message, guests, #t",
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
