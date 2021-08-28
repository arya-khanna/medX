const {detectText, verifyCredentials, analyzeEntities} = require('./GoogleCloud')
const fileUpload = require('express-fileupload');
const express = require('express');
const { Database } = require('sqlite3');
const app = express()
const port = 3000
const uploadDirectory = "uploads";
const path = require('path');
const fs = require('fs')

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db.sqlite3')

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
  console.log('/upload-prescription-image')
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

app.get("/prescriptions", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.all("SELECT * FROM prescriptions", (err, prescriptions) => {
    if (err) {
      return res.status(500).send(err);
    }
    
    db.all("SELECT * FROM doctors", (err, doctors) => {
      if (err) {
          return res.status(500).send(err);
      }
      for (let i = 0; i < prescriptions.length; i++) {
        let found = false
        for (let j = 0; j < doctors.length; j++) {
          if (prescriptions[i].doctor_id == doctors[j].id) {
            prescriptions[i].doctor_name = doctors[j].name
            found = true;
            break;
          }
        }
        if (!found) {
          prescriptions[i].doctor_name = "UNKNOWN"
        }
      }
      return res.status(200).send({ prescriptions: prescriptions, doctors: doctors})
    })
  });
});

app.post("/prescription", (req, res) => {
  const name = req.body.name
  const fileName = req.body.fileName;

  if (!fs.existsSync(path.join(__dirname, fileName))) {
    return res.status(400).send({
      error: "invalid request"
    })
  }
  
  db.run("INSERT INTO prescriptions(name, filename) VALUES(?, ?)",
    [name, fileName], function(err, result) {
      console.log(result);
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(201).send(
        {
          id: 1,
          name: name,
          filename: fileName
        })
  });
})

app.get('/prescription/:id/file/:name', (req, res, next) => {
  var id = req.params.uid
  var fileName = req.params.name

  var options = {
    root: path.join(__dirname, uploadDirectory),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})

app.listen(port, async () => {
  console.log("Verifying credentials")
  await verifyCredentials()
})
