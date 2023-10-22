const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const CutPasteController = require("../controllers/Lead/CutPasteController")
 
router.get("/All" , CutPasteController.getAll)
 
router.get("/ByCutPasteId/:id" , CutPasteController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", CutPasteController.getByname)

router.post("/CreateCutPaste", CutPasteController.CreateCutPaste)

router.put("/UpdateCutPaste", CutPasteController.UpdateCutPaste)

router.delete("/DeleteCutPaste/:id", CutPasteController.DeleteCutPaste)
 
module.exports = router

