const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const CommentController = require("../../controllers/Lead/CommentController")
 
router.get("/All" , CommentController.getAll)
 
router.get("/ByCommentId/:id" , CommentController.getById)
 
router.get("/ByName/:searchText/:pageSize/:currentPage", CommentController.getByname)

router.post("/CreateComment", CommentController.CreateComment)

router.put("/UpdateComment", CommentController.UpdateComment)

router.delete("/DeleteComment/:id", CommentController.DeleteComment)
 
module.exports = router

