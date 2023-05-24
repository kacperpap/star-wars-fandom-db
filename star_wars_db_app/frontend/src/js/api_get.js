const apiMysqlGetEpisodes = "http://localhost:8000/api/mysql/get/episodes";

export async function apiGetTasks() {
    const request = await fetch(apiMysqlGetEpisodes);
    if (request.ok) {
        return request.json();
    } else {
        throw Error(request.status);
    }
}

//TODO: jak naprawić możliwość niepodawania budget i duration ????????????

export function apiAddEpisode({title, director, productionDir, musicsCreator, creationDate, budget, duration, trilogyName}) {
    const requestData = {
        episode_title: title,
        episode_director: director,
        episode_production_director: productionDir,
        episode_musics_creator: musicsCreator,
        episode_creation_date: creationDate,
        episode_budget: budget,
        episode_duration: duration,
        episode_trilogy_name: trilogyName
    };

    console.log(requestData)

    fetch('http://localhost:8000/api/mysql/insert/episodes', {
        method: 'POST',
        // mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded'

        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .catch(error => {
            console.error(error);
        });
}

// export async function apiAddEpisode({ title, director, productionDir, musicsCreator, creationDate, budget, duration, trilogyName }) {
//     const requestData = new URLSearchParams();
//     requestData.append('episode_title', title);
//     requestData.append('episode_director', director);
//     requestData.append('episode_production_director', productionDir);
//     requestData.append('episode_musics_creator', musicsCreator);
//     requestData.append('episode_creation_date', creationDate);
//     requestData.append('episode_budget', budget);
//     requestData.append('episode_duration', duration);
//     requestData.append('episode_trilogy_name', trilogyName);
//
//     const request = await fetch('http://localhost:8000/api/mysql/insert/episodes', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Accept': '*/*',
//             'Accept-Encoding': 'gzip, deflate, br',
//             'Connection': 'keep-alive'
//         },
//         body: requestData.toString()
//     });
//
//     if (request.ok) {
//         return request;
//     } else {
//         throw Error(request.status);
//     }
// }


// export async function apiAddEpisode({ title, director, productionDir, musicsCreator, creationDate, budget, duration, trilogyName }) {
//     const formData = new URLSearchParams();
//     formData.append('episode_title', title);
//     formData.append('episode_director', director);
//     formData.append('episode_production_director', productionDir);
//     formData.append('episode_musics_creator', musicsCreator);
//     formData.append('episode_creation_date', creationDate);
//     formData.append('episode_budget', budget);
//     formData.append('episode_duration', duration);
//     formData.append('episode_trilogy_name', trilogyName);
//
//     const request = await fetch('http://localhost:8000/api/mysql/insert/episodes', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: new URLSearchParams(formData).toString()
//     });
//
//     if (request.ok) {
//         return request;
//     } else {
//         throw Error(request.status);
//     }
// }




// export async function loadTrilogyOptions() {
//     let selectElement = document.getElementById('todoTrilogyId');
//     selectElement.innerHTML = '';
//
//     await fetch('http://localhost:8000/api/mysql/get/trilogies')
//         .then(response => {
//             if (response.ok) {
//                 if (response.bodyUsed) {
//                     throw new Error('loadTrilogyOptions: Body of the response has already been consumed.');
//                 }
//                 return response.json();
//             } else {
//                 throw new Error('loadTrilogyOptions: Failed to fetch data.');
//             }
//         })
//         .then(data => {
//             if (Array.isArray(data)) {
//                 data.forEach(function(option) {
//                     let optionElement = document.createElement('option');
//                     optionElement.value = option.trilogy_name;          //TODO: zamien na id
//                     optionElement.textContent = option.trilogy_name;
//                     selectElement.appendChild(optionElement);
//                 });
//             } else {
//                 throw new Error('loadTrilogyOptions: Data is not array -> cannot be read');
//             }
//         })
//         .catch(error => {
//             console.error(error);
//         });
// }

