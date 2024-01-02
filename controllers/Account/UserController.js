
const User = require('../../models/Account/user')
const bcrypt =  require("bcrypt")
 
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
            var UserExist =  await User.findOne({FirstName: req.body.FirstName } ,{LastName: req.body.LastName   })
            if(UserExist != null)
            {
                res.status(200).send({message : ['User Already exist'] , success : false  })
            }
            else
            {
                let r = (Math.random() + 1).toString(36).substring(3);
                var user = new User({
                    UserName : req.body.UserName,
                    TemporaryPassword : r,
                    IsTempPassword : true,
                    Password : '********',
                    FirstName : req.body.FirstName,
                    FullName : req.body.FirstName +  ' ' + req.body.LastName,
                    LastName : req.body.LastName,
                    MiddleName : req.body.MiddleName,
                    Email : req.body.Email,
                    Enabled : true,
                    Mobile : req.body.Mobile,
                    UserType : req.body.UserType,
                    Status : req.body.Status,
                    CreatedDate : new Date(),
                    CreatedById: req.body.CreatedById,
                    })
                    user = await user.save()
                    res.status(201).send({message : '' , success : true  }) 
            }
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateUser : async (req,res) => {
  
        try{

            var UserExist =  await User.findOne({UserName: req.body.UserName })
            if(UserExist != null && UserExist._id.toString() != req.body.Id ){
                res.status(200).send({message : ['User Name Already exist'] , success : false  })
            }
            else
            {
                const user = await User.updateOne({ _id:  req.body.Id} , 
                    { $set :{  
                        UserName: req.body.UserName,
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

                res.status(201).send({message : '' , success : true  }) 
            }
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteUser : async (req,res) => {
        try {   
            id = req.params.id
            const response = await User.deleteOne({_id:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
    
    EnableUser : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const user = await User.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(user)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    ResetUser : async (req,res) => {
        try 
        {   
            id = req.params.id
            let r = (Math.random() + 1).toString(36).substring(3);
            const user = await User.updateOne({ _id:  id} ,   
                { $set :{   Password :  '' , TemporaryPassword : r , IsTempPassword : true}} )
            res.status(201).send(user)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    ChangePassword : async (req,res) => {
        try 
        {   
            const password = await bcrypt.hash(req.body.Password, 10);
            const user = await User.updateOne({ _id:  req.body.Id} , 
                { $set :{   
                    UserName : req.body.UserName,
                    Password : password,
                    IsTempPassword : false
                        }
                } )
            
                res.status(201).send(user)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 