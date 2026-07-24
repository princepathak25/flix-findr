//initializing the container of collections
const collections = [
  {
    title: "Fractured Realities",
    description:
      "Concepts that defy logic. Worlds that shatter expectations. Step into the unknown.",
    genres: [878, 53],
    backdrop: "/8q9wSh1w7plE7oHliG8Dfzbi5fg.jpg",
  },
  {
    title: "Heartstrings",
    description:
      "Romance, passion, and the complexities of love. Stories that tug at your heart.",
    genres: [10749, 18],
    backdrop: "/fVmSWkJ0dgTtklMw9k2EtYS9WOl.jpg",
  },
  {
    title: "Laugh Out Loud",
    description:
      "Moments of hilarity, wit, and pure comedic genius. Get ready to chuckle and giggle.",
    genres: [35],
    backdrop: "/7f7s2iiLiEKmgKR4IY6dMgWIXm9.jpg",
  },
  {
    title: "Into the Dark",
    description:
      "Uncompromising dread. Lingering shadows. Tales of suspense, fear, and the unknown await.",
    genres: [27, 9648],
    backdrop: "/gdNOW74o7amKrL3nXs6dnMV7m9U.jpg",
  },
  {
    title: "Pure Comfort",
    description:
      "Feel-good stories that warm the heart. Movies that leave you smiling.",
    genres: [35, 18],
    backdrop: "/mgoAZJw2j3swv4EiDrRIbwKDb7C.jpg",
  },
  {
    title: "Uncovered Treasures",
    description:
      "Zero hype. Maximum payoff. The best movies you’ve probably never heard of.",
    genres: [18, 53],
    backdrop: "/3jDXL4Xvj3AzDOF6UH1xeyHW8MH.jpg",
  },
];

// function to render the collections
async function renderCollections() {
  const container = document.querySelector(".collections-container");
  if (!container) return;
  container.innerHTML = "";
  for (const collection of collections) {
    const card = document.createElement("div");
    card.classList.add("collection-card");
    card.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${collection.backdrop})`;
    card.innerHTML = `
        <div class = "collection-overlay"></div>
            <div class = "collection-content">
                <h3>${collection.title}</h3>
                <p>${collection.description}</p>
                <button class="explore-btn" data-id="${collection.movieId}">Explore →</button>
            </div>
        `;
    container.appendChild(card);
    card.addEventListener("click", () => {
      window.location.href = `collections.html?name=${encodeURIComponent(collection.title)}`;
    });
    const exploreBtn = card.querySelector(".explore-btn");
    exploreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      window.location.href = `collections.html?name=${encodeURIComponent(collection.title)}`;
    });
  }
}
renderCollections();
