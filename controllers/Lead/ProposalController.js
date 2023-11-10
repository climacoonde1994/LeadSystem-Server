
const Proposal = require('../../models/Lead/proposal')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Proposals = await Proposal.find()
            res.status(200).send(Proposals)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Proposal = await Proposal.find({ProposalId: id})
            res.status(200).send(Proposal)
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
                    const Allproposals  = await Proposal.find( );
                    const proposals = await Proposal.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allproposals.length,
                        response: proposals,
                        status: true,
                    }
                }
                else
                {
                    const Allproposals  = await Proposal.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const proposals = await Proposal.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allproposals.length,
                        response: proposals,
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

   
 
    CreateProposal : async (req,res) => {
        try{
            if (req.body && Array.isArray(req.body)) 
            {

                var records = req.body; 

                for (const record of records) {
                    var LatestProposal = await Proposal.find().limit(1).sort({ ProposalId: -1 })
                    var Id = 1;
                    if(LatestProposal.length > 0)
                    {
                        Id = LatestProposal[0].LeadId + 1;
                    }
                    var proposal = new Proposal({
                        ProposalId : Id,
                        LeadId : record.LeadId,
                        Date : record.Date,
                        Proposal : record.Proposal
                        })

                      proposal = await proposal.save()
                }
            
               
              } else {
                res.status(400).send('Invalid request format. Expecting an array of records.');
              }

           
                
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateProposal : async (req,res) => {
  
        try{

            const proposal = await Proposal.updateOne({ Id:  req.body.Id} , 
                { $set :{   ProposalId : req.body.ProposalId,
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
            
              
                res.status(201).send(proposal)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteProposal : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Proposal.deleteOne({ProposalId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 