const express = require("express")
const mysql_controllers = require("../../controllers/mysql_controllers/mysql_get_controllers");


function apiMysql() {
    const api = express.Router();

    //GET /api/mysql/trilogies
    api.get('/trilogies',mysql_controllers.getAllTrilogy)

    //GET /api/mysql/episodes
    api.get('/episodes',mysql_controllers.getAllEpisodes)

    //GET /api/mysql/characters
    api.get('/characters',mysql_controllers.getAllCharacters)

    //GET /api/mysql/universum
    api.get('/universum',mysql_controllers.getAllUniversum)

    //GET /api/mysql/awards
    api.get('/awards',mysql_controllers.getAllAwards)

    //GET /api/mysql/scenes
    api.get('/scenes',mysql_controllers.getAllScenes)

    //GET /api/mysql/events
    api.get('/events',mysql_controllers.getAllEvents)

    //GET /api/mysql/episode-places
    api.get('/episode-places',mysql_controllers.getAllEpisodePlaces)

    //GET /api/mysql/episode-appears
    api.get('/episode-appears',mysql_controllers.getAllEpisodeAppears)

    return api;
}

module.exports = {apiMysql}