import {createPool} from "mysql2/promise"
import dotenv from "dotenv";
// require("dotenv").config();
dotenv.config();

const host_usr = process.env.HOST_DB;
const password = process.env.PASS;
const data_base = process.env.DB;
// console.log(host_usr);
// console.log(password);
// console.log(data_base);

export const pool = createPool({
    host: host_usr,
    user: "root",
    password: password,
    database: data_base
})

