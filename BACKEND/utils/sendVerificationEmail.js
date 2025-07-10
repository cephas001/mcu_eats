import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });

import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";

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

export default sendVerificationEmail;
