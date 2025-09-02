const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();
const createStartup = require("../data/startupsManagement");

router.post('/create',  authenticateToken, async (req, res) => {
    const {name, legal_status, address, email, phone, sector, maturity} = req.body;
    const returnVal = await createStartup(name, legal_status, address, email, phone, sector, maturity);
    if (returnVal !== 0)
        res.status(400).send('Error')
    else
        res.status(200).send('OK');
});

module.exports = router;