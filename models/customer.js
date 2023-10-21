const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    Id : {type: Number, required: true},
    Email: {type: String, required: true},
    Password:  {type: String, required: true},
    Salt:  {type: String, required: true},
    FirstName:  {type: String},
    LastName: {type: String},
    Address: {type: String},
    Phone: {type: String, required: true},
    Verified: {type: Boolean},
    Otp: {type: Number},
    Otp_expiry: {type: Date},
    Lat: {type: Number},
    Lng: {type: Number},
    Cart: [
        {
            Food: { type: String, ref: 'food', require: true},
            Unit: { type: Number, require: true}
        }
    ],
    Orders: [{
        type: Number,
        ref: 'order'
    }]
});

module.exports = mongoose.model('customer',CustomerSchema)
 