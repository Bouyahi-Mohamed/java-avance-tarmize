import { AddPost, postLogin, postRegistration } from './api.js';
import { updateUI } from '../utils/updateUi.js';
// import alert function
import { showAlert } from '../utils/alert.js';

// Removed unused 'token' variable

function handlelogin() {
  var loginModal = document.getElementById('loginModal');
  if (!loginModal) return;
  // Listen for the login button click inside the modal
  var loginButton = loginModal.querySelector('.btn.btn-primary');
  if (!loginButton) return;

  // Remove previous click event listeners by replacing the button with a clone
  const newButton = loginButton.cloneNode(true);
  loginButton.parentNode.replaceChild(newButton, loginButton);

  newButton.addEventListener('click', async function () {
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
      setTimeout(() => {
        updateUI();
      }, 1000);
    } catch (e) {
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
  // Remove previous listeners by replacing the button with a clone
  const newButton = registerButton.cloneNode(true);
  registerButton.parentNode.replaceChild(newButton, registerButton);
  newButton.addEventListener('click', async function (event) {
    event.preventDefault();
    var usernameInput = registerModal.querySelector('#register-username');
    var nameInput = registerModal.querySelector('#register-name');
    var avatarInput = registerModal.querySelector('#Profile-img');
    var passwordInput = registerModal.querySelector('#register-password');
    var emailInput = registerModal.querySelector('#register-email');
    if (!usernameInput || !nameInput || !passwordInput || !emailInput) return;
    let info = new FormData();
    info.append('username', usernameInput.value);
    info.append('name', nameInput.value);
    if (avatarInput && avatarInput.files && avatarInput.files.length > 0) {
      info.append('image', avatarInput.files[0]);
    }
    info.append('password', passwordInput.value);
    info.append('email', emailInput.value);
    try {
      const response = await postRegistration(info);
      if (response) {
        var loginInfo = {
          username: usernameInput.value,
          password: passwordInput.value
        };
        // uplod image profile in token 
        
       
        // Close modal and clear fields before login
        closeModel(registerModal)
        usernameInput.value = '';
        nameInput.value = '';
        avatarInput.value = '';
        passwordInput.value = '';
        emailInput.value = '';
        // Await login and then render
        try {
          await postLogin(loginInfo);
          showAlert('Registration successful!', 'success');
          setTimeout(() => {
            updateUI();
          }, 1000);
        } catch (e) {
          closeModel(registerModal)
          showAlert(e.response.data.message, 'danger');
        }
      }
    } catch (e) {
      closeModel(registerModal)
      updateUI();
      setTimeout(() => {
        showAlert(e.response.data.message, 'danger');
      }, 2000);
    }
  });
}

function logout() {
  let logout = document.querySelector('.logout');
  // Remove previous listeners by replacing the button with a clone
  const newButton = logout.cloneNode(true);
  logout.parentNode.replaceChild(newButton, logout);
  if (newButton) {
    newButton.addEventListener('click', async function () {
      try {
        localStorage.removeItem('token');
        // Re-render the app to reflect the logout state
        showAlert('Logout successful!', 'success');
        setTimeout(() => {
          updateUI();
        }, 1000);
      } catch (error) {
        console.error('Error during logout:', error);
        showAlert('Logout failed!', 'danger');
      }
    });
  } else {
    console.log('Logout button not found');
  }
}
// Handle adding a new post
function handleAddPost() {
  var addPostModal = document.getElementById('addPostModal');
  if (!addPostModal) return;
  var addPostButton = addPostModal.querySelector('.add-post-btn');
  if (!addPostButton) return;

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
      showAlert('Adding post...', 'info', false);
      await AddPost(formData);
      showAlert('Post added successfully!', 'success');
      setTimeout(() => {
        updateUI();
      }, 1000);
    } catch (e) {
      closeModel(addPostModal);
      console.error('AddPost error:', e);
      setTimeout(() => {
        showAlert(e?.response?.data?.message || 'Add post failed!', 'danger');
      }, 500);
    }
  });
}

async function UpdateProfilePost() {
  return new Promise((resolve) => {
    var updatePostModal = document.getElementById('editPostModal');
    if (!updatePostModal) return;
    var updatePostButton = updatePostModal.querySelector('.update-post-btn');
    if (!updatePostButton) return;

    // Remove previous listeners by replacing the button with a clone
    const newButton = updatePostButton.cloneNode(true);
    updatePostButton.parentNode.replaceChild(newButton, updatePostButton);
    newButton.addEventListener('click', async function (event) {
      event.preventDefault();
      var updateNameInput = updatePostModal.querySelector('#update-name');
      var updateBodyInput = updatePostModal.querySelector('#update-body');
      var updateImageInput = updatePostModal.querySelector('#update-img');
      if (!updateNameInput || !updateBodyInput) return;
      let formDataUpdate = new FormData();
      formDataUpdate.append('title', updateNameInput.value);
      formDataUpdate.append('body', updateBodyInput.value);
      // Only append image if a file is selected
      if (updateImageInput && updateImageInput.files && updateImageInput.files.length > 0) {
        formDataUpdate.append('image', updateImageInput.files[0]);
      }
      formDataUpdate.append('_method', 'PUT');
      resolve(formDataUpdate);
    });
  });
}
function closeModel(name){
var modal = bootstrap.Modal.getInstance(name);
    if (modal) modal.hide();

}
export { handlelogin, handleRegistration, logout, handleAddPost, UpdateProfilePost };
