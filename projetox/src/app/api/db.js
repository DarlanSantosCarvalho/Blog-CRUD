import mysql from "mysql2"

export const database = mysql.createConnection({
    host: "localhost",
    database: "crud",
    user: "root",
    password: "Escanor2200@"
})