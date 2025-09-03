const express = require('express');
const jwt = require('jsonwebtoken');
const { users, activeTokens } = require('../utils/users');
const { findUserDataByNameOrEmail } = require('../data/loginManagement');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    const user = await findUserDataByNameOrEmail('users', name)

    if (!user || password !== user.password)
        return res.status(400).json({ message: 'Invalid credentials' });

    id = user.id
    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '1h' });
    activeTokens[id] = token;

    res.cookie("jwtToken", token, { httpOnly: true, secure: false, maxAge: 3600000 });
    res.json({ message: "Logged in successfully" });
});

module.exports = router;