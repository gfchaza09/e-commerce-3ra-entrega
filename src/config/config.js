import dotenv from "dotenv";
import yargs from "yargs/yargs";

dotenv.config();

const argv = yargs(process.argv.slice(2))
  .options({
    p: {
      alias: "port",
      type: "number",
      demandOption: true,
      describe: "Puerto del servidor",
    },
    m: {
      alias: "mode",
      type: "string",
      demandOption: true,
      describe: "Modo del servidor",
    },
    n: {
      alias: "nodeEnv",
      type: "string",
      demandOption: true,
      describe: "Node enviroment",
    },
  })
  .check((argv, options) => {
    if (isNaN(argv.p)) {
      throw "El puerto debe ser un número";
    }
    return true;
  })
  .default({
    p: 8080,
    m: "FORK",
    n: "development",
  }).argv;

export default {
  PORT: argv.p,
  MODE: argv.m,
  NODE_ENV: argv.n,
  fileSystem: {
    path: "./db",
  },
  mongodb: {
    mongoUrl: process.env.MONGO_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  firebase: {
    type: "service_account",
    project_id: "ecommerce-pekeshop",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: JSON.parse(process.env.FIREBASE_PRIVATE_KEY).privateKey,
    client_email:
      "firebase-adminsdk-pql6y@ecommerce-pekeshop.iam.gserviceaccount.com",
    client_id: "117125932114778843244",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pql6y%40ecommerce-pekeshop.iam.gserviceaccount.com",
  },
  gmail: {
    email: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
  twilio: {
    accountsid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    smsTwilio: process.env.SMS_TWILIO,
    whatsappTwilio: process.env.WHATSAPP_TWILIO,
    whatsappAdmin: process.env.WHATSAPP_ADMIN,
  },
};
