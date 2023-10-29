const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const DocumentController = require("../../controllers/Lead/DocumentController")
 
router.get("/All" , DocumentController.getAll)
 
router.get("/ByDocumentId/:id" , DocumentController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", DocumentController.getByname)

router.post("/CreateDocument", DocumentController.CreateDocument)

router.put("/UpdateDocument", DocumentController.UpdateDocument)

router.delete("/DeleteDocument/:id", DocumentController.DeleteDocument)
 
module.exports = router 

