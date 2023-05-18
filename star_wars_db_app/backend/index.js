const express = require('express')

const mysql_routes = require("./routes/mysql_routes");
const mongodb_routes = require("./routes/mongodb_routes")
const bodyParser = require("body-parser");


//Configuration of server instance
const app = express();

//Middleware to use json format in a http query
//app.use(express.json());

//urlencoded -> parsing data from x-www-form-urlencoded format in req.body
//Middleware -> use json format in http queries
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())



//routes
app.use("/api/mysql", mysql_routes.apiMysql());
app.use("/api/mongodb", mongodb_routes.apiMongo());


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

