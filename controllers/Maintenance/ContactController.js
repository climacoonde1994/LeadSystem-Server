
const Contact = require('../../models/Maintenance/contact')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Contacts = await Contact.find()
            res.status(200).send(Contacts)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const contact = await Contact.find({_id: id})
            res.status(200).send(contact[0])
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
                    const Allcontacts  = await Contact.find( );
                    const contacts = await Contact.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcontacts.length,
                        response: contacts,
                        status: true,
                    }
                }
                else
                {
                    const Allcontacts  = await Contact.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const contacts = await Contact.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcontacts.length,
                        response: contacts,
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
    CreateContact : async (req,res) => {
        try{

            var LatestContact = await Contact.find().limit(1).sort({ ContactId: -1 })
            var Id = 1;
            if(LatestContact.length > 0)
            {
                Id = LatestContact[0].ContactId + 1;
            }
            var contact = new Contact({
                ContactId : Id,
                Salutation : req.body.Salutation,
                FullName : req.body.FirstName + ' ' +req.body.LastName,
                FirstName : req.body.FirstName,
                LastName :req.body.LastName,
                Status : req.body.Status,
                Department : req.body.Department,
                SystemType : req.body.SystemType,
                Email : req.body.Email,
                Remarks : req.body.Remarks,
                CreatedDate : new Date(),
                CreatedById: req.body.CreatedById,
                })
                contact = await contact.save()
                res.status(201).send(contact)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateContact : async (req,res) => {
  
        try{

            const contact = await Contact.updateOne({ _id:  req.body.Id} , 
                { $set :{   
                            Salutation : req.body.Salutation,
                            FullName : req.body.FirstName + ' ' +req.body.LastName,
                            FirstName : req.body.FirstName,
                            LastName :req.body.LastName,
                            Status : req.body.Status,
                            Department : req.body.Department,
                            SystemType : req.body.SystemType,
                            DepartmentId: req.body.DepartmentId,
                            SystemTypeId: req.body.SystemTypeId,
                            Email : req.body.Email,
                            Remarks : req.body.Remarks,
                            UpdatedDate : new Date(),
                            UpdatedById:   req.body.UpdatedById 
                        }
                } )
            
              
                res.status(201).send(contact)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteContact : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Contact.deleteOne({_id:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnableContact : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const contact = await Contact.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(contact)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    DefaultContact : async (req,res) => {
        try 
        {   id = req.params.id
            enable = req.params.enable
            const allcontact = await Contact.updateMany({ $set :{ Default :  false }} )
            const contact = await Contact.updateOne({ _id: id} ,  { $set :{   Default :  enable }} )
            res.status(201).send(contact)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 