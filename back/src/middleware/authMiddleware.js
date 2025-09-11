const jwt = require('jsonwebtoken');
const { activeTokens } = require('../utils/users');
const SECRET_KEY = process.env.JWT_SECRET;
const {GetUserDataById} = require('../data/usersManagement');

function authenticateToken(req, res, next) {
    const token = req.cookies.jwtToken || null;
    if (!token)
        return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err)
            return res.sendStatus(403);

        if (activeTokens[user.id] !== token)
            return res.status(403).json({ message: "Session invalid or logged in elsewhere" });

        req.user = user;
        next();
    });
}

function authenticateTokenFunder(req, res, next) {
    const token = req.cookies.jwtToken || null;
    if (!token)
        return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, async (err, user) => {
        if (err)
            return res.sendStatus(403);

        const userData = await GetUserDataById(user.id);
        if (activeTokens[user.id] !== token || userData.role !== "funder")
            return res.status(403).json({ message: "Session invalid or logged in elsewhere" });

        req.user = user;
        next();
    });
}

function authenticateTokenAdmin(req, res, next) {
    const token = req.cookies.jwtToken || null;
    if (!token)
        return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, async (err, user) => {
        if (err)
            return res.sendStatus(403);

        const userData = await GetUserDataById(user.id);
        if (activeTokens[user.id] !== token || userData.role !== "admin")
            return res.status(403).json({ message: "Session invalid or logged in elsewhere" });

        req.user = user;
        next();
    });
}

module.exports = {authenticateToken, authenticateTokenFunder, authenticateTokenAdmin};
