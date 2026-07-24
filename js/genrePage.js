// initializing variables and parameters for the genre page
const params = new URLSearchParams(window.location.search);
const genreId = params.get("id");
const genreName = params.get("name");

const title = document.querySelector(".category-title");
const description = document.querySelector(".category-description");
title.textContent = genreName;
description.textContent = `Explore the best ${genreName} movies curated for you.`;

// function to fetch the movies on genre page
async function fetchGenreMovies(genreId) {
    try {
        const response = await fetch(`${base_url}/discover?genre=${genreId}`);
        if(!response.ok) {
            throw new Error(`Failed fetching genre movies: ${response.status}`);
        }
        const movies = await response.json();
        renderMovieGrid(movies.results||movies);
    } catch (error) {
        console.error("Error fetching genre movies:", error);
        return [];
    }
}

// function to render the movie-grid on genre page
function renderMovieGrid(movies) {
    const container = document.querySelector(".movie-grid");
    if(!container) return;
    container.innerHTML = "";
    movies.forEach(movie => {
        const card = moviecard(movie);
        container.appendChild(card);
    });
}
fetchGenreMovies(genreId);
