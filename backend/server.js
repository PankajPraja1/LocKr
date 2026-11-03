const express = require('express');
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');

dotenv.config()

// Connection URL
const url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lockr';
const client = new MongoClient(url);

// Database Name
const dbName = 'lockr';
const app = express();
const port = Number(process.env.PORT) || 3000;
app.use(bodyparser.json());
app.use(cors());

client.connect();

// Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

// Add a new password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult});
});

// Update a password by id
app.put('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const result = await collection.updateOne(
        { id: password.id },
        {
            $set: {
                site: password.site,
                username: password.username,
                password: password.password
            }
        }
    );
    res.send({ success: true, result: result });
});

// Delete a password by id
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success: true, result: findResult});
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});