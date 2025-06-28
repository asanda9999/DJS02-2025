

export function showModal(podcast) {
  document.getElementById("modalTitle").textContent = podcast.title;
  document.getElementById("modalImage").src = podcast.image;
  document.getElementById("modalDesc").textContent = podcast.description || "No description provided.";

  const genresContainer = document.getElementById("modalGenres");
  genresContainer.innerHTML = podcast.genres.map((g) => `<span class="tag">${g}</span>`).join("");

  document.getElementById("modalUpdated").textContent = `Last updated: ${podcast.updated || "N/A"}`;

  const seasonList = document.getElementById("seasonList");
  seasonList.innerHTML = podcast.seasonDetails.length
    ? podcast.seasonDetails.map((s, i) => `
        <li class="season-item">
          <strong>${s.title}</strong>
          <span class="episodes">${s.episodes} episode${s.episodes !== 1 ? 's' : ''}</span>
        </li>
      `).join("")
    : "<li>No season details available.</li>";

  document.getElementById("modal").classList.remove("hidden");
}

export function setupModalClose() {
  const closeButton = document.getElementById("closeModal");
  closeButton.addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
  });
}
