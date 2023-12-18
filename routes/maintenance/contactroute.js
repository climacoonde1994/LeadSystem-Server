const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const ContactController = require("../../controllers/Maintenance/ContactController")
 
router.get("/All" , ContactController.getAll)
 
router.get("/ByContactId/:id" , ContactController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", ContactController.getByname)

router.post("/CreateContact", ContactController.CreateContact)

router.put("/UpdateContact", ContactController.UpdateContact)

router.put("/EnableContact/:id/:enable", ContactController.EnableContact)

router.put("/DefaultContact/:id/:enable", ContactController.DefaultContact)

router.delete("/DeleteContact/:id", ContactController.DeleteContact)
 
module.exports = router

