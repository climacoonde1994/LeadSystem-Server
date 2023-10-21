const mongoose = require('mongoose')

const VendorSchema = new mongoose.Schema({
    Id:{ type: Number, required: true},
    Name:{ type: String, required: true},
    OwnerName: { type: String, required: true},
    FoodType: { type: [String] },
    Pincode: { type: String, required: true},
    Address: { type: String},
    Phone: { type: String, required: true},
    Email: { type: String, required: true},
    Password:{ type: String, required: true},
    Salt: { type: String, required: true},
    ServiceAvailable: { type: Boolean},
    CoverImages: { type: [String]},
    Rating: { type: Number},
    Foods: [{
        type: Number,
        ref: 'food'
    }],
    lat: { type: Number},
    lng: {type: Number}
});

module.exports = mongoose.model('vendor', VendorSchema);

 