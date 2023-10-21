const mongoose = require('mongoose')

const DriversSchema = new mongoose.Schema({
    Id: {type: Number, required: true},
    Email: {type: String, required: true},
    Password:  {type: String, required: true},
    Salt:  {type: String, required: true},
    FirstName:  {type: String},
    LastName: {type: String},
    Address: {type: String},
    Phone: {type: String, required: true},
    Pincode: {type: String},
    Verified: {type: Boolean},
    Otp: {type: Number},
    Otp_expiry: {type: Date},
    Lat: {type: Number},
    Lng: {type: Number},
    IsAvailable: {type: Boolean, default: false}
})

module.exports = mongoose.model('driver',DriversSchema)

 