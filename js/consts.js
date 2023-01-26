/* CONSTANTES */

// API FILTERS
const bestMoviesFilter = '?sort_by=-imdb_score';
const categoryFilter = '&genre=';

const fantasyURI = 'fantasy';
const documentaryURI = 'documentary';
const thrillerURI = 'thriller';

// URL
export const ocMoviesURL = 'http://localhost:8000/api/v1/titles/';
const bestMoviesURL = ocMoviesURL + bestMoviesFilter;
const bestMoviesFantasyURL = bestMoviesURL + categoryFilter + fantasyURI;
const bestMoviesDocumentaryURL = bestMoviesURL + categoryFilter + documentaryURI;
const bestMoviesThrillerURL = bestMoviesURL + categoryFilter + thrillerURI;

// CATEGORIES DATA
export const bestsMoviesCategoryData = {
    name: 'bestsMovies',
    title: 'Films les mieux notés',
    url: bestMoviesURL,
    domElement: '#bestsMovies '
}
export const fantasyCategoryData = {
    name: 'fantasy',
    title: 'Fantastiques',
    url: bestMoviesFantasyURL,
    domElement: '#fantasy '
}
export const documentaryCategoryData = {
    name: 'documentary',
    title: 'Documentaires',
    url: bestMoviesDocumentaryURL,
    domElement: '#documentary '
}
export const thrillerCategoryData = {
    name: 'thriller',
    title: 'Thrillers',
    url: bestMoviesThrillerURL,
    domElement: '#thriller '
}