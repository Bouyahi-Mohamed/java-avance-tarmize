import render from '../App.js';
import { AddPost, getpost, postLogin, postRegistration } from './api.js';

const token = JSON.parse(localStorage.getItem('token')) || { logedin: false, username: '' };

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

function logout() {
  let logout = document.querySelector('.logout');
  if (logout) {
    console.log('Logout button found');
    logout.addEventListener('click', function () {
      localStorage.removeItem('token');
      // Re-render the app to reflect the logout state
      getpost().then(() => {
        render();
      });
    });
  } else {
    console.log('Logout button not found');
  }
}


// Handle adding a new post
function handleAddPost() {
  console.log('handleAddPost called');
  var addPostModal = document.getElementById('addPostModal');
  if (!addPostModal) {
    console.log('addPostModal not found');
    return;
  }
  var addPostButton = addPostModal.querySelector('.add-post-btn');
  if (!addPostButton) {
    console.log('addPostButton not found');
    return;
  }

  addPostButton = addPostModal.querySelector('.add-post-btn');
  addPostButton.addEventListener('click', function (event) {
    event.preventDefault();
    var postNameInput = addPostModal.querySelector('#post-name');
    var postBodyInput = addPostModal.querySelector('#post-body');
    var postImageInput = addPostModal.querySelector('#Post-img');
    if (!postNameInput || !postBodyInput) return;
    // Create a FormData object to handle file uploads
    // this is necessary for file uploads
    // it is a instance of FormData
    let formData = new FormData();
    formData.append('title', postNameInput.value);
    formData.append('body', postBodyInput.value);
    // file is a arry but i want only the first one
    formData.append('image', postImageInput ? postImageInput.files[0] : null);
   
    AddPost(formData).then(response => {
      console.log('Post added successfully:', response.data);
      // Re-fetch posts and render the updated list
      return getpost();
    }).then(posts => {
      render(posts);  // Render the updated posts
    }).catch(error => {
      console.error('Error adding post:', error);
      alert('Failed to add post. Please try again.');
    });
   
    // Close the modal after adding the post
    var modal = bootstrap.Modal.getInstance(addPostModal);
    if (modal) modal.hide();
    postNameInput.value = '';
    postBodyInput.value = '';
    postImageInput.value = '';
  });
}

export { handlelogin, handleRegistration, logout, handleAddPost };