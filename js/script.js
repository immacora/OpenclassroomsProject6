/* CONSTANTES */ 

// CATEGORIES : Listes des 10 premiers Ids des films les mieux notés (par catégorie : Toutes catégories confondues, Fantasy, Documentary et Thriller)
const bestMoviesIds = getCategoryMoviesIds(ocMoviesURL + bestMoviesFilter);
const bestMoviesFantasyIds = getCategoryMoviesIds(ocMoviesURL + bestMoviesFilter + categoryFantasy);
const bestMoviesDocumentaryIds = getCategoryMoviesIds(ocMoviesURL + bestMoviesFilter + categoryDocumentary);
const bestMoviesThrillerIds = getCategoryMoviesIds(ocMoviesURL + bestMoviesFilter + categoryThriller);

// DOM
const MovieImg = document.querySelector('.movie_img');

/* ECOUTEUR D'EVENEMENTS */

// Rend visible la modale qui suit l'image cible de l'événement
MovieImg.addEventListener('click', function(event) {
    let MovieModal = this.nextSibling.nextElementSibling;
    MovieModal.hidden = false;
    event.stopPropagation();
    const headerCardClose = document.querySelector('.header__card__close');
    headerCardClose.addEventListener('click', closeModal);
})

/* FONCTIONS */


/**
 * Requête fetch asynchone retournant la liste des premiers Ids des films (1 à 10 maximum) les mieux notés d'une catégorie par classement descendant.
 * @param { String } url
 * @return { Promise } moviesIds
 */
async function getCategoryMoviesIds(url, moviesIds=[]) {
    // Récupère la liste des films de la catégorie et sa pagination
    try {
        let response = await fetch(url);
        if (response.ok) {
            let data = await response.json();
            let previous = data.previous;
            let next = data.next;
            let results = data.results;
            // Récupère l'id de chaque film de la catégorie et l'ajoute à la liste
            results.forEach(result => {
                let movieId = result.id;
                moviesIds.push(movieId);
            });
            // Rappelle la fonction s'il existe une seconde page et retourne la liste
            if ((previous === null) & (next != null)) {
                getCategoryMoviesIds(next, moviesIds);
                return moviesIds;
            } else {
                return moviesIds;
            }
        } else {
            alert("Erreur de récupération des données de la catégorie" + error);
        }
    } catch (error) {
        alert("Erreur de connexion à l'API OCMovies" + error);
    }
}


/**
 * Requête fetch asynchone retournant les informations du film cherché par id.
 * @param { String } movieId
 * @return { Promise } movieInfos
 */
async function getMovieInfos(movieId) {
    try {
        let response = await fetch(ocMoviesURL + movieId);
        let movieInfos = await response.json();
        return movieInfos;
    } catch (error) {
        alert("Film non trouvé" + error);
    }
}


/**
 * Crée l'élément du DOM movieImg et y ajoute l'image du film reçu en paramètre
 * @param { Promise } movieInfos
 */
async function createMovieImg(movieInfos) {
    try {
        let movieInfosData = await movieInfos;
        let movieImageURL = await movieInfosData.image_url;
        let img = document.createElement('img');
        document.querySelector('.movie_img').appendChild(img);
        img.src = movieImageURL;
        img.alt = "image du film";
    } catch (error) {
        alert("Erreur d'affichage de l'image du film" + error);
    }
}


/**
 * Crée l'élément du DOM movieModal et y ajoute les informations du film reçu en paramètre
 * @param { Promise } movieInfos
 */
