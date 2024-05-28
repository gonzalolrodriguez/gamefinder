document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const resetButton = document.getElementById("reset-button");
    const genreFilter = document.getElementById("genre-filter");
    const ratingFilter = document.getElementById("rating-filter");
    const originFilter = document.getElementById("origin-filter");
    const resultsContainer = document.getElementById("results");

    const apiKey = "1d614784769c453cb3e03e33c9e19df6";
    const baseUrl = "https://api.rawg.io/api/games";

    function fetchGames(query) {
        let url = `${baseUrl}?key=${apiKey}&search=${query}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => displayGames(data.results))
            .catch((error) => console.error("Error fetching data:", error));
    }

    function displayGames(games) {
        resultsContainer.innerHTML = "";
        games.forEach((game) => {
            const gameCard = document.createElement("div");
            gameCard.classList.add("game-card");
            gameCard.innerHTML = `
                <img src="${game.background_image}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>Rating: ${game.rating}</p>
                <p>Géneros: ${game.genres
                    .map((genre) => genre.name)
                    .join(", ")}</p>
                <p>Plataformas: ${game.platforms
                    .map((platform) => platform.platform.name)
                    .join(", ")}</p>
            `;
            resultsContainer.appendChild(gameCard);
        });
    }

    function applyFilters(games) {
        let filteredGames = games;
        const genre = genreFilter.value;
        const rating = ratingFilter.value;
        const origin = originFilter.value;

        if (genre) {
            filteredGames = filteredGames.filter((game) =>
                game.genres.some((g) => g.name === genre)
            );
        }

        if (rating) {
            filteredGames = filteredGames.filter(
                (game) => Math.floor(game.rating) == rating
            );
        }

        if (origin) {
            filteredGames = filteredGames.filter((game) =>
                game.platforms.some((p) => p.platform.slug === origin)
            );
        }

        displayGames(filteredGames);
    }

    function fetchFilters() {
        fetch(`${baseUrl}?key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                const genres = [
                    ...new Set(
                        data.results.flatMap((game) =>
                            game.genres.map((genre) => genre.name)
                        )
                    ),
                ];
                genres.forEach((genre) => {
                    const option = document.createElement("option");
                    option.value = genre;
                    option.textContent = genre;
                    genreFilter.appendChild(option);
                });
            })
            .catch((error) => console.error("Error fetching filters:", error));
    }

    searchButton.addEventListener("click", () => {
        const query = searchInput.value;
        fetchGames(query);
    });

    resetButton.addEventListener("click", () => {
        searchInput.value = "";
        genreFilter.value = "";
        ratingFilter.value = "";
        originFilter.value = "";
        resultsContainer.innerHTML = "";
    });

    fetchFilters();
});

// Bootstrap form validation
(function () {
    'use strict';

    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

