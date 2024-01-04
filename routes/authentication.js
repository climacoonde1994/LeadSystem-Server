require('dotenv').config()
const express = require("express")
const bcrypt =  require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")
const User = require('../models/Account/user')
const Employee = require('../models/Account/employee')
const Permission = require('../models/Maintenance/permission')
 

router.get("/", async (req,res) => {
    try{
        const users = await User.find()
        res.status(200).send(users)
    }
    catch(err){
        res.status(500).json({message : err.message})

    }
})

//getting user
router.get("/:id", getUser , async (req,res) => {
    
    res.send(res.user)

})

//create user
router.post("/", async (req,res) => {
    const user = new User({
        UserName : req.body.Username,
        Password : req.body.Password
    })

    try
    {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({accessToken : accessToken})
    }
    catch(err)
    {
    res.status(400).json({message : err.message})
    }
})

//update user
router.patch("/:id", getUser,async (req,res) => {
    if(req.body.UserName != null)
    {
        res.user.UserName = req.body.UserName
    }

    if(req.body.Password != null)
    {
        res.user.Password = req.body.Password
    }

    try
    {
        const updateUser = await res.user.save()
        res.status(201).json(updateUser)
    }
    catch(err)
    {
    res.status(400).json({message : err.message})
    }
})

//delete user
router.delete("/:id", getUser ,async(req,res) => {

    try
    {
        await res.user.deleteOne()
        res.json({message : "Successfully deleted"})
    }
    catch(err)
    {
    res.status(400).json({message : err.message})
    }
})
//log in user
router.post("/Login",async (req,res) => {
  try
    { 

        const username = req.body.username
        const password = await bcrypt.hash(req.body.password, 10);
        var user =  await User.findOne({UserName : username , Enabled : true})
        const match = await bcrypt.compare(req.body.password, user.Password);
        if(user != null && ((user.IsTempPassword &&  user.TemporaryPassword == password) || match))
        {

           
            var employee =  await Employee.findOne({FirstName : user.FirstName,LastName : user.LastName})
            
            var permission = await Permission.find({UserTypeId: user.UserTypeId})
            var response = {
                succeeded : true,
                data : {User : user ,Employee :  employee ,Permission : permission },
                token : jwt.sign(JSON.stringify(user), process.env.TOKEN)

            }
            res.json({response})
        }
        else{
            res.status(400).json({message : "Username/Password doesnt match"})
        }
       
    }
    catch(err)
    {
        res.status(400).json({message : err.message})
    }


})

async function getUser(req , res , next){

    let user 
    try {
        user = await User.findById(req.params.id)
        if(user == null)
        {
            return res.status(404).json({message : "user not found"})
        }
    } catch (error) {
        return res.status(500).json({message : error.message})
    }

    res.user = user
    next()
}




module.exports = router

