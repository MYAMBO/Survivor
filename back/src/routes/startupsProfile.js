const express = require('express');
const router = express.Router();
const {GetStartupInformationsById}  = require("../data/startupsManagement");

/**
 * @swagger
 * components:
 *   schemas:
 *     Founder:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         name:
 *           type: string
 *           example: "string"
 *         startup_id:
 *           type: integer
 *           example: 2
 *     Startup:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "string"
 *         address:
 *           type: string
 *           example: "string"
 *         created_at:
 *           type: string
 *           format: date
 *           example: "string"
 *         description:
 *           type: string
 *           example: "string"
 *         email:
 *           type: string
 *           format: email
 *           example: "string"
 *         founders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Founder'
 *         legal_status:
 *           type: string
 *           example: "string"
 *         maturity:
 *           type: string
 *           example: "string"
 *         name:
 *           type: string
 *           example: "string"
 *         needs:
 *           type: string
 *           example: "string"
 *         phone:
 *           type: string
 *           example: "string"
 *         project_status:
 *           type: string
 *           example: "string"
 *         sector:
 *           type: string
 *           example: "string"
 *         social_media_url:
 *           type: string
 *           example: "string"
 *         website_url:
 *           type: string
 *           example: "string"
 */

/**
 * @swagger
 * /startups/profile:
 *   post:
 *     summary: Get startup profile by ID
 *     description: Retrieves detailed information about a startup based on its ID.
 *     tags:
 *       - Startups
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
 *                 example: "string"
 *     responses:
 *       200:
 *         description: Startup profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Startup'
 *       400:
 *         description: Invalid request (e.g., missing ID)
 *       404:
 *         description: Startup not found
 */
router.post('/startups/profile', async (req, res) => {
    const {id} = req.body;
    const startup = await GetStartupInformationsById(id);
    res.json(startup);
});

module.exports = router;
