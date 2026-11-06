// src/utils/findImage.js
// `images` is the object returned by import.meta.glob (file path -> image URL).
// Returns the URL of the first file whose name contains `keyword`, or null.
export default function findImage(images, keyword) {
  const key = keyword.toLowerCase();
  const path = Object.keys(images).find((p) => p.toLowerCase().includes(key));
  return path ? images[path] : null;
}

// "../assets/awards/draper.png" -> "draper"
export function fileLabel(path) {
  return path.split('/').pop().replace(/\.[^.]+$/, '');
}