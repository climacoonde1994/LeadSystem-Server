const Transaction = require('../models/transaction')

module.exports = {
    getAll : async (req,res) => {
        try{
            const Transactions = await Transaction.find()
            res.status(200).send(Transactions)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Transactions = await Transaction.find({Id: id})
            res.status(200).send(Transactions)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    getByOrderId : async (req,res) => {
        try{
            const id = req.params.id;
            const Transactions = await Transaction.find({OrderId: id})
            res.status(200).send(Transactions)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },


    getByVendorId : async (req,res) => {
        try{
            const id = req.params.id;
            const Transactions = await Transaction.find({VendorId: id})
            res.status(200).send(Transactions)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    
    getByCustomerId : async (req,res) => {
        try{
            const id = req.params.id;
            const Transactions = await Transaction.find({CustomerId: id})
            res.status(200).send(Transactions)
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
                    const Alltransactions  = await Transaction.find( );
                    const transactions = await Transaction.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Alltransactions.length,
                        response: transactions,
                        status: true,
                    }
                }
                else
                {
                    const Alltransactions  = await Transaction.find( {$or : [{ TransactionId : searchText },{VendorId : searchText } ,{CustomerId : searchText } ]} );
                    const transactions = await Transaction.find({$or : [{ TransactionId : searchText },{VendorId : searchText } ,{CustomerId : searchText }]}).skip(skip).limit(pageSize).sort({ TransactionId: -1 })
                    response = {
                        totalSize: Alltransactions.length,
                        response: transactions,
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
 