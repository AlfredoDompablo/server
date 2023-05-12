const express = require('express');
const mysql = require("mysql");
const app = express();
const cors =require("cors");
require("dotenv").config();

const host_usr = process.env.HOST_DB;
const password = process.env.PASS;
const data_base = process.env.DB;

console.log(host_usr);
console.log(password);
console.log(data_base);

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: host_usr,
    user:"root",
    password: password,
    database: data_base
});

app.post("/create",(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

db.query('INSERT INTO usuario(email,password) VALUES(?,?)',[email,password],
(err,result) => {
    if (err){
        console.log(err);
    }else{
        res.send("Bienvenido :)")
    }
});
})


app.listen(3001, ()=>{
    console.log("servidor en el puerto 3001")
})