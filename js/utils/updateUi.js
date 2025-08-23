import { getpost,getUserById ,getPostById} from "../api/api.js";
import { handlelogin, handleRegistration,handleAddPost, logout, } from '../api/Modal.js';
import render from '../App.js';
import { renderDetailPost } from "../pages/detailPost.js";
export function updateUI(index = 1) {
window.scrollTo({ top: 0, behavior: "auto" });
  return new Promise((resolve) => {
  const token = JSON.parse(localStorage.getItem('token')) || { logedin: false, id: '' };
  const postId = localStorage.getItem('postId') || 1;
  if (window.location.pathname.endsWith('detailPost.html')) {
    Promise.all([
      getPostById(postId),
      getUserById(token.id)
    ]).then(([post,user]) => {
      renderDetailPost(post,user);
    });
  }
  else{
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
  resolve();
  }
  });
}

