'use strict'

let url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c',
    main = document.getElementById('mainContent');

(async function() {
    let response = await fetch(url),
        commits = await response.json();

    for (let film of commits.results) {
        let poster = document.createElement('div'),
            info = document.createElement('div');
        info.className = 'info';
        poster.className = 'poster';
        info.style.backgroundImage = `url()`;
        poster.style.backgroundImage = `url()`;
        poster.setAttribute('data-tooltip', `${film.title}`);
        let tooltipElem;
        document.addEventListener('mouseover', event => {
            let target = event.target,
                tooltipHtml = target.dataset.tooltip;

            if (!tooltipHtml) return;

            tooltipElem = document.createElement('div');
            tooltipElem.className = 'tooltip';
            tooltipElem.innerHTML = tooltipHtml;
            document.body.append(tooltipElem);

            let coords = target.getBoundingClientRect(),
                left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;

            if (left < 0) left = 0;

            let top = coords.top - tooltipElem.offsetHeight - 5;
            if (top < 0) {
                top = coords.top + target.offsetHeight + 5;
            }

            tooltipElem.style.left = left + 'px';
            tooltipElem.style.top = top + 'px';
        });

        document.addEventListener('mouseout', event => {
            hide(tooltipElem);
        });
        poster.addEventListener('click', event => {
            showInfo(info);
        })
        main.append(poster);
        console.log(film);
    }

})();

function hide(elem) {
    if (elem) {
        elem.remove();
        elem = null;
    }
}

function showInfo(elem) {
    elem.style.display = 'block';
}





