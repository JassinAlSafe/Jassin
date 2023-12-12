import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Function to search for a movie by title. 
export async function searchMovie(movieTitle) {
  try {
    // Defining a query on the "movies" collection where we use "titleLowercase" and match it the search term. 
    const moviesCollection = collection(db, "movies");
    const titleToSearch = movieTitle.toLowerCase();
    const getMovieName = query(
      moviesCollection,
      where("titleLowercase", "==", titleToSearch)
    );
    // Running the query and awaiting the results
    const querySnapshot = await getDocs(getMovieName);

    // Array to store the result 
    let movies = [];
    // Iterating over each document in the results and adding its data to the movies array. 
    querySnapshot.forEach((doc) => {
      movies.push(doc.data());
    });
    // Returning the array of movie data. 
    return movies;
  } catch (error) {
    // Used for debugging but this line logs the error and returns an empty array if something goes wrong. 
    console.error("Error", error);
    return [];
  }
}
