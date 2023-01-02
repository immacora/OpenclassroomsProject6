/* FONCTIONS */


/**
 * L'événement onclick sur la classe header__burger du DOM déclenche la fonction openMobileMenu.
 * Ajoute la classe "open" au memu (classe header__nav).
 */
function openMobileMenu() {
    document.querySelector('.header__nav').classList.add('open');
}


/**
 * L'événement onclick sur la classe header__burger__close du DOM déclenche la fonction closeMobileMenu.
 * Enlève la classe "open" du memu (classe header__nav).
 */
function closeMobileMenu() {
    document.querySelector('.header__nav').classList.remove('open');
}


/**
 * Requête fetch asynchone récupérant la liste des premiers Ids des films (1 à 10 maximum) les mieux notés d'une catégorie par classement descendant.
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
            // Récupère l'id de chaque film de la catégorie et les ajoute à la liste
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
            alert("Catégorie non trouvée" + error);
        }
    } catch (error) {
        alert("Erreur de connexion à l'API OCMovies" + error);
    }
}


/**
 * Requête fetch asynchone récupérant et affichant les informations du film cherché par id.
 * @param { String } movieId
 */
async function getMovieInfos(movieId) {
    try {
        let response = await fetch(ocMoviesURL + movieId);
        let movieInfos = await response.json();

        let movieImageURL = await movieInfos.image_url;
        let img = document.createElement('img');
        document.querySelector('figure > .img').append(img);
        img.src = movieImageURL;

        let movieTitle = await movieInfos.title;
        document.querySelector('figcaption > h2').innerHTML = movieTitle;

        let imgModal = document.createElement('img');
        document.querySelector('.img_modal').append(imgModal);
        imgModal.src = movieImageURL;

        let movieLong_description = await movieInfos.long_description;
        document.querySelector('.long_description').innerHTML = movieLong_description;

        let movieDatePublished = await movieInfos.date_published;
        document.querySelector('.date_info').innerHTML = movieDatePublished;

        let movieDuration = await movieInfos.duration;
        document.querySelector('.duration_info').innerHTML = movieDuration + ' Min';

        let movieActors = await movieInfos.actors;
        let movieActorsList = document.querySelector('.actors > ul');
        movieActors.forEach(movieActor => {
            let li = document.createElement('li');
            li.innerHTML = movieActor;
            movieActorsList.appendChild(li);
        });

        let movieDirectors = await movieInfos.directors;
        document.querySelector('.directors_info').innerHTML = movieDirectors;

        let movieCountries = await movieInfos.countries;
        document.querySelector('.countries_info').innerHTML = movieCountries;

        let movieGenres = await movieInfos.genres;
        let movieGenresList = document.querySelector('.genres > ul');
        movieGenres.forEach(movieGenre => {
            let li = document.createElement('li');
            li.innerHTML = movieGenre;
            movieGenresList.appendChild(li);
        });

        let movieAvgVote = await movieInfos.avg_vote;
        document.querySelector('.avg_vote_info').innerHTML = movieAvgVote;

        let movieImdbScore = await movieInfos.imdb_score;
        document.querySelector('.imdb_score_info').innerHTML = movieImdbScore;

        let movieRated = await movieInfos.rated;
        document.querySelector('.rated_info').innerHTML = movieRated;
    } catch (error) {
        alert("Film non trouvé" + error);
    }
}


/* MAIN */

let bestMoviesIds = getCategoryMoviesIds(ocMoviesURL + bestMoviesFilter);
console.log('bestMoviesIds', bestMoviesIds);

let bestMoviesDocumentaryIds = getCategoryMoviesIds(ocMoviesURL + bestMoviesFilter + categoryDocumentary);
console.log('bestMoviesDocumentary', bestMoviesDocumentaryIds);

let movieInfos = getMovieInfos(1508669);
