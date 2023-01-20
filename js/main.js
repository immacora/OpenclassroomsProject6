import { bestMovieId } from './requests.js';
import { createHero } from './hero.js';
import { bestsMoviesCategoryCarousel, fantasyCategoryCarousel, documentaryCategoryCarousel, thrillerCategoryCarousel } from './carousel.js';


// ---- MAIN ----//

createHero(bestMovieId);

console.log(bestsMoviesCategoryCarousel);
console.log(fantasyCategoryCarousel);
console.log(documentaryCategoryCarousel);
console.log(thrillerCategoryCarousel);

// Initialise la liste des ids des films dans le DOM créée dans la function createCarousel
const moviesCard = document.getElementsByClassName('movie_card');
console.log(moviesCard);
console.log(moviesCard.length);