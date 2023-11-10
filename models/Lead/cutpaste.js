const mongoose = require('mongoose')

const CutPasteSchema = new mongoose.Schema({
    CutPasteId : {type: Number, required: true},
    LeadId: {type: String, required: true},
    Title  :{type: String},
    Description:  {type: String, required: true},
    Date:  {type: Date},
    Author  :{type: Number},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
    });

module.exports = mongoose.model('cutpaste',CutPasteSchema)
 
 