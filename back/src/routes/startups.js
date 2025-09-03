const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();
const createStartup = require("../data/startupsManagement");

router.post('/createStartup', async (req, res) => {
    const {name, legal_status, address, email, phone, sector, maturity, password} = req.body;
    const returnVal = await createStartup(name, legal_status, address, email, phone, sector, maturity, password);
    if (returnVal !== 0)
        res.status(400).send('{"message":"An error occurs."}');
    else
        res.status(200).send('{"message":"OK"}');
});

module.exports = router;