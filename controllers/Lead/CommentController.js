
const Comment = require('../../models/Lead/comment')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Comments = await Comment.find()
            res.status(200).send(Comments)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Comment = await Comment.find({CommentId: id})
            res.status(200).send(Comment)
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
                    const Allcomments  = await Comment.find( );
                    const comments = await Comment.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcomments.length,
                        response: comments,
                        status: true,
                    }
                }
                else
                {
                    const Allcomments  = await Comment.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const comments = await Comment.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcomments.length,
                        response: comments,
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
 
    CreateComment : async (req,res) => {
        try{
            var LatestComment = await Comment.find().limit(1).sort({ CommentId: -1 })
            var Id = 1;
            if(LatestComment.length > 0)
            {
                Id = LatestComment[0].CommentId + 1;
            } 
            const comment = new Comment({
                CommentId : Id,
                LeadId : req.body.LeadId,
                Comment : req.body.Comment,
                Date : req.body.Date,
                Author : req.body.Author,
                Type : req.body.Type,
                CreatedDate : new Date(),
                CreatedById: 1,
                })
                comment = await comment.save()
                res.status(201).send(comment)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    UpdateComment : async (req,res) => {
  
        try{

            const comment = await Comment.updateOne({ Id:  req.body.Id} , 
                { $set :{    CommentId : req.body.CommentId,
                            LeadId : req.body.LeadId,
                            Comment : req.body.Comment,
                            Date : req.body.Date,
                            Author : req.body.Author,
                            Type : req.body.Type,
                            UpdatedDate : new Date(),
                            UpdatedById: 1
                        }
                } )
            
              
                res.status(201).send(comment)
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteComment : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Comment.deleteOne({CommentId:id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },
     
}
 