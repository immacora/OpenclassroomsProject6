import { getMovieInfos } from './requests.js';
import { createMovieCard } from './movie_card_and_modal.js';

/**
 * Création de l'affichage du Hero
 * @param { Number } bestMovieId
 */
export async function createHero(bestMovieId) {
    try {
        // Récupération des données du film
        const movieId = bestMovieId;
        const movieInfos = await getMovieInfos(movieId);
        const movieTitle = movieInfos.title;
        const movieLongDescription = movieInfos.long_description;

        // Rattachement des éléments à l'élément parent du DOM
        document.querySelector('.movie_summary__title').innerHTML = movieTitle;
        document.querySelector('.movie_summary__long_description').innerHTML = movieLongDescription;

        // Déclaration de l'id cible du DOM pour insertion de la movieCard
        const heroMovieDomId = 'hero';

        // Création de la movieCard
        createMovieCard(movieInfos, heroMovieDomId, movieTitle);

    } catch (error) {
        alert("Erreur d'affichage du meilleur film toutes catégories confondue" + error);
    }
}