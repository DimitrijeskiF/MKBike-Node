const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    date: {
        type: Date,
    },
    link: {
        type: String,
    },
    thumbnail: {
        type: String
    }
});


module.exports = mongoose.model('Event', EventSchema);
