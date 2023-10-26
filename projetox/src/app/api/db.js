import mysql from "mysql"

export const database = mysql.createConnection({
    host: "localhost",
    database: "crud",
    user: "root",
    password: "Escanor2200@"
})