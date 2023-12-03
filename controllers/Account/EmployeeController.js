
const Employee = require('../../models/Account/employee')

 
module.exports = {


    getAll : async (req,res) => {
        try{
            const Employees = await Employee.find()
            res.status(200).send(Employees)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const employee = await Employee.find({_id: id})
            res.status(200).send(employee[0])
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    getByEmployeeId : async (req,res) => {
        try{
            const id = req.params.id;
            const employee = await Employee.find({EmployeeId: id})
            res.status(200).send(employee[0])
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
                    const Allemployees  = await Employee.find( );
                    const employees = await Employee.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allemployees.length,
                        response: employees,
                        status: true,
                    }
                }
                else
                {
                    const Allemployees  = await Employee.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const employees = await Employee.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allemployees.length,
                        response: employees,
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

 
 
    CreateEmployee : async (req,res) => {
        try{

            var LatestEmployee = await Employee.find().limit(1).sort({ CityId: -1 })
            var Id = 1;
            if(LatestEmployee.length > 0)
            {
                Id = LatestEmployee[0].EmployeeId + 1;
            } 

            
            var employee = new Employee({
                EmployeeId : Id,
                FullName : req.body.FirstName +  ' ' + req.body.LastName,
                FirstName : req.body.FirstName,
                MiddleName : req.body.MiddleName,
                LastName : req.body.LastName,
                Suffix : req.body.Suffix,
                Position : req.body.Position,
                DepartmentId : req.body.DepartmentId,
                Address1 : req.body.Address1,
                Address2 : req.body.Address2,
                CityId : req.body.CityId,
                CountryId : req.body.CountryId,
                Phone : req.body.Phone,
                Email : req.body.Email,
                CreatedDate : new Date(),
                CreatedById: 1,
                })
                employee = await employee.save()
                res.status(201).send(employee)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateEmployee : async (req,res) => {
  
        try{
            const employee = await Employee.updateOne({ _id:  req.body.Id} , 
                { $set :{   
                            FullName : req.body.FirstName +  ' ' + req.body.LastName,
                            FirstName : req.body.FirstName,
                            MiddleName : req.body.MiddleName,
                            LastName : req.body.LastName,
                            Suffix : req.body.Suffix,
                            Position : req.body.Position,
                            DepartmentId : req.body.DepartmentId,
                            Address1 : req.body.Address1,
                            Address2 : req.body.Address2,
                            CityId : req.body.CityId,
                            CountryId : req.body.CountryId,
                            Phone : req.body.Phone,
                            Email : req.body.Email,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(employee)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    EnableEmployee : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const employee = await Employee.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(employee)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
    DeleteEmployee : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Employee.deleteOne({_id:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 