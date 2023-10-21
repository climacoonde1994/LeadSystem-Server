const mongoose = require('mongoose')

const CutPasteSchema = new mongoose.Schema({
    CommentId : {type: Number, required: true},
    LeadId: {type: String, required: true},
    Notes:  {type: String, required: true},
    Date:  {type: Date},
    Author  :{type: Number},
    Type  :{type: String},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
    });

module.exports = mongoose.model('cutpaste.js',CutPaste.jsSchema)
 
 