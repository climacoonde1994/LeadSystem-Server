const Driver = require('../models/driver')

module.exports = {


    getAll : async (req,res) => {
        try{
            const Drivers = await Driver.find()
            res.status(200).send(Drivers)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Drivers = await Driver.find({Id: id})
            res.status(200).send(Drivers)
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
                    const Alldrivers  = await Driver.find( );
                    const drivers = await Driver.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Alldrivers.length,
                        response: drivers,
                        status: true,
                    }
                }
                else
                {
                    const Alldrivers  = await Driver.find( {$or : [{ FirstName : searchText },{LastName : searchText }]} );
                    const drivers = await Driver.find({$or : [{ FastName : searchText },{LastName : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Alldrivers.length,
                        response: drivers,
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
    CreateDriver : async (req,res) => {
  
        try{
            const driver = new Driver({
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
                const drivers = await driver.save()
                res.status(201).send(driver)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateDriver : async (req,res) => {
  
        try{

            const driver = await Driver.updateOne({ Id:  req.body.Id} , 
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
            
              
                res.status(201).send(driver)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteDriver : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Driver.deleteOne({Id:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 