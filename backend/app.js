const {detectText, verifyCredentials} = require('./GoogleCloudVision')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  detectText().then(text => {
    res.send(JSON.stringify({detectedText: text}));
  }).catch(error => {
    res.send(JSON.stringify({error: error.toString()}));
  })
})

app.listen(port, async () => {
  console.log("Verifying credentials")
  await verifyCredentials()
})
