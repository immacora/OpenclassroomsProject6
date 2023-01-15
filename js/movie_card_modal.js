/**
 * Création de la movieModal du film reçu en paramètre depuis la movieCard
 * @param { Object } movieInfos
 * @param { Object } movieImgURL
 * @param { String } movieTitle
 * @param { String } movieDomId
 */
function createMovieModal(movieInfos, movieImgURL, movieTitle, movieDomId) {
    try {
        // Récupération des données du film
        const movieLongDescription = movieInfos.long_description;
        const movieDatePublished =  new Date(movieInfos.date_published);
        const movieDuration =  movieInfos.duration;
        const movieActors = movieInfos.actors;
        const movieDirectors = movieInfos.directors;
        const movieCountries = movieInfos.countries;
        const movieGenres = movieInfos.genres;
        const movieAvgVote = movieInfos.avg_vote;
        const movieImdbScore = movieInfos.imdb_score;
        const movieRated = movieInfos.rated;

        // Formatage des données
        const movieImgURLString = movieImgURL.outerHTML;
        const movieDatePublishedString = movieDatePublished.toLocaleDateString();
        const movieDurationString =  movieDuration + ' minutes';
        const movieActorsString = movieActors.join(', ');
        const movieDirectorsString = movieDirectors.join(', ');
        const movieCountriesString = movieCountries.join(', ');
        const movieGenresString = movieGenres.join(', ');

        // Création du template de la modale
        const movieModalCard = 
        `<div class="movie_modal__card">
            <div class="movie_modal__card__header">
                <h2 class="header__card__title">${movieTitle}</h2>
                <div class="header__card__close"><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div class="movie_modal__card__summary">
                <div class="card__summary__img">${movieImgURLString}</div>
                <p class="card__summary__long_description">${movieLongDescription}</p>
            </div>
            <div class="movie_modal__card__infos">
                <div>
                    <p class="card__infos__title">Acteurs: </p>
                    <p class="card__infos__contents">${movieActorsString}</p>
                </div>
                <div>
                    <p class="card__infos__title">Réalisateurs: </p>
                    <p class="card__infos__contents">${movieDirectorsString}</p>
                </div>
                <div>
                    <p class="card__infos__title">Pays: </p>
                    <p class="card__infos__contents">${movieCountriesString}</p>
                </div>
                <div>
                    <p class="card__infos__title">Genres: </p>
                    <p class="card__infos__contents">${movieGenresString}</p>
                </div>
                <div>
                    <p class="card__infos__title">Résultat au Box Office: </p>
                    <p class="card__infos__contents">${movieAvgVote}</p>
                </div>
                <div>
                    <p class="card__infos__title">Score Imdb: </p>
                    <p class="card__infos__contents">${movieImdbScore}</p>
                </div>
                <div>
                    <p class="card__infos__title">Classement: </p>
                    <p class="card__infos__contents">${movieRated}</p>
                </div>
            </div>
            <div class="movie_modal__card__time_infos">
                <p>Sortie: ${movieDatePublishedString}</p>
                <p>Durée: ${movieDurationString}</p>
            </div>
        </div>`;

        // Rattachement de la modale à la fin de l'élément parent du DOM
        document.getElementById(movieDomId).insertAdjacentHTML('beforeend', movieModalCard);
    } catch (error) {
        alert("Erreur d'affichage des informations du film" + error);
    }
}

/**
 * Création de la movieCard du film reçu en paramètre
 * @param { Object } movieInfos
 * @param { String } movieDomId
 * @param { String } movieTitle
 */
export function createMovieCard(movieInfos, movieDomId, movieTitle) {
    try {
    // Création des éléments du dom recevant les données
    const movieCard = document.createElement('div');
    movieCard.className = 'movie_card';
    const movieImg = document.createElement('div');
    movieImg.className = 'movie_img';
    const movieImgURL = document.createElement('img');
    movieImgURL.src = movieInfos.image_url;
    movieImgURL.alt = 'image du film ' + movieTitle;
    const movieModal = document.createElement('div');
    movieModal.className = 'movie_modal';

    // Rattachement des éléments créés à l'élément parent du DOM
    const movieCardDomElement = document.getElementById(movieDomId);
    movieCardDomElement.appendChild(movieCard);
    movieCard.appendChild(movieImg);
    movieImg.appendChild(movieImgURL);
    movieCard.appendChild(movieModal);

    createMovieModal(movieInfos, movieImgURL, movieTitle, movieDomId);

    } catch (error) {
        alert("Erreur de création de la carte du film" + error);
    }
}