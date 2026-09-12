const path = require("node:path");
const process = require("node:process");
const { authenticate } = require("@google-cloud/local-auth");

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/tasks.readonly"
];

const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "credentials.json"
);

let authPromise;

function getAuth() {
  if (!authPromise) {
    authPromise = authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH
    });
  }

  return authPromise;
}

module.exports = { getAuth };