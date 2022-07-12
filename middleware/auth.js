const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Passer sur un usage cookie
        console.log("auth", req.headers.authorization);
        const authorization = req.headers.authorization;
        if(!authorization) {
            // 401 Unauthorized
            return res.status(401).json({error: 'No token found'});
        }

        let decodedToken;
        try {
            let token = authorization.split(' ')[1];
            console.log("token",token);
            decodedToken = jwt.verify(token, "NOT_REALLY_SECRET");
        } catch (err) {
            return res.status(401).json({error: 'Invalid token'});
        }
        console.log("decoded", decodedToken);

        const userId = decodedToken.userId;
        if(!userId) {
            return res.status(401).json({error: 'Invalid user'});
        }

        // console.log("auth", userId);
        res.locals.user = userId;
        console.log("userId", userId);
        console.log("locals userId", res.locals.user);
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