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

/**
 * @swagger
 * /admin/deleteUser:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user from the system by their unique ID. Only admins can perform this action.  
 *                  Admins cannot delete their own account.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The unique ID of the user to delete.
 *                 example: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "User with ID -OZnL4qoOKWU69YpdRwU deleted successfully."
 *       400:
 *         description: Missing user ID or attempting to delete own account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You cannot delete your own account."
 *       401:
 *         description: Unauthorized. The request does not have valid authentication credentials.
 *       500:
 *         description: Server error while deleting the user.
 */
router.delete('/admin/deleteUser', authenticateTokenAdmin, async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(400).send('{"message":"User ID is required."}');
    }
    if (id === req.user.id) {
        console.log(" can't delete myself");
        return res.status(400).send('{"message":"You cannot delete your own account."}');
    }
    await deleteUser(id);
    res.status(200).send(`User with ID ${id} deleted successfully.`);
});

module.exports = router;