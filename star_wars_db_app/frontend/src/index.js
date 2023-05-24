document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        main.classList.toggle('open');
    });

    const links = document.querySelectorAll('#sidebar a');
    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const filename = link.getAttribute('href');
            navigateTo(filename);
            sidebar.classList.remove('open');
            main.classList.remove('open');
        });
    });

    function navigateTo(filename) {
        let url = `${window.location.origin}${filename}.html`;

        fetch(url)
            .then(response => response.text())
            .then(html => {
                main.innerHTML = html;
                executeScripts(main);
                history.pushState({}, '', url);
            })
            .catch(error => {
                console.error(`Błąd podczas wczytywania ${filename}.html:`, error);
            });
    }

    function executeScripts(element) {
        const scripts = element.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            if (script.src) {
                newScript.src = script.src;
            }
            element.appendChild(newScript);
        });
    }

    window.addEventListener('popstate', () => {
        const url = window.location.pathname;
        navigateTo(url);
    });
});

// const episodesLink = document.querySelector('a[href="/episodes"]');
//
// episodesLink.addEventListener('click', (event) => {
//     event.preventDefault();
//
//     const sidebar = document.getElementById('sidebar');
//     const main = document.getElementById('main');
//
//     fetch('/episodes.html')
//         .then(response => response.text())
//         .then(html => {
//             main.innerHTML = html;
//             executeScripts(main);
//             sidebar.classList.remove('open');
//             main.classList.remove('open');
//         })
//         .catch(error => {
//             console.error('Błąd podczas wczytywania episodes.html:', error);
//         });
// });



