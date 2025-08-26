
export function showLoader() {
  const loader = document.querySelector(".loading-indicator");
  loader.classList.add("active");
}

export function hideLoader() {
  const loader = document.querySelector(".loading-indicator");
  if (loader) {
    loader.classList.remove("active");
  }
}
