const {detectText, verifyCredentials, analyzeEntities} = require('./GoogleCloud')
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
  res.send("<h1>Welcome!</h1>");
  analyzeEntities('Howdy partner Arya! How you doing gimme drugs').then(ret => {
	  console.log(ret)
  })
})

app.post('/upload-prescription-image', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      const prescription = req.files.prescription;
	    const fileName = './uploads/' + prescription.name
      await prescription.mv(fileName)
	  
      detectText(fileName).then(async ret => {
        const description = ret.map(element => element.description)
        description[0] = description[0].replace(/\n/g, ". ");
        const entities = await analyzeEntities(description[0])
 
        res.send({
          description: description,
          entities: entities
        });
      }).catch(error => {
        res.send(JSON.stringify({error: error.toString()}));
      })
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, async () => {
  console.log("Verifying credentials")
  await verifyCredentials()
})
