require("dotenv").config({ path: "../config/config.env" });
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");

const template = fs.readFileSync("views/verify-email.ejs", "utf8");

const sendVerificationEmail = async (
  userEmail,
  displayName,
  verificationLink
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const html = ejs.render(template, { displayName, verificationLink });

    const mailOptions = {
      from: '"MCU EATS" <mcueats@gmail.com>',
      to: userEmail,
      subject: "Verify Your Email",
      html,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = sendVerificationEmail;
