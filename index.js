const express = require('express');
const bodyParser = require('body-parser')
const db = require('./src/db/firebaseSettings');

const app = express();
const port = 3000

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.get('/', (req, res) => {
    res.status(200).send('home');
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

console.log(`App starting on port ${port}`);
app.listen(port);