const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const sendWelcomeEmail = (name, email) => {
  transporter.sendMail({
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Thanks for joining in",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};
const sendCancelationEmail = (email, name) => {
  transporter.sendMail({
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};
module.exports = { sendWelcomeEmail, sendCancelationEmail };
