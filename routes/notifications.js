const express = require("express")
const router = express.Router()
const Notification = require('../models/notification')
const jwt = require("jsonwebtoken")
const NotifcationController = require("../controllers/NotifcationController")
 
router.get("/all" , NotifcationController.getAll)
 
router.get("/Current/:employeeId" , NotifcationController.getAll)
 
router.get("/ProcessDate/:fromDate/:toDate/:employeeId/:pageSize/:currentPage",  NotifcationController.getCurrent)
 

async function authenticateToken(req , res , next){

    const headers = req.headers['authorization']
    const token = headers && headers.split(' ')[1]
   
    if(token == null)  return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET , (err , user) => {
        if(err)return res.sendStatus(403)
        console.log(user)
        req.user = user;
        next();
    })
    
}


module.exports = router

