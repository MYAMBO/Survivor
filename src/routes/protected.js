const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, you accessed a protected route!` });
});

module.exports = router;
