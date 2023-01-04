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