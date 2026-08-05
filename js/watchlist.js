// function to get watchlist through Local Storage
function getWatchlist() {
    const watchlist = localStorage.getItem('watchlist');
    return watchlist ? JSON.parse(watchlist) : [];
}

// function to save a movie
function saveMovie(movie) {
    const watchlist = getWatchlist();
    const exists = watchlist.some(item => item.id === movie.id);
    if (exists) return;
    watchlist.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date
    });
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    showToast(`${movie.title}`,"success");
}
// function to remove a movie
function removeMovie(movieId) {
    const watchlist = getWatchlist();
    const movie = watchlist.find(movie => movie.id === movieId);
    const updated = watchlist.filter(movie => movie.id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(updated));
    showToast(`${movie.title}`,"error");
}
// function to check if a movie is already saved
function isMovieSaved(movieId) {
    return getWatchlist().some(movie => movie.id === movieId);
}
function updateFavBtn(favBtn, movieId) {
    if (isMovieSaved(movieId)) {
        favBtn.textContent = "♥ Remove from Watchlist";
    } else {
        favBtn.textContent = "♡ Add to Watchlist";
    }
    favBtn.classList.toggle("saved", isMovieSaved(movieId));
}
