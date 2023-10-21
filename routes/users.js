const express = require("express")
const router = express.Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken")

//getting all users
router.get("/getall", async (req,res) => {
    try{
        
        const users = await User.find()
        res.status(200).send(users)
    }
    catch(err){
        res.status(500).json({message : err.message})

    }
})

router.get("/All/:searchText/:pageSize/:currentPage",  async (req,res) => {
    try{

        const searchText = req.params.searchText;
        const pageNumber = req.params.currentPage;
        const pageSize = req.params.pageSize;
        const skip = (pageNumber - 1) * pageSize;
        if(searchText.length > 0)
        {  
            if(searchText == 'Default')
            {
                const Allusers  = await User.find( );
                const users = await User.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                response = {
                    totalSize: Allusers.length,
                    response: users,
                    status: true,
                }
            }
            else
            {
                const Allusers  = await User.find( {$or : [{ FirstName : searchText },{LastName : searchText }]} );
                const users = await User.find({$or : [{ FirstName : searchText },{LastName : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                response = {
                    totalSize: Allusers.length,
                    response: users,
                    status: true,
                }
            }
         
          
        }
        else
        {
            response = {
                totalSize:0,
                response: null,
                status: true,
            }
        }
        res.status(200).send(response)
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
router.post("/CreateUser", async (req,res) => {

    const user = new User({
    UserCode : req.body.UserCode,
    UserName : req.body.UserName,
    Password : req.body.Password,
    Email : req.body.Email,
    FullName : req.body.FullName,
    FirstName : req.body.FirstName,
    LastName : req.body.LastName,
    MiddleName : req.body.MiddleName,
    Suffix : req.body.Suffix,
    UserType : req.body.UserType,
    BirthDate : new Date(),
    Mobile : req.body.Mobile,
    Status : req.body.Status,
    Ludatetime : new Date(),
    })

    try {
        const users = await user.save()
        res.status(201).send(users)
    }
    catch(err){
    res.status(400).json({message : err.message})
    }
})

router.put("/EditUser", async (req,res) => {
    try
    {
        const response = await User.updateOne({ _id:  req.body._id} , 
            { $set :{ UserName :req.body.UserName , 
                      UserCode :req.body.UserCode ,  
                      Password : req.body.Password,
                      FullName : req.body.FullName,
                      FirstName : req.body.FirstName,
                      MiddleName : req.body.MiddleName,
                      LastName : req.body.LastName,
                      Suffix : req.body.Suffix,
                      Password : req.body.Password,
                      UserType : req.body.UserType,
                      BirthDate : new Date(),
                      Mobile : req.body.Mobile,
                      Status : req.body.Status,
                      Ludatetime : new Date(),
                    }
            } )
        res.status(201).send(response)
    }
    catch(err)
    {
    res.status(400).json({message : err.message})
    }
})

router.delete("/RemoveUser/:id", async (req,res) => {
    try {   
        id = req.params.id
        const response = await User.deleteOne({_id:id})
        res.status(201).send(response)
    }
    catch(err){
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
    } 
    catch (error) {
        return res.status(500).json({message : error.message})
    }

    res.user = user
    next()
}

async function authenticateToken(req , res , next){
    const headers = req.headers['authorization']
    const token = headers && headers.split(' ')[1]
   
    if(token == null)  return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET , (err , user) => {
        if(err)return res.sendStatus(403)
        req.user = user;
        next();
    })
    
}


module.exports = router

