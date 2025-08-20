export function showAlert(message,type = "warning") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show  zindex-toast`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
    <strong>${message}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  // Append the alert div to header
  document.getElementsByClassName("show-alert")[0].appendChild(alertDiv);
}