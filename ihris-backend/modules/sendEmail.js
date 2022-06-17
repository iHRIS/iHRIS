const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const { google } = require("googleapis");
const nconf = require("./config");

const path = require("path");
const fs = require("fs");

const CLIENT_EMAIL = nconf.get("auth:GMAIL_ADDRESS");
const CLIENT_ID = nconf.get("auth:GMAIL_OAUTH_CLIENT_ID");
const CLIENT_SECRET = nconf.get("auth:GMAIL_OAUTH_CLIENT_SECRET");
const REDIRECT_URI = nconf.get("auth:GMAIL_OAUTH_REDIRECT_URL");
const REFRESH_TOKEN = nconf.get("auth:REFRESH_TOKEN");

const sendMail = async (email, subject, payload, template) => {
    try {
        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );

        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: "ihrisnotification@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);

        const mailOptions = {
            from: `iHRIS Notification <${CLIENT_EMAIL}>`,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        };
        console.log("*******************************************************************************")
        console.log("EMAIL", JSON.stringify(mailOptions,null,2))
        console.log("*******************************************************************************")
        return await transport.sendMail(mailOptions);
    } catch (error) {
        return error;
    }
};

module.exports = sendMail;
