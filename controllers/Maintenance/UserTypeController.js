
const UserType = require('../../models/Maintenance/usertype')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Countries = await UserType.find()
            res.status(200).send(Countries)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const usertype = await UserType.find({UserTypeId: id})
            res.status(200).send(usertype[0])
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
                    const Allcountries  = await UserType.find( );
                    const countries = await UserType.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcountries.length,
                        response: countries,
                        status: true,
                    }
                }
                else
                {
                    const Allcountries  = await UserType.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const countries = await UserType.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcountries.length,
                        response: countries,
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
    CreateUserType : async (req,res) => {
        try{
            var LatestUserType = await UserType.find().limit(1).sort({ UserTypeId: -1 })
            var Id = 1;
            if(LatestUserType.length > 0)
            {
                Id = LatestUserType[0].UserTypeId + 1;
            }
          
    
            var usertype = new UserType({
                    UserTypeId : Id,
                    Code : req.body.Code,
                    Name : req.body.Name,
                    Description : req.body.Description,
                    Enabled : true,
                    Default : false,
                    Description : req.body.Description,
                    CreatedDate : new Date(),
                    CreatedById: req.body.CreatedById,
                })
                usertype = await usertype.save()
                res.status(201).send(usertype)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateUserType : async (req,res) => {
  
        try{

            const usertype = await UserType.updateOne({ _id:  req.body.Id} , 
                { $set :{   UserTypeId : req.body.UserTypeId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            UpdatedDate : new Date(),
                            UpdatedById:   req.body.UpdatedById 
                        }
                } )
            
              
                res.status(201).send(usertype)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteUserType : async (req,res) => {
        try {   
            id = req.params.id
            const response = await UserType.deleteOne({_id:  req.params.id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnableUserType : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const usertype = await UserType.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(usertype)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    DefaultUserType : async (req,res) => {
        try 
        {   id = req.params.id
            enable = req.params.enable
            const allusertype = await UserType.updateMany({ $set :{ Default :  false }} )
            const usertype = await UserType.updateOne({ _id: id} ,  { $set :{   Default :  enable }} )
            res.status(201).send(usertype)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 