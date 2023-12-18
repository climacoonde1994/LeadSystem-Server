
const LeadContact = require('../../models/Lead/leadcontact')
module.exports = {


    getAll : async (req,res) => {
        try{
            const LeadContacts = await LeadContact.find()
            res.status(200).send(LeadContacts)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const LeadContact = await LeadContact.findOne({LeadContactId: id})
            res.status(200).send(LeadContact)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getByLeadId : async (req,res) => {
        try{
            const id = req.params.id;
            const leadContact = await LeadContact.find({LeadId: id})
            res.status(200).send(leadContact)
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
                    const Allleadcontacts  = await LeadContact.find( );
                    const leadcontacts = await LeadContact.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allleadcontacts.length,
                        response: leadcontacts,
                        status: true,
                    }
                }
                else
                {
                    const Allleadcontacts  = await LeadContact.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const leadcontacts = await LeadContact.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allleadcontacts.length,
                        response: leadcontacts,
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

   
 
    CreateLeadContact : async (req,res) => {
        try{
            if (req.body && Array.isArray(req.body)) {

                var records = req.body; 
            
               
                for (const record of records) {
                    var LatestLeadContact = await LeadContact.find().limit(1).sort({ LeadContactId: -1 })
                    var Id = 0;
                    if(LatestLeadContact.length > 0)
                    {
                        Id = LatestLeadContact[0].LeadContactId + 1;
                    }
                    var leadcontact = new LeadContact({
                        LeadContactId : Id,
                        LeadId : record.LeadId,
                        Salutation : record.Salutation,
                        FirstName : record.FirstName,
                        LastName :record.LastName,
                        Status : record.Status,
                        Department : record.Department,
                        SystemType : record.SystemType,
                        Email : record.Email,
                        Remarks : record.Remarks,
                        CreatedDate : new Date(),
                        CreatedById: 1,
                        })

                      leadcontact = await leadcontact.save()
                }
            
            
              } else {
                res.status(400).send('Invalid request format. Expecting an array of records.');
              }

           
                res.status(201).send(leadcontact)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateLeadContact : async (req,res) => {
  
        try{

            const leadcontact = await LeadContact.updateOne({ Id:  req.body.Id} , 
                { $set :{   LeadContactId : req.body.LeadContactId,
                            LeadId : req.body.Code,
                            Firstname : req.body.Firstname,
                            LastName : req.body.LastName,
                            Status : req.body.Status,
                            DepartmentId : req.body.DepartmentId,
                            TypeId : req.body.TypeId,
                            Email : req.body.Email,
                            Remarks : req.body.Remarks,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(leadcontact)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteLeadContact : async (req,res) => {
        try {   
            id = req.params.id
            const response = await LeadContact.deleteOne({_id:id})
            res.status(200).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 