

export function extractUserIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('userId');
}
