import { db } from "./firebase.js";

import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  where,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("movieModal");
const searchBtn = document.getElementById("searchBtn");

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

//Function to search for a movie
async function searchMovie(movieTitle) {
  const moviesCollection = collection(db, "movies");
  const getMovieName = query(
    moviesCollection,
    where("title", "==", movieTitle)
  );
  const querySnapshot = await getDocs(getMovieName);

  let movies = [];
  querySnapshot.forEach((doc) => {
    movies.push(doc.data());
  });

  displaySearchResult(movies);
}

//Function to display search result
function displaySearchResult(movies) {
  const searchResult = document.getElementById("searchResults");
  searchResult.innerHTML = "";

  if (movies.length === 0) {
    searchResult.innerHTML = "<p> No movies found, </p> ";
    return;
  }

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.innerHTML = `
    <img src = "${movie.image}" /> 
    <h1>${movie.title} </h1>
    <h2>${movie.genre} </h2>
    <h3>${movie.releaseDate}</h3>
    `;
    searchResult.appendChild(movieElement);
  });
}

// Function for adding Movie
async function addMovie() {
  try {
    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const releaseDate = document.getElementById("releaseDate").value;

    // Movie Collection in firebase
    const movieCollectionRef = collection(db, "movies");

    //Here we want to check if a movie with the same title already exists
    const titleQuery = query(movieCollectionRef, where("title", "==", title));
    const existingMovies = await getDocs(titleQuery);
    console.log(existingMovies);

    if (!existingMovies.empty) {
      console.log(
        "Movie with the same title already exists in the Movie Library"
      );
      return;
    }

    // Adding Movie by creating a new document with an auto generated ID in firebase
    await addDoc(movieCollectionRef, {
      title: title,
      genre: genre,
      releaseDate: releaseDate,
      watched: false,
    });

    // We want to clear the form after adding the movie
    document.getElementById("addMovieForm").reset();

    // Update the movie list
    updateMovieList();
  } catch (error) {
    console.log("Error adding/updating document: ", error);
  }
}

//Function for handeling watched and delete btn
function handleMovieListClick(event) {
  const targetId = event.target.id;

  if (targetId.startsWith("watchedBtn_")) {
    toggleWatchedStatus(targetId.split("_")[1]);
  } else if (targetId.startsWith("deleteBtn_")) {
    deleteMovie(targetId.split("_")[1]);
  }
}

movieList.addEventListener("click", handleMovieListClick);

// Function to update the movie list we have on the page
async function updateMovieList() {
  try {
    const movieList = document.getElementById("movieList");

    //Clear the existing List
    movieList.innerHTML = "";

    //Get all movies from the database
    const querySnapshot = await getDocs(collection(db, "movies"));

    querySnapshot.forEach((doc) => {
      const movieData = doc.data();
      console.log(movieData);

      //Create card for each movie
      const card = document.createElement("div");
      card.classList.add("card");

      // Create a list item for each movie
      const li = document.createElement("li");
      li.innerHTML = `
            <div class = "grid">
            <section class ="poster">
            <img src="${movieData.image}" class="movie-poster">
            </section>
            <section class="movie-info">
            <div class="fixed-info">
            <span>${movieData.title} - ${movieData.genre} - ${movieData.releaseDate}</span>
            </div>
            <div class ="front">
            <button id="watchedBtn_${doc.id}">Mark as Watched</button>
            <button id="deleteBtn_${doc.id}">Delete</button>
            </div>
            </section>
            </div>

            `;

      if (movieData.watched) {
        li.style.textDecoration = "line-through";
      }

      card.appendChild(li);
      movieList.appendChild(card);

      const posterImage = li.querySelector(".movie-poster");
      posterImage.addEventListener("click", () =>
        showDescriptionModal(movieData.description)
      );
    });
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
}

// We want the user to click on a movie poster and the descripton shows up using modal
function showDescriptionModal(description) {
  const modalDescription = document.getElementById("modalDescription");
  modalDescription.textContent = description;

  const modal = document.getElementById("descriptionModal");
  modal.style.display = "block";

  const closeModalBtn = document.getElementById("closeDescModalBtn");
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Function to mark a movie as watched
async function toggleWatchedStatus(movieId) {
  try {
    // We want to get the current state of the "watched" property
    const movieRef = doc(collection(db, "movies"), movieId);
    const docSnapshot = await getDoc(movieRef);

    if (docSnapshot.exists()) {
      const currentWatchedStatus = docSnapshot.data().watched;

      // Update the "watched" property in the database
      await updateDoc(movieRef, {
        watched: !currentWatchedStatus, //Here we toggle the watched status
      });

      //Update the movie list
      updateMovieList();
    }
  } catch (error) {
    console.error("Error updating watched status ", error);
  }
}

// Function to delete a movie
async function deleteMovie(movieId) {
  try {
    //Delete the movie from the database
    await deleteDoc(doc(collection(db, "movies"), movieId));

    //Update the movie list
    updateMovieList();
  } catch (error) {
    console.error("Error deleting movie", error);
  }
}

// Adding the addMovieButton
let addMovieBtn = document
  .querySelector("#addMovieBtn")
  .addEventListener("click", addMovie);

searchBtn.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput");
  searchMovie(searchInput.value);
});

updateMovieList();
