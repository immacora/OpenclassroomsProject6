// Constantes
const ocMoviesURL = "http://localhost:8000/api/v1/titles";
const bestMoviesFilter = "?sort_by=-imdb_score";
const categoryFantasy = "&genre=fantasy";
const categoryDocumentary = "&genre=documentary";
const categoryThriller = "&genre=thriller";

// Variables
let hero = document.getElementById('hero');
let bestMovies = document.getElementById('bestMovies');

class Movie {
    constructor(id, title, date_published, duration, long_description, avg_vote, imdb_score, image_url, actors, directors, genres, countries, rated, jsiRank) {
    
        this.id = id;   
        this.title = title; 
        this.date_published = date_published;
        this.duration = duration;
        this.long_description = long_description;
        this.avg_vote = avg_vote;
        this.imdb_score = imdb_score;
        this.image_url = image_url; 
        this.actors = actors;
        this.directors = directors;
        this.genres = genres; 
        this.countries = countries;
        this.rated = rated;
        this.jsiRank = jsiRank
    }
}

/* Retourne les films les mieux notés */
async function getMovies(url) {
    let response  = await fetch(url);
    let data = await response.json();
    let next = data.next;
    let previous = data.previous;
    let results = data.results;

    for (let result of results) {
        console.log('result: ', result);
     }
}

getMovies(ocMoviesURL + bestMoviesFilter);
