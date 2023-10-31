const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const EmployeeController = require("../../controllers/Account/EmployeeController")
 
router.get("/All" , EmployeeController.getAll)
 
router.get("/ByEmployeeId/:id" , EmployeeController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", EmployeeController.getByname)

router.post("/CreateEmployee", EmployeeController.CreateEmployee)

router.put("/UpdateEmployee", EmployeeController.UpdateEmployee)


router.delete("/DeleteEmployee/:id", EmployeeController.DeleteEmployee)
 
module.exports = router

