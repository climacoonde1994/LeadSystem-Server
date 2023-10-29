const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const ClientController = require("../../controllers/Lead/ClientController")
 
router.get("/All" , ClientController.getAll)
 
router.get("/ByClientId/:id" , ClientController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", ClientController.getByname)

router.post("/CreateClient", ClientController.CreateClient)

router.put("/UpdateClient", ClientController.UpdateClient)

router.put("/EnableClient/:id/:enable", ClientController.EnableClient)

router.put("/DefaultClient/:id/:enable", ClientController.DefaultClient)

router.delete("/DeleteClient/:id", ClientController.DeleteClient)
 
module.exports = router

