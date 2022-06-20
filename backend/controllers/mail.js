const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/auth");
const Mail = require("../models/mail");
const nodemailer = require("nodemailer");
const path = require("path");
const handleBars = require("handlebars");
const fs = require("fs");

const sendMail = (data) => {
  const filePath = path.join(__dirname, "../template/mail.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const html = handleBars.compile(source);
  const replacements = {
    content: data,
  };
  const template = html(replacements);
  return template;
};
//send email route
router.post("/compose", Authentication, async (req, res, next) => {
  const { emailTo, subject, description } = req.body;
  if (emailTo && subject) {
    try {
      const results = await Mail({
        userId: req.userId,
        emailTo,
        subject,
        description,
      }).save();

      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: "587",
        tls: {
          ciphers: "SSLv3",
        },
        secure: false,
        auth: {
          user: process.env.OUTLOOK_MAIL, // email user
          pass: process.env.OUTLOOK_PASSWORD, // email password
        },
      });

      const html = sendMail(description);

      const options = {
        from: process.env.OUTLOOK_MAIL,
        to: emailTo,
        subject,
        html,
      };
      await transporter.sendMail(options).catch((error) => console.log(error));
      res.send({
        user: {
          message: "Email Sent Successfully",
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error Occured",
        error: error,
      });
    }
  } else {
    res.status(500).json({
      message: "Email won't be empty",
    });
  }
});

//all emails
router.get("/allMails", Authentication, async (req, res, next) => {
  const userId = req?.userId;
  try {
    const result = await Mail.find({ userId });

    res.send({ result });
  } catch (error) {
    res.status(500).json({
      message: "Error Occured",
      error: error,
    });
  }
});

module.exports = router;
