const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Passer sur un usage cookie
        // console.log("auth", req.headers.authorization);
        const authorization = req.headers.authorization;
        if(!authorization) {
            // 401 Unauthorized
            return res.status(401).json({error: 'No token found'});
        }

        let decodedToken;
        try {
            let token = authorization.split(' ')[1];
            // console.log("token",token);
            decodedToken = jwt.verify(token, "NOT_REALLY_SECRET");
        } catch (err) {
            return res.status(401).json({error: 'Invalid token'});
        }

        const userId = decodedToken.userId;
        if(!userId) {
            return res.status(401).json({error: 'Invalid user'});
        }

        res.locals.user = userId;
        // console.log("locals userId", res.locals.user);
        next();

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};