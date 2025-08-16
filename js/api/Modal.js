
import render from '../App.js';
import { postLogin, postRegistration} from './api.js';

function handlelogin() {
  var loginModal = document.getElementById('loginModal');
  if (!loginModal) return;
  // Listen for the login button click inside the modal
  var loginButton = loginModal.querySelector('.btn.btn-primary');
  if (!loginButton) return;
  loginButton.addEventListener('click', function () {
    var usernameInput = loginModal.querySelector('#username');
    var passwordInput = loginModal.querySelector('#password');
    if (!usernameInput || !passwordInput) return;
    let info = {
      username: usernameInput.value,
      password: passwordInput.value
    };
    postLogin(info);
    //close the modal after login
    var modal = bootstrap.Modal.getInstance(loginModal);
    if (modal) modal.hide();
    // Clear the input fields after login
    usernameInput.value = '';
    passwordInput.value = '';
    // Re-render the app to reflect the new login state
    render();
  });
}

function handleRegistration() {
  var registerModal = document.getElementById('registerModal');
  if (!registerModal) return;
  // Listen for the register button click inside the modal
  var registerButton = registerModal.querySelector('.btn.btn-primary');
  if (!registerButton) return;
  registerButton.addEventListener('click', function () {
    var usernameInput = registerModal.querySelector('#register-username');
    var nameInput = registerModal.querySelector('#register-name');
    var passwordInput = registerModal.querySelector('#register-password');
    var emailInput = registerModal.querySelector('#register-email');
    if (!usernameInput || !nameInput || !passwordInput || !emailInput) return;
    let info = {
      username: usernameInput.value,
      name: nameInput.value,
      password: passwordInput.value,
      email: emailInput.value
    };
    postRegistration(info);
    //close the modal after registration
    var modal = bootstrap.Modal.getInstance(registerModal);
    if (modal) modal.hide();
    // Clear the input fields after registration
    usernameInput.value = '';
    passwordInput.value = '';
    emailInput.value = '';
    // Re-render the app to reflect the new registration state
    render();
  });
}

export { handlelogin, handleRegistration };