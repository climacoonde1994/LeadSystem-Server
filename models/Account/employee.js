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
    Adress1:  {type: String},
    Adress2: {type: String},
    CountryId: {type: Number, required: true},
    CityId: {type: Number},
    Email : {type: String},
    Phone: {type: String},
    Enabled : {type : Boolean },
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: Number},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: Number}
});

module.exports = mongoose.model('employee',EmployeeSchema)
 