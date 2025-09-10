const express = require('express');
const router = express.Router();
const {GetAllUsersData, deleteUser} = require("../data/usersManagement");
const {authenticateTokenAdmin} = require('../middleware/authMiddleware');

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Get all users data
 *     description: Returns the list of all users stored in the system.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: List of users successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: string
 *                   name:
 *                     type: string
 *                     example: string
 *                   email:
 *                     type: string
 *                     example: string
 *       400:
 *         description: Error occurred while retrieving users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurs."
 */
router.get('/admin/users', authenticateTokenAdmin, async (req, res) => {
    const returnVal = await GetAllUsersData();
    if (returnVal === null)
        res.status(400).send('{"message":"An error occurs."}');
    else
        res.status(200).send(returnVal);
});

router.delete('/admin/deleteUser', authenticateTokenAdmin, async (req, res) => {
    const {id} = req.body;
    if (!id) {
        return res.status(400).send('{"message":"User ID is required."}');
    }
    if (id === req.user.id) {
        return res.status(400).send('{"message":"You cannot delete your own account."}');
    }
    await deleteUser(id);
    res.status(200).send(`User with ID ${id} deleted successfully.`);
});

module.exports = router;