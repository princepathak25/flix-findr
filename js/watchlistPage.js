// function to fetch and render watchlist
async function renderWatchlist() {
    const watchlist = getWatchlist();
   if(watchlist.length === 0){
        const page= document.querySelector('.watchlist-page');
        page.innerHTML = `
            <section class="watchlist-header">
                <h1>Your Watchlist</h1>
                <p>Your personal collection of favourite movies.</p>
            </section>
            <div class="empty-watchlist">
                <div class="empty-icon">🎬</div>
                <h2>Nothing here yet</h2>
                <p>Save movies you love and start building your own personalized collection.</p>
                <a href="index.html" class="primary-btn">Browse Movies</a>
            </div>
        `;
        return;
   }
   const watchlistGrid = document.querySelector('.watchlist-grid');
   watchlistGrid.innerHTML = '';
   for(const savedMovie of watchlist){
    const movie = await fetchMovieDetails(savedMovie.id);
    const card = moviecard(movie);
    watchlistGrid.appendChild(card);
   }
}
renderWatchlist();
