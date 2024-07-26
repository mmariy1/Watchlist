const searchBtn = document.getElementById("search-btn");
const inputBox = document.getElementById("input-box");
const movies = document.getElementById("movies");

// Recupera a watchlist do localStorage ou inicializa como um array vazio
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

searchBtn.addEventListener("click", function() {
    fetch(`https://www.omdbapi.com/?apikey=cecfec89&s=${inputBox.value}`)
        .then(response => response.json())
        .then(data => {
            movies.innerHTML = "";
            data.Search.forEach(movie => {
                // Verifica se há informações de avaliação, duração e gênero
                fetch(`https://www.omdbapi.com/?apikey=cecfec89&i=${movie.imdbID}`)
                    .then(response => response.json())
                    .then(details => {
                        movies.innerHTML += `
                        <div class="movie">
                            <img src="http://img.omdbapi.com/?apikey=cecfec89&i=${movie.imdbID}" class="poster" alt="Poster">
                            <div class="all-infos">
                                <div class="movie-rating">
                                    <h3>${details.Title}</h3>
                                    <div class="ratings">
                                        <h4>⭐ <strong>${details.Ratings[0].Value}</strong><span>🍅<strong>${details.Ratings[1].Value}</strong></span></h4>
                                    </div>
                                </div>
                                <div class="movie-details">
                                    <p>${details.Runtime}</p>
                                    <p>${details.Genre}</p>
                                    <button onclick="saveToWatchlist('${movie.imdbID}')" class="watchlist-button">Watchlist</button>
                                </div>
                                <p class="plot">${details.Plot}</p>
                            </div>
                        </div>`;
                    });
            });
        });
});

function saveToWatchlist(imdbID) {
    // Evita adicionar filmes duplicados
    if (!watchlist.includes(imdbID)) {
        watchlist.push(imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert('Movie saved to Watchlist');
    } else {
        alert('Movie is already in the Watchlist');
    }
}
