import {
    API_KEY, BASE_URL,
    IMG_URL,
    PAGE,
    language,
} from './api.js'

// generate a number refferring to a movie page of the top rated movies on TMDB, the page number has to be less than or equal 500 - for more details see the API documentation: https://developers.themoviedb.org/3/movies/get-top-rated-movies
const generateRandomMoviePage = () => {
    const page = (Math.floor(Math.random() * 500) + 1);
    return page;
}

// generates a number corresponding to a movie on the page
const generateMovieOnPage = (qtyMoviesOnPage) => {
    const movie = (Math.floor(Math.random() * qtyMoviesOnPage));    
    return movie;
}

// finds a movie in one of the 500 top rated movies pages on TMDB API and show the informations of this movie on screen
const findMovie = async () => {
    const movieInfo = document.querySelector("#movieInfo");
    const movieImg = document.querySelector("#movieImg");
    const movieTitle = document.querySelector("#movieTitle");
    const movieRelease = document.querySelector("#movieRelease");
    const movieDescription = document.querySelector("#movieDescription");
    const loadingScreen = document.querySelector("#loadingScreen");
    const body = document.querySelector("body");

    // generate a number refferring to a movie page of the top rated movies on TMDB
    const page = generateRandomMoviePage();

    loadingScreen.style.display = "initial";
    try {
        // get top rated movies from API - URL example: https://api.themoviedb.org/3/movie/top_rated?api_key=6942b1895da6130415bdbb9197e74a58&language=pt-BR&page=1
        const response = await axios.get(`${BASE_URL}${API_KEY}${language}${PAGE}${page}`);

        // generates random number corresponding to a movie on the page
        const movieSelected = generateMovieOnPage(response.data.results.length);

        // variable data receives the movie datas
        const data = response.data.results[movieSelected];

        // get the movie release date and tranform the month to a 3 letter short month
        const releaseDate = new Date(data.release_date);
        const shortMonth = releaseDate.toLocaleString('pt-BR', { month: 'short' }).split(".")[0];
        
        // shows the movieInfo section and shows all the info of the movie selected
        movieInfo.classList = "movieInfo-enabled";
        movieImg.src = `${IMG_URL}${data.poster_path}`;
        movieTitle.textContent = data.title;
        movieRelease.textContent = `Lançado em: ${shortMonth}/${releaseDate.getFullYear()}`;
        movieDescription.textContent = data.overview;
        body.classList = "mobileBodyHeight";
    } catch (error) {
        movieImg.src = "./assets/dev.jpg";
        movieTitle.textContent = "Ops, filme não encontrado :( Tente novamente!";
        movieRelease.textContent = "";
        movieDescription.textContent = "";
        console.error(error);
    }
    loadingScreen.style.display = "none";
}

const findMovieBtn = document.querySelector('#findMovieBtn');

findMovieBtn.addEventListener('click', () => {
    findMovie();
    window.scrollTo(0, 0);
});