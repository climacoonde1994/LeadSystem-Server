const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const UserController = require("../../controllers/Account/UserController")
 
router.get("/All" , UserController.getAll)
 
router.get("/ByUserId/:id" , UserController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", UserController.getByname)

router.post("/CreateUser", UserController.CreateUser)

router.put("/UpdateUser", UserController.UpdateUser)

router.put("/EnableUser/:id/:enable", UserController.EnableUser)

router.delete("/DeleteUser/:id", UserController.DeleteUser)

router.delete("/ResetUser/:id", UserController.ResetUser)

router.put("/ChangePassword", UserController.ChangePassword)

module.exports = router

