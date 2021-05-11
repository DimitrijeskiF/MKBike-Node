const { admin } = require('../utils/admin-firebase');
const FcmToken = require('../models/FcmToken')


const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

const message_notification = {
    notification: {
        title: 'Hello',
        body: 'New event added! Check event section.'
    }
};

exports.sendEventNotification = async (req, res, next) => {
    const tokens = await FcmToken.find();
    const fcmTokens = tokens.map((token) => {
        return token.fcmToken
    })
    const message = message_notification
    const options = notification_options

    admin.messaging().sendToDevice(fcmTokens, message, options)
        .then(response => {

            res.status(200).send("Notification sent successfully")

        })
        .catch(error => {
            console.log(error);
        });
}
