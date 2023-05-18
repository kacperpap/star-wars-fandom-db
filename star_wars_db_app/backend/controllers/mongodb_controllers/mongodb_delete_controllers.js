const {ObjectId} = require("mongodb");
const mongoDB = require("../../config/mongo").mongoDB


//req.body.collectionName = "trilogy" etc.
//req.body.objectID
//TODO: potencjalny bład -> przekazujemy samo id a nie obiekt ObjectId
async function deleteDocumentFromCollectionByObjectID(req, res){
    const collectionName = req.body.collectionName?.toString();
    const objectID = req.body.objectID

    if(collectionName === undefined || objectID === undefined) {
        res.status(500).send("deleteDocumentFromCollection: The collection name and objectID needs to be specified")
        return;
    }

    const collection = (await mongoDB).collection(collectionName)
    const id = new ObjectId(objectID)

    await collection.deleteOne({_id: id})
        .then( (result) => {
            if (result.deletedCount > 0) {
                res.status(200).send("deleteDocumentFromCollection: deleted successfully");
                return;
            } else {
                res.status(404).send("deleteDocumentFromCollection: document not found");
                return;
            }
        })
        .catch(error => {
            res.status(500).send("deleteDocumentFromCollection: ", error)
            return;
        })

}

module.exports = {deleteDocumentFromCollectionByObjectID}