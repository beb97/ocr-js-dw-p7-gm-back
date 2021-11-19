const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Passer sur un usage cookie
        if(!req.cookies.token) {
            // 401 Unauthorized
            return res.status(401).json({error: 'No token found'});
        }

        let decodedToken;
        try {
            let token = req.cookies.token;
            decodedToken = jwt.verify(token, "NOT_REALLY_SECRET");
        } catch (err) {
            return res.status(401).json({error: 'Invalid token'});
        }

        const userId = decodedToken.userId;
        if(!userId) {
            return res.status(401).json({error: 'Invalid user'});
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