const {detectText, verifyCredentials} = require('./GoogleCloudVision')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  detectText("./img_1.png").then(ret => {
    res.send(JSON.stringify({description: ret.map(element => element.description)}));
  }).catch(error => {
    res.send(JSON.stringify({error: error.toString()}));
  })
})

app.listen(port, async () => {
  console.log("Verifying credentials")
  await verifyCredentials()
})
