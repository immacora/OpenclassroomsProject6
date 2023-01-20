import { bestMoviesIds, bestMoviesFantasyIds, bestMoviesDocumentaryIds, bestMoviesThrillerIds, getMovieInfos } from './requests.js';

import { createHero } from './hero.js';

import { bestsMoviesCategoryName, fantasyCategoryName, documentaryCategoryName, thrillerCategoryName, bestsMoviesCategoryTitle, fantasyCategoryTitle, documentaryCategoryTitle, thrillerCategoryTitle, bestMoviesCategoryDomElement, categorie1DomElement, categorie2DomElement, categorie3DomElement } from './consts.js';

import { createMovieCard } from './movie_card_and_modal.js';

/**
 * Suppression des 1 à 3 derniers id de catégorie si le nombre d'ids est supérieur à 7.
 * @param { Object } moviesIds
 * @param { String } categoryName
 */
function removeOverageIds(moviesIds) {

    switch (moviesIds.length) {
        case 10:
            moviesIds.splice(-3, 3);
            break;
        case 9:
            moviesIds.splice(-2, 2);
            break;
        case 8:
            moviesIds.pop();
            break;
    }
    return moviesIds;
}

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

    // Supprime les ids de catégorie en trop
    removeOverageIds(moviesIds);

    // Récupère l'élément du DOM "ul" de la catégorie qui accueillera les films
    const carouselItems = document.querySelector(categoryDomElement + " .carousel-items");

    // Crée le titre de la catégorie
    document.querySelector(categoryDomElement + " h2").innerHTML = categoryTitle

    try {
        // Boucle sur la liste des ids pour récupérer des données des films, créer l'élément cible du DOM, puis les movieCard
        for (let i = 0; i < (moviesIds.length); i++) {

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
/*let categoryMovieDomIds = [];
console.log(11111111111111);
console.log(categoryMovieDomIds);

console.log(2222222222);

console.log(categoryMovieDomIds.length);

console.log(3333333333333);



const moviesCard = document.getElementsByClassName('movie_card');
console.log(moviesCard);
console.log(moviesCard.length);



async function getmoviesCard() {
    const moviesCard = document.getElementsByClassName('movie_card');
    return moviesCard
}





const TESTASYNCmoviesCard = await getmoviesCard();
console.log(TESTASYNCmoviesCard, 6666666666666666);
console.log(TESTASYNCmoviesCard.length);*/








