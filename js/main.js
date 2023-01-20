import { createHero } from './hero.js';
import { bestsMoviesCategoryCarousel, fantasyCategoryCarousel, documentaryCategoryCarousel, thrillerCategoryCarousel } from './carousel.js';


// ---- MAIN ----//


// Initialise la liste des moviesCard créés dans le DOM via la fonction createCarousel
const moviesCard = document.getElementsByClassName('movie_card');

/**
 * Boucle sur les éléments de la HTMLCollection.
 * Ajoute l'écouteur d'événement à chaque movieCard.
 * Au click, rend visible la modale qui suit la movieCard cible de l'événement.
 * Ferme la modale au click sur la croix de la movieCard cible.
 */
for (let i = 0; i < moviesCard.length; i++) {
    moviesCard[i].addEventListener('click', function(event) {
        let movieModal = this.nextSibling;
        movieModal.hidden = false;
        event.stopPropagation();
        let movieModalClose = this.nextSibling.firstChild.nextElementSibling.lastElementChild;
        movieModalClose.addEventListener('click', function(event) {
            movieModal.hidden = true;
        })
    })
}