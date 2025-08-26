import { getpost,getUserById ,getPostById, getPostsUser} from "../api/api.js";
import { handlelogin, handleRegistration,handleAddPost, logout, } from '../api/Modal.js';
import { renderProfilePage } from "../pages/profile.js";
import render from '../App.js';
import { renderDetailPost } from "../pages/detailPost.js";
import { showAlert } from "./alert.js";
import { extractUserIdFromURL } from "./extractParams.js";
export function updateUI(index = 1) {
  window.scrollTo({ top: 0, behavior: "auto" });
  const token = JSON.parse(localStorage.getItem('token')) || { logedin: false, id: '' };
  if (window.location.pathname.endsWith('detailPost.html')) {
    Promise.all([
      getPostById(),
      getUserById(token.id)
    ]).then(([post, user]) => {
      renderDetailPost(post, user);
    });
  }
  else if (window.location.pathname.endsWith('profile.html')) {
    if (token.logedin && token.id) {
      Promise.all([
        getPostsUser(extractUserIdFromURL()),
        getUserById(extractUserIdFromURL()),
        getUserById(token.id)
      ]).then(([posts, user, currentUser]) => {
        renderProfilePage(posts, user, currentUser);
        logout();
      });
    } else {
      showAlert('You must be logged in to view the profile page.', 'warning');
      setTimeout(() => {
        window.location.href = '../html/index.html';
      }, 2000);
    }
  } else {
    if (token.logedin && token.id) {
      Promise.all([
        getpost(index),
        getUserById(token.id)
      ]).then(([posts, user]) => {
        render(posts, user);
        handlelogin();
        handleRegistration();
        handleAddPost();
        logout();
      });
    } else {
      getpost().then(posts => {
        render(posts, null);
        handlelogin();
        handleRegistration();
        handleAddPost();
        logout();
      });
    }
  }
}

