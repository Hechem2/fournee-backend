const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({msg: 'Token is not valid'});
            } else {
                req.user = decoded.user;
                next();
            }
        })
    } catch (error) {
        console.error('Something wrong with the auth middleware');
        res.status(500).json({msg: 'Server error'});
    }
}