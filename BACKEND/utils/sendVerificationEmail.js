require("dotenv").config({ path: "../config/config.env" });
const nodemailer = require("nodemailer");

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

    const mailOptions = {
      from: '"MCU EATS" <mcueats@gmail.com>',
      to: userEmail,
      subject: "Verify Your Email",
      html: `<p>Hi ${displayName},</p>
                    <p>Please verify your email by clicking the link below:</p>
                    <a href="${verificationLink}">Verify Email</a>  
                    `,
    };
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendVerificationEmail;
