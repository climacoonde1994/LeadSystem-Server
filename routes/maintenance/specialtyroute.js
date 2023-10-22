const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const SpecialtyController = require("../controllers/maintenance/SpecialtyController")
 
router.get("/All" , SpecialtyController.getAll)
 
router.get("/BySpecialtyId/:id" , SpecialtyController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", SpecialtyController.getByname)

router.post("/CreateSpecialty", SpecialtyController.CreateSpecialty)

router.put("/UpdateSpecialty", SpecialtyController.UpdateSpecialty)

router.delete("/DeleteSpecialty/:id", SpecialtyController.DeleteSpecialty)
 
module.exports = router

