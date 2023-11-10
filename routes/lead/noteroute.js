const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const NoteController = require("../../controllers/Lead/NoteController")
 
router.get("/All" , NoteController.getAll)
 
router.get("/ByNoteId/:id" , NoteController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", NoteController.getByname)

router.post("/CreateNote", NoteController.CreateNote)

router.put("/UpdateNote", NoteController.UpdateNote)

router.delete("/DeleteNote/:id", NoteController.DeleteNote)
 
module.exports = router

 