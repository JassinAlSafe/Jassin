import { toggleWatchedStatus, deleteMovie, addMovie } from "./operation.js";
import { searchMovie } from "./search.js";

export function displaySearchResult(movies) {
  const searchResult = document.getElementById("searchResults");
  searchResult.innerHTML = "";

  if (movies.length === 0) {
    searchResult.innerHTML = "<p> No movies found, </p> ";
    return;
  }

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("searchedImage");
    movieElement.innerHTML = `
      <img src = "${movie.image}" /> 
      <h1>${movie.title} </h1>
      <h2>${movie.genre} </h2>
      <h3>${movie.releaseDate}</h3>
      
      `;
    searchResult.appendChild(movieElement);
  });
}

// We want the user to click on a movie poster and the descripton shows up using modal
export function showDescriptionModal(description) {
  const modalDescription = document.getElementById("modalDescription");
  modalDescription.textContent = description;

  const modal = document.getElementById("descriptionModal");
  modal.style.display = "block";

  const closeModalBtn = document.getElementById("closeDescModalBtn");
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

export function setupModalInteractions() {
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("movieModal");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

//Function for handeling watched and delete btn
export function setupMovieInteractions() {
  const addMovieBtn = document.querySelector("#addMovieBtn");
  addMovieBtn.addEventListener("click", addMovie);

  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", async () => {
    const searchInput = document.getElementById("searchInput");
    const titleToSearch = searchInput.value;

    if (!titleToSearch) {
      document.querySelector(".movie-list").style.display = "block";
      console.error("error", error);
      return;
    }

    try {
      const movies = await searchMovie(titleToSearch);
      document.querySelector(".movie-list").style.display = "none";
      displaySearchResult(movies);
    } catch (error) {
      console.error("Error fetching search result", error);
    }
  });

  const movieList = document.getElementById("movieList");
  movieList.addEventListener("click", (event) => {
    const targetId = event.target.id;

    if (targetId.startsWith("watchedBtn_")) {
      toggleWatchedStatus(targetId.split("_")[1]);
    } else if (targetId.startsWith("deleteBtn_")) {
      deleteMovie(targetId.split("_")[1]);
    }
  });
}
