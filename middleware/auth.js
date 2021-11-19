const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Passer sur un usage cookie
        if(!req.cookies.token) {
            // 401 Unauthorized
            return res.status(401).send();
        }

        next();

        //OLD

        // const token = req.headers.authorization.split(' ')[1];
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // const userId = decodedToken.userId;
        // if (req.body.userId && req.body.userId !== userId) {
        //     throw 'Invalid user ID';
        // } else {
        //     next();
        // }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};