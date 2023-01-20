/* CONSTANTES */

// CATEGORIES
export const bestsMoviesCategory = {
    name: 'bestsMovies',
    title: 'Films les mieux notés',
    domElement: '#bestMovies '
}
export const fantasyCategory = {
    name: 'fantasy',
    title: 'Fantastiques',
    domElement: '#categorie_1 ',
}
export const documentaryCategory = {
    name: 'documentary',
    title: 'Documentaires',
    domElement: '#categorie_2 ',
}
export const thrillerCategory = {
    name: 'thriller',
    title: 'Thrillers',
    domElement: '#categorie_3 ',
}

// API FILTERS
const bestMoviesFilter = '?sort_by=-imdb_score';
const categoryFilter = '&genre=';

// URL
export const ocMoviesURL = 'http://localhost:8000/api/v1/titles/';
export const bestMoviesURL = ocMoviesURL + bestMoviesFilter;
export const bestMoviesFantasyURL = bestMoviesURL + categoryFilter + fantasyCategory.name;
export const bestMoviesDocumentaryURL = bestMoviesURL + categoryFilter + documentaryCategory.name;
export const bestMoviesThrillerURL = bestMoviesURL + categoryFilter + thrillerCategory.name;