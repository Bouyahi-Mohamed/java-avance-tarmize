import { getpost,getUserById } from "../api/api.js";
import { handlelogin, handleRegistration,handleAddPost, logout, } from '../api/Modal.js';
import render from '../App.js';
export function updateUI(index = 1) {
window.scrollTo({ top: 0, behavior: "auto" });
  return new Promise((resolve) => {
  const token = JSON.parse(localStorage.getItem('token')) || { logedin: false, id: '' };
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
  });
}
