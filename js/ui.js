//function to create movie card
function moviecard(movie) {
    const card = document.createElement("div");
        card.classList.add("movie-card");
        const poster=movie.poster_path ? `${poster_url}${movie.poster_path}` : "./assets/images/no-poster.png";
        const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
        const rating = movie.vote_average? movie.vote_average.toFixed(1) : "N/A";
        card.innerHTML=`
                <div class="poster-container">
                    <img src="${poster}" alt="${movie.title}">
                    <div class="movie-overlay">
                        <div class="overlay-rating">★ ${rating}</div>
                        <h3>${movie.title}</h3>
                        
                        <p>${year}</p>
                        <div class="overlay-buttons">
                            <button class="watch-btn">View Details</button>
                            
                        </div>
                    </div>
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <div class="movie-meta">
                            <span class="rating">⭐ ${rating}</span>
                            <span class="release-date">${year}</span>
                        </div>
                    </div>
                </div>
                `;
    card.addEventListener("click", async () => {
        try{
            const movieDetails = await fetchMovieDetails(movie.id);
            openModal(movieDetails);
        }
        catch(error){
            console.error(error);
        }
    });
    return card;
}

//function to show skeleton loader
function showSkeletonLoader(selector,count=8) {
    const row=document.querySelector(selector);
    row.innerHTML="";
    for(let i=0;i<count;i++){
        row.innerHTML+=`
            <div class="movie-card skeleton-card">
                <div class="skeleton-poster"></div>
                <div class="skeleton-info">
                    <div class="skeleton-line title"></div>
                    <div class="skeleton-line small"></div>
                </div>
            </div>
        `;
    }
}
//function to display movies
function displayMovies(movies,selector) {
    const movie_row=document.querySelector(selector);
    movie_row.innerHTML="";
    movies.forEach(movie => {
        movie_row.appendChild(moviecard(movie));
    });
}

//function to fetch trending movies
async function fetchTrending() {
    showSkeletonLoader(".trending .movie-row");
     try {
        const response = await fetch(`${base_url}/trending`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayMovies(data.results,".trending .movie-row");
    } catch (error) {
        console.error("Failed to fetch movies:", error.message);
        alert("The movie service is currently unreachable. Please check your internet connection or VPN.");
    }
}

//function to fetch popular movies
async function fetchPopular() {
    showSkeletonLoader(".popular .movie-row");
     try {
        const response = await fetch(`${base_url}/movies?type=popular`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayMovies(data.results,".popular .movie-row");
    } catch (error) {
        console.error("Failed to fetch movies:", error.message);
        alert("The movie service is currently unreachable. Please check your internet connection or VPN.");
    }
}
//function to fetch top rated
async function fetchTopRated() {
    showSkeletonLoader(".top-rated .movie-row");
     try {
        const response = await fetch(`${base_url}/movies?type=top_rated`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayMovies(data.results,".top-rated .movie-row");
    } catch (error) {
        console.error("Failed to fetch movies:", error.message);
        alert("The movie service is currently unreachable. Please check your internet connection or VPN.");
    }
}

//function to fetch new releases
async function fetchNewReleases() {
    showSkeletonLoader(".new-releases .movie-row");
     try {
        const response = await fetch(`${base_url}/movies?type=now_playing`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayMovies(data.results,".new-releases .movie-row");
    } catch (error) {
        console.error("Failed to fetch movies:", error.message);
        alert("The movie service is currently unreachable. Please check your internet connection or VPN.");
    }
}

//designing the scroll buttons
const carousels = document.querySelectorAll(".movie-carousel");
carousels.forEach(carousel => {
    const row = carousel.querySelector(".movie-row");
    const leftBtn = carousel.querySelector(".scroll.left");
    const rightBtn = carousel.querySelector(".scroll.right");
    leftBtn.addEventListener("click", () => {
        row.scrollBy({
            left: -row.offsetWidth,
            behavior: "smooth"
        });
    });
    rightBtn.addEventListener("click", () => {
        row.scrollBy({
            left: row.offsetWidth,
            behavior: "smooth"
        });
    });
});

//function to fetch genres
async function fetchGenres() {
    const container = document.querySelector(".genre-container");
    if(!container) return;
    try {
        const response = await fetch(`${base_url}/genres`);
        if(!response.ok) throw new Error(`Failed to fetch genres: ${response.status}`);
        const data = await response.json();
        renderGenres(data.genres);
    } catch (error) {
        console.error("Failed to fetch genres:", error.message);
    }
}