const hero = {
    section: document.querySelector(".hero"),
    badge: document.querySelector(".hero-badge"),
    title: document.querySelector(".hero-title"),
    rating: document.querySelector(".hero-rating"),
    year: document.querySelector(".hero-year"),
    runtime: document.querySelector(".hero-runtime"),
    genre: document.querySelector(".hero-genre"),
    tagline: document.querySelector(".hero-tagline"),
    overview: document.querySelector(".hero-overview"),
    trailerBtn: document.querySelector(".trailer-btn"),
    infoBtn: document.querySelector(".info-btn")
};
let featuredMovie=null;
const badges = ["Editor's Pick", "Featured Today", "Critics' Choice", "Trending Now", "Must Watch","Cinema Spotlight","Highly Recommended","Fan Favorite","Blockbuster Pick"];
async function fetchFeaturedMovie() {
    try {
        const response = await fetch( `${base_url}/trending`);
        if (!response.ok) {
            throw new Error(`Failed to fetch featured movie`);
        }
        const data = await response.json();
        const movie = data.results;
        const randomMovie = movie[Math.floor(Math.random() * movie.length)];
        const details = await fetchMovieDetails(randomMovie.id);
        return details;
    } catch (error) {
        console.error(error); 
        return null;
    }
}

function updateHeroSection(movie) {
    if(!movie) return;
    featuredMovie = movie;
    hero.badge.textContent = badges[Math.floor(Math.random() * badges.length)];
    hero.title.textContent = movie.title;
    hero.rating.textContent = `🏅 ${movie.vote_average.toFixed(1)}`;
    hero.year.textContent = movie.release_date?.slice(0, 4)|| "N/A";
    hero.runtime.textContent = `⌛ ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
    hero.genre.textContent = movie.genres?.length ? movie.genres.slice(0, 3).map(genre => genre.name).join(" • ") : "N/A";
    hero.overview.textContent = movie.overview;
    if(movie.tagline){
        hero.tagline.style.display = "block";
        hero.tagline.textContent = `“${movie.tagline}”`;
    }
    else{
        hero.tagline.style.display = "none";
    }

   if(!movie.backdrop_path) {
       hero.section.style.backgroundImage = `linear-gradient(rgba(8,10,20,.65),rgba(8,10,20,.92)),url('./assets/default-hero.jpg')`;
       hero.section.classList.remove("hero-loading");
        hero.section.classList.add("hero-loaded");
        return;
   }
const bg = new Image();
   bg.src = `${image_url}${movie.backdrop_path}`;
   bg.onload = () => {
       hero.section.style.backgroundImage = `
        linear-gradient(rgba(8,10,20,.65),rgba(8,10,20,.92)),url(${image_url}${movie.backdrop_path})`;
       hero.section.classList.remove("hero-loading");
       hero.section.classList.add("hero-loaded");
       setTimeout(() => {
        hero.title.classList.add("animate");
        hero.tagline.classList.add("animate");
        hero.overview.classList.add("animate");
        hero.trailerBtn.classList.add("animate");
        hero.infoBtn.classList.add("animate");
    },100);
   }
}

async function fetchTrailer(movieId) {
    const reponse = await fetch(`${base_url}/videos?id=${movieId}`);
    const data = await reponse.json();
    const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}
hero.infoBtn.addEventListener("click", async() => {
    if(!featuredMovie) return;
    openModal(featuredMovie);
});
hero.trailerBtn.addEventListener("click", async() => {
    if(!featuredMovie) return;
    const trailerUrl = await fetchTrailer(featuredMovie.id);
    if (trailerUrl) {
        window.open(trailerUrl, "_blank");
    }
    else{
        showToast("Trailer not available");
    }
});
async function renderHeroSection(){
    const movie=await fetchFeaturedMovie();
    updateHeroSection(movie);
}

