require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./src/db/firebaseSettings');

const authRoutes = require('./src/routes/auth');
const protectedRoutes = require('./src/routes/protected');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/', protectedRoutes);

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