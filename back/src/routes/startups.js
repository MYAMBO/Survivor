const express = require('express');
const router = express.Router();
const {createStartup, getStartupList, modifyStartup} = require("../data/startupsManagement");

router.post('/createStartup', async (req, res) => {
    const {name, legal_status, address, email, phone, sector, maturity, password} = req.body;
    const returnVal = await createStartup(name, legal_status, address, email, phone, sector, maturity, password);
    if (returnVal !== 0)
        res.status(400).send('{"message":"An error occurs."}');
    else
        res.status(200).send('{"message":"OK"}');
});

/**
 * @swagger
 * components:
 *   schemas:
 *     StartupSummary:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "string"
 *         name:
 *           type: string
 *           example: "string"
 *         sector:
 *           type: string
 *           example: "string"
 *         maturity:
 *           type: string
 *           example: "string"
 *         location:
 *           type: string
 *           example: "string"
 */

/**
 * @swagger
 * /startups:
 *   get:
 *     summary: Get list of startups
 *     description: Retrieves a summarized list of all startups.
 *     tags:
 *       - Startups
 *     responses:
 *       200:
 *         description: A list of startup summaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StartupSummary'
 *       500:
 *         description: Server error while fetching startups
 */
router.get('/startups', async (req, res) => {
    const startups = await getStartupList();
    res.json(startups);
});

router.get('/startups', async (req, res) => {
    const {name, legal_status, address, email, phone, created_at, description, website_url, social_media_url, project_status, needs, sector, maturity, founders} = req.body;
    await modifyStartup(name, legal_status, address, email, phone, created_at, description, website_url, social_media_url, project_status, needs, sector, maturity, founders, req.user.id);
    res.status(200).send('Ok');
});

module.exports = router;