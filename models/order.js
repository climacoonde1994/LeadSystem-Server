const mongoose = require('mongoose')
 
const OrderSchema = new mongoose.Schema({
    Id : {type: Number, require: true},
    OrderId: {type: String, require: true},
    VendorId: {type: String, require: true},
    CustomerId: {type: String, require: true},
    Items: [
        {
            Food: {type: Number, ref: "food", require: true},
            Unit: { type: Number, require: true}
        }
    ],
    TotalAmount: {type: Number, require: true},
    PaidAmount: {type: Number, require: true},
    OrderDate: {type: Date },
    OrderStatus: {type: String},
    Remarks: {type: String},
    DeliveryId: {type: String},
    ReadyTime:{type: Number},
});

module.exports = mongoose.model('order', OrderSchema);

 