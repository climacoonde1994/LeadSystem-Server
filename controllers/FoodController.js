const Food = require('../models/food')

module.exports = {
    getAll : async (req,res) => {
        try{
            const Foods = await Food.find()
            res.status(200).send(Foods)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const Foods = await Food.find({VendorId: id})
            res.status(200).send(Foods)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getByVendorId : async (req,res) => {
        try{
            const id = req.params.id;
            const Foods = await Food.find({Id: id})
            res.status(200).send(Foods)
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
                    const Allfoods  = await Food.find( );
                    const foods = await Food.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allfoods.length,
                        response: foods,
                        status: true,
                    }
                }
                else
                {
                    const Allfoods  = await Food.find( {$or : [{ Description : searchText },{Name : searchText } ,{Category : searchText } ]} );
                    const foods = await Food.find({$or : [{ Description : searchText },{Name : searchText } ,{Category : searchText }]}).skip(skip).limit(pageSize).sort({ Name: -1 })
                    response = {
                        totalSize: Allfoods.length,
                        response: foods,
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
 