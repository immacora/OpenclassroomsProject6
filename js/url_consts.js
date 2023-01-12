/* CONSTANTES */

// CATEGORIE NAME
const fantasyName = 'fantasy';
const documentaryName = 'documentary';
const thrillerName = 'thriller';

// API FILTERS
const bestMoviesFilter = '?sort_by=-imdb_score';
const categoryFilter = '&genre=';

// URL
export const ocMoviesURL = 'http://localhost:8000/api/v1/titles/';
export const bestMoviesURL = ocMoviesURL + bestMoviesFilter;
export const bestMoviesFantasyURL = bestMoviesURL + categoryFilter + fantasyName;
export const bestMoviesDocumentaryURL = bestMoviesURL + categoryFilter + documentaryName;
export const bestMoviesThrillerURL = bestMoviesURL + categoryFilter + thrillerName;