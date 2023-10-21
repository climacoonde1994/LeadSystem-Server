const express = require("express")
const router = express.Router()
const Notification = require('../models/notification')
const jwt = require("jsonwebtoken")
const FoodController = require("../controllers/FoodController")
 
router.get("/All" , FoodController.getAll)
 
router.get("/ByFoodId/:id" , FoodController.getById)

router.get("/ByVendorId/:id" , FoodController.getByVendorId)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", FoodController.getByname)
 
module.exports = router

