const database = require('./database.js');
const express = require('express');
const userRoute = require('./routes/user.js')
database.database();
const app = express ();
app.use(express.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/v1/user',userRoute);
app.listen(8081 , () => {
    console.log('Server listens to port 8081')
});