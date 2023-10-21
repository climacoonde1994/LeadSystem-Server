const Vendor = require('../models/vendor')

module.exports = {
    getAll : async (req,res) => {
        try{
            const Vendors = await Vendor.find()
            res.status(200).send(Vendors)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Vendors = await Vendor.find({Id: id})
            res.status(200).send(Vendors)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
 
    getByName : async (req,res) => {
        try{
            const name = req.params.name;
            const Vendors = await Vendor.find({Name: name})
            res.status(200).send(Vendors)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    
    
    getByFilter : async (req,res) => {
        try{

            const searchText = req.params.searchText;
            const pageNumber = req.params.currentPage;
            const pageSize = req.params.pageSize;
            const skip = (pageNumber - 1) * pageSize;
            if(searchText.length > 0)
            {  
                if(searchText == 'Default')
                {
                    const Allvendors  = await Vendor.find( );
                    const vendors = await Vendor.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allvendors.length,
                        response: vendors,
                        status: true,
                    }
                }
                else
                {
                    const Allvendors  = await Vendor.find( {$or : [{ Name : searchText },{FoodType : searchText }  ]} );
                    const vendors = await Vendor.find({$or : [{ Name : searchText },{FoodType : searchText }  ]}).skip(skip).limit(pageSize).sort({ Name: -1 })
                    response = {
                        totalSize: Allvendors.length,
                        response: vendors,
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
 