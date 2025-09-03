const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { users, activeTokens } = require('../utils/users');

const router = express.Router();

router.get('/logout', authenticateToken, (req, res) => {
    delete activeTokens[req.user.id];
    res.clearCookie("jwtToken");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;