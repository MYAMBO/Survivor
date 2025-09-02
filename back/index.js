require('dotenv').config();

const express = require('express');
const {writeUserData, readUserData, findUserData} = require('./src/data/StartupsManagment')
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000

const authRoutes = require('./src/routes/auth');
const protectedRoutes = require('./src/routes/protected');

app.use(cookieParser());
app.use(express.json());

app.use('/', authRoutes);
app.use('/', protectedRoutes);

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.get('/', (req, res) => {
    res.status(200).send('home');
});

app.post('/create', (req, res) => {
    console.log(req.body);
    const {table, username, email} = req.body;
    void writeUserData(table, username, email);
    res.status(200).send('create');
});

app.get('/read', (req, res) => {
    void readUserData('users');
    res.status(200).send('read');
});

app.get('/find', (req, res) => {
    void findUserData('users', 'martinmatin');
    void findUserData('users', 'yanis');
    res.status(200).send('find');
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

console.log(`App starting on port ${port}`);
app.listen(port);