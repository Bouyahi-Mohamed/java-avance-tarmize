import { updateUI } from "./utils/updateUi.js";
import { getpost, getUserById } from "./api/api.js";
import {
  handlelogin,
  handleRegistration,
  handleAddPost,
  logout,
} from "./api/Modal.js";

import { header,post,navPagination,handlePagination,detailPost} from "./pages/index.js";

// save token in localStorage
if (!localStorage.getItem("token")) {
  let userToken = {   
    token: "",
    id: "",
    logedin: false,
  };
  localStorage.setItem("token", JSON.stringify(userToken));
}

export default function render(posts = [], user = {}) {
  // Get the root element where the content will be rendered

  const ROOT = document.getElementById("root");

  const token = JSON.parse(localStorage.getItem("token")) || {
    logedin: false,
    id: "",
  };
  

  let HTML = `
  ${header(user)}
  <div class='container show-alert' style='width: 69%; margin: 0 auto; margin-bottom: 10px;'></div>
  <!-- start main content -->
  ${
    token.logedin
      ? ` 
        <button class="addPost rounded-circle" id="addPost"  data-bs-toggle="modal" data-bs-target="#addPostModal" data-bs-whatever="@mdo">
         <i class="fa-solid fa-circle-plus"></i>
        </button>`
      : ""}
  ${post(posts)}
  ${navPagination()}
    `;
  ROOT.innerHTML = HTML; // Inject the HTML content into the root element


  HTML = ""; // Clear the HTML variable to free up memory
  logout(); // Attach logout event after rendering
  handleAddPost(); // Attach add post event after rendering
  handlePagination(); // Attach pagination event after rendering
  detailPost(); // Attach detail post event after rendering
}

// Fetch posts and render them

updateUI();
