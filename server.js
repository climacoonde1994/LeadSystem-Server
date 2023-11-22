require('dotenv').config()


const express = require("express")
const cors = require("cors")
const bcrypt =  require("bcrypt")
const app = express()
const mongoose  = require("mongoose")
const router = express.Router();
const session = require('express-session');

mongoose.connect(process.env.DATABASE_URL ,{useNewUrlParser : true})

const db = mongoose.connection

module.exports = router


db.on('error',(error) => console.error('error')) 
db.once('open',() =>  {

    // console.log('DB Connected');
    // // add 'const' before 'gfs'
    // const gfs = Grid(conn.db, mongoose.mongo);
    // gfs.collection('images')

})

 


app.use(cors({ origin: true }))
app.use(express.json())
app.use(session({
    secret: 'your-secret-key',  // Change this to a secure random string
    resave: false,
    saveUninitialized: false,
}));

//accounty routes


const authenticationRoute = require('./routes/authentication')
const employeeRoute = require('./routes/Account/employeeroute')
const usersRoute = require('./routes/Account/userroute')
//lead routes
const clientRoute = require('./routes/lead/clientroute')
const commentRoute = require('./routes/lead/commentroute')
const cutpasteRoute = require('./routes/lead/cutpasteroute')
const documentRoute = require('./routes/lead/documentroute')
const leadcontactRoute = require('./routes/lead/leadcontactroute')
const noteRoute = require('./routes/lead/noteroute')
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
app.use('/api/note', noteRoute)

app.use('/api/user' , usersRoute) 
app.use('/api/authentication' , authenticationRoute)

app.use('/api/employee' , employeeRoute) 


app.listen(3000  , ()=> console.log("server is on"))
app.use(express.static(__dirname + "/routes/uploads")); 