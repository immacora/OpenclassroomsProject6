import { ocMoviesURL, bestMoviesURL, bestMoviesFantasyURL, bestMoviesDocumentaryURL, bestMoviesThrillerURL } from './url_consts.js';

// ---- REQUETES FETCH ----//

/**
 * Requête fetch asynchone retournant la liste des premiers Ids des films (1 à 10 maximum) les mieux notés d'une catégorie par classement descendant.
 * @param { String } url
 * @return { Promise } moviesIds
 */
async function getMoviesIds(categorieUrl, moviesIds=[]) {
    // Récupère la liste des films de la catégorie et sa pagination
    try {
        const response = await fetch(categorieUrl);
        if (response.ok) {
            const data = await response.json();
            const previous = data.previous;
            const next = data.next;
            const results = data.results;
            // Récupère l'id de chaque film de la catégorie et l'ajoute à la liste
            results.forEach(result => {
                let movieId = result.id;
                moviesIds.push(movieId);
            });
            // Rappelle la fonction (recursive) s'il existe une seconde page et retourne la liste
            if ((previous === null) & (next != null)) {
                getMoviesIds(next, moviesIds);
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
 * Requête fetch asynchone retournant les informations d'un film cherché par id.
 * @param { String } movieId
 * @return { Promise } movieInfos
 */
export async function getMovieInfos(movieId) {
    try {
        let response = await fetch(ocMoviesURL + movieId);
        let movieInfos = await response.json();
        console.log(222);
        return movieInfos;
    } catch (error) {
        alert("Film non trouvé" + error);
    }
}

// Listes des 10 premiers Ids des films les mieux notés de chaque catégorie : Toutes catégories confondues, Fantasy, Documentary et Thriller.

export const bestMoviesIds = getMoviesIds(bestMoviesURL);
export const bestMoviesFantasyIds = getMoviesIds(bestMoviesFantasyURL);
export const bestMoviesDocumentaryIds = getMoviesIds(bestMoviesDocumentaryURL);
export const bestMoviesThrillerIds = getMoviesIds(bestMoviesThrillerURL);