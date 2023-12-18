const mongoose = require('mongoose')
 
const ContacSchema = new mongoose.Schema({
    ContactId : {type: Number, required: true},
    Salutation:  {type: String},
    FirstName:  {type: String, required: true},
    LastName:  {type: String, required: true},
    Status:  {type: String},
    DepartmentId: {type: Number},
    TypeId: {type: Number},
    Department: {type: String},
    Type: {type: String},
    Email: {type: String},
    Remarks: {type: String},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
});




module.exports = mongoose.model('contact',ContacSchema)
 