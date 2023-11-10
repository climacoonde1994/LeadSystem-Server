const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const multer = require('multer')
const path = require('path');
const fs = require('fs');

const DocumentController = require("../../controllers/Lead/DocumentController")

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/Files');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
  })
  
  const upload = multer({ storage: storage });
 
router.get("/All" , DocumentController.getAll)
 
router.get("/ByDocumentId/:id" , DocumentController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", DocumentController.getByname)

router.post("/:filename/:filetype/:prefix/:leadId",  upload.single('file'), DocumentController.CreateDocument)
,
router.put("/UpdateDocument", DocumentController.UpdateDocument)

router.delete("/DeleteDocument/:id", DocumentController.DeleteDocument)
 
module.exports = router 

