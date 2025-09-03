require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000
const cors = require('cors');

const homeRoutes = require('./src/routes/home');
const loginRoutes = require('./src/routes/login');
const logoutRoutes = require('./src/routes/logout');
const startupsRoutes = require('./src/routes/startups');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/', homeRoutes);
app.use('/', loginRoutes);
app.use('/', logoutRoutes);
app.use('/', startupsRoutes);

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