const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();
const createUser = require("../data/usersManagement");

router.post('/createUser', async (req, res) => {
    const {email, name, role, password} = req.body;
    const returnVal = await createUser(email, name, role, password);
    if (returnVal !== 0)
        res.status(400).send('{"message":"An error occurs."}');
    else
        res.status(200).send('{"message":"OK"}');
});

module.exports = router;