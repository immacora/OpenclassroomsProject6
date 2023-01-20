import { bestMoviesIds, bestMoviesFantasyIds, bestMoviesDocumentaryIds, bestMoviesThrillerIds, getMovieInfos } from './requests.js';

import { createHero } from './hero.js';

import { bestsMoviesCategoryName, fantasyCategoryName, documentaryCategoryName, thrillerCategoryName, bestsMoviesCategoryTitle, fantasyCategoryTitle, documentaryCategoryTitle, thrillerCategoryTitle, bestMoviesCategoryDomElement, categorie1DomElement, categorie2DomElement, categorie3DomElement } from './consts.js';

import { createMovieCard } from './movie_card_and_modal.js';


/**
 * Création du carrousel pour la catégorie reçue en paramètre
 * @param { Object } moviesIds
 * @param { String } categoryName
 * @param { String } categoryDomElement
 * @param { String } categoryTitle
 */
async function createCarousel(moviesIds, categoryName, categoryDomElement, categoryTitle) {

    // Supprime le 1er id de la catégorie bestsMovies
    if (categoryName === 'bestsMovies') {
        moviesIds.shift();
    }

    // Récupère l'élément du DOM "ul" de la catégorie qui accueillera les films
    const carouselItems = document.querySelector(categoryDomElement + " .carousel-items");

    // Crée le titre de la catégorie
    document.querySelector(categoryDomElement + " h2").innerHTML = categoryTitle

    try {
        // Boucle sur la liste des ids pour récupérer des données des 7 premiers films, créer l'élément cible du DOM, puis les movieCard
        for (let i = 0; i < 7; i++) {

            const movieNumber = i + 1;
            const movieId = moviesIds[i];
            const movieInfos = await getMovieInfos(movieId);
            const movieTitle = movieInfos.title;

            // Création de l'élément "li" du DOM recevant les données
            const movieElementLi = document.createElement("li");
            movieElementLi.setAttribute('class', 'carousel-item');
            const categoryMovieDomId = movieNumber + '_' + categoryName;
            movieElementLi.setAttribute('id', categoryMovieDomId);

            // Rattachement de la balise "li" à la balise "ul" parente
            carouselItems.appendChild(movieElementLi);

            //Récupération des id de liste des films (carousel-item)
            //categoryMovieDomIds.push(categoryMovieDomId);

            createMovieCard(movieInfos, categoryMovieDomId, movieTitle);
        }
    } catch (error) {
        alert("Erreur d'affichage du carousel" + error);
    }
}


// ---- MAIN ----//

createHero(bestMoviesIds);

createCarousel(bestMoviesIds, bestsMoviesCategoryName, bestMoviesCategoryDomElement, bestsMoviesCategoryTitle);
createCarousel(bestMoviesFantasyIds, fantasyCategoryName, categorie1DomElement, fantasyCategoryTitle);
createCarousel(bestMoviesDocumentaryIds, documentaryCategoryName, categorie2DomElement, documentaryCategoryTitle);
createCarousel(bestMoviesThrillerIds, thrillerCategoryName, categorie3DomElement, thrillerCategoryTitle);

// Initialise la liste des ids des films dans le DOM créée dans la function createCarousel
const moviesCard = document.getElementsByClassName('movie_card');
console.log(moviesCard);
console.log(moviesCard.length);