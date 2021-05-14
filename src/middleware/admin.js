const User = require('../models/user');


exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: `User with role ${req.user.role} is not authorized to access this route`
            })
        }
        next();
    }
}