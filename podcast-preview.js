
class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
  display: block;
  width: 100%;
  max-width: 320px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: system-ui, sans-serif;
  cursor: pointer;
  transition: transform 0.2s ease;
}

:host(:hover) {
  transform: scale(1.02);
}

img#cover {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

h3#title {
  font-size: 1.2rem;
  margin: 0.75rem;
  color: #222;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0.75rem;
}

.tag {
  background: #eef0f3;
  color: #444;
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
}

.seasons,
.updated {
  font-size: 0.75rem;
  color: #666;
  margin: 0.25rem 0.75rem 0.75rem;
}

      </style>

      <img id="cover" alt="Podcast cover" />
      <h3 id="title">Loading...</h3>
      <div class="tags" id="tags"></div>
      <div class="seasons" id="seasons"></div>
      <div class="updated" id="updated"></div>
    `;

    this._data = null;
    this._onClick = this._onClick.bind(this);
  }

 
  connectedCallback() {
    this.addEventListener("click", this._onClick);
  }

 
  disconnectedCallback() {
    this.removeEventListener("click", this._onClick);
  }

  /**
   * Dispatches the 'podcast-select' event with the podcast data.
   * @private
   */
  _onClick() {
    if (!this._data) return;
    this.dispatchEvent(new CustomEvent("podcast-select", {
      detail: this._data,
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Set the podcast data and trigger rendering.
   * @param {Object} value 
   */
  set data(value) {
    this._data = value;
    this._render();
  }

  /**
   * Get the current podcast data.
   * @returns {Object|null}
   */
  get data() {
    return this._data;
  }

  /**
   * Renders the podcast data to the shadow DOM.
   * @private
   */
  _render() {
    if (!this._data) return;

    const cover = this.shadowRoot.getElementById("cover");
    const title = this.shadowRoot.getElementById("title");
    const tags = this.shadowRoot.getElementById("tags");
    const seasons = this.shadowRoot.getElementById("seasons");
    const updated = this.shadowRoot.getElementById("updated");

    cover.src = this._data.image || "";
    cover.alt = `${this._data.title || "Podcast"} cover`;

    title.textContent = this._data.title || "Untitled";

    tags.innerHTML = (this._data.genres || [])
      .map((g) => `<span class="tag">${g}</span>`)
      .join("");

    seasons.textContent = `${this._data.seasons} season${this._data.seasons !== 1 ? "s" : ""}`;
    updated.textContent = this._data.updated || "";
  }
}

customElements.define("podcast-preview", PodcastPreview);
