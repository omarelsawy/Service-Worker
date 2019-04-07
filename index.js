const express = require("express");
const functions = require('firebase-functions');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require("web-push");

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

const publicVapidKey =
  "BOvgZOQ7fGqeU_95TxIinf1LsHDACfAeZlp3p0YwkqZ0WJhHxPT7LH0zwmaAoOCbQOlJZryC4jgSm01-08VT4jU";
const privateVapidKey = "zudoSZa7MVj51_h1rfgD8d7vZSSAi3xFMFaEmYDOn-Q";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});
exports.notification = functions.https.onRequest(app);
