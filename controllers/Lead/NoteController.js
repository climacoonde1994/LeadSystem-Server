
const Note = require('../../models/Lead/notes')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Notes = await Note.find()
            res.status(200).send(Notes)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Note = await Note.find({NoteId: id})
            res.status(200).send(Note)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getByLeadId : async (req,res) => {
        try{
            const id = req.params.id;
            const notes = await Note.find({LeadId: id})
            res.status(200).send(notes)
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
                    const Allnotes  = await Note.find( );
                    const notes = await Note.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allnotes.length,
                        response: notes,
                        status: true,
                    }
                }
                else
                {
                    const Allnotes  = await Note.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const notes = await Note.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allnotes.length,
                        response: notes,
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

   
 
    CreateNote : async (req,res) => {
        try{
            if (req.body && Array.isArray(req.body)) 
            {

                var records = req.body; 

                for (const record of records) {
                    var LatestNote = await Note.find().limit(1).sort({ NoteId: -1 })
                    var Id = 1;
                    if(LatestNote.length > 0)
                    {
                        Id = LatestNote[0].NoteId + 1;
                    }
                    var note = new Note({
                        NoteId : Id,
                        LeadId : record.LeadId,
                        Date : record.Date,
                        Description : record.Description
                        })

                      note = await note.save()
                }
            
               
              } else {
                res.status(400).send('Invalid request format. Expecting an array of records.');
              }

              res.status(201).send(note)
                
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateNote : async (req,res) => {
  
        try{

            const note = await Note.updateOne({ Id:  req.body.Id} , 
                { $set :{   NoteId : req.body.NoteId,
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
            
              
                res.status(201).send(note)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteNote : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Note.deleteOne({NoteId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 