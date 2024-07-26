let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
document.addEventListener('DOMContentLoaded', () => {
    
    if (watchlist.length > 0) {
    watchlist.forEach(imdbID => {
    const movieUrl = `https://omdbapi.com/?i=${imdbID}&apikey=8d49ddbd`
    fetch(movieUrl)
        .then(res => res.json())
        .then(details => {
            const movies = document.createElement('div')
            movies.innerHTML = 
            `
            <div class="movie">
                <img class='poster'src=${details.Poster}>
                <div class="all-infos">
                    <div class='movie-rating'>
                        <h3>${details.Title}</h3>
                        <h4>⭐ <strong>${details.Ratings[0].Value}</strong> <span>🍅 <strong>${details.Ratings[1].Value}</strong></span></h4>
                    </div>
                    <div class="movie-details">
                        <p>${details.Runtime}</p>
                        <p>${details.Genre}</p>
                        <button onclick="remMovie('${details.imdbID}')" class="watchlist-button">Remove</button>
                    </div>
                    <p>${details.Plot}</p>
                </div>
            </div>
            `
            main.appendChild(movies)
            
            
        })
            document.getElementById('main').innerHTML = ``
            main.style.marginTop = 0
    })
}else{
    document.getElementById('main').innerHTML = `
        <h4 class="watchlist-h4">Your watchlist is looking a little empty...</h4>
        <div id="asm">
            <p class="watchlist-p"><a href="/index.html" class="watchlist-a">Let’s add some movies!</a></p>
        </div>
    `
}
})

function remMovie(imdbID) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(id => id !== imdbID);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    location.reload(); 
}