
const Source = require('../../models/Maintenance/source')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Sources = await Source.find()
            res.status(200).send(Sources)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Source = await Source.find({SourceId: id})
            res.status(200).send(Source)
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
                    const Allsources  = await Source.find( );
                    const sources = await Source.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allsources.length,
                        response: sources,
                        status: true,
                    }
                }
                else
                {
                    const Allsources  = await Source.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const sources = await Source.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allsources.length,
                        response: sources,
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
    CreateSource : async (req,res) => {
        try{
             Largest = await Source.find().sort({SourceId : -1}).limit(1)
          
            var sourceId = 0;
            if(Largest.length > 0 )
            {  
                sourceId = Largest[0].SourceId + 1;
                console.log(Largest)
            }
            else{
                sourceId = 1;
            }
        
            var source = new Source({
                    SourceId : sourceId,
                    Code : req.body.Code,
                    Name : req.body.Name,
                    Description : req.body.Description,
                    Enabled : true,
                    Default : false,
                    Description : req.body.Description,
                    CreatedDate : new Date(),
                    CreatedById: 1,
                })
                source = await source.save()
                res.status(201).send(source)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateSource : async (req,res) => {
  
        try{

            const source = await Source.updateOne({ _id:  req.body.Id} , 
                { $set :{   SourceId : req.body.SourceId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(source)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteSource : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Source.deleteOne({_id:  req.params.id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnableSource : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const source = await Source.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(source)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    DefaultSource : async (req,res) => {
        try 
        {   id = req.params.id
            enable = req.params.enable
            const allsource = await Source.updateMany({ $set :{ Default :  false }} )
            const source = await Source.updateOne({ _id: id} ,  { $set :{   Default :  enable }} )
            res.status(201).send(source)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 