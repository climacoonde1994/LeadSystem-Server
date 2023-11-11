const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const ClientController = require("../../controllers/Lead/ClientController")
 
router.get("/All" , ClientController.getAll)
 
router.get("/ByClientId/:id" , ClientController.getById)

router.get("/ByLeadId/:id" , ClientController.getByLeadId)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", ClientController.getByname)

router.post("/CreateClient", ClientController.CreateClient)

router.put("/UpdateClient", ClientController.UpdateClient)




router.delete("/DeleteClient/:id", ClientController.DeleteClient)
 
module.exports = router

