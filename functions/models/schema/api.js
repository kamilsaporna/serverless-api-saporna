const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/author');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
//your mongoDB Cloud URL
//your mongoDB Cloud URL
const dbCloudUrl = 'mongodb://localhost:27017/express-mongo-api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

mongoose
    .connect('mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority' || dbLocalUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/.netlify/funtions/api', router);
module.exports.handler = serverless(app);
