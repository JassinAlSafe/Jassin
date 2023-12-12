// Import functions from other modules
import { updateMovieList } from "./operation.js";
import { setupMovieInteractions, setupModalInteractions } from "./ui.js";

// Adding an event listener for when the DOM content is fully loaded 
document.addEventListener("DOMContentLoaded", () => {
  // Setting up interactions related to the movies in the ui
  setupMovieInteractions();
  // Setting up intercations related to the modal in the ui
  setupModalInteractions();
  //Updating the list of movies on the webpage but the name is a bit misleading. this shows the movie-list on the front page aswell. 
  updateMovieList();
});
