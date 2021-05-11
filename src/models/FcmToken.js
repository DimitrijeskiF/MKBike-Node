const mongoose = require('mongoose');

const FcmTokenSchema = new mongoose.Schema({
   fcmToken: {
       type: String
   }
})

module.exports = mongoose.model('FcmToken', FcmTokenSchema);