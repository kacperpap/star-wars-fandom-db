const mysqlConnection = require("../../config/mysql").connection


async function deleteRecordFromTableByID(req, res)
{
    const tableName = req.body.tableName?.toString()
    let objectID = req.body.id

    if(objectID !== undefined)
        objectID = parseInt(objectID)

    let deleteQuery = 'DELETE FROM ' + tableName + ' WHERE id LIKE ' + objectID;

    if(!tableName || !objectID) {
        return res.status(500).send("deleteRecordFromTableByID: tableName and id needs to be specified")
    }

    await mysqlConnection.query(deleteQuery, (error, results) => {
        if (error) {
            if(error.errno == 1452) {
                let errMessage = "deleteRecordFromTableByID: foreign key constraint (the foreign key you have selected does not exist)"
                console.log("deleteRecordFromTableByID: ", error)
                return res.status(500).send(errMessage);
            }
            else {
                console.log("deleteRecordFromTableByID: ", error)
                return res.status(500).send(error);
            }
        }
        else {
            return res.status(200).send("deleteRecordFromTableByID: done successfully");
        }
    })
}


module.exports = {deleteRecordFromTableByID}
