var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


let createRecord = function (name, surname, message) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Connection established!")
        var dbo = db.db("mydb")

        try {
            dbo.collection('Persons').insertOne({
                "name": name,
                "surname": surname,
                "message": message
            })
        } catch (e) {
            print(e);
        }
    });
}
exports.createRecord = createRecord;

let readRecords =  function() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log("Connection established!")
        var dbo = db.db("mydb")

        try {
            console.log(dbo.collection('Persons').find())
            dbo.collection('Persons')
        } catch (e) {
            print(e);
        }
    });
}
exports.readRecords = readRecords;