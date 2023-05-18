const express = require("express")
const mysql_get_controllers = require("../controllers/mysql_controllers/mysql_get_controllers");
const mysql_insert_controllers = require("../controllers/mysql_controllers/mysql_insert_controllers")


function apiMysql() {
    const api = express.Router();

    //GET /api/mysql/get/trilogies
    api.get('/get/trilogies',mysql_get_controllers.getAllTrilogy)

    //GET /api/mysql/get/episodes
    api.get('/get/episodes',mysql_get_controllers.getAllEpisodes)

    //GET /api/mysql/get/characters
    api.get('/get/characters',mysql_get_controllers.getAllCharacters)

    //GET /api/mysql/get/universum
    api.get('/get/universum',mysql_get_controllers.getAllUniversum)

    //GET /api/mysql/get/awards
    api.get('/get/awards',mysql_get_controllers.getAllAwards)

    //GET /api/mysql/get/scenes
    api.get('/get/scenes',mysql_get_controllers.getAllScenes)

    //GET /api/mysql/get/events
    api.get('/get/events',mysql_get_controllers.getAllEvents)

    //GET /api/mysql/get/episode-places
    api.get('/get/episode-places',mysql_get_controllers.getAllEpisodePlaces)

    //GET /api/mysql/get/episode-appears
    api.get('/get/episode-appears',mysql_get_controllers.getAllEpisodeAppears)

    //POST /api/mysql/insert/trilogy
    api.post('/insert/trilogy',mysql_insert_controllers.insertOneIntoTrilogy)

    //POST /api/mysql/insert/episodes
    api.post('/insert/episodes',mysql_insert_controllers.insertOneIntoEpisodes)

    //POST /api/mysql/insert/character
    api.post('/insert/character',mysql_insert_controllers.insertOneIntoCharacters)

    //POST /api/mysql/insert/scenes
    api.post('/insert/scenes',mysql_insert_controllers.insertOneIntoScenes)

    //POST /api/mysql/insert/universum
    api.post('/insert/universum',mysql_insert_controllers.insertOneIntoUniversum)

    //POST /api/mysql/insert/awards
    api.post('/insert/awards',mysql_insert_controllers.insertOneIntoAwards)

    //POST /api/mysql/insert/episode-places
    api.post('/insert/episode-places',mysql_insert_controllers.insertOneIntoEpisodePlaces)

    //POST /api/mysql/insert/episode-appears
    api.post('/insert/episode-appears',mysql_insert_controllers.insertOneIntoEpisodeAppears)

    //POST /api/mysql/insert/episode-events
    api.post('/insert/episode-events',mysql_insert_controllers.insertOneIntoEpisodeEvents)


    return api;
}

module.exports = {apiMysql}