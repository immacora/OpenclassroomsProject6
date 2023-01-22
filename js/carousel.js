import { bestsMoviesCategory, fantasyCategory, documentaryCategory, thrillerCategory } from './consts.js';
import { bestMoviesIds, bestMoviesFantasyIds, bestMoviesDocumentaryIds, bestMoviesThrillerIds, getMovieInfos } from './requests.js';
import { createMovieCard } from './movie_card_and_modal.js';


/**
 * Suppression des 1 à 3 derniers id de catégorie selon le nombre d'id.
 * @param { Object } moviesIds
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
 * Création du carrousel pour la catégorie reçue en paramètre
 * @param { Object } moviesIds
 * @param { Object } movieCategory
 */
async function createCarousel(moviesIds, movieCategory) {

    // Supprime le 1er id de la catégorie bestsMovies
    if (movieCategory.name === 'bestsMovies') {
        moviesIds.shift();
    }

    // Supprime les derniers ids de catégorie si le nombre d'id est supérieur à 7
    if (moviesIds.length > 7) {
        removeOverageIds(moviesIds);
    }

    // Récupère l'élément du DOM "ul" de la catégorie qui accueillera les films
    const carouselItems = document.querySelector(movieCategory.domElement + " .carousel-items");

    // Crée le titre de la catégorie
    document.querySelector(movieCategory.domElement + " h2").innerHTML = movieCategory.title;

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
            const categoryMovieDomId = movieNumber + '_' + movieCategory.name;
            movieElementLi.setAttribute('id', categoryMovieDomId);

            // Rattachement de la balise "li" à la balise "ul" parente
            carouselItems.appendChild(movieElementLi);

            //Récupération des id de liste des films (carousel-item)
            categoryMovieDomIds.push(categoryMovieDomId);

            createMovieCard(movieInfos, categoryMovieDomId, movieTitle);
        }
    } catch (error) {
        alert("Erreur d'affichage du carousel" + error);
    }
    return categoryMovieDomIds;
}


//Crée les 4 carousels (movieCard et modale) et exporte les listes des DOM ids de leurs éléments.
export const bestsMoviesCategoryCarousel = await createCarousel(bestMoviesIds, bestsMoviesCategory);
export const fantasyCategoryCarousel = await createCarousel(bestMoviesFantasyIds, fantasyCategory);
export const documentaryCategoryCarousel = await createCarousel(bestMoviesDocumentaryIds, documentaryCategory);
export const thrillerCategoryCarousel = await createCarousel(bestMoviesThrillerIds, thrillerCategory);