const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    UserName : {type : String , required : true},
    Password : {type : String , required : true},
    Email :  {type : String , required : true},
    FullName : {type : String , required : true},
    FirstName : {type : String , required : true},
    MiddleName : {type : String , required : false},
    UserType : {type : String , required : false},
    LastName : {type : String , required : true},
    Mobile : {type : String , required : false},
    Status : {type : String , required : false},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: String},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: String}
})

module.exports = mongoose.model('user',userSchema)

 