const jwt = require('jsonwebtoken');
const { activeTokens } = require('../utils/users');
const SECRET_KEY = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const token = req.cookies.jwtToken || null;
    if (!token)
        return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err)
            return res.sendStatus(403);

        if (activeTokens[user.username] !== token)
            return res.status(403).json({ message: "Session invalid or logged in elsewhere" });

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
