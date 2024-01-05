const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const PermissionController = require("../../controllers/Maintenance/PermissionController")
 
router.get("/All" , PermissionController.getAll)
 
router.get("/ByPermissionId/:id" , PermissionController.getById)

router.get("/ByUserTypeId/:id" , PermissionController.getByUserTypeId)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", PermissionController.getByname)

router.post("/CreatePermission", PermissionController.CreatePermission)

router.post("/SavePermission", PermissionController.SavePermission)

router.put("/UpdatePermission", PermissionController.UpdatePermission)

router.put("/EnablePermission/:id/:enable", PermissionController.EnablePermission)

router.put("/DefaultPermission/:id/:enable", PermissionController.DefaultPermission)

router.delete("/DeletePermission/:id", PermissionController.DeletePermission)
 
module.exports = router

