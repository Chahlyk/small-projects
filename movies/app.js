'use strict'

let url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c',
    main = document.getElementById('mainContent'),
    infoSize = document.getElementById('infoSize');

(async function() {
    let response = await fetch(url),
        commits = await response.json();

    for (let film of commits.results) {
        let poster = document.createElement('div'),
            info = document.createElement('div'),
            innerInfo = document.createElement('div'),
            innerInfoText = document.createElement('div'),
            infoPoster = document.createElement('div'),
            backToList = document.createElement('div'),
            infoBlur = document.createElement('div');
        infoBlur.className = 'infoBlur';
        info.className = 'info';
        poster.className = 'poster';
        innerInfo.className = 'innerInfo';
        infoPoster.className = 'infoPoster';
        backToList.className = 'backToList';
        innerInfoText.className = 'innerInfoText';
        backToList.insertAdjacentHTML('afterbegin', '<p class="buttonBack">⇦   Back to list</p>');
        innerInfoText.insertAdjacentHTML('afterbegin', `<p class="overview">${film.overview}</p>`);
        innerInfoText.insertAdjacentHTML('afterbegin', `<ul class="ul">
        <li class="vote">Score: ${film.vote_average}</li>
        <li class="rating">Rating: ${film.popylarity}</li>
        <li class="releaseDate">Release Date: ${film.release_date}</li>
        </ul>`);
        innerInfoText.insertAdjacentHTML('afterbegin', `<p class="innerTitle">${film.title}</p>`);
        infoPoster.style.backgroundImage = `url(http://image.tmdb.org/t/p/w342${film.poster_path})`;
        info.style.backgroundImage = `url(http://image.tmdb.org/t/p/w342${film.backdrop_path})`;
        poster.style.backgroundImage = `url(http://image.tmdb.org/t/p/w342${film.poster_path})`;
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
                left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2,
                top = coords.top + (poster.offsetHeight / 2);

            tooltipElem.style.left = left + 'px';
            tooltipElem.style.top = top + 'px';
        });

        document.addEventListener('mouseout', event => {
            hide(tooltipElem);
        });

        poster.addEventListener('click', event => {
            info.style.display = 'block';
            infoBlur.style.display = 'block';
        });

        backToList.addEventListener('click', event => {
            info.style.display = 'none';
            infoBlur.style.display = 'none';
        })

        innerInfo.append(infoPoster);
        innerInfo.append(innerInfoText);
        infoBlur.append(backToList);
        infoBlur.append(innerInfo);
        main.append(info);
        main.append(infoBlur);
        main.append(poster);
    }

})();

function hide(elem) {
    if (elem) {
        elem.remove();
        elem = null;
    }
}
