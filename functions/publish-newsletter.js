"use strict";

const AWS = require("aws-sdk");

module.exports.handler = async (event) => {
  try {
    let config = {
      region: process.env.AWS_REGION,
    };

    if (process.env.IS_OFFLINE)
      config.endpoint = process.env.SNS_ENDPOINT_LOCAL;

    const sns = new AWS.SNS(config);

    const { subject, introduction, recipes } = JSON.parse(event.body);

    const params = {
      Message: JSON.stringify({ subject, introduction, recipes }),
      TopicArn: process.env.SNS_ARN,
    };

    await sns.publish(params).promise();

    console.log("PUBLISH_NEWSLETTER");

    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
