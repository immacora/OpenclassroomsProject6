/* CONSTANTES */

// CATEGORY NAME
export const bestsMoviesCategoryName = 'bestsMovies';
export const fantasyCategoryName = 'fantasy';
export const documentaryCategoryName = 'documentary';
export const thrillerCategoryName = 'thriller';

// CATEGORY TITLE
export const bestsMoviesCategoryTitle = 'Films les mieux notés';
export const fantasyCategoryTitle = 'Fantastiques';
export const documentaryCategoryTitle = 'Documentaires';
export const thrillerCategoryTitle = 'Thrillers';

// CATEGORY DOM ELEMENT
export const bestMoviesCategoryDomElement = '#bestMovies ';
export const categorie1DomElement = '#categorie_1 ';
export const categorie2DomElement = '#categorie_2 ';
export const categorie3DomElement = '#categorie_3 ';

// API FILTERS
const bestMoviesFilter = '?sort_by=-imdb_score';
const categoryFilter = '&genre=';

// URL
export const ocMoviesURL = 'http://localhost:8000/api/v1/titles/';
export const bestMoviesURL = ocMoviesURL + bestMoviesFilter;
export const bestMoviesFantasyURL = bestMoviesURL + categoryFilter + fantasyCategoryName;
export const bestMoviesDocumentaryURL = bestMoviesURL + categoryFilter + documentaryCategoryName;
export const bestMoviesThrillerURL = bestMoviesURL + categoryFilter + thrillerCategoryName;