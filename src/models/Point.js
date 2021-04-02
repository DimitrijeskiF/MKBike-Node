const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

const PointSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAdd: {
    type: Date,
    default: Date.now
  }
})


PointSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates:[loc[0].latitude, loc[0].longitude],
      formattedAddress: loc[0].formattedAddress
    }

    this.address = undefined;
    next();
})
module.exports = mongoose.model('Point', PointSchema);