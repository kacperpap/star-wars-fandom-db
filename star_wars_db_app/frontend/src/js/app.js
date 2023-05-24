require("../scss/style.scss");
import {apiGetTasks, apiAddTask, loadTrilogyOptions, apiAddEpisode} from "./api_get";
import {renderTaskList, renderSingleTask } from "./render";

apiGetTasks().then(res => {
    renderTaskList(res)
});

// loadTrilogyOptions();
console.log("jestem w pliku app.js")

const form = document.querySelector("#todoForm");
form.addEventListener("submit", async e => {
    e.preventDefault();

    const title = form.querySelector("#todoTitle").value;
    const director = form.querySelector("#todoDirector").value;
    const productionDir = form.querySelector("#todoProductionDir").value;
    const musicsCreator = form.querySelector("#todoMusicsCreator").value;
    const creationDate = form.querySelector("#todoCreationDate").value;
    let budget = form.querySelector("#todoBudget").value;
    let duration = form.querySelector("#todoDuration").value;
    const trilogyName = form.querySelector("#todoTrilogyId").value;


    if (title && director && creationDate && trilogyName) {
        console.log("Tutajjjjj")
        await apiAddEpisode({ title, director, productionDir, musicsCreator, creationDate, budget, duration, trilogyName })
            .catch(error => {
                console.log("apiAddEpisode error: ", error)
            })
        form.reset();
        alert("Pomyślnie dodano nowy rekord")
    } else {
        alert("Błąd podczas dodawania nowego rekordu")
    }
});