//initializing variables for modal
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modal-body");
const closeBtn = document.querySelector(".close-modal");

//adding event listener to the close button
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.querySelector(".modal-backdrop").addEventListener("click", () => {
  modal.classList.add("hidden");
});

//function to open modal
function openModal(movie) {
    modal.classList.remove("hidden");
    const genres = movie.genres.map(genre => `<span class="meta-item">${genre.name}</span>`).join(" • ");
    modalBody.innerHTML = `
        <div class="modal-poster">
            <img src="${movie.poster_path ? `${poster_url}${movie.poster_path}` : "./assets/images/no-poster.png"}" alt="${movie.title}">
        </div>
        <div class="modal-details">
            <h2>${movie.title}</h2>
            <p class="tagline">${movie.tagline || ""}</p>
            <div class="modal-meta">
                <span class="meta-item">${movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</span>  
                <span class="meta-item">${genres || ""}</span>
                <span class="meta-item">⌛ ${movie.runtime ? `${Math.floor(movie.runtime/60)}h ${movie.runtime%60}m` : "N/A"}</span>
            </div>
            <p class="overview">${movie.overview || ""}</p>
            <div class="modal-actions">
                <button class="watch-btn-modal">▶ Watch Trailer</button>
                <span></span>
                <button class="fav-btn-modal">♡ Add to Watchlist</button>

            </div>
        </div>
    `;
    const watchTrailerBtn = modalBody.querySelector(".watch-btn-modal");
    watchTrailerBtn.addEventListener("click", async () => {
        try {
            const trailer = await fetchMovieTrailer(movie.id);
            if (trailer) {
                window.open(trailer, "_blank","noopener,noreferrer");
            }
            else {
                alert("Trailer not available for this movie.");
            }
        } catch (error) {
            console.error("Failed to fetch or open trailer:", error.message);
        }
    });
    const favBtn = modalBody.querySelector(".fav-btn-modal");
    updateFavBtn(favBtn, movie.id);
    favBtn.addEventListener("click", () => {
        if (isMovieSaved(movie.id)) {
            removeMovie(movie.id);
        } else {
            saveMovie(movie);
        }
        updateFavBtn(favBtn, movie.id);
    });
}


//to fetch more details about the movie
async function fetchMovieDetails(movieId) {
    const response = await fetch(`${base_url}/details?id=${movieId}`);
    if(!response.ok) throw new Error(`Failed to fetch movie details: ${response.status}`);
    return response.json();
}

//to fetch the trailer of the movie
async function fetchMovieTrailer(movieId) {
    const response = await fetch(`${base_url}/videos?id=${movieId}`);
    if(!response.ok) throw new Error(`Failed to fetch movie trailer: ${response.status}`);
    const data = await response.json();
    let trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube" && video.official);
    if(!trailer) {
        trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
    }
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}
