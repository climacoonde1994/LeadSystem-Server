
const User = require('../../models/Account/user')

 
module.exports = {


    getAll : async (req,res) => {
        try{
            const Users = await User.find()
            res.status(200).send(Users)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const user = await User.find({_id: id})
            res.status(200).send(user[0])
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
                    const Allusers  = await User.find( );
                    const users = await User.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allusers.length,
                        response: users,
                        status: true,
                    }
                }
                else
                {
                    const Allusers  = await User.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const users = await User.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allusers.length,
                        response: users,
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

 
 
    CreateUser : async (req,res) => {
        try{
            var user = new User({
                UserName : req.body.UserName,
                Password : req.body.Password,
                FirstName : req.body.FirstName,
                FullName : req.body.FirstName +  ' ' + req.body.LastName,
                LastName : req.body.LastName,
                MiddleName : req.body.MiddleName,
                Email : req.body.Email,
                Mobile : req.body.Mobile,
                UserType : req.body.UserType,
                Status : req.body.Status,
                CreatedDate : new Date(),
                CreatedById: req.body.CreatedById,
                })
                user = await user.save()
                res.status(201).send(user)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateUser : async (req,res) => {
  
        try{

         
        

            const user = await User.updateOne({ _id:  req.body.Id} , 
                { $set :{    UserName : req.body.UserId,
                    Password : req.body.Code,
                    FirstName : req.body.FirstName,
                    FullName : req.body.FirstName +  ' ' + req.body.LastName,
                    LastName : req.body.LastName,
                    MiddleName : req.body.MiddleName,
                    Email : req.body.Email,
                    Mobile : req.body.Mobile,
                    UserType : req.body.UserType,
                    Status : req.body.Status,
                    UpdatedDate : new Date(),
                    UpdatedById:   req.body.UpdatedById 
                        }
                } )
            
              
                res.status(201).send(user)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteUser : async (req,res) => {
        try {   
            id = req.params.id
            const response = await User.deleteOne({UserId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 