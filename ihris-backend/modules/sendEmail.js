const hbs = require('nodemailer-express-handlebars')

const nodemailer = require('nodemailer');

const path = require('path');


const sendMail = async (params) => {

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

  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve('./views/'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
  };

  // use a template file with nodemailer
  transporter.use('compile', hbs(handlebarOptions))

  // mail options 
  var mailOptions = {
    from: '"Systems Admin" <jeremyjabar@gmail.com>',
    to: params.to,
    subject: 'OTP  Verification',
    template: 'email',
    context: {
      name: "Systems Admin",
      otp: params.otp
    }
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