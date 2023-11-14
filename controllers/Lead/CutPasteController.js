
const CutPaste = require('../../models/Lead/cutpaste')
module.exports = {


    getAll : async (req,res) => {
        try{
            const CutPastes = await CutPaste.find()
            res.status(200).send(CutPastes)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const CutPaste = await CutPaste.find({CutPasteId: id})
            res.status(200).send(CutPaste)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getByLeadId : async (req,res) => {
        try{
            const id = req.params.id;
            const cutpastes = await CutPaste.find({LeadId: id})
            res.status(200).send(cutpastes)
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
                    const Allcutpastes  = await CutPaste.find( );
                    const cutpastes = await CutPaste.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcutpastes.length,
                        response: cutpastes,
                        status: true,
                    }
                }
                else
                {
                    const Allcutpastes  = await CutPaste.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const cutpastes = await CutPaste.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcutpastes.length,
                        response: cutpastes,
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

   
 
    CreateCutPaste : async (req,res) => {
        try{
            if (req.body && Array.isArray(req.body)) 
            {

                var records = req.body; 

                for (const record of records) {
                    var LatestCutPaste = await CutPaste.find().limit(1).sort({ CutPasteId: -1 })
                    var Id = 1;
                    if(LatestCutPaste.length > 0)
                    {
                        Id = LatestCutPaste[0].CutPasteId + 1;
                    }

                  
                    var cutpaste = new CutPaste({
                        CutPasteId : Id,
                        LeadId : record.LeadId,
                        Date : record.Date,
                        Title : record.Title,
                        Description : record.Description,
                        Author : 1,
                        CreatedDate : new Date(),
                        CreatedById: 1,
                        })

                      cutpaste = await cutpaste.save()
                }
            
                res.status(201).send(cutpaste)
              } else {
                res.status(400).send('Invalid request format. Expecting an array of records.');
              }

           
                
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateCutPaste : async (req,res) => {
  
        try{

            const cutpaste = await CutPaste.updateOne({ Id:  req.body.Id} , 
                { $set :{   CutPasteId : req.body.CutPasteId,
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
            
              
                res.status(201).send(cutpaste)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteCutPaste : async (req,res) => {
        try {   
            id = req.params.id
            const response = await CutPaste.deleteOne({CutPasteId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 