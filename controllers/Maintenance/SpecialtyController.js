
const Specialty = require('../../models/Maintenance/specialty')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Specialties = await Specialty.find()
            res.status(200).send(Specialties)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const specialty = await Specialty.find({SpecialtyId: id})
            res.status(200).send(specialty[0])
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
                    const Allspecialties  = await Specialty.find( );
                    const specialties = await Specialty.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allspecialties.length,
                        response: specialties,
                        status: true,
                    }
                }
                else
                {
                    const Allspecialties  = await Specialty.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const specialties = await Specialty.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allspecialties.length,
                        response: specialties,
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
    CreateSpecialty : async (req,res) => {
        try{

            var LatestSpecialty = await Specialty.find().limit(1).sort({ SpecialtyId: -1 })
            var Id = 1;
            if(LatestSpecialty.length > 0)
            {
                Id = LatestSpecialty[0].SpecialtyId + 1;
            }
            var specialty = new Specialty({
                    SpecialtyId : Id,
                    Code : req.body.Code,
                    Name : req.body.Name,
                    Description : req.body.Description,
                    Enabled : true,
                    Default : false,
                    Description : req.body.Description,
                    CreatedDate : new Date(),
                    CreatedById: 1,
                })
                specialty = await specialty.save()
                res.status(201).send(specialty)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateSpecialty : async (req,res) => {
  
        try{

            const specialty = await Specialty.updateOne({ _id:  req.body.Id} , 
                { $set :{   SpecialtyId : req.body.SpecialtyId,
                            Code : req.body.Code,
                            Name : req.body.Name,
                            Description : req.body.Description,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(specialty)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteSpecialty : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Specialty.deleteOne({_id:  req.params.id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnableSpecialty : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const specialty = await Specialty.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(specialty)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    DefaultSpecialty : async (req,res) => {
        try 
        {   id = req.params.id
            enable = req.params.enable
            const allspecialty = await Specialty.updateMany({ $set :{ Default :  false }} )
            const specialty = await Specialty.updateOne({ _id: id} ,  { $set :{   Default :  enable }} )
            res.status(201).send(specialty)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 