
const Country = require('../../models/Maintenance/country')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Countries = await Country.find()
            res.status(200).send(Countries)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const country = await Country.find({CountryId: id})
            res.status(200).send(country[0])
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
                    const Allcountries  = await Country.find( );
                    const countries = await Country.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcountries.length,
                        response: countries,
                        status: true,
                    }
                }
                else
                {
                    const Allcountries  = await Country.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const countries = await Country.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
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
    CreateCountry : async (req,res) => {
        try{
            var LatestCountry = await Country.find().limit(1).sort({ CountryId: -1 })
            var Id = 1;
            if(LatestCountry.length > 0)
            {
                Id = LatestCountry[0].CountryId + 1;
            }
          
    
            var country = new Country({
                    CountryId : Id,
                    Code : req.body.Code,
                    Name : req.body.Name,
                    Description : req.body.Description,
                    Enabled : true,
                    Default : false,
                    Description : req.body.Description,
                    CreatedDate : new Date(),
                    CreatedById: req.body.CreatedById,
                })
                country = await country.save()
                res.status(201).send(country)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateCountry : async (req,res) => {
  
        try{

            const country = await Country.updateOne({ _id:  req.body.Id} , 
                { $set :{   CountryId : req.body.CountryId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(country)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteCountry : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Country.deleteOne({_id:  req.params.id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnableCountry : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const country = await Country.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(country)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    DefaultCountry : async (req,res) => {
        try 
        {   id = req.params.id
            enable = req.params.enable
            const allcountry = await Country.updateMany({ $set :{ Default :  false }} )
            const country = await Country.updateOne({ _id: id} ,  { $set :{   Default :  enable }} )
            res.status(201).send(country)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 