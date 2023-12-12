import { toggleWatchedStatus, deleteMovie, addMovie } from "./operation.js";
import { searchMovie } from "./search.js";

// Function to display search results
export function displaySearchResult(movies) {
    // get the element that displays the search result. 
  const searchResult = document.getElementById("searchResults");
  searchResult.innerHTML = "";

  // Displays a message if no movies are found 
  if (movies.length === 0) {
    searchResult.innerHTML = "<p> No movies found, </p> ";
    return;
  }
  
  // Here we Loop through each movie and display its details
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

  //Here we get the modal element and make it visible
  const modal = document.getElementById("descriptionModal");
  modal.style.display = "block";

  //Here we add an event listener to the close button of the modal. 
  const closeModalBtn = document.getElementById("closeDescModalBtn");
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Function to setup interactions for the modal
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

//Function for handeling watched and delete btn or described as handle interactions related to movies. 
export function setupMovieInteractions() {
    //Getting the button for adding a movie and setting up a eventListener. 
  const addMovieBtn = document.querySelector("#addMovieBtn");
  addMovieBtn.addEventListener("click", addMovie);

  // Here we get the search button and setting its click event listener.
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", async () => {
    const searchInput = document.getElementById("searchInput");
    const titleToSearch = searchInput.value;

    // Here we handle empty search input with an error message
    if (!titleToSearch) {
      document.querySelector(".movie-list").style.display = "block";
      console.error("error", error);
      return;
    }

    // Here we try to search for a movie and display the results
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
    //Getting the id of the clicked element 
    const targetId = event.target.id;

    // Here we handle the clic on watched button
    if (targetId.startsWith("watchedBtn_")) {
        // Here we toggle the watched status of the movie based on its id
      toggleWatchedStatus(targetId.split("_")[1]);
    } else if (targetId.startsWith("deleteBtn_")) {  // Here we handle the click on the delete button and deleting a movie based on its id. 
      deleteMovie(targetId.split("_")[1]);
    }
  });
}
