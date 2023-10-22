
const CityState = require('../models/Maintenance/citystate')
module.exports = {


    getAll : async (req,res) => {
        try{
            const CityStates = await CityState.find()
            res.status(200).send(CityStates)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const CityState = await CityState.find({CityStateId: id})
            res.status(200).send(CityState)
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
                    const Allcitystates  = await CityState.find( );
                    const citystates = await CityState.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcitystates.length,
                        response: citystates,
                        status: true,
                    }
                }
                else
                {
                    const Allcitystates  = await CityState.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const citystates = await CityState.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcitystates.length,
                        response: citystates,
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
    CreateCityState : async (req,res) => {
        try{
            const citystate = new CityState({
                CityStateId : req.body.CityStateId,
                CountryId : req.body.CountryId,
                Code : req.body.Code,
                Name : req.body.Name,
                Description : req.body.Description,
                CreatedDate : new Date(),
                CreatedById: 1,
                
                })
                citystate = await citystate.save()
                res.status(201).send(citystate)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateCityState : async (req,res) => {
  
        try{

            const citystate = await CityState.updateOne({ Id:  req.body.Id} , 
                { $set :{   CityStateId : req.body.CityStateId,
                            CountryId : req.body.CountryId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(citystate)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteCityState : async (req,res) => {
        try {   
            id = req.params.id
            const response = await CityState.deleteOne({CityStateId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 