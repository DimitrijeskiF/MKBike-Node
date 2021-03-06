const mongoose = require('mongoose');


const NewsSchema = new mongoose.Schema({
    img :{
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('News', NewsSchema);