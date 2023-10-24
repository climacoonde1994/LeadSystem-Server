
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
            const cutpaste = new CutPaste({
                CutPasteId : req.body.CutPasteId,
                LeadId : req.body.LeadId,
                Notes : req.body.CutPaste,
                Date : req.body.Date,
                Author : req.body.Author,
                Type : req.body.Type,
                CreatedDate : new Date(),
                CreatedById: 1,
                })
                cutpaste = await cutpaste.save()
                res.status(201).send(cutpaste)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateCutPaste : async (req,res) => {
  
        try{

            const cutpaste = await CutPaste.updateOne({ Id:  req.body.Id} , 
                { $set :{    CutPasteId : req.body.CutPasteId,
                            LeadId : req.body.LeadId,
                            Notes : req.body.CutPaste,
                            Date : req.body.Date,
                            Author : req.body.Author,
                            Type : req.body.Type,
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
 