import  express  from "express";
import {PORT} from './config.js'
import cors  from "cors";
import indexRoutes from "./routes/index.routes.js"
import userRoutes from "./routes/user.routes.js"
import fs from "fs"
import https from "https"


const app = express();

app.use(cors());
app.use(express.json());    

// Configurar las opciones para el servidor HTTPS
const options = {
    key: fs.readFileSync('./privkey.pem'),
    cert: fs.readFileSync('./fullchain.pem')
};

app.use(indexRoutes);
app.use(userRoutes);
  https.createServer(options, app).listen(3001, () => {
    console.log("Servidor en el puerto " + PORT + " con HTTPS habilitado");
  });
//app.listen(PORT);
console.log('Servidor en el puerto ' + PORT);