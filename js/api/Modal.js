import render from '../App.js';
import { postLogin, postRegistration } from './api.js';

function handlelogin() {
  var loginModal = document.getElementById('loginModal');
  if (!loginModal) return;
  // Listen for the login button click inside the modal
  var loginButton = loginModal.querySelector('.btn.btn-primary');
  if (!loginButton) return;
  loginButton.addEventListener('click', async function () {
    var usernameInput = loginModal.querySelector('#username');
    var passwordInput = loginModal.querySelector('#password');
    if (!usernameInput || !passwordInput) return;
    let info = {
      username: usernameInput.value,
      password: passwordInput.value
    };
    //close the modal after login
    var modal = bootstrap.Modal.getInstance(loginModal);
    if (modal) modal.hide();
    // Clear the input fields after login
    usernameInput.value = '';
    passwordInput.value = '';
    // Re-render the app to reflect the new login state
    try {
      await postLogin(info);
      render();
    } catch (e) {
      alert('Login failed. Please check your credentials and try again.');
      console.error('Login error:', e);
    }
  });
}

function handleRegistration() {
  var registerModal = document.getElementById('registerModal');
  if (!registerModal) return;
  // Listen for the register button click inside the modal
  var registerButton = registerModal.querySelector('.btn.btn-primary');
  if (!registerButton) return;
  registerButton.addEventListener('click', async function (event) {
    event.preventDefault();
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
    try {
      const response = await postRegistration(info);
      if (response) {
        console.log('Registration response:', response.data);
        var loginInfo = {
          username: usernameInput.value,
          password: passwordInput.value
        };
        console.log('Login info:', loginInfo);

        // Close modal and clear fields before login
        var modal = bootstrap.Modal.getInstance(registerModal);
        if (modal) modal.hide();
        usernameInput.value = '';
        passwordInput.value = '';
        emailInput.value = '';
        alert('Registration successful! Logging you in...');

        // Await login and then render
        try {
          await postLogin(loginInfo);
          render();
        } catch (e) {
          alert('Login failed after registration. Please try logging in manually.');
          console.error('Login error after registration:', e);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  });
}

export { handlelogin, handleRegistration };