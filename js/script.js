import { bestMoviesIds, bestMoviesFantasyIds, bestMoviesDocumentaryIds, bestMoviesThrillerIds, getMovieInfos } from './requests.js';

import { bestsMoviesCategoryName, fantasyCategoryName, documentaryCategoryName, thrillerCategoryName } from './url_consts.js';


/**
 * Création de la movieModal du film reçu en paramètre depuis la movieCard
 * @param { Object } movieInfos
 * @param { Object } movieImgURL
 * @param { String } movieTitle
 */
function createMovieModal(movieInfos, movieImgURL, movieTitle) {
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

        // Création de l'élément du dom movieModalCard
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
                <p>Durée: ${movieDurationString} minutes</p>
            </div>
        </div>`;

        // Rattachement de la modale à l'élément parent du DOM
        document.querySelector('.movie_modal').innerHTML = movieModalCard;
    
    } catch (error) {
        alert("Erreur d'affichage des informations du film" + error);
    }
}