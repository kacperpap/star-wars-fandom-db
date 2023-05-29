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

export async function apiAddEpisode({ title, director, productionDir, musicsCreator, creationDate, budget, duration, trilogyName }) {
    const formData = new URLSearchParams();
    formData.append('episode_title', title);
    formData.append('episode_director', director);
    formData.append('episode_production_director', productionDir);
    formData.append('episode_musics_creator', musicsCreator);
    formData.append('episode_creation_date', creationDate);
    formData.append('episode_budget', budget);
    formData.append('episode_duration', duration);
    formData.append('episode_trilogy_name', trilogyName);

    const request = await fetch('http://localhost:8000/api/mysql/insert/episodes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            // 'Content-Type': 'application/json'
        },
        body: new URLSearchParams(formData).toString()
    });

    if (request.ok) {
        return request;
    } else {
        throw Error(request.status);
    }
}

export async function apiDeleteEpisode(id) {
    try {
        const request = await fetch(`http://localhost:8000/api/mysql/delete/episode/${id}`, {
            method: 'DELETE'
        });

        if (request.ok) {
            return request;
        } else {
            throw new Error(request.status);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}





export async function loadTrilogyOptions() {
    let selectElement = document.getElementById('todoTrilogyId');
    selectElement.innerHTML = '';

    await fetch('http://localhost:8000/api/mysql/get/trilogies')
        .then(response => {
            if (response.ok) {
                if (response.bodyUsed) {
                    throw new Error('loadTrilogyOptions: Body of the response has already been consumed.');
                }
                return response.json();
            } else {
                throw new Error('loadTrilogyOptions: Failed to fetch data.');
            }
        })
        .then(data => {
            if (Array.isArray(data)) {
                data.forEach(function(option) {
                    let optionElement = document.createElement('option');
                    optionElement.value = option.trilogy_name;
                    optionElement.textContent = option.trilogy_name;
                    selectElement.appendChild(optionElement);
                });
            } else {
                throw new Error('loadTrilogyOptions: Data is not array -> cannot be read');
            }
        })
        .catch(error => {
            console.error(error);
        });
}

