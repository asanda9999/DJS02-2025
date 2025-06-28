import { podcasts, genres, seasons } from "./data.js";
import { showModal, setupModalClose } from "./modal.js";

/**
 * Converts genre IDs into their corresponding genre titles.
 * @param {string[]} genreIds
 * @returns {string[]} 
 */
function getGenreTitles(genreIds) {
  return genreIds.map((id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.title : "Unknown";
  });
}

/**
 * Adds enriched information to a podcast object including
 * readable genres, seasons count, formatted update date, and season details.
 * @param {Object} podcast
 * @returns {Object} 
 */
function enrichPodcast(podcast) {
  const seasonInfo = seasons.find((s) => s.id === podcast.id);
  const updatedDate = new Date(podcast.updated);
  return {
    ...podcast,
    genres: getGenreTitles(podcast.genres),
    seasons: seasonInfo ? seasonInfo.seasonDetails.length : podcast.seasons || 0,
    updated: isNaN(updatedDate)
      ? ""
      : updatedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    seasonDetails: seasonInfo ? seasonInfo.seasonDetails : [],
  };
}

/**
 * Initializes the podcast previews and modal event listeners
 * once the DOM content has fully loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.classList.add("podcast-container");
  document.body.appendChild(container);

  const fragment = document.createDocumentFragment();

  podcasts.forEach((p) => {
    const data = enrichPodcast(p);
    const podcastElement = document.createElement("podcast-preview");
    podcastElement.data = data;

    podcastElement.addEventListener("podcast-select", (e) => {
      showModal(e.detail);
    });

    fragment.appendChild(podcastElement);
  });

  container.appendChild(fragment);

  setupModalClose();
});
