const mongoose = require('mongoose')

const SystemTypeSchema = new mongoose.Schema({
    SystemTypeId : {type: Number, required: true},
    Code: {type: String, required: true},
    Name:  {type: String, required: true},
    Description:  {type: String},
    Enabled : {type : Boolean },
    Default : {type : Boolean },
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
    });

module.exports = mongoose.model('systemtype',SystemTypeSchema)
 