const Notification = require('../models/notification')

module.exports = {


    getAll : async (req,res) => {
        try{
        
            const notifications = await Notification.find()
            res.status(200).send(notifications)
        }
        catch(err){
            res.status(500).json({message : err.message})
    
        }

    },
    getCurrent : async (req,res) => {
        try{
                const notifications = await Notification.find()
    
            response = {
                totalSize: notifications.length,
                response: notifications,
                status: true,
            }
    
            res.status(200).send(response)
        }
        catch(err){
            res.status(500).json({message : err.message})
    
        }

    },
    getProessDate : async (req , res ) => {
        try{
      
            const employeeId = new Date(req.params.employeeId)
            const fromdate = new Date(req.params.fromDate)
            const todate = new Date(req.params.toDate)
            const pageNumber = req.params.currentPage;
            const pageSize = req.params.pageSize;
            const skip = (pageNumber - 1) * pageSize;
        
            const Allnotifications  = await Notification.find( {Ludatetime: { $gte: fromdate, $lte: todate }});
            const notifications = await Notification.find({ Ludatetime: { $gte: fromdate, $lte: todate }}).skip(skip).limit(pageSize).sort({ Ludatetime: -1 })
    
            response = {
                totalSize: Allnotifications.length,
                response: notifications,
                status: true,
            }
    
            res.status(200).send(response)
        }
        catch(err){
            res.status(500).json({message : err.message})
    
        }
    }
}
 