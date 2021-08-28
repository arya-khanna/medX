var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db.sqlite3')

insertPrescriptionData = () => {
    db.run('INSERT INTO prescriptions(name, filename, frequency, date_of_prescription, description, doctor_name) VALUES(?, ?, ?, ?, ?, ?)',
        ["perindopril", "cfarmafoto323175_1100.jpg", "Once a day", "27st April 2021", "Perindopril is a medication used to treat high blood pressure, heart failure, or stable coronary artery disease.", "Dr. Strange"])
    
    db.run('INSERT INTO prescriptions(name, filename, frequency, date_of_prescription, description, doctor_name) VALUES(?, ?, ?, ?, ?, ?)',
        ["panadol", "adheretech_bottle_640.jfif", "Maximum 4 a day", "21 st July 2021",
            "Panadol Tablets provide fast, effective temporary relief of aches and pains, such as headaches, migraine headaches, sore throat and dental pain.", "Dr.Strange"])
}

db.run("CREATE TABLE IF NOT EXISTS prescriptions(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, filename TEXT, frequency text, date_of_prescription DATETIME, description TEXT, doctor_name TEXT)", insertPrescriptionData);

db.close()