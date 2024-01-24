const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345",
    database:"test",
    port:"3306",
})

const app=express();
app.listen(3000,()=>{
    console.log('server running on port 3000!!');
})