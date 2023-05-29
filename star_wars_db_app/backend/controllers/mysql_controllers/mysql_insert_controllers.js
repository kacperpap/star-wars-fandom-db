const mysqlConnection = require("../../config/mysql").connection


async function insertOneIntoTrilogy(req, res)
{
    let trilogy_name = req.body.trilogy_name?.toString()
    let trilogy_order = req.body.trilogy_order
    let trilogy_size = req.body.trilogy_size
    let trilogy_type = req.body.trilogy_type?.toString()

    if(trilogy_order !== undefined)
        trilogy_order = parseInt(trilogy_order)
    if(trilogy_size !== undefined)
        trilogy_size = parseInt(trilogy_size)

    if(trilogy_type !== "film" && trilogy_type !== "series" && trilogy_type !== "other")
        trilogy_type = undefined

    let insertQuery = "INSERT INTO star_wars.trilogy (trilogy.trilogy_name, trilogy.trilogy_order, " +
        "trilogy.trilogy_size, trilogy.type) VALUES (?, ?, ?, ?);";

    let values = [trilogy_name, trilogy_order, trilogy_size, trilogy_type];

    if(!trilogy_name || !trilogy_order || !trilogy_size || !trilogy_type) {
        return res.status(500).send("insertOneIntoTrilogy: trilogy_name,trilogy_order,trilogy_size,trilogy_type (film/series/other) needs to be specified")
    }


    await mysqlConnection.query(insertQuery,values, (error, results) => {
        if (error) {
            console.log("insertOneIntoTrilogy: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send("insertOneIntoTrilogy: done successfully");
        }
    })
}



async function insertOneIntoEpisodes(req, res){
    const title = req.body.episode_title?.toString();
    const director = req.body.episode_director?.toString();
    const production_dir = req.body.episode_production_director?.toString();
    const musics_creator = req.body.episode_musics_creator?.toString();
    const creation_date = new Date(req.body.episode_creation_date)
    let budget = req.body.episode_budget?.toString()
    let duration = req.body.episode_duration?.toString()
    let trilogy_name = req.body.episode_trilogy_name?.toString()
    let trilogy_id = undefined;

    if(budget !== undefined)
        budget = parseInt(budget)

    if(duration !== undefined)
        duration = parseInt(duration)

    let getQuery = "SELECT trilogy.id FROM trilogy WHERE trilogy.trilogy_name LIKE \"" + trilogy_name + "\""
    await mysqlConnection.query(getQuery,async (error,result)=>{
        if(error){
            return res.status(501).send("insertOneIntoEpisodes: episode_title, episode_director, episode_trilogy_name needs to be specified, (episode_trilogy_name exeption)")
        }
        trilogy_id = result[0].id;
        if(!title || !director || !trilogy_id) {
            res.status(502).send("insertOneIntoEpisodes: episode_title, episode_director, episode_trilogy_name needs to be specified")
            return;
        }

        let insertQuery = "INSERT INTO star_wars.episodes (title, director, production_dir, musics_creator, creation_date, budget, duration,trilogy_id)" +
            "VALUES (?,?,?,?,?,?,?,?);";

        let values = [title, director, production_dir, musics_creator, creation_date,budget, duration, trilogy_id];
        await mysqlConnection.query(insertQuery,values, (error, results) => {
            if (error) {
                if(error.errno == 1452) {
                    let errMessage = "insertOneIntoEpisodes: foreign key constraint (the foreign key you want to add does not exist in the parent table)"
                    console.log("insertOneIntoEpisodes: ", error)
                    return res.status(500).send(errMessage);
                }
                else {
                    console.log("insertOneIntoEpisodes: ", error)
                    return res.status(500).send(error);
                }
            }
            else {
                return res.status(200).send("insertOneIntoEpisodes: done successfully");
            }
        })
    })
}


async function insertOneIntoCharacters(req, res)
{
    const role = req.body.role?.toString()
    const actor_name = req.body.actor?.toString()


    if(!role || !actor_name) {
        return res.status(500).send("insertOneIntoCharacters: character, actor_name needs to be specified")
    }

    let insertQuery = "INSERT INTO star_wars.characters (role, actor_name) VALUES (?,?);";
    let values = [role, actor_name];

    await mysqlConnection.query(insertQuery,values, (error, results) => {
        if (error) {
            console.log("insertOneIntoCharacters: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send("insertOneIntoCharacters: done successfully");
        }
    })
}

async function insertOneIntoScenes(req, res)
{
    const description = req.body.description?.toString()

    if(!description) {
        return res.status(500).send("insertOneIntoScenes: description needs to be specified")
    }

    let insertQuery = "INSERT INTO star_wars.scenes (description) VALUES (?);";
    let values = [description];

    await mysqlConnection.query(insertQuery,values, (error, results) => {
        if (error) {
            console.log("insertOneIntoScenes: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send("insertOneIntoScenes: done successfully");
        }
    })
}


async function insertOneIntoUniversum(req, res)
{
    const place = req.body.place_name?.toString()
    let membership = req.body.place_membership?.toString()

    if(membership !== "Separatist" && membership !== "Republic" && membership !== "Undetermined")
        membership = undefined

    if(!place || !membership) {
        return res.status(500).send("insertOneIntoUniversum: place_name, place_membership (Separatist/Republic/Undetermined) needs to be specified")
    }

    let insertQuery = "INSERT INTO star_wars.universum (place_name, place_membership) VALUES (?,?);";
    let values = [place,membership];

    await mysqlConnection.query(insertQuery,values, (error, results) => {
        if (error) {
            console.log("insertOneIntoUniversum: ", error)
            return res.status(500).send(error);
        }
        else {
            return res.status(200).send("insertOneIntoUniversum: done successfully");
        }
    })
}


async function insertOneIntoAwards(req, res)
{
    let role_id = req.body.role_id
    let episode_id = req.body.episode_id
    let type = req.body.award_type?.toString()
    let cathegory = req.body.award_cathegory?.toString()

    if(type !== "Grammy" && type !== "Oscar" && type !== "BAFTA" && type !== "Saturn" && type !== "Golden Raspberry Award" && type !== "other")
        type = undefined

    if(cathegory !== "episode" && cathegory !== "scene" && cathegory !== "role" && cathegory !== "other")
        cathegory = undefined

    if(role_id !== undefined)
        role_id = parseInt(role_id)

    if(episode_id !== undefined)
        episode_id = parseInt(episode_id)

    if(!type || !cathegory || !desc) {
        res.status(500).send("insertOneIntoAwards: award_type (Grammy/Oscar/BAFTA/Saturn/Golden Raspberry Award/other)" +
            ", award_cathegory (episode/scene/role/other), award_description needs to be specified")
        return;
    }


    let insertQuery = "INSERT INTO star_wars.awards (role_id, episode_id, type, cathegory, description) VALUES (?,?,?,?);\n";
    let values = [role_id,episode_id,type,cathegory];

    await mysqlConnection.query(insertQuery,values, (error, results) => {
        if (error) {
            if(error.errno == 1452) {
                let errMessage = "insertOneIntoAwards: foreign key constraint (the foreign key you want to add does not exist in the parent table)"
                console.log("insertOneIntoAwards: ", error)
                return res.status(500).send(errMessage);
            }
            else {
                console.log("insertOneIntoAwards: ", error)
                return res.status(500).send(error);
            }
        }
        else {
            return res.status(200).send("insertOneIntoAwards: done successfully");
        }
    })
}

async function insertOneIntoEpisodePlaces(req, res)
{
    let episode_id = req.body.episode_id
    let place_id = req.body.place_id

    if(episode_id !== undefined)
        episode_id = parseInt(episode_id)

    if(place_id !== undefined)
        place_id = parseInt(place_id)

    if(!episode_id || !place_id ) {
        res.status(500).send("insertOneIntoEpisodePlaces: episode_id, place_id needs to be specified")
        return;
    }

    let insertQuery = "INSERT INTO star_wars.episode_places (id_episode, id_place) VALUES (?,?);";
    let values = [episode_id,place_id];

    await mysqlConnection.query(insertQuery,values, (error, results) => {
        if (error) {
            if(error.errno == 1452){
                let errMessage = "insertOneIntoEpisodePlaces: foreign key constraint (the foreign key you want to add does not exist in the parent table)"
                console.log("insertOneIntoEpisodePlaces: ", error)
                return res.status(500).send(errMessage);
            }
            else {
                console.log("insertOneIntoEpisodePlaces: ", error)
                return res.status(500).send(error);
            }
        }
        else {
            return res.status(200).send("insertOneIntoEpisodePlaces: done successfully");
        }
    })
}

async function insertOneIntoEpisodeAppears(req, res)
{
    let episode_id = req.body.episode_id
    let character_id = req.body.character_id

    if(episode_id !== undefined)
        episode_id = parseInt(episode_id)

    if(character_id !== undefined)
        character_id = parseInt(character_id)

    if(!episode_id || !character_id ) {
        res.status(500).send("insertOneIntoEpisodeAppears: episode_id, character_id needs to be specified")
        return;
    }

    let insertQuery = "INSERT INTO star_wars.episode_appears (id_episode, id_character) VALUES (?,?)";
    let values = [episode_id,character_id];

    await mysqlConnection.query(insertQuery,values, (error, results) => {
        if (error) {
            if(error.errno == 1452) {
                let errMessage = "insertOneIntoEpisodeAppears: foreign key constraint (the foreign key you want to add does not exist in the parent table)"
                console.log("insertOneIntoEpisodeAppears: ", error)
                return res.status(500).send(errMessage);
            }
            else {
                console.log("insertOneIntoEpisodeAppears: ", error)
                return res.status(500).send(error);
            }
        }
        else {
            return res.status(200).send("insertOneIntoEpisodeAppears: done successfully");
        }
    })
}

async function insertOneIntoEpisodeEvents(req, res)
{
    let episode_id = req.body.episode_id
    let character_id = req.body.character_id
    let desc_id = req.body.description_id

    if(episode_id !== undefined)
        episode_id = parseInt(episode_id)

    if(character_id !== undefined)
        character_id = parseInt(character_id)

    if(desc_id !== undefined)
        desc_id = parseInt(desc_id)

    if(!episode_id || !character_id || !desc_id ) {
        res.status(500).send("insertOneIntoEpisodeEvents: episode_id, character_id, desc_id needs to be specified")
        return;
    }

    let insertQuery = "INSERT INTO star_wars.events (character_id, episode_id, desc_id) VALUES (?,?,?)";
    let values = [character_id,episode_id,desc_id];

    await mysqlConnection.query(insertQuery,values, (error, results) => {
        if (error) {
            if(error.errno == 1452) {
                let errMessage = "insertOneIntoEpisodeEvents: foreign key constraint (the foreign key you want to add does not exist in the parent table)"
                console.log("insertOneIntoEpisodeEvents: ", error)
                return  res.status(500).send(errMessage)
            }
            else {
                console.log("insertOneIntoEpisodeEvents: ", error)
                return res.status(500).send(error);
            }
        }
        else {
            return res.status(200).send("insertOneIntoEpisodeEvents: done successfully");
        }
    })
}





module.exports = {insertOneIntoTrilogy, insertOneIntoEpisodes, insertOneIntoCharacters, insertOneIntoScenes, insertOneIntoUniversum,
                  insertOneIntoAwards, insertOneIntoEpisodePlaces, insertOneIntoEpisodeAppears, insertOneIntoEpisodeEvents}