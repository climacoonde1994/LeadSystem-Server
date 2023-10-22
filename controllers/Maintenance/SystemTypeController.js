
const SystemType = require('../models/Maintenance/systemtype')
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
            const SystemType = await SystemType.find({SystemTypeId: id})
            res.status(200).send(SystemType)
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
            const systemtype = new SystemType({
                SystemTypeId : req.body.SystemTypeId,
                Code : req.body.Code,
                Name : req.body.Name,
                Description : req.body.Description,
                CreatedDate : new Date(),
                CreatedById: 1,
                
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

            const systemtype = await SystemType.updateOne({ Id:  req.body.Id} , 
                { $set :{    SystemTypeId : req.body.SystemTypeId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
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
            const response = await SystemType.deleteOne({SystemTypeId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 