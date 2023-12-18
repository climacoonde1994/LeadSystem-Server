const mongoose = require('mongoose')
 
const ClientSchema = new mongoose.Schema({
    ClientId : {type: Number, required: true},
    Name: {type: String, required: true},
    Code:  {type: String, required: true},
    Description:  {type: String},
    Address1:  {type: String},
    Address2: {type: String},
    CountryId: {type: Number, required: true},
    CityId: {type: Number},
    Phone: {type: String},
    FAX: {type: String},
    URL: {type: String},
    Enabled : {type : Boolean },
    GMTOffset: {type: Number},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: String},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: String}
});

module.exports = mongoose.model('client',ClientSchema)
 