import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM usuario");
  res.json(result);
};

export const setUser = async (req, res) => {
  const { email, password } = req.body;

  const [result] = await pool.query(
    "INSERT INTO usuario(email,password) VALUES(?,?)",
    [email, password]
  );
  console.log(result);
  res.json({
    Id: result.insertId,
    email,
    password,
  });
  // res.send("Creando Usuario")
};
