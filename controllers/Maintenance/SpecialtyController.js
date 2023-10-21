
const Specialty = require('../models/Maintenance/specialty')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Specialtys = await Specialty.find()
            res.status(200).send(Specialtys)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Specialtys = await Specialty.find({Id: id})
            res.status(200).send(Specialtys)
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
                    const Allspecialtys  = await Specialty.find( );
                    const specialtys = await Specialty.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allspecialtys.length,
                        response: specialtys,
                        status: true,
                    }
                }
                else
                {
                    const Allspecialtys  = await Specialty.find( {$or : [{ FirstName : searchText },{LastName : searchText }]} );
                    const specialtys = await Specialty.find({$or : [{ FastName : searchText },{LastName : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allspecialtys.length,
                        response: specialtys,
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
    CreateSpecialty : async (req,res) => {
  
        try{
            const specialty = new Specialty({
                Id : req.body.Id,
                Email : req.body.Email,
                Password : req.body.Password,
                Salt : req.body.Salt,
                FirstName : req.body.FirstName,
                LastName : req.body.LastName,
                Address : req.body.Address,
                Phone : req.body.Phone,
                Verified : req.body.Verified,
                Otp : req.body.Otp,
                Otp_expiry : new Date(),
                Lat : req.body.Lat,
                Lng : req.body.Lng,
                IsAvailable : req.body.IsAvailable,
                })
                const specialtys = await specialty.save()
                res.status(201).send(specialty)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateSpecialty : async (req,res) => {
  
        try{

            const specialty = await Specialty.updateOne({ Id:  req.body.Id} , 
                { $set :{   Id : req.body.Id,
                            Email : req.body.Email,
                            Password : req.body.Password,
                            Salt : req.body.Salt,
                            FirstName : req.body.FirstName,
                            LastName : req.body.LastName,
                            Address : req.body.Address,
                            Phone : req.body.Phone,
                            Verified : req.body.Verified,
                            Otp : req.body.Otp,
                            Otp_expiry : new Date(),
                            Lat : req.body.Lat,
                            Lng : req.body.Lng,
                            IsAvailable : req.body.IsAvailable,
                        }
                } )
            
              
                res.status(201).send(specialty)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteSpecialty : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Specialty.deleteOne({Id:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 