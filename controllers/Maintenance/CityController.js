
const City = require('../../models/Maintenance/city')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Citys = await City.find()
            res.status(200).send(Citys)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const city = await City.find({CityId: id})
            res.status(200).send(city[0])
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
                    const Allcitys  = await City.find( );
                    const citys = await City.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcitys.length,
                        response: citys,
                        status: true,
                    }
                }
                else
                {
                    const Allcitys  = await City.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const citys = await City.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcitys.length,
                        response: citys,
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
    CreateCity : async (req,res) => {
        try{

            var LatestCity = await City.find().limit(1).sort({ CityId: -1 })
            var Id = 1;
            if(LatestCity.length > 0)
            {
                Id = LatestCity[0].CityId + 1;
            }
            var city = new City({
                CityId : Id,
                CityId : req.body.CityId,
                Code : req.body.Code,
                Name : req.body.Name,
                ZIP : req.body.ZIP,
                Enabled : true,
                Default : false,
                Description : req.body.Description,
                CreatedDate : new Date(),
                CreatedById: 1,
                })
                city = await city.save()
                res.status(201).send(city)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateCity : async (req,res) => {
  
        try{

            const city = await City.updateOne({ Id:  req.body.CityId} , 
                { $set :{   CityId : req.body.CityId,
                            CityId : req.body.CityId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(city)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteCity : async (req,res) => {
        try {   
            id = req.params.id
            const response = await City.deleteOne({CityId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnableCity : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const city = await City.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(city)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    DefaultCity : async (req,res) => {
        try 
        {   id = req.params.id
            enable = req.params.enable
            const allcity = await City.updateMany({ $set :{ Default :  false }} )
            const city = await City.updateOne({ _id: id} ,  { $set :{   Default :  enable }} )
            res.status(201).send(city)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 