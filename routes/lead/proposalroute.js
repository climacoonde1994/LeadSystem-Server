const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const ProposalController = require("../../controllers/Lead/ProposalController")
 
router.get("/All" , ProposalController.getAll)
 
router.get("/ByProposalId/:id" , ProposalController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", ProposalController.getByname)

router.post("/CreateProposal", ProposalController.CreateProposal)

router.put("/UpdateProposal", ProposalController.UpdateProposal)

router.delete("/DeleteProposal/:id", ProposalController.DeleteProposal)
 
module.exports = router

