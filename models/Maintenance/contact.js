const mongoose = require('mongoose')
 
const ContacSchema = new mongoose.Schema({
    ContactId : {type: Number, required: true},
    Salutation:  {type: String},
    FullName : {type: String},
    FirstName:  {type: String, required: true},
    LastName:  {type: String, required: true},
    DepartmentId: {type: Number},
    SystemTypeId: {type: Number},
    Status:  {type: String},
    Department: {type: String},
    SystemType: {type: String},
    Email: {type: String},
    Remarks: {type: String},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: String},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: String}
});




module.exports = mongoose.model('contact',ContacSchema)
 