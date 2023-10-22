const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const DepartmentController = require("../controllers/maintenance/DepartmentController")
 
router.get("/All" , DepartmentController.getAll)
 
router.get("/ByDepartmentId/:id" , DepartmentController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", DepartmentController.getByname)

router.post("/CreateDepartment", DepartmentController.CreateDepartment)

router.put("/UpdateDepartment", DepartmentController.UpdateDepartment)

router.delete("/DeleteDepartment/:id", DepartmentController.DeleteDepartment)
 
module.exports = router

