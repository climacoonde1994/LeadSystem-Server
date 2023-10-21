const express = require("express")
const router = express.Router()
const Notification = require('../models/notification')
const jwt = require("jsonwebtoken")
const DriverController = require("../controllers/DriverController")
 
router.get("/All" , DriverController.getAll)
 
router.get("/ByDriverId/:id" , DriverController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", DriverController.getByname)

router.post("/CreateDriver", DriverController.CreateDriver)

router.put("/UpdateDriver", DriverController.UpdateDriver)

router.delete("/DeleteDriver/:id", DriverController.DeleteDriver)
 
module.exports = router

