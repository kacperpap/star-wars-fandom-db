const {MongoClient} = require("mongodb")

async function connectToMongoDB(){
    const uri = 'mongodb://127.0.0.1:27017/'
    const client = new MongoClient(uri);

    try {
        await client.connect()
        console.log("MongoDB driver: Connected successfully")
        const mongoDB = client.db("star_wars");
        return mongoDB
    }
    catch (error){
        console.log("MongoDB driver: Connection failed: ", error)
    }
}

const mongoDB = connectToMongoDB()

module.exports = {mongoDB}