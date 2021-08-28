const {detectText, verifyCredentials} = require('./GoogleCloudVision')
const fileUpload = require('express-fileupload');
const express = require('express')
const app = express()
const port = 3000

//middlewares
app.use(fileUpload({
  createParentPath: true
}));

//requests
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  detectText("./img_1.png").then(ret => {
    res.send(JSON.stringify({description: ret.map(element => element.description)}));
  }).catch(error => {
    res.send(JSON.stringify({error: error.toString()}));
  })
})

app.post('/upload-prescription-image', async (req, res) => {
  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      console.log(req.files);
      res.send("OH Baby!")
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, async () => {
  console.log("Verifying credentials")
  await verifyCredentials()
})
