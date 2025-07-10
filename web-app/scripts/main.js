// scripts/main.js
import { loadIndex }  from "./data.js";
import { renderVendorList } from "./ui.js";

let allVendors = [];

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const index = await loadIndex();
    allVendors = index.vendors; // Use .vendors property
    window.allVendors = allVendors;
    renderVendorList(allVendors);
  } catch (err) {
    document.getElementById("vendorResults").textContent = err.message;
    return;
  }

  document.getElementById("searchBox")
          .addEventListener("input", handleSearch);
});

/** Filter vendors by keyword against vendorName and topics */
function handleSearch(e) {
  const q = e.target.value.trim().toLowerCase();
  const filtered =
    !q
      ? allVendors
      : allVendors.filter(v =>
          v.vendorName.toLowerCase().includes(q) ||
          v.topics.some(t => t.toLowerCase().includes(q)));
  renderVendorList(filtered);
}
