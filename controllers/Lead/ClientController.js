
const Client = require('../models/Lead/client')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Clients = await Client.find()
            res.status(200).send(Clients)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Client = await Client.find({ClientId: id})
            res.status(200).send(Client)
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
                    const Allclients  = await Client.find( );
                    const clients = await Client.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allclients.length,
                        response: clients,
                        status: true,
                    }
                }
                else
                {
                    const Allclients  = await Client.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const clients = await Client.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allclients.length,
                        response: clients,
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

 
    GMTOffset: {type: Number},
    CreateClient : async (req,res) => {
        try{
            const client = new Client({
                ClientId : req.body.ClientId,
                Code : req.body.Code,
                Name : req.body.Name,
                Description : req.body.Description,
                Adress1 : req.body.Adress1,
                Adress2 : req.body.Adress2,
                CountryId : req.body.CountryId,
                CityStateId : req.body.CityStateId,
                Phone : req.body.Phone,
                FAX : req.body.FAX,
                URL : req.body.URL,
                GMTOffset : req.body.GMTOffset,
                CreatedDate : new Date(),
                CreatedById: 1,
                
                })
                client = await client.save()
                res.status(201).send(client)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateClient : async (req,res) => {
  
        try{

            const client = await Client.updateOne({ Id:  req.body.Id} , 
                { $set :{    ClientId : req.body.ClientId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            Adress1 : req.body.Adress1,
                            Adress2 : req.body.Adress2,
                            CountryId : req.body.CountryId,
                            CityStateId : req.body.CityStateId,
                            Phone : req.body.Phone,
                            FAX : req.body.FAX,
                            URL : req.body.URL,
                            GMTOffset : req.body.GMTOffset,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(client)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteClient : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Client.deleteOne({ClientId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 