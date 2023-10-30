require('dotenv').config()


const express = require("express")
const cors = require("cors")
const bcrypt =  require("bcrypt")
const app = express()
const mongoose  = require("mongoose")
const multer = require('multer')
const router = express.Router();

mongoose.connect(process.env.DATABASE_URL ,{useNewUrlParser : true})

const db = mongoose.connection

module.exports = router


db.on('error',(error) => console.error('error')) 
db.once('open',() => console.log('connected to db'))

app.use(cors({ origin: true }))
app.use(express.json())

//accounty routes
const usersRoute = require('./routes/users')
const authenticationRoute = require('./routes/authentication')

//lead routes
const clientRoute = require('./routes/lead/clientroute')
const commentRoute = require('./routes/lead/commentroute')
const cutpasteRoute = require('./routes/lead/cutpasteroute')
const documentRoute = require('./routes/lead/documentroute')
const leadcontactRoute = require('./routes/lead/leadcontactroute')
const leadheaderRoute = require('./routes/lead/leadheaderroute')
const proposalRoute = require('./routes/lead/proposalroute')

//maintenance routes
const cityRoute = require('./routes/maintenance/cityroute')
const countryRoute = require('./routes/maintenance/countryroute')
const departmentRoute = require('./routes/maintenance/departmentroute')
const sourceRoute = require('./routes/maintenance/sourceroute')
const specialtyRoute = require('./routes/maintenance/specialtyroute')
const systemtypeRoute = require('./routes/maintenance/systemtyperoute')


//maintenance end points
app.use('/api/city' , cityRoute) 
app.use('/api/country' , countryRoute)
app.use('/api/department', departmentRoute)
app.use('/api/source', sourceRoute)
app.use('/api/specialty', specialtyRoute)
app.use('/api/systemtype', systemtypeRoute)

//lead end points
app.use('/api/client' , clientRoute) 
app.use('/api/comment' , commentRoute)
app.use('/api/cutpaste', cutpasteRoute)
app.use('/api/document', documentRoute)
app.use('/api/leadcontact', leadcontactRoute)
app.use('/api/leadheader', leadheaderRoute)
app.use('/api/proposal', proposalRoute)
 
app.use('/api/user' , usersRoute) 
app.use('/api/authentication' , authenticationRoute)

app.listen(3000  , ()=> console.log("server is on"))
app.use(express.static(__dirname + "/routes/uploads"));