const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const LeadHeaderController = require("../controllers/Lead/LeadHeaderController")
 
router.get("/All" , LeadHeaderController.getAll)
 
router.get("/ByLeadHeaderId/:id" , LeadHeaderController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", LeadHeaderController.getByname)

router.post("/CreateLeadHeader", LeadHeaderController.CreateLeadHeader)

router.put("/UpdateLeadHeader", LeadHeaderController.UpdateLeadHeader)

router.delete("/DeleteLeadHeader/:id", LeadHeaderController.DeleteLeadHeader)
 
module.exports = router

