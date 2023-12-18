
const SystemType = require('../../models/Maintenance/systemtype')
module.exports = {


    getAll : async (req,res) => {
        try{
            const SystemTypes = await SystemType.find()
            res.status(200).send(SystemTypes)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const systemtype = await SystemType.find({SystemTypeId: id})
            res.status(200).send(systemtype[0])
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
                    const Allsystemtypes  = await SystemType.find( );
                    const systemtypes = await SystemType.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allsystemtypes.length,
                        response: systemtypes,
                        status: true,
                    }
                }
                else
                {
                    const Allsystemtypes  = await SystemType.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const systemtypes = await SystemType.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allsystemtypes.length,
                        response: systemtypes,
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
    CreateSystemType : async (req,res) => {
        try{

            var LatestSystemType = await SystemType.find().limit(1).sort({ SystemTypeId: -1 })
            var Id = 1;
            if(LatestSystemType.length > 0)
            {
                Id = LatestSystemType[0].SystemTypeId + 1;
            }
            var systemtype = new SystemType({
                    SystemTypeId : Id,
                    Code : req.body.Code,
                    Name : req.body.Name,
                    Description : req.body.Description,
                    Enabled : true,
                    Default : false,
                    Description : req.body.Description,
                    CreatedDate : new Date(),
                    CreatedById: req.body.CreatedById,
                })
                systemtype = await systemtype.save()
                res.status(201).send(systemtype)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateSystemType : async (req,res) => {
  
        try{

            const systemtype = await SystemType.updateOne({ _id:  req.body.Id} , 
                { $set :{   SystemTypeId : req.body.SystemTypeId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            UpdatedDate : new Date(),
                            UpdatedById:   req.body.UpdatedById 
                        }
                } )
            
              
                res.status(201).send(systemtype)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteSystemType : async (req,res) => {
        try {   
            id = req.params.id
            const response = await SystemType.deleteOne({_id:  req.params.id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnableSystemType : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const systemtype = await SystemType.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(systemtype)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    DefaultSystemType : async (req,res) => {
        try 
        {   id = req.params.id
            enable = req.params.enable
            const allsystemtype = await SystemType.updateMany({ $set :{ Default :  false }} )
            const systemtype = await SystemType.updateOne({ _id: id} ,  { $set :{   Default :  enable }} )
            res.status(201).send(systemtype)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 