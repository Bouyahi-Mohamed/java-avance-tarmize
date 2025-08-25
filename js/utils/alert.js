export function showAlert(message, type = "warning", closeauto = true) {
  const alertDiv = document.getElementsByClassName("show-alert")[0];
  if (!alertDiv) {
    console.error("No element with class 'show-alert' found.");
    return;
  }
  alertDiv.className = `alert alert-${type} alert-dismissible fade show zindex-toast`;
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = `
    <strong>${message}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  if (closeauto) {
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 3000);
  }
}