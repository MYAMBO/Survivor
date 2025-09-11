const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/authMiddleware');
const {CreateConv, GetAllConv} = require('../data/messagesManagement');

router.post('/createConv', authenticateToken, async (req, res) => {
    const {otherId} = req.body;

    const newConv = await CreateConv(req.user.id, otherId);
    if (!newConv){
        res.status(400).send('Invalid id');
    }
    res.status(200).send('OK');
})

router.get('/getAllConv', authenticateToken, async (req, res) => {

    const convList = await GetAllConv(req.user.id);

    res.status(200).send(convList);
})

router.post('/getMessagesFromConv', authenticateToken, async (req, res) => {

    const {convId} = req.body;
    const messList = await GetMessagesFromConv(req.user.id);

    res.status(200).send(messList);
})

module.exports = router