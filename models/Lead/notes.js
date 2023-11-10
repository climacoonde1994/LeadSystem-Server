const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    NoteId :  {type: Number, required: true},
    LeadId :  {type: Number, required: true},
    Date:  {type: Date, required: true},
    Description:  {type: String, required: true},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    });

module.exports = mongoose.model('note',NoteSchema)
 