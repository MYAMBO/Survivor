const express = require('express');
const router = express.Router();
const {createUser} = require("../data/usersManagement");

/**
 * @swagger
 * /createUser:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user with an email, name, role, and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - role
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: string
 *               name:
 *                 type: string
 *                 example: string
 *               role:
 *                 type: string
 *                 example: string
 *               password:
 *                 type: string
 *                 example: string
 *     responses:
 *       200:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: An error occurred during user creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurs.
 *       409:
 *         description: An account with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An account with this email already exist
 */
router.post('/createUser', async (req, res) => {
    const {email, name, role, password} = req.body;
    const returnVal = await createUser(email, name, role, password);
    if (returnVal === 1)
        res.status(400).send('{"message":"An error occurs."}');
    else if (returnVal === 2)
        res.status(409).send('{"message":"An account with this email already exist"}');
    else
        res.status(200).send('{"message":"OK"}');
});

module.exports = router;