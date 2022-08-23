const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use('/', routes);

// MongoDB connection:
const mongoose = require('mongoose');
// This original URL you get from Atlas: add your own password and database name @ __?retryWrites...
const mongoURL = 'mongodb+srv://mongojooa:m0ng0@cluster0.r14zbz6.mongodb.net/cardb?retryWrites=true&w=majority';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!\n'));

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});