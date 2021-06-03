const Point = require('../models/Point')

exports.getPoints = async (req, res, next) => {
    try {
        const points = await Point.find();

        return res.status(200).json({
            data: points,
            success: true
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error', success: false })
    }
}


exports.addPoint = async (req, res, next) => {
    try {
        const point = await Point.create(req.body);

        return res.status(201).json({
            success: true,
        })
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error,
                message: 'This store already exist'
            });
        }
        res.status(500).json({
            success: false,
            error,
            message: 'Server error'
        })
    }
}