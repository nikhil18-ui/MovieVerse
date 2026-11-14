
// MOVIEVERSE - Movie Data
// Ratings are illustrative sample values for this project.

const movies = [
    {
        id: 1,
        title: "Inception",
        genre: "Sci-Fi",
        year: 2010,
        rating: 8.8,
        runtime: 148,
        poster: "#35465c",
        description: "A skilled thief enters people's dreams to steal secrets and attempts an impossible mission."
    },
    {
        id: 2,
        title: "Interstellar",
        genre: "Sci-Fi",
        year: 2014,
        rating: 8.7,
        runtime: 169,
        poster: "#293a52",
        description: "A group of explorers travels through space in search of a new home for humanity."
    },
    {
        id: 3,
        title: "The Dark Knight",
        genre: "Action",
        year: 2008,
        rating: 9.0,
        runtime: 152,
        poster: "#343434",
        description: "Batman faces the Joker, a criminal mastermind who brings chaos to Gotham City."
    },
    {
        id: 4,
        title: "The Shawshank Redemption",
        genre: "Drama",
        year: 1994,
        rating: 9.1,
        runtime: 142,
        poster: "#66513d",
        description: "Two prisoners develop a friendship while holding on to hope inside a prison."
    },
    {
        id: 5,
        title: "Forrest Gump",
        genre: "Drama",
        year: 1994,
        rating: 8.8,
        runtime: 142,
        poster: "#627c61",
        description: "A kind-hearted man experiences remarkable moments throughout American history."
    },
    {
        id: 6,
        title: "Parasite",
        genre: "Thriller",
        year: 2019,
        rating: 8.5,
        runtime: 132,
        poster: "#455b50",
        description: "A poor family gradually becomes involved in the lives of a wealthy household."
    },
    {
        id: 7,
        title: "Avatar",
        genre: "Sci-Fi",
        year: 2009,
        rating: 7.9,
        runtime: 162,
        poster: "#245c80",
        description: "A former marine explores the beautiful world of Pandora."
    },
    {
        id: 8,
        title: "Titanic",
        genre: "Romance",
        year: 1997,
        rating: 7.9,
        runtime: 195,
        poster: "#345b75",
        description: "Two young people fall in love aboard the famous ocean liner."
    },
    {
        id: 9,
        title: "Gladiator",
        genre: "Action",
        year: 2000,
        rating: 8.5,
        runtime: 155,
        poster: "#79543b",
        description: "A betrayed Roman general fights for justice in the arena."
    },
    {
        id: 10,
        title: "Joker",
        genre: "Drama",
        year: 2019,
        rating: 8.3,
        runtime: 122,
        poster: "#71443f",
        description: "A struggling comedian's life takes a dark turn in Gotham City."
    },
    {
        id: 11,
        title: "Whiplash",
        genre: "Drama",
        year: 2014,
        rating: 8.5,
        runtime: 107,
        poster: "#754d3d",
        description: "A young drummer faces intense pressure from a demanding music instructor."
    },
    {
        id: 12,
        title: "The Prestige",
        genre: "Mystery",
        year: 2006,
        rating: 8.5,
        runtime: 130,
        poster: "#59445e",
        description: "Two rival magicians become obsessed with creating the ultimate illusion."
    },
    {
        id: 13,
        title: "Dune: Part Two",
        genre: "Sci-Fi",
        year: 2024,
        rating: 8.5,
        runtime: 166,
        poster: "#9b7548",
        description: "Paul Atreides joins the Fremen while facing the future of Arrakis."
    },
    {
        id: 14,
        title: "Spider-Man: No Way Home",
        genre: "Action",
        year: 2021,
        rating: 8.2,
        runtime: 148,
        poster: "#853c36",
        description: "Peter Parker faces unexpected visitors from different universes."
    },
    {
        id: 15,
        title: "3 Idiots",
        genre: "Comedy",
        year: 2009,
        rating: 8.4,
        runtime: 170,
        poster: "#577b55",
        description: "Three engineering students challenge traditional ideas about education and success."
    }
];

// DOM elements
const movieGrid = document.getElementById("movieGrid");
const favouriteGrid = document.getElementById("favouriteGrid");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const sortFilter = document.getElementById("sortFilter");
const movieCount = document.getElementById("movieCount");
const emptyMessage = document.getElementById("emptyMessage");
const favouriteEmpty = document.getElementById("favouriteEmpty");
const modal = document.getElementById("movieModal");
const modalDetails = document.getElementById("modalDetails");

// Save favourites in browser storage
let favourites = JSON.parse(localStorage.getItem("movieFavourites")) || [];

// Convert minutes into hours and minutes
function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
}

