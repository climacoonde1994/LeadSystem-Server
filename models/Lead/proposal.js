const mongoose = require('mongoose')

const ProposalSchema = new mongoose.Schema({
    ProposalId : {type: Number, required: true},
    LeadId: {type: String, required: true},
    ProposalRemarks:  {type: String, required: true},
    Date:  {type: Date},
    Author  :{type: Number},
    Type  :{type: String},
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
    });

module.exports = mongoose.model('proposal',ProposalSchema)
 
 