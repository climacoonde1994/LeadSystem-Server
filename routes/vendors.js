const express = require("express")
const router = express.Router()
const Notification = require('../models/notification')
const jwt = require("jsonwebtoken")
const VendorController = require("../controllers/VendorController")
 
router.get("/All" , VendorController.getAll)

router.get("/ByVendorId/:id" , VendorController.getById)

router.get("/ByName/:name" , VendorController.getByName)
 
router.get("/ByFilter/:searchText/:pageSize/:currentPage", VendorController.getByFilter)
 
module.exports = router

