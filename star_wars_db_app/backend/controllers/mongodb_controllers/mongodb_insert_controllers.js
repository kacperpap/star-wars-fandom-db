const mongoDB = require("../../config/mongo").mongoDB


//req.body needs to specify: {trilogy_name,trilogy_order,trilogy_size,trilogy_type}
async function insertOneIntoTrilogy(req,res){
    const name = req.body.trilogy_name?.toString();
    let order = req.body.trilogy_order?.toString();
    let size = req.body.trilogy_size?.toString();
    let type = req.body.trilogy_type?.toString();

    if(order !== undefined)
        order = parseInt(order)

    if(size !== undefined)
        size = parseInt(size)

    const collection = (await mongoDB).collection("trilogy");

    if(type !== "film" && type !== "series" && type !== "other")
        type = undefined

    if(!name || !order || !size || !type) {
        res.status(500).send("insertOneIntoTrilogy: trilogy_name,trilogy_order,trilogy_size,trilogy_type (film/series/other) needs to be specified")
        return;
    }
    await collection.insertOne({trilogy_name: name, trilogy_order: order, trilogy_size: size, type: type})
        .then(() => {
            res.status(200).send("insertOneIntoTrilogy done successfully")
            return;
        })
        .catch(error => {
            console.log("insertOneIntoTrilogy: ",error)
            res.status(500).send("insertOneIntoTrilogy error")
            return;
        })
}


async function insertOneIntoEpisodes(req,res){
    const title = req.body.episode_title?.toString();
    const director = req.body.episode_director?.toString();
    const production_dir = req.body.episode_production_director?.toString();
    const musics_creator = req.body.episode_musics_creator?.toString();
    const creation_date = new Date(req.body.episode_creation_date)
    let budget = req.body.episode_budget
    let duration = req.body.episode_duration
    const trilogy_name = req.body.episode_trilogy?.toString()

    if(budget !== undefined)
        budget = parseInt(budget)

    if(duration !== undefined)
        duration = parseInt(duration)

    const collection = (await mongoDB).collection("episodes");

    if(!title || !director || !trilogy_name) {
        res.status(500).send("insertOneIntoEpisodes: episode_title, episode_director, episode_trilogy needs to be specified")
        return;
    }
    await collection.insertOne({title: title, director: director, production_dir: production_dir, musics_creator: musics_creator, creation_date: creation_date,
        budget: budget, duration: duration, trilogy_name: trilogy_name})
        .then(() => {
            res.status(200).send("insertOneIntoEpisodes done successfully")
            return;
        })
        .catch(error => {
            console.log("insertOneIntoEpisodes: ",error)
            res.status(500).send("insertOneIntoEpisodes error")
            return;
        })
}

//UWAGA: założenie że podawane filmy są oddzielone przecinkiem
async function insertOneIntoCharacters(req,res){
    const role = req.body.role?.toString()
    const actor_name = req.body.actor?.toString()
    const episodes = req.body.episodes?.split(",")

    const collection = (await mongoDB).collection("characters");

    if(!role || !actor_name) {
        res.status(500).send("insertOneIntoCharacters: role, actor_name needs to be specified")
        return;
    }
    await collection.insertOne({role: role, actor_name: actor_name, episodes: episodes})
        .then(() => {
            res.status(200).send("insertOneIntoCharacters done successfully")
            return;
        })
        .catch(error => {
            console.log("insertOneIntoCharacters: ",error)
            res.status(500).send("insertOneIntoCharacters error")
            return;
        })
}

//UWAGA: założenie że podawane filmy są oddzielone przecinkiem
async function insertOneIntoUniversum(req,res){
    const name = req.body.place_name?.toString()
    let membership = req.body.place_membership?.toString()
    const episodes = req.body.episodes?.split(",")

    const collection = (await mongoDB).collection("universum");

    if(membership !== "Separatist" && membership !== "Republic" && membership !== "Undetermined")
        membership = undefined

    if(!name || !membership) {
        res.status(500).send("insertOneIntoUniversum: place_name, place_membership (Separatist/Republic/Undetermined)" +
            " needs to be specified")
        return;
    }
    await collection.insertOne({place_name: name, place_membership: membership, episodes: episodes})
        .then(() => {
            res.status(200).send("insertOneIntoUniversum done successfully")
            return;
        })
        .catch(error => {
            console.log("insertOneIntoUniversum: ",error)
            res.status(500).send("insertOneIntoUniversum error")
            return;
        })
}



async function insertOneIntoEvents(req,res){

    const characters = req.body.characters?.split(",")
    const title = req.body.event_title?.toString()
    const desc = req.body.event_description?.toString()

    const collection = (await mongoDB).collection("events");


    if(!characters || !title || !desc) {
        res.status(500).send("insertOneIntoEvents: characters, event_title, event_description needs to be specified")
        return;
    }
    await collection.insertOne({roles: characters, title: title, description: desc})
        .then(() => {
            res.status(200).send("insertOneIntoEvents done successfully")
            return;
        })
        .catch(error => {
            console.log("insertOneIntoEvents: ",error)
            res.status(500).send("insertOneIntoEvents error")
            return;
        })
}

async function insertOneIntoAwards(req,res){
    let type = req.body.award_type?.toString()
    let cathegory = req.body.award_cathegory?.toString()
    const desc = req.body.award_description?.toString()
    const role = req.body.award_role?.toString()
    const title = req.body.award_title?.toString()
    const actor_name = req.body.award_actor?.toString()


    const collection = (await mongoDB).collection("awards");

    if(type !== "Grammy" && type !== "Oscar" && type !== "BAFTA" && type !== "Saturn" && type !== "Golden Raspberry Award" && type !== "other")
        type = undefined

    if(cathegory !== "episode" && cathegory !== "scene" && cathegory !== "role" && cathegory !== "other")
        cathegory = undefined

    if(!type || !cathegory || !desc) {
        res.status(500).send("insertOneIntoAwards: award_type (Grammy/Oscar/BAFTA/Saturn/Golden Raspberry Award/other)" +
            ", award_cathegory (episode/scene/role/other), award_description needs to be specified")
        return;
    }
    await collection.insertOne({type: type, cathegory: cathegory, description: desc, title: title, role: role, actor_name: actor_name})
        .then(() => {
            res.status(200).send("insertOneIntoAwards done successfully")
            return;
        })
        .catch(error => {
            console.log("insertOneIntoAwards: ",error)
            res.status(500).send("insertOneIntoAwards error")
            return;
        })
}

module.exports = {insertOneIntoTrilogy, insertOneIntoEpisodes, insertOneIntoCharacters, insertOneIntoUniversum, insertOneIntoEvents,
                  insertOneIntoAwards}