const ul = document.querySelector(".task-list");


export function getEpisodeHTML(dataElement) {
    const { title, director, production_dir, musics_creator, creation_date, budget, duration, trilogy_name } = dataElement;
    return `
        <div class="task-inside">
            <div class="task-header">
                <div class="row">
                    <div class="task-title">${title}</div>
                </div>
                <div class="task-actions">
<!--                    <button class="task-edit" title="Edytuj zadanie">-->
<!--                        Edytuj-->
<!--                    </button>-->
                    <button class="task-delete" title="Usuń zadanie">
                        Usuń
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="task-body">
                    <p><strong>Reżyser:</strong> ${director}</p>
                    <p><strong>Dyrektor produkcji:</strong> ${production_dir}</p>
                    <p><strong>Twórca muzyki:</strong> ${musics_creator}</p>
                    <p><strong>Data tworzenia:</strong> ${creation_date}</p>
                    <p><strong>Budżet:</strong> ${budget}</p>
                    <p><strong>Czas trwania:</strong> ${duration}</p>
                    <p><strong>Nazwa trylogii:</strong> ${trilogy_name}</p>
                </div>
            </div>
        </div>
    `;
}


export function renderSingleTask(dataElement) {
    const element = document.createElement("article");
    element.classList.add("task");
    element.dataset.id = dataElement.id;

    //element.innerHTML = getTaskHTML(dataElement);
    element.innerHTML = getEpisodeHTML(dataElement)
    ul.append(element);
}

export function renderTaskList(tasks) {
    ul.innerHTML = "";
    tasks.forEach(dataElement => {
        renderSingleTask(dataElement);
    })
}

