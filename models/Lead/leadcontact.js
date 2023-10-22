const mongoose = require('mongoose')
 
const LeadContacSchema = new mongoose.Schema({
    LeadContactId : {type: Number, required: true},
    LeadId: {type: Number, required: true},
    Firstname:  {type: String, required: true},
    LastName:  {type: String, required: true},
    Status:  {type: String},
    DepartmentId: {type: Number},
    TypeId: {type: Number},
    Email: {type: String},
    Remarks: {type: Number},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
});




module.exports = mongoose.model('leadcontact',LeadContacSchema)
 