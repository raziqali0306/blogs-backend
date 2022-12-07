const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
    try {
        const { access_token } = req.body;
        const data = jwt.verify(access_token, process.env.JWT_SECRETE_KEY);
        req.user = data;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "failed",
            error
        });
    }
}