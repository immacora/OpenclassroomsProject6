import { bestsMoviesCategoryData, fantasyCategoryData, documentaryCategoryData, thrillerCategoryData } from './consts.js';
import { bestMoviesIds, bestMoviesFantasyIds, bestMoviesDocumentaryIds, bestMoviesThrillerIds, getMovieInfos } from './requests.js';
import { createMovieCard } from './movie_card_and_modal.js';

/* CATEGORIES */

/**
 * Suppression des 1 à 3 derniers id de catégorie selon le nombre d'id.
 * @param { Object } moviesIds
 * @return { Object } moviesIds
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
        default:
            break;
    }
    return moviesIds;
}

/**
 * Création d'une catégorie
 * @param { Object } moviesIds
 * @param { Object } movieCategoryData
 * @return { Object } category
 */
async function createCategory(moviesIds, movieCategoryData) {

    // Supprime le 1er id de la catégorie bestsMovies
    if (movieCategoryData.name === 'bestsMovies') {
        moviesIds.shift();
    }

    // Supprime les derniers ids de catégorie si le nombre d'id est supérieur à 7
    if (moviesIds.length > 7) {
        removeOverageIds(moviesIds);
    }

    // Récupère l'élément du DOM "ul" de la catégorie qui accueillera les films
    const carouselItems = document.querySelector(movieCategoryData.domElement + " .carousel-items");

    // Ajoute le titre de la catégorie au DOM
    document.querySelector(movieCategoryData.domElement + " h2").innerHTML = movieCategoryData.title;

    // Crée la liste des DOM ids des éléments "li" de la catégorie
    let categoryMovieDomIds = [];

    try {
        // Boucle sur la liste des ids pour récupérer des données des 7 premiers films, créer l'élément cible du DOM, puis les movieCard
        for (let i = 0; i < moviesIds.length; i++) {

            const movieNumber = i + 1;
            const movieId = moviesIds[i];
            const movieInfos = await getMovieInfos(movieId);
            const movieTitle = movieInfos.title;

            // Création de l'élément "li" du DOM recevant les données
            const movieElementLi = document.createElement("li");
            movieElementLi.setAttribute('class', 'carousel-item');
            const categoryMovieDomId = movieNumber + '_' + movieCategoryData.name;
            movieElementLi.setAttribute('id', categoryMovieDomId);

            // Rattache la balise "li" à la balise "ul" parente
            carouselItems.appendChild(movieElementLi);

            //Ajoute les DOM id des films de la catégorie à la liste
            categoryMovieDomIds.push(categoryMovieDomId);

            createMovieCard(movieInfos, categoryMovieDomId, movieTitle);
        }
    } catch (error) {
        alert("Erreur de création de la catégorie" + error);
    }
    
    // Crée l'ojet category (domElement movieDomIds) et le retourne
    const category = {
        domElement: movieCategoryData.domElement,
        movieDomIds: categoryMovieDomIds
    };
    return category;
}

// Crée et exporte les catégories.
const bestsMoviesCategory = await createCategory(bestMoviesIds, bestsMoviesCategoryData);
const fantasyCategory = await createCategory(bestMoviesFantasyIds, fantasyCategoryData);
const documentaryCategory = await createCategory(bestMoviesDocumentaryIds, documentaryCategoryData);
const thrillerCategory = await createCategory(bestMoviesThrillerIds, thrillerCategoryData);
export const categories = [
    bestsMoviesCategory,
    fantasyCategory,
    documentaryCategory,
    thrillerCategory
]