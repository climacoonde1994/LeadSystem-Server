const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Description:  {type: String},
    Path:  {type: String, required: true},
    Icon:  {type: String},
    Enabled : {type : Boolean },
    Default : {type : Boolean },
    CreatedDate: {type : Date , required : false},
    CreatedById: {type: String},
    UpdatedDate: {type : Date , required : false},
    UpdatedById: {type: String}
    });

module.exports = mongoose.model('menu',MenuSchema)
 