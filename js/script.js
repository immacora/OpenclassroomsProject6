import { bestMoviesIds, bestMoviesFantasyIds, bestMoviesDocumentaryIds, bestMoviesThrillerIds, getMovieInfos } from './requests.js';

import { bestsMoviesCategoryName, fantasyCategoryName, documentaryCategoryName, thrillerCategoryName, bestsMoviesCategoryTitle, fantasyCategoryTitle, documentaryCategoryTitle, thrillerCategoryTitle, bestMoviesCategoryDomElement, categorie1DomElement, categorie2DomElement, categorie3DomElement } from './consts.js';

import { createMovieCard } from './movie_card_modal.js';

/**
 * Suppression des ids de catégorie en trop : le 1er id pour la catégorie bestsMovies (1 catégorie = 2 ids min.), et les 1 à 3 derniers si le nombre d'ids restants est supérieur à 7.
 * @param { Object } moviesIds
 * @param { String } categoryName
 */
function removeOverageIds(moviesIds, categoryName) {
    if (categoryName === 'bestsMovies') {moviesIds.shift();}

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
 * Création de l'affichage du Hero
 * @param { Object } bestMoviesIds
 */
async function createHero(bestMoviesIds) {
    try {
        // Récupération des données du film
        const movieId = bestMoviesIds[0];
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
 * Création du carrousel pour la catégorie reçue en paramètre
 * @param { Object } moviesIds
 * @param { String } categoryName
 * @param { String } categoryDomElement
 * @param { String } categoryTitle
 */
async function createCarousel(moviesIds, categoryName, categoryDomElement, categoryTitle) {

    // Supprime les ids de catégorie en trop
    removeOverageIds(moviesIds, categoryName);

    // Récupère l'élément du DOM "ul" de la catégorie qui accueillera les films
    const carouselItems = document.querySelector(categoryDomElement + " .carousel-items");

    // Crée le titre de la catégorie
    document.querySelector(categoryDomElement + " h3").innerHTML = categoryTitle

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