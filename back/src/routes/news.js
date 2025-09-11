const express = require('express');
const router = express.Router();
const {authenticateTokenFunder} = require('../middleware/authMiddleware');

const { createNews, getNewsList } = require("../data/newsManagement");

/**
 * @swagger
 * /createEvent:
 *   post:
 *     summary: Create a news
 *     description: Registers a news event with a title, description, date, image and location.
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: string
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: string
 *               description:
 *                 type: string
 *                 example: string
 *               type:
 *                 type: string
 *                 example: string
 *               location:
 *                 type: string
 *                 example: string
 *               target:
 *                 type: string
 *                 example: string
 *               startup_id:
 *                 type: string
 *                 exemple: string
 *     responses:
 *       200:
 *         description: Event successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event created successfuly
 *       400:
 *         description: A Field is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Required field is missing
 */
router.post('/createNews', authenticateTokenFunder, async (req, res) => {
    const { name, date, description, type, location, target, startup_id } = req.body;

    if (!name || !date || !description || !type || !location || !target || !startup_id) {
        return res.status(400).send({ message: "Required field is missing" });
    }
    await createNews(date, location, name, type, null, startup_id, description);
    res.status(200).send({ message: "news created successfuly" });
});

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve news
 *     description: Returns all news order by date
 *     tags:
 *       - Events
 *     parameters:
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date of the period in YYYY-MM-DD format
 *         example: 2025-09-08
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date of the period in YYYY-MM-DD format
 *         example: 2025-09-14
 *     responses:
 *       200:
 *         description: List of events within the given period
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
 *                   dates:
 *                     type: string
 *                     format: date
 *                     example: string
 *                   description:
 *                     type: string
 *                     example: string
 *                   location:
 *                     type: string
 *                     example: string
 *                   name:
 *                     type: string
 *                     example: string
 *       400:
 *         description: Missing query parameter(s)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing start or end date
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get("/news", async (req, res) => {
    const eventList = await getNewsList();

    res.send(eventList);
});

module.exports = router;