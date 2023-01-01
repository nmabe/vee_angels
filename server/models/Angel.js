const mongoose = require('mongoose');

const angelSchema = new mongoose.Schema({
    username: {
      type: String,
      trim: true,
      required: true
    },
    profPicUrl: {
      type: Array,
      required: false
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 150
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['Female', 'Male', 'Unspecified'],
      
    },
    rating: {
      type: Number,
      default: 1,
      min: 0,
      max: 5
    },
    travel: {
      type: String,
      enum: ['Host', 'Travel', 'Both'],
      default: 'Host'
    },
    address: {
        province: String,
        city: String,
        suburb: String,
        street: String,
        houseNumber: String
    },
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      tiktok: String
    },
    bio:{ 
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Active', 'Away', 'Deactive'],
      default: 'Active'
    },
    views: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: String,
      default: new Date().toLocaleString()
    },
    updatedAt: {
      type: String,
      default: new Date().toLocaleString()
    }
});

const Angel = mongoose.model('Angel', angelSchema);

module.exports = {Angel}
