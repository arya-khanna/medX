var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db.sqlite3')

insertPrescriptionData = () => {
    db.run('INSERT INTO prescriptions(name, filename) VALUES(?, ?)', ["panadol", "uploads/adheretech_bottle_640.jfif"])
} 

console.log("create database table prescriptions");
db.run("CREATE TABLE IF NOT EXISTS prescriptions(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, filename TEXT)", insertPrescriptionData);

db.close()