async function createMovieModal(movieInfos) {
    try {
        let movieInfosData = await movieInfos;

        let movieTitle = await movieInfosData.title;
        let movieImageURL = await movieInfosData.image_url;
        let movieLong_description = await movieInfosData.long_description;
        let movieDatePublished = await movieInfosData.date_published;
        let movieDuration = await movieInfosData.duration;
        let movieActors = await movieInfosData.actors;
        let movieDirectors = await movieInfosData.directors;
        let movieCountries = await movieInfosData.countries;
        let movieGenres = await movieInfosData.genres;
        let movieAvgVote = await movieInfosData.avg_vote;
        let movieImdbScore = await movieInfosData.imdb_score;
        let movieRated = await movieInfosData.rated;

        let movieModalCard = 
            `<div class="movie_modal__card">
                <div class="movie_modal__card__header">
                    <h2 class="header__card__title">${movieTitle}</h2>
                    <div class="header__card__close">
                        <img src="public/img/close_white.png" alt="modal close">
                    </div>
                </div>
                <div class="movie_modal__card__summary">
                    <div class="card__summary__img"><img alt="image du film" src="${movieImageURL}"></div>
                    <p class="card__summary__long_description">${movieLong_description}</p>
                </div>
                <div class="movie_modal__card__infos">
                    <div class="card__infos__actors">
                        <p class="card__infos__title">Acteurs: </p>
                        <p class="card__infos__contents">${movieActors}</p>
                    </div>
                    <div class="card__infos__directors">
                        <p class="card__infos__title">Réalisateur: </p>
                        <p class="card__infos__contents">${movieDirectors}</p>
                    </div>
                    <div class="card__infos__countries">
                        <p class="card__infos__title">Pays: </p>
                        <p class="card__infos__contents">${movieCountries}</p>
                    </div>
                    <div class="card__infos__genres">
                        <p class="card__infos__title">Genres: </p>
                        <p class="card__infos__contents">${movieGenres}</p>
                    </div>
                    <div class="card__infos__avg_vote">
                        <p class="card__infos__title">Résultat au Box Office: </p>
                        <p class="card__infos__contents">${movieAvgVote}</p>
                    </div>
                    <div class="card__infos__imdb_score">
                        <p class="card__infos__title">Score Imdb: </p>
                        <p class="card__infos__contents">${movieImdbScore}</p>
                    </div>
                    <div class="card__infos__rated">
                        <p class="card__infos__title">Classement: </p>
                        <p class="card__infos__contents">${movieRated}</p>
                    </div>
                </div>
                <div class="movie_modal__card__time_infos">
                    <p class="card__time_infos__date">Sortie: ${movieDatePublished}</p>
                    <p class="card__time_infos__duration">Durée: ${movieDuration} minutes</p>
                </div>
            </div>`;

        document.querySelector('.movie_modal').innerHTML = movieModalCard;     

    } catch (error) {
        alert("Erreur d'affichage des informations du film" + error);
    }
}

/* Ferme la modale. */
function closeModal() {
    document.querySelector('.movie_modal').hidden = true;
}

/**
 * Crée la section Hero
 * @param { Promise } bestMoviesIds
 */
async function createHero(bestMoviesIds) {
    try {
        let bestMoviesIdsData = await bestMoviesIds;
        let bestMovie = await bestMoviesIdsData[0];
        let movieInfos = getMovieInfos(bestMovie);
        let movieInfosData = await movieInfos;
        let movieTitle = movieInfosData.title;
        let movieLong_description = movieInfosData.long_description;

        createMovieImg(movieInfos);
        createMovieModal(movieInfos);

        let movieSummaryTitle = document.createElement('h2');
        movieSummaryTitle.className = 'movie_summary__title';
        movieSummaryTitle.innerText = movieTitle;
        document.querySelector('.movie_summary').appendChild(movieSummaryTitle);

        let movieSummaryLongDescription = document.createElement('p');
        movieSummaryLongDescription.className = 'movie_summary__long_description';
        movieSummaryLongDescription.innerText = movieLong_description;
        document.querySelector('.movie_summary').appendChild(movieSummaryLongDescription);

    } catch (error) {
        alert("Erreur d'affichage du meilleur film toutes catégories confondue" + error);
    }
}

/* MAIN */


createHero(bestMoviesIds);
