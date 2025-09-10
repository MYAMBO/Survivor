const express = require('express');
const router = express.Router();
const {GetAllUsersData, deleteUser} = require("../data/usersManagement");
const {authenticateTokenAdmin} = require('../middleware/authMiddleware');

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users data (raw)
 *     description: Returns the list of all the users.
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
 *                   role:
 *                     type: string
 *                     example: string
 *                   founder_id:
 *                     type: string
 *                     example: string
 *                   investor_id:
 *                     type: string
 *                     example: string
 *                   image:
 *                     type: string
 *                     example: string
 *                   metadata:
 *                     type: object
 *                     properties:
 *                       accept-ranges:
 *                         type: string
 *                         example: string
 *                       content-length:
 *                         type: string
 *                         example: string
 *                       content-type:
 *                         type: string
 *                         example: string
 *                       date:
 *                         type: string
 *                         example: string
 *                       etag:
 *                         type: string
 *                         example: string
 *                       last-modified:
 *                         type: string
 *                         example: string
 *       404:
 *         description: No users found.
 *       500:
 *         description: Server error while retrieving users.
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