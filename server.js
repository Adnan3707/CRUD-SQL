const express = require('express');

const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');


// app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, 'C:/VS Code/CRUD/assets/views'))
app.use(bodyparser.urlencoded({ extended : true}))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//Load router
app.use('/',require('./assets/server/routes/router'))

app.listen(3000,()=>{
    console.log('Server is running')
})
