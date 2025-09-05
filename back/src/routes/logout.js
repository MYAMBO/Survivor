const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { activeTokens } = require('../utils/users');

const router = express.Router();

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout the authenticated user
 *     description: Invalidates the user's JWT token and clears the authentication cookie.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */
router.get('/logout', authenticateToken, (req, res) => {
    delete activeTokens[req.user.id];
    res.clearCookie("jwtToken");
    res.json({ message: "Logged out successfully" });
});

module.exports = router;