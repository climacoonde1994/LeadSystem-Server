const mongoose = require('mongoose')
 
const LeadContacSchema = new mongoose.Schema({
    LeadContactId : {type: Number, required: true},
    LeadId: {type: Number, required: true},
    Salutation:  {type: String},
    FirstName:  {type: String, required: true},
    LastName:  {type: String, required: true},
    Status:  {type: String},
    Department: {type: String},
    SystemType: {type: String},
    Type: {type: String},
    Email: {type: String},
    Remarks: {type: String},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
});




module.exports = mongoose.model('leadcontact',LeadContacSchema)
 