import { Router } from "express";
import { getUsers, setUser } from "../controllers/user.controllers.js";
import jwt from "jsonwebtoken";

const router = Router();

// Middleware para verificar el token JWT
// export function verificarToken(req, res, next) {
//     const token = req.headers.authorization; // Obtener el token de los headers

//     if (token) {
//       jwt.verify(token, "secreto_del_token", (err, decoded) => {
//         if (err) {
//           return res.status(401).json({ mensaje: "Token inválido" });
//         } else {
//           req.usuario = decoded.usuario; // Agregar información del usuario al objeto de solicitud (req)
//           next();
//         }
//       });
//     } else {
//       return res.status(403).json({ mensaje: "Token no proporcionado" });
//     }
//   }

router.get("/users", getUsers);
router.post("/setuser", setUser);

export default router;
