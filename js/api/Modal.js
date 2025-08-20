import { AddPost, getpost, postLogin, postRegistration }from './api.js';
import render from '../App.js';
// import alert function
import { showAlert } from '../utils/alert.js';

// Removed unused 'token' variable

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
    closeModel(loginModal)
    // Clear the input fields after login
    usernameInput.value = '';
    passwordInput.value = '';
    // Re-render the app to reflect the new login state
    try {
      await postLogin(info);
      showAlert('Login successful!', 'success');
    } catch (e) {
      // await showAlert('Login failed. Please check your credentials and try again.');
      getpost();
      showAlert(e.response.data.message, 'danger');
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
        var loginInfo = {
          username: usernameInput.value,
          password: passwordInput.value
        };
       
        // Close modal and clear fields before login
        closeModel(registerModal)
        usernameInput.value = '';
        passwordInput.value = '';
        emailInput.value = '';
        // Await login and then render
        try {
          await postLogin(loginInfo);
          showAlert('Registration successful!','success');
        } catch (e) {
          closeModel(registerModal)
          getpost();
      showAlert(e.response.data.message, 'danger');
        }
      }
    } catch (e) {
      closeModel(registerModal)
     showAlert(e.response.data.message, 'danger');
      getpost();
    }
  });
}

 function logout() {
  let logout = document.querySelector('.logout');
  if (logout) {
    logout.addEventListener('click', async function () {
      localStorage.removeItem('token');
      // Re-render the app to reflect the logout state
      await getpost();
      showAlert('Logout successful!','success');
    });
  } else {
    console.log('Logout button not found');
  }
}
// Handle adding a new post
function handleAddPost() {
  var addPostModal = document.getElementById('addPostModal');
  if (!addPostModal) {
    return;
  }
  var addPostButton = addPostModal.querySelector('.add-post-btn');
  if (!addPostButton) {
    return;
  }

  // Remove previous listeners by replacing the button with a clone
  const newButton = addPostButton.cloneNode(true);
  addPostButton.parentNode.replaceChild(newButton, addPostButton);

  newButton.addEventListener('click', async function (event) {
    event.preventDefault();
    var postNameInput = addPostModal.querySelector('#post-name');
    var postBodyInput = addPostModal.querySelector('#post-body');
    var postImageInput = addPostModal.querySelector('#Post-img');
    if (!postNameInput || !postBodyInput) return;
    let formData = new FormData();
    formData.append('title', postNameInput.value);
    formData.append('body', postBodyInput.value);
    // Only append image if a file is selected
    if (postImageInput && postImageInput.files && postImageInput.files.length > 0) {
      formData.append('image', postImageInput.files[0]);
    }
    closeModel(addPostModal);
    postNameInput.value = '';
    postBodyInput.value = '';
    if (postImageInput) postImageInput.value = '';
    try {
      await AddPost(formData);
      showAlert('Post added successfully!', 'success');
    } catch (e) {
      closeModel(addPostModal);
      console.error('AddPost error:', e);
      showAlert(e.response.data.message, 'danger');

    }
  });
}



function closeModel(name){
var modal = bootstrap.Modal.getInstance(name);
    if (modal) modal.hide();

}
export { handlelogin, handleRegistration, logout, handleAddPost };
