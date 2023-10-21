const express = require("express")
const router = express.Router()
const Notification = require('../models/notification')
const jwt = require("jsonwebtoken")
const OrderController = require("../controllers/OrderController")
 
router.get("/All" , OrderController.getAll)

router.get("/ByOrderId/:id" , OrderController.getById)
 
router.get("/ByOrderId/:id" , OrderController.getByOrderId)

router.get("/ByVendorId/:id" , OrderController.getByVendorId)

router.get("/ByCustomerId/:id" , OrderController.getByCustomerId)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", OrderController.getByname)
 
module.exports = router

