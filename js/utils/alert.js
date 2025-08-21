export function showAlert(message,type = "warning") {
  const alertDiv = document.getElementsByClassName("show-alert")[0];
  alertDiv.className = `alert alert-${type} alert-dismissible fade show  zindex-toast`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
    <strong>${message}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv);
    }
  }, 3000);
}