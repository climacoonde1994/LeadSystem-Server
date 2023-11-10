
const Document = require('../../models/Lead/document')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Documents = await Document.find()
            res.status(200).send(Documents)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Document = await Document.find({DocumentId: id})
            res.status(200).send(Document)
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
                    const Alldocuments  = await Document.find( );
                    const documents = await Document.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Alldocuments.length,
                        response: documents,
                        status: true,
                    }
                }
                else
                {
                    const Alldocuments  = await Document.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const documents = await Document.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Alldocuments.length,
                        response: documents,
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
 
    CreateDocument : async (req,res) => {
        try{
  
            var LatestDocument = await Document.find().limit(1).sort({ DocumentId: -1 })
            var Id = 1;
            if(LatestDocument.length > 0)
            {
                Id = LatestDocument[0].DocumentId + 1;
            }

            var document = new Document({
                DocumentId : Id,
                LeadId : req.params.leadId,
                FileName : req.params.filename,
                FileType : req.params.filetype,
                Prefix : req.params.prefix,
                Date : new Date(),
                CreatedDate : new Date(),
                CreatedById: 1,
                })
                document = await document.save()
                res.status(201).send(document)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateDocument : async (req,res) => {
  
        try{

            const document = await Document.updateOne({ Id:  req.body.Id} , 
                { $set :{    DocumentId : req.body.DocumentId,
                            LeadId : req.body.LeadId,
                            Name : req.body.Name,
                            Content : req.body.Content,
                            Date : req.body.Date,
                            Author : req.body.Author,
                            Type : req.body.Type,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(document)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteDocument : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Document.deleteOne({DocumentId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 