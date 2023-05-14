const mysqlConnection = require("../config/mysql").connection

// Accept the connection object as a parameter (dependency injection)
// Prevents circular dependency which is connection object

async function getAllTrilogy(req,res) {
    await mysqlConnection.query('SELECT trilogy.trilogy_name, trilogy.trilogy_order, trilogy.trilogy_size, trilogy.type FROM trilogy;', (error, results) => {
        if (error) {
            console.log("Mysql query: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send(results);
        }
    })
}

async function getAllEpisodes(req,res) {
    await mysqlConnection.query('SELECT episodes.title, episodes.director, episodes.production_dir, episodes.musics_creator, episodes.musics_creator, episodes.creation_date, episodes.budget, episodes.duration, trilogy.trilogy_name FROM episodes\n' +
        'LEFT JOIN trilogy ON trilogy.id = episodes.trilogy_id;', (error, results) => {
        if (error) {
            console.log("Mysql query: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send(results);
        }
    })
}

async function getAllCharacters(req,res) {
    await mysqlConnection.query('SELECT characters.role, characters.actor_name FROM characters;', (error, results) => {
        if (error) {
            console.log("Mysql query: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send(results);
        }
    })
}

async function getAllUniversum(req,res) {
    await mysqlConnection.query('SELECT universum.place_name, universum.place_membership FROM universum;', (error, results) => {
        if (error) {
            console.log("Mysql query: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send(results);
        }
    })
}

async function getAllAwards(req,res) {
    await mysqlConnection.query('SELECT awards.type, awards.cathegory, awards.description, episodes.title, characters.role, characters.actor_name FROM awards\n' +
        'LEFT JOIN episodes ON episodes.id = awards.episode_id\n' +
        'LEFT JOIN characters ON characters.id = awards.role_id;', (error, results) => {
        if (error) {
            console.log("Mysql query: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send(results);
        }
    })
}


async function getAllScenes(req,res) {
    await mysqlConnection.query('SELECT scenes.description FROM scenes;', (error, results) => {
        if (error) {
            console.log("Mysql query: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send(results);
        }
    })
}

async function getAllEvents(req,res) {
    await mysqlConnection.query('SELECT characters.role, episodes.title, scenes.description FROM events\n' +
        'LEFT JOIN characters ON characters.id = events.character_id\n' +
        'LEFT JOIN episodes ON episodes.id = events.episode_id\n' +
        'LEFT JOIN scenes ON scenes.id = events.desc_id;', (error, results) => {
        if (error) {
            console.log("Mysql query: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send(results);
        }
    })
}

async function getAllEpisodePlaces(req,res) {
    await mysqlConnection.query('SELECT universum.place_name, universum.place_membership, episodes.title FROM episode_places\n' +
        'LEFT JOIN universum ON universum.id = episode_places.id_place\n' +
        'LEFT JOIN episodes ON episodes.id = episode_places.id_episode;', (error, results) => {
        if (error) {
            console.log("Mysql query: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send(results);
        }
    })
}

async function getAllEpisodeAppears(req,res) {
    await mysqlConnection.query('SELECT characters.role, characters.actor_name, episodes.title FROM episode_appears\n' +
        'LEFT JOIN characters ON characters.id = episode_appears.id_character\n' +
        'LEFT JOIN episodes ON episodes.id = episode_appears.id_episode;', (error, results) => {
        if (error) {
            console.log("Mysql query: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send(results);
        }
    })
}

module.exports = { getAllCharacters, getAllTrilogy, getAllEpisodes, getAllUniversum, getAllAwards, getAllScenes, getAllEvents,
                    getAllEpisodePlaces, getAllEpisodeAppears};
