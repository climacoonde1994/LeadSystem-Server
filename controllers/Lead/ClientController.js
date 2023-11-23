
const Client = require('../../models/Lead/client')
const LeadHeader = require('../../models/Lead/leadheader')

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
            const client = await Client.find({ClientId: id})
            res.status(200).send(client[0])
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    
    getByLeadId : async (req,res) => {
        try{
            const id = req.params.id;
            const leadHeader = await LeadHeader.findOne({LeadId: id})
            const client = await Client.findOne({ClientId: leadHeader.ClientId})
            res.status(200).send(client)
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

 
 
    CreateClient : async (req,res) => {
        try{

            var LatestClient = await Client.find().limit(1).sort({ CityId: -1 })
            var Id = 1;
            if(LatestClient.length > 0)
            {
                Id = LatestClient[0].ClientId + 1;
            } 
            var client = new Client({
                ClientId : Id,
                Code : req.body.Code,
                Name : req.body.Name,
                Description : req.body.Description,
                Address1 : req.body.Address1,
                Address2 : req.body.Address2,
                CityId : req.body.CityId,
                CountryId : req.body.CountryId,
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
                            Address1 : req.body.Address1,
                            Address2 : req.body.Address2,
                            CityId : req.body.CityId,
                            CountryId : req.body.CountryId,
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
            const client = await Client.deleteOne({_id:id})
            res.status(201).send(client)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnableClient : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const client = await Client.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(client)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
  