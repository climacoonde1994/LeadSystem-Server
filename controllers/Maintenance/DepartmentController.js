
const Department = require('../../models/Maintenance/department')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Departments = await Department.find()
            res.status(200).send(Departments)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const department = await Department.findOne({DepartmentId: id})
            res.status(200).send(department)
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
                    const Alldepartments  = await Department.find( );
                    const departments = await Department.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Alldepartments.length,
                        response: departments,
                        status: true,
                    }
                }
                else
                {
                    const Alldepartments  = await Department.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const departments = await Department.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Alldepartments.length,
                        response: departments,
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
    CreateDepartment : async (req,res) => {
        try{

            var LatestDepartment = await Department.find().limit(1).sort({ DepartmentId: -1 })
            var Id = 1;
            if(LatestDepartment.length > 0)
            {
                Id = LatestDepartment[0].DepartmentId + 1;
            }

            var DepartmentExist =  await Department.findOne({Code: req.body.Code })
            if(DepartmentExist != null){
                res.status(200).send({message : ['Department Already exist'] , success : false  })
            }
            else
            {
                var department = new Department({
                    DepartmentId : Id,
                    Code : req.body.Code,
                    Name : req.body.Name,
                    Description : req.body.Description,
                    Enabled : true,
                    Default : false,
                    Description : req.body.Description,
                    CreatedDate : new Date(),
                    CreatedById: req.body.CreatedById,
                })
                department = await department.save()
                res.status(201).send({message : '' , success : true  })
            }
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateDepartment : async (req,res) => {
  
        try{
            var DepartmentExist =  await Department.findOne({Code: req.body.Code })
            if(DepartmentExist != null && DepartmentExist._id.toString() != req.body.Id )
            {
                res.status(200).send({message : ['Department Already exist'] , success : false  })
            }
            else
            { 
                const department = await Department.updateOne({ _id:  req.body.Id} , 
                    { $set :{   DepartmentId : req.body.DepartmentId,
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
    DeleteDepartment : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Department.deleteOne({_id:  req.params.id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnableDepartment : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const department = await Department.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(department)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    DefaultDepartment : async (req,res) => {
        try 
        {   id = req.params.id
            enable = req.params.enable
            const alldepartment = await Department.updateMany({ $set :{ Default :  false }} )
            const department = await Department.updateOne({ _id: id} ,  { $set :{   Default :  enable }} )
            res.status(201).send(department)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 