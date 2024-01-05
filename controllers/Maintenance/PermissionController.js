
const Permission = require('../../models/Maintenance/permission')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Permissions = await Permission.find()
            res.status(200).send(Permissions)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const permission = await Permission.findOne({PermissionId: id})
            res.status(200).send(permission)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    
    getByUserTypeId : async (req,res) => {
        try{
            const id = req.params.id;
            const permission = await Permission.find({UserTypeId: id})
            res.status(200).send(permission)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    getByname : async (req,res) => {
        try{

            const searchText = req.params.searchText;
            const pageNumber = req.params.currentPage;
            const pageSize = req.params.pageSize;
            const skip = (pageNumber - 1) * pageSize;
            if(searchText.length > 0)
            {  
                if(searchText == 'Default')
                {
                    const Allpermissions  = await Permission.find( );
                    const permissions = await Permission.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allpermissions.length,
                        response: permissions,
                        status: true,
                    }
                }
                else
                {
                    const Allpermissions  = await Permission.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const permissions = await Permission.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allpermissions.length,
                        response: permissions,
                        status: true,
                    }
                }
            }
            else
            {
                response = {
                    totalSize:0,
                    response: null,
                    status: true,
                }
            }
            res.status(200).send(response)
        }
        catch(err){
            res.status(500).json({message : err.message})
    
        }

    },
    CreatePermission : async (req,res) => {
        try{

            var LatestPermission = await Permission.find().limit(1).sort({ PermissionId: -1 })
            var Id = 1;
            if(LatestPermission.length > 0)
            {
                Id = LatestPermission[0].PermissionId + 1;
            }

            var PermissionExist =  await Permission.findOne({Code: req.body.Code })
            if(PermissionExist != null){
                res.status(200).send({message : ['Permission Already exist'] , success : false  })
            }
            else
            {
                var permission = new Permission({
                    PermissionId : Id,
                    Code : req.body.Code,
                    Name : req.body.Name,
                    Description : req.body.Description,
                    Enabled : true,
                    Default : false,
                    Description : req.body.Description,
                    CreatedDate : new Date(),
                    CreatedById: req.body.CreatedById,
                })
                permission = await permission.save()
                res.status(201).send({message : '' , success : true  })
            }
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdatePermission : async (req,res) => {
  
        try{
            var PermissionExist =  await Permission.findOne({Code: req.body.Code })
            if(PermissionExist != null && PermissionExist._id.toString() != req.body.Id )
            {
                res.status(200).send({message : ['Permission Already exist'] , success : false  })
            }
            else
            { 
                const permission = await Permission.updateOne({ _id:  req.body.Id} , 
                    { $set :{   PermissionId : req.body.PermissionId,
                                Code : req.body.Code,
                                Name : req.body.Name,
                                Description : req.body.Description,
                                UpdatedDate : new Date(),
                                UpdatedById:   req.body.UpdatedById 
                            }
                    } )
                res.status(201).send({message : '' , success : true  })
            
            }
  
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    SavePermission : async (req,res) => {
        try{
            if (req.body && Array.isArray(req.body)) 
            {

                var records = req.body; 
              
                for (const record of records) {
            
                    if(record.Id == '')
                    {
                        var p = null;
                    }
                    else
                    {
                        var p = await Permission.findOne({_id: record.Id})
                    }
                  
                 
                    if(p == null)
                    {
                        var permission = new Permission({
                            View : record.View,
                            Add : record.Add,
                            Edit : record.Edit,
                            Delete : record.Delete,
                            MenuId : record.MenuId,
                            UserTypeId : record.UserTypeId,
                            })
                          permission = await permission.save()
                    }
                    else
                    {
                        await Permission.updateOne({ _id: record.Id} , 
                            { $set :{    View : record.View,
                                Add : record.Add,
                                Edit : record.Edit,
                                Delete : record.Delete,
                                MenuId : record.MenuId,
                                UserTypeId : record.UserTypeId,
                                    }
                            } )
                    }
                  
                }
            
               
              } else {
                res.status(400).send('Invalid request format. Expecting an array of records.');
              }

              res.status(201).send(permission)
                
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeletePermission : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Permission.deleteOne({_id:  req.params.id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnablePermission : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const permission = await Permission.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(permission)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    DefaultPermission : async (req,res) => {
        try 
        {   id = req.params.id
            enable = req.params.enable
            const allpermission = await Permission.updateMany({ $set :{ Default :  false }} )
            const permission = await Permission.updateOne({ _id: id} ,  { $set :{   Default :  enable }} )
            res.status(201).send(permission)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 