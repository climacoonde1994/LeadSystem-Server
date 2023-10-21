const express = require("express")
const router = express.Router()
const File = require('../models/files')
const jwt = require("jsonwebtoken")
const multer = require('multer')
const path = require('path');
const fs = require('fs');


// Start by creating some disk storage options:
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
  })
  
  const upload = multer({ storage: storage });
  
router.post('/upload/:filename/:filetype/:prefix', upload.single('file'), async (req, res) => {
  
    const file = new File({
        FileName : req.params.filename,
        FileType : req.params.filetype,
        Prefix : req.params.prefix,
        Ludatetime : new Date(),
        })
    
        try
        {
            const files = await file.save()
            res.status(201).send(files)
           
        }
        catch(err)
        {
        res.status(400).json({message : err.message})
        }
 
  });
  

router.get("/All/:searchText/:pageSize/:currentPage",  async (req,res) => {
    try{

        const searchText = req.params.searchText;
        const pageNumber = req.params.currentPage;
        const pageSize = req.params.pageSize;
        const skip = (pageNumber - 1) * pageSize;
        if(searchText.length > 0)
        {  
            if(searchText == 'Default')
            {
                const Allfiles  = await File.find( );
                const files = await File.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                response = {
                    totalSize: Allfiles.length,
                    response: files,
                    status: true,
                }
            }
            else
            {
                const Allfiles  = await File.find( {$or : [{ FileName : searchText },{FileType : searchText }]} );
                const files = await File.find({$or : [{ FileName : searchText },{FileType : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                response = {
                    totalSize: Allfiles.length,
                    response: files,
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
})
 
router.get('/download/:filename', (req, res) => {
    try
    {
        const filePath = path.join(__dirname+ '/uploads', req.params.filename); 
        res.download(filePath, (err) => {
            if (err) {
                res.status(500).send({
                    message: filePath
                });
            }
    });
       
    }
    catch(err)
    {
        res.status(400).json({message : err.message})
    }
   
});

router.delete('/delete/:filename', async (req, res) => {
    try
    {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '/uploads', filename);
        const response = await File.deleteOne({FileName:filename})
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).send({ message: "Failed to delete the file." });
            }
            res.send({ message: "File deleted successfully." });
        
        });
    }
    catch(err)
    {
        res.status(400).json({message : err.message})
    }

   
  
});

module.exports = router

