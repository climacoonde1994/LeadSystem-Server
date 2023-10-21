const Customer = require('../models/customer')

module.exports = {
    getAll : async (req,res) => {
        try{
            const Customers = await Customer.find()
            res.status(200).send(Customers)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Customers = await Customer.find({id: id})
            res.status(200).send(Customers)
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
                    const Allcustomers  = await Customer.find( );
                    const customers = await Customer.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcustomers.length,
                        response: customers,
                        status: true,
                    }
                }
                else
                {
                    const Allcustomers  = await Customer.find( {$or : [{ FirstName : searchText },{LastName : searchText }]} );
                    const customers = await Customer.find({$or : [{ FastName : searchText },{LastName : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allcustomers.length,
                        response: customers,
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
 