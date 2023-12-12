import { updateMovieList } from "./operation.js";
import { setupMovieInteractions, setupModalInteractions } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  setupMovieInteractions();
  setupModalInteractions();
  updateMovieList();
});
