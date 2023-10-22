const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const CountryController = require("../controllers/maintenance/CountryController")
 
router.get("/All" , CountryController.getAll)
 
router.get("/ByCountryId/:id" , CountryController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", CountryController.getByname)

router.post("/CreateCountry", CountryController.CreateCountry)

router.put("/UpdateCountry", CountryController.UpdateCountry)

router.delete("/DeleteCountry/:id", CountryController.DeleteCountry)
 
module.exports = router

