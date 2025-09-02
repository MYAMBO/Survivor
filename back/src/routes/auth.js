const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authMiddleware');
const { users, activeTokens } = require('../utils/users');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username))
        return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (activeTokens[username])
        return res.status(409).json({ error: "AlreadyConnected", message: "User already logged in elsewhere" });

    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    activeTokens[username] = token;

    res.cookie("jwtToken", token, { httpOnly: true, secure: false, maxAge: 3600000 });
    res.json({ message: "Logged in successfully" });
});

router.get('/logout', authenticateToken, (req, res) => {
    delete activeTokens[req.user.username];
    res.clearCookie("jwtToken");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
