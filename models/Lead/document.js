const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
    DocumentId : {type: Number, required: true},
    LeadId: {type: String, required: true},
    Name:  {type: String, required: true},
    Content  :{type: Number},
    Date:  {type: Date},
    Type  :{type: String},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
    });

module.exports = mongoose.model('document',DocumentSchema)
 
 