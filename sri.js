// // === OMDb Movie List Getter Script ===
// // Make sure you have an input with id="searchInput" and a div with id="movieList" in your HTML

// const API_KEY = "426d1496"; // <-- Replace this with your OMDb API key
// const searchInput = document.getElementById("searchInput");
// const searchButton = document.getElementById("searchButton");
// const movieList = document.getElementById("movieList");
// const errorMessage = document.getElementById("errorMessage");

// // When the user clicks the Search button
// searchButton.addEventListener("click", getMovieList);

// // Also trigger search when user presses Enter
// searchInput.addEventListener("keypress", function (e) {
//   if (e.key === "Enter") {
//     getMovieList();
//   }
// });

// async function getMovieList() {
//   const searchTerm = searchInput.value.trim();

//   if (searchTerm === "") {
//     showError("Please type a movie name!");
//     return;
//   }

//   movieList.innerHTML = ""; // clear old results
//   showError(""); // clear error message

//   try {
//     // Call the OMDb API
//     const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
//     const data = await response.json();

//     // Check if movies found
//     if (data.Response === "True") {
//       displayMovies(data.Search);
//     } else {
//       showError("No movies found 😔");
//     }
//   } catch (error) {
//     showError("Error fetching data. Please try again later.");
//   }
// }

// // Function to display movies
// function displayMovies(movies) {
//   movieList.innerHTML = "";

//   movies.forEach((movie) => {
//     const movieCard = document.createElement("div");
//     movieCard.classList.add("movie-card");

//     movieCard.innerHTML = `
//       <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}" alt="${movie.Title}">
//       <div class="movie-info">
//         <h3>${movie.Title}</h3>
//         <p>Year: ${movie.Year}</p>
//         <p>Type: ${movie.Type}</p>
//       </div>
//     `;

//     movieList.appendChild(movieCard);
//   });
// }

// // Function to show error message
// function showError(message) {
//   errorMessage.textContent = message;
// }

const API_KEY = "426d1496"; // Replace with your OMDb API key
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const movieList = document.getElementById("movieList");
const errorMessage = document.getElementById("errorMessage");

searchButton.addEventListener("click", getMovieList);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getMovieList();
});

async function getMovieList() {
  const searchTerm = searchInput.value.trim();
  movieList.innerHTML = "";
  errorMessage.textContent = "";

  if (searchTerm === "") {
    errorMessage.textContent = "Please enter a movie name!";
    return;
  }

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
    const data = await res.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      errorMessage.textContent = "No movies found 😢";
    }
  } catch (err) {
    errorMessage.textContent = "Error fetching data. Try again.";
  }
}

function displayMovies(movies) {
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}" alt="${movie.Title}">
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>
      </div>
    `;
    movieList.appendChild(card);
  });
}
