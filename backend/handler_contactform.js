"use strict";

const AWS = require("aws-sdk");

/* POST /responses/accept */
module.exports.submit = async (event) => {
  const requestBody = JSON.parse(event.body);
  const { name, email, message } = requestBody;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return buildResponse(400, "Validation failed. Invalid input type(s)");
  }

  await sendEmail({
    name,
    email,
    message,
  });
  return buildResponse(200, "Message successfully sent");
};

const sendEmail = async function sendEmail({ name, email, message }) {
  const ses = new AWS.SES({ region: "us-east-1" });
  var params = {
    Destination: {
      ToAddresses: ["manuel@brgr.rocks", "angelika@brgr.rocks"],
    },
    Message: {
      Body: {
        Html: {
          Data: `<b>${name}</b><br><b>${email}</b><br><br><p>${message}</p>`,
        },
      },

      Subject: { Data: `Message from ${name}` },
    },
    Source: "noreply@brgr.rocks",
  };

  return ses.sendEmail(params).promise();
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
