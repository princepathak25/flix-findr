//initializing variables and parameters
const params = new URLSearchParams(window.location.search);
const collectionName = params.get("name");
const title = document.querySelector(".category-title");
const description = document.querySelector(".category-description");
const collection = collections.find((item) => item.title === collectionName);
if (!collection) {
  title.textContent = "Collection Not Found";
} else {
  title.textContent = collection.title;
  description.textContent = collection.description;

  fetchCollectionMovies(collection.genres);
}

//function to fetch the movies for collections
async function fetchCollectionMovies(genreIds) {
  try {
    const genreQuery = genreIds.join(",");
    const response = await fetch(`${base_url}/discover?genre=${genreQuery}`);
    if (!response.ok) {
      throw new Error(`Failed fetching collection movies: ${response.status}`);
    }
    const data = await response.json();
    renderCollectionMovies(data.results);
  } catch (error) {
    console.error("Error fetching collection movies:", error);
  }
}

//function to render the movie-grid 
function renderCollectionMovies(movies) {
  const container = document.querySelector(".movie-grid");
  if (!container) return;
  container.innerHTML = "";
  movies.forEach((movie) => {
    container.appendChild(moviecard(movie));
  });
}
