const express = require('express')

const mysql_routes = require("./routes/mysql_routes");


//Configuration of server instance
const app = express();

//routes
app.use("/api/mysql", mysql_routes.apiMysql());


async function listen(){
    await app.listen(1234, () => {
        console.log("Listen port: " + 1234)
    })
}

listen()
    .then(() => {})
    .catch((error) => {
        console.log("Server error: ",error)
    })

