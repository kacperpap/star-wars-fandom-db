const mongoDB = require("../../config/mongo").mongoDB



//req.body.collectionName = "trilogy" etc.
//req.body.filterField = "trilogy_order:{$lte:2}"
//req.body.projectionField = "trilogy_order:true"
//TODO: filter and projection field
async function getAllDocumentsFromCollection(req,res){
    const collectionName = req.body.collectionName?.toString();
    //let filterField = req.body.filterField?.toString()
    //let projectionField = req.body.projectionField?.toString();

    if(collectionName === undefined)
        res.status(500).send("getAllDocumentsFromCollection: The collection name needs to be specified")

    let result;
    const collection = (await mongoDB).collection(collectionName);

   //if(filterField === undefined && projectionField === undefined)
    result = await collection.find().toArray()
    // if(filterField !== undefined && projectionField === undefined)
    //     result = await collection.find({filterField}).toArray()
    // if(filterField === undefined && projectionField !== undefined)
    //     result = await collection.find({}, {projectionField}).toArray()
    // if(filterField !== undefined && projectionField !== undefined)
    //     result = await collection.find({filterField}, {projectionField}).toArray()


    res.status(200).send(result)
}

module.exports = {getAllDocumentsFromCollection}