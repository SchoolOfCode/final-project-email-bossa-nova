const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cron = require("node-cron");
require("dotenv").config();

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// let transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // upgrade later with STARTTLS
//   auth: {
//     user: "bossanovasoc@gmail.com",
//     pass: "iamapassword4u",
//   },
// });

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

("use strict");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.EMAIL,
      pass: process.env.WORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Bossa Nova" <{process.env.EMAIL}>`, // sender address
    to: process.env.RECIPIENT, // list of receivers
    subject: "This is the bossa nova test", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world has got to be the most boring thing to write as a devolper...</b>", // html body
  });

  cron.schedule("1 * * * *", () => {
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
}

main().catch(console.error);
