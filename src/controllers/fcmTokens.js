const FcmToken = require('../models/FcmToken');


exports.creteToken = async (req, res) => {
    const fcmToken = new FcmToken(req.body);
    try {
        const tokens = await FcmToken.find();

        const fcmTokenExists = tokens.map(token => {
            return token.fcmToken
        })

        const exists = fcmTokenExists.includes(fcmToken.fcmToken);

        if (exists) {
            return 
        }

        await fcmToken.save();
        res.status(200).json({
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            error
        })
    }
}


exports.getTokens = async (req, res) => {
    try {
        const tokens = await FcmToken.find();
        res.status(200).json({
            tokens
        })
    } catch (error) {
        res.status(400).json({
            success: false
        })
    }
}