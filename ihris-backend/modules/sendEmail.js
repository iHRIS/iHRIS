
const nodemailer = require('nodemailer');
const handlebars = require("handlebars");
const { google } = require('googleapis');

const path = require('path');
const fs = require("fs");

const CLIENT_EMAIL = process.env.GMAIL_ADDRESS;
const CLIENT_ID = process.env.GMAIL_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_OAUTH_REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


const sendMail = async (email, subject, payload, template) => {

  const OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
  );

  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  const accessToken = await OAuth2Client.getAccessToken();


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: CLIENT_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },

  });


  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = handlebars.compile(source);

  console.log('payload: ', JSON.stringify(payload,null,2));

  // mail options 
  var mailOptions = {
    from: CLIENT_EMAIL,
    to: email,
    subject: subject,
    html: compiledTemplate(payload)
  };

  console.log('mailOptions: ', JSON.stringify(mailOptions,null,2));

  // trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    return info
  });

  return transporter

};

module.exports = sendMail;