const express = require('express');
const mysql = require("mysql");
const https = require('https');
const fs = require('fs');
const app = express();
const cors = require("cors");
require("dotenv").config();

const host_usr = process.env.HOST_DB;
const password = process.env.PASS;
const data_base = process.env.DB;

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/door-ipn.ddns.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/door-ipn.ddns.net/fullchain.pem')
};

app.use(cors());
app.use(express.json());

///////////////////////////////////////////
// Autentificacion de token server
///////////////////////////////////////////
// Middleware de autenticación basada en IP
function authenticateByIP(req, res, next) {
    // Dirección IP del servidor de tu proyecto de React
    const serverIP = '3.82.193.2'; // Reemplaza con la dirección IP del servidor
  
    // Obtiene la dirección IP del cliente
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    // Compara la dirección IP del cliente con la del servidor
    if (clientIP !== serverIP) {
      return res.status(403).json({ message: 'Acceso no autorizado' });
    }
  
    // Si la dirección IP coincide, permite continuar con la solicitud
    next();
  }
////////////////////////////////////////////////////////////////////////////////////////////

app.get("/public-ip", (req, res) => {
    const publicIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    res.json({ ip: publicIp });
  });


const db = mysql.createConnection({
  host: host_usr,
  user: "root",
  password: password,
  database: data_base
});

app.post("/create", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query('INSERT INTO usuario(email,password) VALUES(?,?)', [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Bienvenido :)")
      }
    });
});

app.get("/users", (req, res) => {
  db.query('SELECT * FROM usuario', 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

https.createServer(options, app).listen(3001, () => {
  console.log("Servidor en el puerto 3001 con HTTPS habilitado");
});