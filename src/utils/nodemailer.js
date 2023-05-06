import { createTransport } from "nodemailer";

import config from "../config/config.js";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmail.email,
    pass: config.gmail.pass,
  },
});

export const sendMailTo = async (subject, html, to = config.gmail.email) => {
  const mailOptions = {
    from: "Pekepatch ecommerce",
    to: to,
    subject,
    html,
  };
  return await transporter.sendMail(mailOptions);
};
