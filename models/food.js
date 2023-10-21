const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    VendorId: { type: String, required: true},
    Name: { type: String, required: true},
    Description: { type: String, required: true},
    Category: { type: String},
    FoodType: { type: String, required: true},
    ReadyTime: { type: Number},
    Price: {type: Number},
    Rating: {type: Number},
    Images: {type: [String]},
})

module.exports = mongoose.model('food',FoodSchema)