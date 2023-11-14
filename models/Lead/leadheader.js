const mongoose = require('mongoose')
 
 
const LeadHeaderSchema = new mongoose.Schema({
    LeadId : {type: Number, required: true},
    ClientId : {type: Number, required: true},
    ClientName : {type: String, required: true},
    LeadNo: {type: String, required: true},
    LeadDate:  {type: String, required: true},
    Status : {type: String, required: true},
    StatusComment : {type: String},
    SalesPersonId: {type: Number, required: true},
    FollowUpDate:  {type: String, required: true},
    SalesPersonId2 : {type: Number},
    FollowUpDate2 : {type: String},
    SourceId: {type: Number},
    Quality:  {type: String},
    Likelihood : {type: String},
    Comments : {type: Number},
    ActionNeeded: {type: String},
    MeetDate:  {type: Date},
    Remarks:  {type: String},
    InternetContactList:  {type: String},
    ActionNeededNotes:  {type: String},
    InternetNotes:  {type: String},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number},
    });

module.exports = mongoose.model('leadheader',LeadHeaderSchema)
 