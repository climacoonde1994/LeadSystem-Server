const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({
    MenuId: {type: String, required: true},
    UserTypeId : {type: String, required: true},
    Name : {type : String },
    View : {type : Boolean },
    Add : {type : Boolean },
    Edit : {type : Boolean },
    Delete : {type : Boolean },
    });

module.exports = mongoose.model('permission',PermissionSchema)
 