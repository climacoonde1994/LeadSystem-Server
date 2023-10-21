const mongoose = require('mongoose')
 
const ClientSchema = new mongoose.Schema({
    ClientId : {type: Number, required: true},
    Name: {type: String, required: true},
    Code:  {type: String, required: true},
    Description:  {type: String},
    Adress1:  {type: String},
    Adress2: {type: String},
    CountryId: {type: Number, required: true},
    CityStateId: {type: Number},
    Phone: {type: String},
    FAX: {type: String},
    URL: {type: String},
    GMTOffset: {type: Number},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
});

module.exports = mongoose.model('client',ClientSchema)
 