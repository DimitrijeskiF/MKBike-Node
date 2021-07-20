const { admin } = require('../utils/admin-firebase');

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};



exports.sendEventNotification = async (req, res, next) => {
    const fcmTokens = req.user.fcmTokens
    const message_notification = {
        notification: {
            title: 'Hello',
            body: 'New event added! Check event section.'
        }
    };

    const message = message_notification
    const options = notification_options

    admin.messaging().sendToDevice(fcmTokens, message, options)
        .then(response => {
            res.status(200).json({
                success: true,
                response
            })
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                error
            })
        });
}


exports.sendNewsNotification = async (req, res, next) => {
    const fcmTokens = req.user.fcmTokens
    const message_notification = {
        notification: {
            title: 'Hello',
            body: 'There is news!!! Check news section.'
        }
    };

    const message = message_notification
    const options = notification_options

    admin.messaging().sendToDevice(fcmTokens, message, options)
        .then(response => {
            res.status(200).json({
                success: true,
                response
            })
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                error
            })
        });
}
