const express = require("express")
const mongodb_get_controllers = require("../../controllers/mongodb_controllers/mongodb_get_controllers")
const mongodb_insert_controllers = require("../../controllers/mongodb_controllers/mongodb_insert_controllers")
const mongodb_delete_controllers = require("../../controllers/mongodb_controllers/mongodb_delete_controllers")


function apiMongo(){
    const api = express.Router()

    // GET /api/mongodb/find    //req.body.collectionName = "trilogy"; etc.
    api.get("/find", mongodb_get_controllers.getAllDocumentsFromCollection)

    // POST /api/mongodb/insert/trilogy
    api.post("/insert/trilogy", mongodb_insert_controllers.insertOneIntoTrilogy)

    // POST /api/mongodb/insert/episodes
    api.post("/insert/episodes", mongodb_insert_controllers.insertOneIntoEpisodes)

    // POST /api/mongodb/insert/characters
    api.post("/insert/characters", mongodb_insert_controllers.insertOneIntoCharacters)

    // POST /api/mongodb/insert/universum
    api.post("/insert/universum", mongodb_insert_controllers.insertOneIntoUniversum)

    // POST /api/mongodb/insert/events
    api.post("/insert/events", mongodb_insert_controllers.insertOneIntoEvents)

    // POST /api/mongodb/insert/awards
    api.post("/insert/awards", mongodb_insert_controllers.insertOneIntoAwards)

    // POST /api/mongodb/delete
    api.post("/delete", mongodb_delete_controllers.deleteDocumentFromCollection)


    return api;
}

module.exports = {apiMongo}