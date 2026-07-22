const genres = [
    {id: 28, name: "Action"},
    {id: 12, name: "Adventure"},
    {id: 16, name: "Animation"},
    {id: 35, name: "Comedy"},
    {id: 80, name: "Crime"},
    {id: 99, name: "Documentary"},
    {id: 18, name: "Drama"},
    {id: 10402, name: "Music"},
    {id: 10751, name: "Family"},
    {id: 14, name: "Fantasy"},
    {id: 9648, name: "Mystery"},
    {id: 27, name: "Horror"},
    {id: 10749, name: "Romance"},
    {id: 36, name: "History"},
    {id: 878, name: "Science Fiction"},
    {id: 53, name: "Thriller"},
    {id: 10752, name: "War"},
    {id: 37, name: "Western"}
];
function renderGenres() {
    const container = document.querySelector(".genre-container");
    if(!container) return;
    container.innerHTML = "";
    genres.forEach(genre => {
        const pill= document.createElement("button");
        pill.classList.add("genre-pill");
        pill.textContent = genre.name;
        pill.addEventListener("click", () => {
            window.location.href = `genres.html?id=${genre.id}&name=${encodeURIComponent(genre.name)}`;
        });
        container.appendChild(pill);

    });
}
renderGenres();