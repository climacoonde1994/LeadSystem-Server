
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
                Department : req.body.Department,
                Adress1 : req.body.Adress1,
                Adress2 : req.body.Adress2,
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

            const employee = await Employee.updateOne({ Id:  req.body.Id} , 
                { $set :{    EmployeeId : req.body.EmployeeId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            Adress1 : req.body.Adress1,
                            Adress2 : req.body.Adress2,
                            CityId : req.body.CityId,
                            CountryId : req.body.CountryId,
                            Phone : req.body.Phone,
                            FAX : req.body.FAX,
                            URL : req.body.URL,
                            GMTOffset : req.body.GMTOffset,
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
    DeleteEmployee : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Employee.deleteOne({EmployeeId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 