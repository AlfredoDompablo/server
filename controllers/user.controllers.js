import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM USUARIO");
    res.json(result);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM USUARIO WHERE correo = ?",[
      req.params.correo,
    ]);
    
    if (result.length === 0)
    return res.status(404).json({ message: "User not found" });
    
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const setUser = async (req, res) => {
  try {
    const { email, FirstName, LastName,LastName2, password,telefono, nac } = req.body;
  
    const [result] = await pool.query(
      // "INSERT INTO usuario(email,password) VALUES(?,?)",
      "CALL AGREGAR_USUARIO (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
      [null, email, FirstName, LastName, LastName2, null, telefono, password, nac]);
      // [email, password]
    // );
    console.log(result);
    res.json({
      Id: result.insertId,
    });
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  // res.send("Creando Usuario")
};
