require("../scss/style.scss");
import {apiGetTasks, loadTrilogyOptions, apiAddEpisode} from "./api_get";
import {renderTaskList} from "./render";

apiGetTasks().then(res => {
    renderTaskList(res)
});

loadTrilogyOptions()
    .catch(error=> {
        console.log("loadTrilogyOptions: ", error)
    })

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
        await apiAddEpisode({ title, director, productionDir, musicsCreator, creationDate, budget, duration, trilogyName })
            .catch(error => {
                console.log("apiAddEpisode error: ", error)
            })
            .then(()=> {
                form.reset();
                alert("Pomyślnie dodano nowy rekord")
            })
    } else {
        alert("Błąd podczas dodawania nowego rekordu")
    }
});

// let list
// document.addEventListener('DOMContentLoaded', () => {
//     list = document.querySelector('.task-list')
//
// })
//
// list.forEach(article => {
//     console.log("sdfs")
// })


// const tasks_list = document.querySelector('.task-list-cnt');
// const articles = document.querySelectorAll('.task')
// console.log(articles)
// console.log(tasks_list.childNodes[7].childNodes)
// tasks_list.childNodes[7].childNodes.forEach(node => {
//     console.log(node)
// })
// articles.forEach(article => {
//     console.log("taa")
//     const deleteButton = article.querySelector('.task-delete');
//     deleteButton.addEventListener('click', () => {
//         handleDeleteArticle(article);
//     });
// });

function handleDeleteArticle(article) {
}
