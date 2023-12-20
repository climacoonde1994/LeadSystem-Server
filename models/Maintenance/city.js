const mongoose = require('mongoose')

const CitySchema = new mongoose.Schema({
    CityId : {type: Number, required: true},
    CountryId : {type: Number, required: true},
    Code: {type: String, required: true},
    Name:  {type: String, required: true},
    Description:  {type: String},
    ZIP:  {type: String, required: true},
    Enabled : {type : Boolean },
    Default : {type : Boolean },
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: String},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: String}
    });

module.exports = mongoose.model('city',CitySchema)
 