import { hero } from './hero.js';
import { categories } from './category.js';


/**
 * Ouvre/ferme la modale du hero
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


// Initialise la liste de toutes les moviesCard créés dans le DOM via la fonction createCategory
const moviesCard = document.getElementsByClassName('movie_card');

/**
 * Ouvre/ferme les modales des films des catégories.
 * Boucle sur les éléments de la HTMLCollection.
 * Ajoute l'écouteur d'événement à chaque movieCard.
 * Ouvre au click la modale qui suit la movieCard cible de l'événement.
 * Ferme la modale au click sur la croix de la movieCard cible.
 */
for (let i = 0; i < moviesCard.length; i++) {
    moviesCard[i].addEventListener('click', function(event) {
        const movieModal = this.nextSibling;
        movieModal.hidden = false;
        event.stopPropagation();
        const movieModalClose = this.nextSibling.firstChild.nextElementSibling.lastElementChild;
        movieModalClose.addEventListener('click', function(event) {
            movieModal.hidden = true;
        })
    })
}

/**
 * Crée les carousels liés aux catégories.
 */
for (const category of categories) {

    const carouselArrowNavLeft = document.querySelector(category.domElement + '.carousel__wrapper__arrow_nav_left');
    const carouselArrowNavRight = document.querySelector(category.domElement + '.carousel__wrapper__arrow_nav_right');


    console.log(category);
    console.log(carouselArrowNavLeft);
    console.log(carouselArrowNavRight);


}
