const detectText = require('GoogleCloudVision')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
  detectText().then(t => console.log(t))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
