const mongoose = require('mongoose')

const SourceSchema = new mongoose.Schema({
    SourceId : {type: Number, required: true},
    Code: {type: String, required: true},
    Name:  {type: String, required: true},
    Description:  {type: String},
    Enabled : {type : Boolean },
    Default : {type : Boolean },
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: String},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: String}
    });

module.exports = mongoose.model('source',SourceSchema)
 