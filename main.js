const express = require('express')
const dotenv=require('dotenv')
const cors=require('cors')

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())


//database
const db = require('./conn/conn')

//routes
const dic = require('./routes/dic.js')
const auth_users = require('./routes/users')
const medicine = require('./routes/medicine')
const parcel = require('./routes/parcel')
const batch = require('./routes/batch')
const pharma = require('./routes/pharma')

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


//link_parent
app.use('/help', dic)
app.use('/user', auth_users)
app.use('/medicine', medicine)
app.use('/parcel', parcel)
app.use('/batch', batch)
app.use('/pharma', pharma)
app.listen(process.env.PORT || 8000)