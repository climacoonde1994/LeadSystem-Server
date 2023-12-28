const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const UserTypeController = require("../../controllers/Maintenance/UserTypeController")
 
router.get("/All" , UserTypeController.getAll)
 
router.get("/ByUserTypeId/:id" , UserTypeController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", UserTypeController.getByname)

router.post("/CreateUserType", UserTypeController.CreateUserType)

router.put("/UpdateUserType", UserTypeController.UpdateUserType)

router.put("/EnableUserType/:id/:enable", UserTypeController.EnableUserType)

router.put("/DefaultUserType/:id/:enable", UserTypeController.DefaultUserType)

router.delete("/DeleteUserType/:id", UserTypeController.DeleteUserType)
 
module.exports = router

