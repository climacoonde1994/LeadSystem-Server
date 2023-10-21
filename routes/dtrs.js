const express = require("express")
const router = express.Router()
const Dtr = require('../models/dtr')
const jwt = require("jsonwebtoken")

//getting all users
router.get("/", async (req,res) => {
    try{
     
        const dtrs = await Dtr.find({Id : req.dtr.Id})
        res.status(200).send(dtrs)
    }
    catch(err){
        res.status(500).json({message : err.message})

    }
})

router.get("/all",  async (req,res) => {
    try{
        const dtrs = await Dtr.find()
        res.status(200).send(dtrs)
    }
    catch(err){
        res.status(500).json({message : err.message})

    }
})

router.get("/ProcessDate/:fromDate/:toDate/:employeeId/:status/:pageSize/:currentPage",  async (req,res) => {
    try{
        const employeeId = req.params.employeeId
        const status = req.params.status
        const fromdate = new Date(req.params.fromDate)
        const todate = new Date(req.params.toDate)
        const pageNumber = req.params.currentPage;
        const pageSize = req.params.pageSize;
        const skip = (pageNumber - 1) * pageSize;

        if(status == 'ALL' )
        {
            var Alldtr  = await Dtr.find( {$and : [{LogDate: { $gte: fromdate, $lte: todate }} , {Id: employeeId}]});
            var dtr = await Dtr.find({$and : [{LogDate: { $gte: fromdate, $lte: todate }} , {Id: employeeId} ]}).skip(skip).limit(pageSize).sort({ Ludatetime: -1 })
    
        }
        else
        {
            var Alldtr  = await Dtr.find( {$and : [{LogDate: { $gte: fromdate, $lte: todate }} , {Id: employeeId}, {LogType : status}]});
            var dtr = await Dtr.find({$and : [{LogDate: { $gte: fromdate, $lte: todate }} , {Id: employeeId} , {LogType : status}]}).skip(skip).limit(pageSize).sort({ Ludatetime: -1 })
    
        }
    
       
        response = {
            totalSize: Alldtr.length,
            response: dtr,
            status: true,
        }

        res.status(200).send(response)
    }
    catch(err){
        res.status(500).json({message : err.message})

    }
})

router.get("/dates",  async (req,res) => {
    try{
        const fromdate = new Date(req.query.dateEnd);
        const enddate = new Date(req.query.dateEndFrom);
        const dtrs = await Dtr.find()
        res.status(200).send(dtrs)
    }
    catch(err){
        res.status(500).json({message : err.message})

    }
})
//getting user
router.get("/:id", getUser , async (req,res) => {
    try{
        res.send(res.user)
    }
    catch(err){
        res.status(500).json({message : err.message})
    }

})

//create user
router.post("/dtr", async (req,res) => {
    const dtr = new Dtr({
        Id : req.body.Id,
        LogDate : req.body.LogDate,
        LogTime : req.body.LogTime,
        LogType : req.body.LogType 
    })

    try
    {
        const dtrs = await dtr.save()
        res.status(201).send(dtrs)
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
router.post("/login", (req,res) => {})

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