// Create a movie card
function createMovieCard(movie) {
    const isFavourite = favourites.includes(movie.id);

    return `
        <article class="movie-card">
            <div class="poster" style="--poster: ${movie.poster}">
                <span class="poster-year">${movie.year}</span>
                <h3>${movie.title}</h3>
            </div>

            <div class="movie-info">
                <h4>${movie.title}</h4>
                <p>${movie.genre} · ${movie.year}</p>

                <div class="movie-meta">
                    <span>★ ${movie.rating}</span>
                    <span>${formatRuntime(movie.runtime)}</span>
                </div>

                <div class="card-actions">
                    <button class="details-btn" data-id="${movie.id}">
                        Details
                    </button>

                    <button class="favourite ${isFavourite ? "active" : ""}"
                        data-id="${movie.id}">
                        ${isFavourite ? "♥ Saved" : "♡ Save"}
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Display movies
function displayMovies(list) {
    movieGrid.innerHTML = list.map(createMovieCard).join("");

    movieCount.textContent = `${list.length} Movies`;

    emptyMessage.style.display =
        list.length === 0 ? "block" : "none";
}

// Display all three rankings
function displayRankings() {
    const highestRated = [...movies]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

    const longestMovies = [...movies]
        .sort((a, b) => b.runtime - a.runtime)
        .slice(0, 3);

    const shortestMovies = [...movies]
        .sort((a, b) => a.runtime - b.runtime)
        .slice(0, 3);

    displayRankingList("topRated", highestRated, "rating");
    displayRankingList("longestMovies", longestMovies, "runtime");
    displayRankingList("shortestMovies", shortestMovies, "runtime");
}

// Display individual ranking list
function displayRankingList(elementId, list, type) {
    const container = document.getElementById(elementId);

    container.innerHTML = list.map((movie, index) => {
        const value = type === "rating"
            ? `★ ${movie.rating}`
            : formatRuntime(movie.runtime);

        return `
            <div class="rank-item">
                <span>${index + 1}. ${movie.title}</span>
                <span>${value}</span>
            </div>
        `;
    }).join("");
}

// Search, genre filter and sorting
function filterMovies() {
    const searchText = searchInput.value.toLowerCase();
    const selectedGenre = genreFilter.value;
    const selectedSort = sortFilter.value;

    let filtered = movies.filter(movie => {
        const matchesSearch =
            movie.title.toLowerCase().includes(searchText);

        const matchesGenre =
            selectedGenre === "All" ||
            movie.genre === selectedGenre;

        return matchesSearch && matchesGenre;
    });

    if (selectedSort === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === "longest") {
        filtered.sort((a, b) => b.runtime - a.runtime);
    } else if (selectedSort === "shortest") {
        filtered.sort((a, b) => a.runtime - b.runtime);
    }

    displayMovies(filtered);
}

// Display favourite movies
function displayFavourites() {
    const favouriteMovies = movies.filter(movie =>
        favourites.includes(movie.id)
    );

    favouriteGrid.innerHTML =
        favouriteMovies.map(createMovieCard).join("");

    favouriteEmpty.style.display =
        favouriteMovies.length === 0 ? "block" : "none";
}

// Add or remove a favourite
function toggleFavourite(id) {
    if (favourites.includes(id)) {
        favourites = favourites.filter(item => item !== id);
    } else {
        favourites.push(id);
    }

    localStorage.setItem(
        "movieFavourites",
        JSON.stringify(favourites)
    );

    filterMovies();
    displayFavourites();
}

// Open movie details
function openMovieDetails(id) {
    const movie = movies.find(item => item.id === id);

    if (!movie) return;

    modalDetails.innerHTML = `
        <p class="eyebrow">MOVIE DETAILS</p>
        <h2>${movie.title}</h2>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Release Year:</strong> ${movie.year}</p>
        <p><strong>Rating:</strong> ★ ${movie.rating} / 10</p>
        <p><strong>Runtime:</strong> ${formatRuntime(movie.runtime)}</p>
        <p>${movie.description}</p>
    `;

    modal.classList.add("show");
}

// Handle card button clicks
document.addEventListener("click", function(event) {
    const detailsButton = event.target.closest(".details-btn");
    const favouriteButton = event.target.closest(".favourite");

    if (detailsButton) {
        openMovieDetails(Number(detailsButton.dataset.id));
    }

    if (favouriteButton) {
        toggleFavourite(Number(favouriteButton.dataset.id));
    }
});

// Search and filter events
searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);
sortFilter.addEventListener("change", filterMovies);

// Close modal
document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

// Initial website setup
displayMovies(movies);
displayRankings();
displayFavourites();
