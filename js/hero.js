import { bestMovieId, getMovieInfos } from './requests.js';
import { createMovieCard } from './movie_card_and_modal.js';

/**
 * Création de l'affichage du Hero
 * @param { Number } bestMovieId
 */
async function createHero(bestMovieId) {
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


/**
 * Gestion des événements liés à la modale du hero
 * Ouvre la modale au click sur le bouton "More info" (Rend visible la modale qui suit le bouton cible de l'événement).
 * Ferme la modale au click sur la croix.
 */
const heroModalOpen = document.querySelector('#hero_modal_open');
heroModalOpen.addEventListener('click', function(event) {
    const movieModal = document.querySelector('.movie_modal');
    movieModal.hidden = false;
    event.stopPropagation();
    const movieModalClose = document.querySelector('.movie_modal__close');
    movieModalClose.addEventListener('click', function(event) {
        movieModal.hidden = true;
    })
})


//Crée le hero (movieCard et modale)
export const hero = createHero(bestMovieId);