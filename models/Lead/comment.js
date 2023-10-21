const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    CommentId : {type: Number, required: true},
    LeadId: {type: String, required: true},
    Comment:  {type: String, required: true},
    Date:  {type: Date},
    Author  :{type: Number},
    Type  :{type: String},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
    });

module.exports = mongoose.model('comment',CommentSchema)
 
 