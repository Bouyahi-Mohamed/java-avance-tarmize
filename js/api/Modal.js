
import render from '../App.js';
import { postLogin } from './api.js';
function handlelogin() {
  var loginModal = document.getElementById('loginModal');
  // Listen for the login button click inside the modal
  var loginButton = loginModal.querySelector('.btn.btn-primary');
  loginButton.addEventListener('click', function () {
    var usernameInput = loginModal.querySelector('#username');
    var passwordInput = loginModal.querySelector('#password');
    let info = {
      username: usernameInput.value,
      password: passwordInput.value
    };
    postLogin(info);
    //close the modal after login
    var modal = bootstrap.Modal.getInstance(loginModal);
    modal.hide();
    // Clear the input fields after login
    usernameInput.value = '';
    passwordInput.value = '';
    // Re-render the app to reflect the new login state
    render();
  });
 
}
export { handlelogin };