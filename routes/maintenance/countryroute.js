const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const CountryController = require("../../controllers/Maintenance/CountryController")
 
router.get("/All" , CountryController.getAll)
 
router.get("/ByCountryId/:id" , CountryController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", CountryController.getByname)

router.post("/CreateCountry", CountryController.CreateCountry)

router.put("/UpdateCountry", CountryController.UpdateCountry)

router.put("/EnableCountry/:id/:enable", CountryController.EnableCountry)

router.put("/DefaultCountry/:id/:enable", CountryController.DefaultCountry)

router.delete("/DeleteCountry/:id", CountryController.DeleteCountry)
 
module.exports = router

