const Order = require('../models/order')

module.exports = {
    getAll : async (req,res) => {
        try{
            const Orders = await Order.find()
            res.status(200).send(Orders)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Orders = await Order.find({Id: id})
            res.status(200).send(Orders)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    getByOrderId : async (req,res) => {
        try{
            const id = req.params.id;
            const Orders = await Order.find({OrderId: id})
            res.status(200).send(Orders)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },


    getByVendorId : async (req,res) => {
        try{
            const id = req.params.id;
            const Orders = await Order.find({VendorId: id})
            res.status(200).send(Orders)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    
    getByCustomerId : async (req,res) => {
        try{
            const id = req.params.id;
            const Orders = await Order.find({CustomerId: id})
            res.status(200).send(Orders)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    getByname : async (req,res) => {
        try{

            const searchText = req.params.searchText;
            const pageNumber = req.params.currentPage;
            const pageSize = req.params.pageSize;
            const skip = (pageNumber - 1) * pageSize;
            if(searchText.length > 0)
            {  
                if(searchText == 'Default')
                {
                    const Allorders  = await Order.find( );
                    const orders = await Order.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allorders.length,
                        response: orders,
                        status: true,
                    }
                }
                else
                {
                    const Allorders  = await Order.find( {$or : [{ OrderId : searchText },{VendorId : searchText } ,{CustomerId : searchText } ]} );
                    const orders = await Order.find({$or : [{ OrderId : searchText },{VendorId : searchText } ,{CustomerId : searchText }]}).skip(skip).limit(pageSize).sort({ OrderId: -1 })
                    response = {
                        totalSize: Allorders.length,
                        response: orders,
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

    },
 
}
 