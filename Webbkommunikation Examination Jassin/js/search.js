import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export async function searchMovie(movieTitle) {
  try {
    const moviesCollection = collection(db, "movies");
    const titleToSearch = movieTitle.toLowerCase();
    const getMovieName = query(
      moviesCollection,
      where("titleLowercase", "==", titleToSearch)
    );
    const querySnapshot = await getDocs(getMovieName);

    let movies = [];
    querySnapshot.forEach((doc) => {
      movies.push(doc.data());
    });

    return movies;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}
