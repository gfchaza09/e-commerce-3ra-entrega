import twilio from "twilio";

import config from "../config/config.js";

const client = twilio(config.twilio.accountsid, config.twilio.authToken);

export const sendWhatsappTo = async (body) => {
  const whatsappOptions = {
    body,
    from: "whatsapp:" + config.twilio.whatsappTwilio,
    to: "whatsapp:" + config.twilio.whatsappAdmin,
  };
  return await client.messages.create(whatsappOptions);
};

export const sendSMSTo = async (body, to) => {
  const smsOptions = {
    body,
    from: config.twilio.smsTwilio,
    to: "+54" + to,
  };
  return await client.messages.create(smsOptions);
};
