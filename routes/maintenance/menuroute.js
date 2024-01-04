const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const MenuController = require("../../controllers/Maintenance/MenuController")
 
router.get("/All" , MenuController.getAll)
 
router.get("/ByMenuId/:id" , MenuController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", MenuController.getByname)

router.post("/CreateMenu", MenuController.CreateMenu)

router.put("/UpdateMenu", MenuController.UpdateMenu)

router.put("/EnableMenu/:id/:enable", MenuController.EnableMenu)

router.put("/DefaultMenu/:id/:enable", MenuController.DefaultMenu)

router.delete("/DeleteMenu/:id", MenuController.DeleteMenu)
 
module.exports = router

