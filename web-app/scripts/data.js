// scripts/data.js
const RAW_BASE = "https://raw.githubusercontent.com/amitmanchella/api-integration-snippet-library/main/";
const INDEX_URL = RAW_BASE + "metadata-index.json";

let indexCache = null;
const mdCache = new Map();

/** Download and cache the snippets index */
export async function loadIndex() {
  if (indexCache) return indexCache;
  const res = await fetch(INDEX_URL);
  if (!res.ok) throw new Error("Failed to fetch snippets index");
  indexCache = await res.json();
  return indexCache;
}

/** Fetch a Markdown file (by relative repo path) and cache it */
export async function loadSnippet(relPath) {
  if (mdCache.has(relPath)) return mdCache.get(relPath);
  const res = await fetch(RAW_BASE + relPath);
  if (!res.ok) throw new Error("Failed to fetch snippet: " + relPath);
  const text = await res.text();
  mdCache.set(relPath, text);
  return text;
}
