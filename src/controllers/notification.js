const { admin } = require('../utils/admin-firebase');
const FcmToken = require('../models/FcmToken')


const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};



exports.sendEventNotification = async (req, res, next) => {
    const tokens = await FcmToken.find();
    const fcmTokens = tokens.map((token) => {
        return token.fcmToken
    })

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
        })
        .catch(error => {
            console.log(error);
        });
}


exports.sendNewsNotification = async (req, res, next) => {
    const tokens = await FcmToken.find();
    const fcmTokens = tokens.map((token) => {
        return token.fcmToken
    })

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
        })
        .catch(error => {
            console.log(error);
        });
}
