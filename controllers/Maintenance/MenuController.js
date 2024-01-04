
const Menu = require('../../models/Maintenance/menu')
module.exports = {


    getAll : async (req,res) => {
        try{
            const Menus = await Menu.find()
            res.status(200).send(Menus)
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },

    getById : async (req,res) => {
        try{
            const id = req.params.id;
            const menu = await Menu.find({_id: id})
            res.status(200).send(menu[0])
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
                    const Allmenus  = await Menu.find( );
                    const menus = await Menu.find().skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allmenus.length,
                        response: menus,
                        status: true,
                    }
                }
                else
                {
                    const Allmenus  = await Menu.find( {$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]} );
                    const menus = await Menu.find({$or : [{ Code : searchText },{Name : searchText },{Description : searchText }]}).skip(skip).limit(pageSize).sort({ LastName: -1 })
                    response = {
                        totalSize: Allmenus.length,
                        response: menus,
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
    CreateMenu : async (req,res) => {
        try{
            var MenuExist =  await Menu.findOne({Name: req.body.Name})
            if(MenuExist != null){
                res.status(200).send({message : ['Menu Already exist'] , success : false  })
            }
            else
            { 
                var menu = new Menu({
                Name : req.body.Name,
                Path : req.body.Path,
                Icon : req.body.Icon,
                Description : req.body.Description,
                Enabled : true,
                Default : false,
                CreatedDate : new Date(),
                CreatedById: req.body.CreatedById,
                })
                menu = await menu.save()
                res.status(201).send({message : '' , success : true  })

            }
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
 
    UpdateMenu : async (req,res) => {
  
        try{

            var MenuExist =  await Menu.findOne({Name: req.body.Name})
            if(MenuExist != null && MenuExist._id.toString() != req.body.Id ){
                res.status(200).send({message : ['Menu Already exist'] , success : false  })
            }
            else
            {
                const menu = await Menu.updateOne({ _id:  req.body.Id} , 
                    { $set :{    
                                Name : req.body.Name,
                                Path : req.body.Path,
                                Icon : req.body.Icon,
                                Description : req.body.Description,
                                UpdatedDate : new Date(),
                                UpdatedById:   req.body.UpdatedById 
                            }
                    } )
                
                  
                res.status(201).send({message : '' , success : true  })
            }
            
               
        }
        catch(err){
            res.status(500).json({message : err.message})
        }
    },
    DeleteMenu : async (req,res) => {
        try {   
            id = req.params.id
            const response = await Menu.deleteOne({_id:  req.params.id})
            res.status(201).send(response)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
         
    },

    EnableMenu : async (req,res) => {
        try 
        {   
            id = req.params.id
            enable = req.params.enable
            const menu = await Menu.updateOne({ _id:  id} ,   { $set :{   Enabled :  enable }} )
            res.status(201).send(menu)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },

    DefaultMenu : async (req,res) => {
        try 
        {   id = req.params.id
            enable = req.params.enable
            const allmenu = await Menu.updateMany({ $set :{ Default :  false }} )
            const menu = await Menu.updateOne({ _id: id} ,  { $set :{   Default :  enable }} )
            res.status(201).send(menu)
        }
        catch(err){
            res.status(400).json({message : err.message})
        }
    },
     
}
 