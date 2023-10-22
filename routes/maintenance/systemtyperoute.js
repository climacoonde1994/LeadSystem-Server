const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const SystemTypeController = require("../controllers/maintenance/SystemTypeController")
 
router.get("/All" , SystemTypeController.getAll)
 
router.get("/BySystemTypeId/:id" , SystemTypeController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", SystemTypeController.getByname)

router.post("/CreateSystemType", SystemTypeController.CreateSystemType)

router.put("/UpdateSystemType", SystemTypeController.UpdateSystemType)

router.delete("/DeleteSystemType/:id", SystemTypeController.DeleteSystemType)
 
module.exports = router

