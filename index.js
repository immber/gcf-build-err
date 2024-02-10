const functions = require('@google-cloud/functions-framework');
const getStr = require("app-common/strings");

functions.http('create', (req, res) => {
  return res.status(200).send(`hello ${getStr.str}`).end();
});