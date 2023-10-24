const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const CityStateController = require("../../controllers/Maintenance/CityStateController")
 
router.get("/All" , CityStateController.getAll)
 
router.get("/ByCityStateId/:id" , CityStateController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", CityStateController.getByname)

router.post("/CreateCityState", CityStateController.CreateCityState)

router.put("/UpdateCityState", CityStateController.UpdateCityState)

router.delete("/DeleteCityState/:id", CityStateController.DeleteCityState)
 
module.exports = router

