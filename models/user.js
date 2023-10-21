const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    UserCode : {type : String , required : true},
    UserName : {type : String , required : true},
    Password : {type : String , required : true},
    Email :  {type : String , required : true},
    FullName : {type : String , required : true},
    FirstName : {type : String , required : true},
    MiddleName : {type : String , required : false},
    UserType : {type : String , required : false},
    LastName : {type : String , required : true},
    Suffix : {type : String , required : false}, 
    BirthDate : {type : Date , required : false},
    Mobile : {type : String , required : false},
    Status : {type : String , required : false},
    Ludatetime : {type : Date , required : false}
})

module.exports = mongoose.model('user',userSchema)

