const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
   
    Notification : {type : String , required : true},
    Description : {type : String , required : true},
    Type : {type : String , required : true},
    Ludatetime : {type : Date , required : false},
    CreatedByUser  : {type : String , required : true},
})

module.exports = mongoose.model('notification',NotificationSchema)
 