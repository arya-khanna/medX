var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('db.sqlite3')

insertPrescriptionData = () => {
    db.run('INSERT INTO prescriptions(name, filename, frequency, date_of_prescription, description, doctor_id) VALUES(?, ?, ?, ?, ?, ?)',
        ["perindopril", "cfarmafoto323175_1100.jpg", "Once a day", "27st April 2021", "Perindopril is a medication used to treat high blood pressure, heart failure, or stable coronary artery disease.", 2])
    
    db.run('INSERT INTO prescriptions(name, filename, frequency, date_of_prescription, description, doctor_id) VALUES(?, ?, ?, ?, ?, ?)',
        ["panadol", "adheretech_bottle_640.jfif", "Maximum 4 a day", "21st July 2021",
            "Panadol Tablets provide fast, effective temporary relief of aches and pains, such as headaches, migraine headaches, sore throat and dental pain.", 1])
}

insertDoctorData = () => {
    db.run("INSERT INTO doctors(name, phone_number) VALUES(?, ?)", ["Steven Strange", "0400099999"])
    db.run("INSERT INTO doctors(name, phone_number) VALUES(?, ?)", ["Bruce Banner", "0411199999"])
    db.run("INSERT INTO doctors(name, phone_number) VALUES(?, ?)", ["Otto Gunther Octavius", "0411199999"])
}

db.run("CREATE TABLE IF NOT EXISTS prescriptions(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, filename TEXT, frequency text, date_of_prescription DATETIME, description TEXT, doctor_id TEXT)", insertPrescriptionData);

db.run("CREATE TABLE IF NOT EXISTS doctors(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone_number INTEGER)", insertDoctorData);

db.close()