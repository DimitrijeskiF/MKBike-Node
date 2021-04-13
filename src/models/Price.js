const mongoose = require('mongoose');


const priceSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    prices: [{
        day: {
            type: Number,
            require: true
        },
        month: {
            type: Number,
            require: true

        },
        year: {
            type: Number,
            require: true
        }
    }]
})

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;