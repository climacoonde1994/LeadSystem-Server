const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    Id : {type: Number, require: true},
    Customer: {type: String, require: true}, 
    VendorId:{type: String, require: true}, 
    OrderId: {type: String, require: true},
    OrderValue:{type: Number, require: true},
    Status: {type: String, require: true},
    PaymentMode: {type: String, require: true},
    PaymentResponse: {type: String },
})

module.exports = mongoose.model('transaction',transactionSchema)

