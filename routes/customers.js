const express = require("express")
const router = express.Router()
const Notification = require('../models/notification')
const jwt = require("jsonwebtoken")
const CustomerController = require("../controllers/CustomerController")
 
router.get("/All" , CustomerController.getAll)
 
router.get("/ByCustomerId/:id" , CustomerController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", CustomerController.getByname)
 
module.exports = router

