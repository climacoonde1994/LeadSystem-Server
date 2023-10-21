const express = require("express")
const router = express.Router()
const Notification = require('../models/notification')
const jwt = require("jsonwebtoken")
const TransactionController = require("../controllers/TransactionController")
 
router.get("/All" , TransactionController.getAll)

router.get("/ByTransactionId/:id" , TransactionController.getById)
 
router.get("/ByOrderId/:id" , TransactionController.getByOrderId)

router.get("/ByVendorId/:id" , TransactionController.getByVendorId)

router.get("/ByCustomerId/:id" , TransactionController.getByCustomerId)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", TransactionController.getByname)
 
module.exports = router

