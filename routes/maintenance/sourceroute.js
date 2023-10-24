const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const SourceController = require("../../controllers/Maintenance/SourceController")
 
router.get("/All" , SourceController.getAll)
 
router.get("/BySourceId/:id" , SourceController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", SourceController.getByname)

router.post("/CreateSource", SourceController.CreateSource)

router.put("/UpdateSource", SourceController.UpdateSource)

router.put("/EnableSource/:id/:enable", SourceController.EnableSource)

router.put("/DefaultSource/:id/:enable", SourceController.DefaultSource)

router.delete("/DeleteSource/:id", SourceController.DeleteSource)
 
module.exports = router

