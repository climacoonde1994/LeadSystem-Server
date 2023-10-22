const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const LeadContactController = require("../controllers/Lead/LeadContactController")
 
router.get("/All" , LeadContactController.getAll)
 
router.get("/ByLeadContactId/:id" , LeadContactController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", LeadContactController.getByname)

router.post("/CreateLeadContact", LeadContactController.CreateLeadContact)

router.put("/UpdateLeadContact", LeadContactController.UpdateLeadContact)

router.delete("/DeleteLeadContact/:id", LeadContactController.DeleteLeadContact)
 
module.exports = router

