
const LeadHeader = require('../../models/Lead/leadheader')
module.exports = {


    getAll : async (req,res) => {
        try{
            const LeadHeaders = await LeadHeader.find()
            res.status(200).send(LeadHeaders)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const LeadHeader = await LeadHeader.find({LeadHeaderId: id})
            res.status(200).send(LeadHeader)
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
                    const Allleadheaders  = await LeadHeader.find( );
                    const leadheaders = await LeadHeader.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allleadheaders.length,
                        response: leadheaders,
                        status: true,
                    }
                }
                else
                {
                    const Allleadheaders  = await LeadHeader.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const leadheaders = await LeadHeader.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allleadheaders.length,
                        response: leadheaders,
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

 
    CreateLeadHeader : async (req,res) => {
        try{

            
            const leadheader = new LeadHeader({
                LeadId : req.body.LeadId,
                ClientId : req.body.ClientId,
                LeadNo : req.body.LeadNo,
                LeadDate : req.body.LeadDate,
                Status : req.body.Status,
                StatusComment : req.body.StatusComment,
                SalesPersonId : req.body.SalesPersonId,
                FollowUpDate : req.body.FollowUpDate,
                SalesPersonId2 : req.body.SalesPersonId2,
                FollowUpDate2 : req.body.FollowUpDate2,
                SourceId : req.body.SourceId,
                Quality : req.body.Quality,
                Likelihood : req.body.Likelihood,
                Comments : req.body.Comments,
                ActionNeeded : req.body.ActionNeeded,
                MeetDate : req.body.MeetDate,
                Remarks : req.body.Remarks,
                BestTimeCall : req.body.BestTimeCall,
                SpecialtyId : req.body.SpecialtyId,
                InternetContactList : req.body.InternetContactList,
                ActionNeededNotes : req.body.ActionNeededNotes,
                InternetNotes : req.body.InternetNotes,
                CreatedDate : new Date(),
                CreatedById: 1,
                
                })
                leadheader = await leadheader.save()
                res.status(201).send(leadheader)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateLeadHeader : async (req,res) => {
  
        try{

            const leadheader = await LeadHeader.updateOne({ Id:  req.body.Id} , 
                { $set :{   LeadId : req.body.LeadId,
                    ClientId : req.body.ClientId,
                    LeadNo : req.body.LeadNo,
                    LeadDate : req.body.LeadDate,
                    Status : req.body.Status,
                    StatusComment : req.body.StatusComment,
                    SalesPersonId : req.body.SalesPersonId,
                    FollowUpDate : req.body.FollowUpDate,
                    SalesPersonId2 : req.body.SalesPersonId2,
                    FollowUpDate2 : req.body.FollowUpDate2,
                    SourceId : req.body.SourceId,
                    Quality : req.body.Quality,
                    Likelihood : req.body.Likelihood,
                    Comments : req.body.Comments,
                    ActionNeeded : req.body.ActionNeeded,
                    MeetDate : req.body.MeetDate,
                    Remarks : req.body.Remarks,
                    BestTimeCall : req.body.BestTimeCall,
                    SpecialtyId : req.body.SpecialtyId,
                    InternetContactList : req.body.InternetContactList,
                    ActionNeededNotes : req.body.ActionNeededNotes,
                    InternetNotes : req.body.InternetNotes,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(leadheader)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteLeadHeader : async (req,res) => {
        try {   
            id = req.params.id
            const response = await LeadHeader.deleteOne({LeadHeaderId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 