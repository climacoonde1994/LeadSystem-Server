const mongoose = require('mongoose')

const CityStateSchema = new mongoose.Schema({
    CityStateId : {type: Number, required: true},
    CountryId : {type: Number, required: true},
    Code: {type: String, required: true},
    Name:  {type: String, required: true},
    Description:  {type: String},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number},
    });

module.exports = mongoose.model('citystate',CityStateSchema)
 