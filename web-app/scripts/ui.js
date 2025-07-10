// scripts/ui.js
import { loadSnippet } from "./data.js";

const resultsEl  = document.getElementById("vendorResults");
const snippetEl  = document.getElementById("snippetView");
let activeVendor = null;

/** Render vendor cards from an array of metadata objects */
export function renderVendorList(arr) {
  resultsEl.textContent = "";
  if (!arr.length) {
    resultsEl.textContent = "No matches found.";
    snippetEl.textContent = "";
    return;
  }

  arr.forEach(v => {
    const card = document.createElement("div");
    card.className = "vendor-card" + (activeVendor && activeVendor.vendorName === v.vendorName ? " active" : "");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${v.vendorName} snippet`);
    card.onclick = () => showSnippet(v);
    card.onkeydown = e => { if (e.key === "Enter" || e.key === " ") showSnippet(v); };

    // Title and language
    const title = document.createElement("span");
    title.className = "vendor-title";
    title.textContent = v.vendorName;
    const lang = document.createElement("span");
    lang.className = "vendor-lang";
    lang.textContent = v.language;
    title.appendChild(lang);
    card.appendChild(title);

    // Topic chips
    const chips = document.createElement("div");
    v.topics.forEach(t => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = t;
      chips.appendChild(chip);
    });
    card.appendChild(chips);

    resultsEl.appendChild(card);
  });
}

/** Load, convert, and display a snippet with loading state */
async function showSnippet(vendorMeta) {
  activeVendor = vendorMeta;
  renderVendorList(window.allVendors || []); // re-render to highlight
  snippetEl.innerHTML = '<div style="color:#a1a1aa;font-size:1.1rem;">Loading…</div>';
  try {
    const md = await loadSnippet(vendorMeta.snippetPath);
    snippetEl.innerHTML = marked.parse(md);
  } catch (err) {
    snippetEl.innerHTML = `<div style="color:#f87171;">${err.message}</div>`;
  }
}
