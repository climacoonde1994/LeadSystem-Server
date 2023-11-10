const mongoose = require('mongoose')
 
const DocumentSchema = new mongoose.Schema({
    DocumentId : {type: Number, required: true},
    LeadId: {type: Number, required: true},
    FileName:  {type: String, required: true},
    FileType  :{type: String},
    Prefix:  {type: String},
    Date:  {type: Date},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
 
    });

module.exports = mongoose.model('document',DocumentSchema)
 
 