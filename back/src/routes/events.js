const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/authMiddleware');

const { createEvent, getEventListByPeriod } = require("../data/eventsManagement");

/**
 * @swagger
 * /createEvent:
 *   post:
 *     summary: Create a new event
 *     description: Registers a new event with a title, description, date, and location.
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
router.post('/createEvent', authenticateToken, async (req, res) => {
    const { name, date, description, type, location, target } = req.body;

    if (!name || !date || !description || !type || !location || !target) {
        return res.status(400).send({ message: "Required field is missing" });
    }
    await createEvent(name, date, location, description, type, target);
    res.status(200).send({ message: "Event created successfuly" });
});

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Retrieve events within a date range
 *     description: Returns all events between the provided start and end dates (inclusive).
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
 *                   event_type:
 *                     type: string
 *                     example: string
 *                   location:
 *                     type: string
 *                     example: string
 *                   name:
 *                     type: string
 *                     example: string
 *                   target_audience:
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
router.get("/events", async (req, res) => {
    const { start, end } = req.query;

    if (!start || !end) {
        return res.status(400).json({ error: "Missing start or end date" });
    }

    const eventList = await getEventListByPeriod(start, end);

    res.send(eventList);
});

module.exports = router;