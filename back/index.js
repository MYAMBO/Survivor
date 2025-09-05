require('dotenv').config();

const express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000
const cors = require('cors');
const schedule = require('node-schedule');
const callMigration = require('./src/data/apiMigration')

const profileRoutes = require('./src/routes/profile');
const loginRoutes = require('./src/routes/login');
const logoutRoutes = require('./src/routes/logout');
const startupsRoutes = require('./src/routes/startups');
const userRoutes = require('./src/routes/users');
const startupsProfileRoutes = require('./src/routes/startupsProfile')

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "JEB API Documentation",
      version: "1.0.0",
      description: "swagger-jsdoc auto-generate documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}) );
app.use(cookieParser());
app.use(express.json());

app.use('/', profileRoutes);
app.use('/', loginRoutes);
app.use('/', logoutRoutes);
app.use('/', startupsRoutes);
app.use('/', userRoutes);
app.use('/', startupsProfileRoutes);

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.get('/', async (req, res) => {
    console.log('Migrated API Force');
    await callMigration();
    res.status(200).send('home');
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

//schedule.scheduleJob('0 */10 * * * *', async () => {
//    console.log('Migrated API');
//    await callMigration();
//});

console.log(`App starting on port ${port}`);
console.log(`Swagger Documentation: http://localhost:${port}/api-docs`);

app.listen(port);