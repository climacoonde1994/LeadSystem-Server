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

const usersRoute = require('./routes/users')
const dtrsRoute = require('./routes/dtrs') 
const notificationRoute = require('./routes/notifications')
const uploadsRoute = require('./routes/uploads')
const filesRoute = require('./routes/files')
const authenticationRoute = require('./routes/authentication')

const customerRoute = require('./routes/customers')
const driverRoute = require('./routes/drivers')
const foodRoute = require('./routes/foods')
const orderRoute = require('./routes/orders')
const transactionRoute = require('./routes/transactions')
const vendorRoute = require('./routes/transactions')

app.use('/api/users' , usersRoute) 
app.use('/api/dtrs' , dtrsRoute) 
app.use('/api/authentication' , authenticationRoute)
app.use('/api/uploads', uploadsRoute)
app.use('/api/files', filesRoute)
app.use('/api/notifications', notificationRoute)
app.use('/api/customers', customerRoute)
app.use('/api/drivers', driverRoute)
app.use('/api/foods', foodRoute)
app.use('/api/orders', orderRoute)
app.use('/api/transactions', transactionRoute)
app.use('/api/vendors', vendorRoute)

app.listen(3000  , ()=> console.log("server is on"))
app.use(express.static(__dirname + "/routes/uploads"));