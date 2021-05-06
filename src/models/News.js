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
})


module.exports = mongoose.model('News', NewsSchema);