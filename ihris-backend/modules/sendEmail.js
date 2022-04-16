
const nodemailer = require('nodemailer');
const handlebars = require("handlebars");


const path = require('path');
const fs = require("fs");


const sendMail = async (email, subject, payload, template) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });


  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = handlebars.compile(source);

  
  // mail options 
  var mailOptions = {
    from: '"Systems Admin" <jeremyjabar@gmail.com>',
    to: email,
    subject: subject,
    html: compiledTemplate(payload)
  };

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