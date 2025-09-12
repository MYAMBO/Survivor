const express = require('express');
const {authenticateToken} = require('../middleware/authMiddleware');
const router = express.Router();
const db = require("../db/firebaseSettings");
const { GetUserDataById}  = require("../data/usersManagement");
const bcrypt = require('bcrypt');
const {getStartupsListByFounderId} = require("../data/startupsManagement");

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     description: |
 *       Returns the profile information of the currently authenticated user.
 *       If the user is a founder, their associated startups will also be included.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: string
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: string
 *                 role:
 *                   type: string
 *                   example: string
 *                 image:
 *                   type: string
 *                   example: string
 *                 metadata:
 *                   type: object
 *                   description: File metadata for the user's image.
 *                   properties:
 *                     accept-ranges:
 *                       type: string
 *                       example: "bytes"
 *                     content-length:
 *                       type: string
 *                       example: "142449"
 *                     content-type:
 *                       type: string
 *                       example: "image/png"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "Thu, 11 Sep 2025 11:19:16 GMT"
 *                     etag:
 *                       type: string
 *                       example: "\"c75bc8d43943f103b004cc6b184c0c66\""
 *                     last-modified:
 *                       type: string
 *                       format: date-time
 *                       example: "Tue, 02 Sep 2025 12:56:44 GMT"
 *                 startups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: string
 *                       name:
 *                         type: string
 *                         example: string
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: User not found.
 */
router.get('/profile', authenticateToken, async (req, res) => {
    const user = await GetUserDataById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }
    if (user.role === 'founder') {
        const startups = await getStartupsListByFounderId(user.id);
        user.startups = startups;
    }
    res.json({
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "image": user.image,
        "metadata": user.metadata,
        "startups": user.startups
    })
});

/**
 * @swagger
 * /profile/email:
 *   patch:
 *     summary: Update user email
 *     description: Update the authenticated user's email address.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "string"
 *     responses:
 *       200:
 *         description: Email updated successfully
 *       400:
 *         description: Email is required
 *       409:
 *         description: Email already in use
 */
router.patch('/profile/email', authenticateToken, async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    const snapshot = await db.ref('users')
        .orderByChild('email')
        .equalTo(email)
        .once('value');

    if (snapshot.exists()) {
        return res.status(409).json({ message: "Email already in use." });
    }

    await db.ref('users/' + req.user.id).update({ email: email });
    res.status(200).json({ message: "Email updated successfully." });
});

/**
 * @swagger
 * /profile/name:
 *   patch:
 *     summary: Update user name
 *     description: Update the authenticated user's display name.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "string"
 *     responses:
 *       200:
 *         description: Name updated successfully
 *       400:
 *         description: Name is required
 */
router.patch('/profile/name', authenticateToken, async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required." });
    }
    await db.ref('users/' + req.user.id).update({ name: name });
    res.status(200).json({ message: "Name updated successfully." });
});

/**
 * @swagger
 * /profile/password:
 *   patch:
 *     summary: Update user password
 *     description: Update the authenticated user's password.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "string"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Password is required
 */
router.patch('/profile/password', authenticateToken, async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: "Password is required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.ref('users/' + req.user.id).update({ password: hashedPassword });
    res.status(200).json({ message: "Password updated successfully." });
});

module.exports = router;
