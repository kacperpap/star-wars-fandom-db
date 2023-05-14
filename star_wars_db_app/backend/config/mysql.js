const mysql = require("mysql");
const dbConfigValues = {
    dbname: "star_wars",
    dbuser: "root",
    dbpassword: "",
    dbhost: "localhost"
}

const connection = mysql.createConnection({
    host: dbConfigValues.dbhost,
    user: dbConfigValues.dbpassword,
    password: dbConfigValues.dbpassword,
    database: dbConfigValues.dbname
})
connection.connect(err => {
    if(err)
        console.log("Mysql driver: Connection failed: ", err)
    else
        console.log("Mysql driver: Connected successfully\n")
})

module.exports = {connection}