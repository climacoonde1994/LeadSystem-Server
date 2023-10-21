const mongoose = require('mongoose')

const DtrSchema = new mongoose.Schema({
    Id : {type : Number , required : true},
    LogDate : {type : Date , required : true},
    LogTime : {type : Date , required : true},
    LogType : {type : String , required : true},
    Ludatetime : {type : Date , required : false}
})


module.exports = mongoose.model('dtr',DtrSchema)
 