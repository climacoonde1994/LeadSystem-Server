const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const CityController = require("../../controllers/Maintenance/CityController")
 
router.get("/All" , CityController.getAll)
 
router.get("/ByCityId/:id" , CityController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", CityController.getByname)

router.post("/CreateCity", CityController.CreateCity)

router.put("/UpdateCity", CityController.UpdateCity)

router.put("/EnableCity/:id/:enable", CityController.EnableCity)

router.put("/DefaultCity/:id/:enable", CityController.DefaultCity)

router.delete("/DeleteCity/:id", CityController.DeleteCity)
 
module.exports = router

