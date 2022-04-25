"use strict";

const nodemailer = require("nodemailer");

const { formatMessageEmail } = require("../utils/formatMessageEmail");
const emails = require("../utils/users.json");

module.exports.handler = async (event) => {
  try {
    if (event.Records && event.Records.length) {
      const data = JSON.parse(event.Records[0].Sns.Message);

      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const message = formatMessageEmail(data);

      await transporter.sendMail({
        from: '"Receitinhas" <receitinhas@empresa.com>',
        to: emails.data,
        subject: data.subject,
        html: message,
      });

      console.log("SEND_EMAIL");

      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
