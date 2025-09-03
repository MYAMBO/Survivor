const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();
const { GetUserDataById}  = require("../data/usersManagement");

router.get('/home', authenticateToken, async (req, res) => {
    user = await GetUserDataById("users", req.user.id);
    res.json({
        "name": user.name,
        "email": user.email,
        "role": user.role
    })
});

module.exports = router;
