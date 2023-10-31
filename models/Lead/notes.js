const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    Date:  {type: Date, required: true},
    Description:  {type: String, required: true},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    });

module.exports = mongoose.model('note',NoteSchema)
 