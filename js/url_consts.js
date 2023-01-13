/* CONSTANTES */

// CATEGORIE NAME
export const bestsMoviesCategoryName = 'bestsMovies';
export const fantasyCategoryName = 'fantasy';
export const documentaryCategoryName = 'documentary';
export const thrillerCategoryName = 'thriller';

// API FILTERS
const bestMoviesFilter = '?sort_by=-imdb_score';
const categoryFilter = '&genre=';

// URL
export const ocMoviesURL = 'http://localhost:8000/api/v1/titles/';
export const bestMoviesURL = ocMoviesURL + bestMoviesFilter;
export const bestMoviesFantasyURL = bestMoviesURL + categoryFilter + fantasyCategoryName;
export const bestMoviesDocumentaryURL = bestMoviesURL + categoryFilter + documentaryCategoryName;
export const bestMoviesThrillerURL = bestMoviesURL + categoryFilter + thrillerCategoryName;