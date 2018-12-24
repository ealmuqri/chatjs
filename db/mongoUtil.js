const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'chatjs';
const client = new MongoClient(url, {
    poolSize: 5
});
let db;


module.exports = {
    connect: function () {
        client.connect(function (err, client) {
            console.log("Connected correctly to server");
            db = client.db(dbName);
        });
    },
    getDB: function () {
        return db;
    }
}