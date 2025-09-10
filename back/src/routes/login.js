const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { activeTokens } = require('../utils/users');
const { findUserDataByEmail } = require('../data/loginManagement');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate an user and send JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: string
 *               password:
 *                 type: string
 *                 example: string
 *     responses:
 *       200:
 *         description: Connection successful, returns a JWT token in a cookie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *       400:
 *         description: Invalid identifiers
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserDataByEmail('users', email)

    if (!user)
        return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
        return res.status(400).json({ message: 'Invalid credentials' });

    const id = user.id
    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '1h' });
    activeTokens[id] = token;

    res.cookie("jwtToken", token, { httpOnly: true, secure: false, maxAge: 3600000 });
    res.json({ message: "Logged in successfully" });
});

module.exports = router;