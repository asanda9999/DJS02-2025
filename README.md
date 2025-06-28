
# 🎧 PodcastPreview Web Component

A reusable Web Component (`<podcast-preview>`) for displaying podcast information using the Shadow DOM. Supports encapsulated styling, dynamic data binding, and interaction via custom events.

---

## 🚀 Usage

### 1. Registering the Component

Include the component script in your HTML or import it via JavaScript:

#### HTML:
```html
<script type="module" src="./PodcastPreview.js"></script>
```

#### JavaScript (ES Modules):
```js
import './PodcastPreview.js';
```

Once registered, you can use the custom element directly in HTML:

```html
<podcast-preview></podcast-preview>
```

## 📡 Listening for Interaction Events

When the component is clicked, it dispatches a `CustomEvent` named `podcast-select` with the podcast data in `event.detail`.

### Example:
```js
document.addEventListener("podcast-select", (event) => {
  const podcast = event.detail;
  console.log("Podcast selected:", podcast);

});
```

✅ The event is:
- **Bubbling** – Can be captured at parent levels
- **Composed** – Escapes the Shadow DOM and can be listened for in global scope

---

## 💅 Styling Notes

The component uses Shadow DOM to encapsulate its styles. If you need external control:
- Wrap it in a container and style the wrapper
- Use CSS variables if exposed (you can add `--` prefixed props to the component later)

---

## 🛠 Development Tips

- Use helper utilities to **enrich data before binding**, such as:
  - Mapping genre IDs to titles
  - Formatting timestamps for the `updated` field

---