
const Department = require('../models/Maintenance/department')
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
            const Department = await Department.find({DepartmentId: id})
            res.status(200).send(Department)
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
            const department = new Department({
                DepartmentId : req.body.DepartmentId,
                Code : req.body.Code,
                Name : req.body.Name,
                Description : req.body.Description,
                CreatedDate : new Date(),
                CreatedById: 1,
                
                })
                department = await department.save()
                res.status(201).send(department)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateDepartment : async (req,res) => {
  
        try{

            const department = await Department.updateOne({ Id:  req.body.Id} , 
                { $set :{    DepartmentId : req.body.DepartmentId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(department)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteDepartment : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Department.deleteOne({DepartmentId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 