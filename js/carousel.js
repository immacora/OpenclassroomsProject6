import { bestsMoviesCategory, fantasyCategory, documentaryCategory, thrillerCategory } from './consts.js';
import { bestMoviesIds, bestMoviesFantasyIds, bestMoviesDocumentaryIds, bestMoviesThrillerIds, getMovieInfos } from './requests.js';
import { createMovieCard } from './movie_card_and_modal.js';


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

    // Récupère l'élément du DOM "ul" de la catégorie qui accueillera les films
    const carouselItems = document.querySelector(movieCategory.domElement + " .carousel-items");

    // Crée le titre de la catégorie
    document.querySelector(movieCategory.domElement + " h2").innerHTML = movieCategory.title;

    // Crée la liste des ids des éléments "li" de la catégorie
    let categoryMovieDomIds = [];

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


// Listes des ids des éléments de chacun des 4 carousels.

export const bestsMoviesCategoryCarousel = createCarousel(bestMoviesIds, bestsMoviesCategory);
export const fantasyCategoryCarousel = createCarousel(bestMoviesFantasyIds, fantasyCategory);
export const documentaryCategoryCarousel = createCarousel(bestMoviesDocumentaryIds, documentaryCategory);
export const thrillerCategoryCarousel = createCarousel(bestMoviesThrillerIds, thrillerCategory);