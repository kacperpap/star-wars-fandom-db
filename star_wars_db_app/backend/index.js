const express = require('express')
const cors = require("cors")

const mysql_routes = require("./routes/mysql_routes");
const mongodb_routes = require("./routes/mongodb_routes")
const bodyParser = require("body-parser");


//Configuration of server instance
const app = express();
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
});

//Middleware to use json format in a http query
//app.use(express.json());

//urlencoded -> parsing data from x-www-form-urlencoded format in req.body
//Middleware -> use json format in http queries
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


//configure CORS (cross-origin resource sharing) which enables fetching data
// app.use(cors({
//     origin: 'http://localhost:1234'
    // allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 'x-www-form-urlencoded'],
    // credentials: true
// }));
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
//     // res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });





//routes
app.use("/api/mysql", mysql_routes.apiMysql());
app.use("/api/mongodb", mongodb_routes.apiMongo());


async function listen(){
    await app.listen(8000, () => {
        console.log("Listen port: " + 8000)
    })
}

listen()
    .then(() => {})
    .catch((error) => {
        console.log("Server error: ",error)
    })

