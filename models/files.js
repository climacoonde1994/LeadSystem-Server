const mongoose = require('mongoose')
const FilesSchema = new mongoose.Schema({
    FileName : {type : String , required : true},
    FileType : {type : String , required : true},
    Prefix : {type : String , required : true},
    Ludatetime : {type : Date , required : false}
})

module.exports = mongoose.model('files',FilesSchema)

