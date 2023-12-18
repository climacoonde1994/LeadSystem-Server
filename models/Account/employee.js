const mongoose = require('mongoose')
 
const EmployeeSchema = new mongoose.Schema({
    EmployeeId : {type: Number, required: true},
    FullName : {type: String },
    FirstName: {type: String, required: true},
    MiddleName: {type: String },
    LastName: {type: String, required: true},
    Suffix:  {type: String },
    Position:  {type: String},
    DepartmentId:  {type: Number},
    Address1:  {type: String},
    Address2: {type: String},
    CountryId: {type: Number, required: true},
    CityId: {type: Number},
    Email : {type: String},
    Phone: {type: String},
    Enabled : {type : Boolean },
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: String},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: String}
});

module.exports = mongoose.model('employee',EmployeeSchema)
 