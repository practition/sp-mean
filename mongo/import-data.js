const MongoClient = require('mongodb').MongoClient;

const data = require('../data/json/class-data-original');
const url = 'mongodb://localhost:27017';
const dbName = 'banking';

MongoClient.connect(url, function (err, client) {
    if (err !== null) {
        throw err;
    }

    console.log('Connected to the server.');
    const db = client.db(dbName);
    const tx = db.collection('transactions');
    tx.count().then(c =>
        console.log('There are %d transactions in the tx collection.', c));
    client.close();
});
