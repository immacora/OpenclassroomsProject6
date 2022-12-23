/* CONSTANTES */

// URL
const ocMoviesURL = "http://localhost:8000/api/v1/titles";
const bestMoviesFilter = "?sort_by=-imdb_score";
const categoryFantasy = "&genre=fantasy";
const categoryDocumentary = "&genre=documentary";
const categoryThriller = "&genre=thriller";

// Eléments du DOM
const hero = document.getElementById('hero');
const bestMovies = document.getElementById('bestMovies');


/* CLASSE FILM */
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
        this.jsiRank = jsiRank;
    }
}

/* FONCTIONS */

/**
 * Requête fetch asynchone retournant la liste des premiers ids (1 à 10 maximum) des films les mieux notés par classement descendant.
 * @param { String } url
 * @param { List } moviesIds
 * @return { Promise }
 */

async function getMoviesIds(url, moviesIds=[]) {

    try {
        let response = await fetch(url)

        if (response.ok) {
            let data = await response.json()
            let previous = data.previous;
            let next = data.next;
            let results = data.results;

            for (let result of results) {
                moviesIds.push(result.id);
            }

            // Retourne la liste s'il existe une seule page
            if ((previous === null) & (next === null)) {
                return moviesIds;
            }
            // Retourne la liste des ids des 2 pages s'il en existe une seconde
            else if ((previous === null) & (next != null)) {
                getMoviesIds(next, moviesIds);
                return moviesIds;
            }

        } else {
            alert("La requête a échoué"  + error)
        }
    } catch (error) {
      alert("Erreur de connexion à l'API OCMovies" + error)
    }
}
  
/**
 * Requête fetch asynchone retournant les objets films de la liste d'ids.
 * @param { List } moviesIds
 * @return { Promise }
 */

async function getMoviesInfos(moviesIds) {

    try {
        let response = await fetch(url)

        if (response.ok) {
            //code

        } else {
            alert("La requête a échoué"  + error)
        }
    } catch (error) {
      alert("Erreur de connexion à l'API OCMovies" + error)
    }
}


/* MAIN */

let moviesIdsDocumentary = getMoviesIds(ocMoviesURL + bestMoviesFilter + categoryDocumentary);
console.log('resultMoviesId category Documentary:', moviesIdsDocumentary);

let bestsMoviesIds = getMoviesIds(ocMoviesURL + bestMoviesFilter);
console.log('resultMoviesId category All bests movies: ', bestsMoviesIds);
