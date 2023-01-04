/* CONSTANTES */

const bestMoviesIds = getCategoryMoviesIds(ocMoviesURL + bestMoviesFilter);
const bestMoviesFantasyIds = getCategoryMoviesIds(ocMoviesURL + bestMoviesFilter + categoryFantasy);
const bestMoviesDocumentaryIds = getCategoryMoviesIds(ocMoviesURL + bestMoviesFilter + categoryDocumentary);
const bestMoviesThrillerIds = getCategoryMoviesIds(ocMoviesURL + bestMoviesFilter + categoryThriller);

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
 * Crée l'élément du DOM movieModale et y ajoute les informations du film reçu en paramètre
 * @param { Promise } movieInfos
 */
async function createMovieModale(movieInfos) {
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

        let movieModaleCard = 
            `<div class="movie_modale__card">

                <h2 class="movie_modale__card__title">${movieTitle}</h2>
                <div class="movie_modale__card__summary">
                    <div class="card__summary__img"><img alt="image du film" src="${movieImageURL}"></div>
                    <p class="card__summary__long_description">${movieLong_description}</p>
                </div>

                <div class="movie_modale__card__infos">

                    <div class="card__infos__date">
                        <p class="card__infos__title">Sortie : </p>
                        <p class="card__infos__date__contents">${movieDatePublished}</p>
                    </div>
                    <div class="card__infos__duration">
                        <p class="card__infos__title">Durée : </p>
                        <p class="card__infos__duration__contents">${movieDuration}</p>
                    </div>
                    <div class="card__infos__actors">
                        <p class="card__infos__title">Acteurs : </p>
                        <p class="card__infos__actors__contents"><ul>${movieActors}</ul></p>
                    </div>
                    <div class="card__infos__directors">
                        <p class="card__infos__title">Réalisateur : </p>
                        <p class="card__infos__directors__contents">${movieDirectors}</p>
                    </div>
                    <div class="card__infos__countries">
                        <p class="card__infos__title">Pays : </p>
                        <p class="card__infos__countries__contents">${movieCountries}</p>
                    </div>
                    <div class="card__infos__genres">
                        <p class="card__infos__title">Genres : </p>
                        <p class="card__infos__genres__contents"><ul>${movieGenres}</ul></p>
                    </div>
                    <div class="card__infos__avg_vote">
                        <p class="card__infos__title">Résultat au Box Office : </p>
                        <p class="card__infos__avg_vote__contents">${movieAvgVote}</p>
                    </div>
                    <div class="card__infos__imdb_score">
                        <p class="card__infos__title">Score Imdb : </p>
                        <p class="card__infos__imdb_score__contents">${movieImdbScore}</p>
                    </div>
                    <div class="card__infos__rated">
                        <p class="card__infos__title">Classement : </p>
                        <p class="card__infos__rated_info__contents">${movieRated}</p>
                    </div>

                </div>

            </div>`;

        document.querySelector('.movie_modale').innerHTML = movieModaleCard;     

    } catch (error) {
        alert("Erreur d'affichage des informations du film" + error);
    }
}


let movieInfos = getMovieInfos(1508669);

createMovieImg(movieInfos);
createMovieModale(movieInfos);