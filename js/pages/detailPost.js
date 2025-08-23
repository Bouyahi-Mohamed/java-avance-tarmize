import { addCommentToPost } from "../api/api.js";
export function renderDetailPost(post = 1, user) {
  const token = JSON.parse(localStorage.getItem('token')) || { logedin: false, id: '' };
  const detailPostContainer = document.getElementById("detailPost");
  detailPostContainer.innerHTML = `
  <main class="container d-flex justify-content-center justify-items-center mt-3 w-75">

        <div class="card col-8 mx-auto shadow rounded bg-body mb-4 ">
          <div class="card-header p-1 bg-light d-flex align-items-center justify-content-evenly">
              <img
                src="${
                  post.data.author.profile_image
                    ? post.data.author.profile_image
                    : "../images/user.jpeg"
                }"
                class="user-icon rounded-circle img-thumbnail"
                alt=""
                onerror="this.src='../images/user.jpeg'
               "
              />
              <span class="fw-bold text-dark fs-5 grow">@ ${
                post.data.author.username
                  ? post.data.author.username
                  : "unknown"
              }</span>
              <a class="btn" href="../html/index.html">
                <i class="fa-solid fa-circle-arrow-left fa-lg"></i>
              </a>
            </div>
            <div class="card-body bg-light">
          
            <img
              src="${post.data.image || "../images/Kung-Fu-Panda.jpg"}"
              class="card-img-top img-thumbnail tagImg btn"
              alt="..."
              onerror="this.src='../images/Kung-Fu-Panda.jpg'"
             
            />
              <p class="card-text mt-0">
                <span class="fw-lighter text-dark-50">${
                  post.data.created_at || "3 min ago"
                }</span>
              </p>
              <h5 class="card-title">${post.data.title || "title of post"}</h5>
              <p class="card-text">
                ${
                  post.data.body ||
                  "Some quick example text to build on the card title and make up the bulk of the card's content."
                }
              </p>
              <hr />
              <div class=" btn card-text mt-3 d-flex justify-content-around align-items-center mb-3">
               <button class="btn">
                 <i class="fa-solid fa-thumbs-up"></i>
                 <span class="fw-bold">${post.data.likes_count ||" "} likes</span>
               </button>

            
                <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCommentaire" aria-expanded="false" aria-controls="collapseCommentaire"><i class="fas fa-comments me-2">
                </i>
                 <span class="fw-bold"> ${
                  post.data.comments_count || 0
                  } comments</span>

               </button>
                 <button class="btn">
                 <i class="fa-solid fa-share"></i>
                  <span class="fw-bold"> shares </span>
                </button>
              
              </div>
                  <div class="collapse " id="collapseCommentaire">
                   ${(() => {
                     let commentaire = post.data.comments;
                     if (commentaire.length === 0) {
                       return `<div class="text-center">No comments yet</div>`;
                     } else {
                     return commentaire.map(comment => `
                       <div class="commentaire${comment.id} d-flex align-items-center justify-content-center gap-2 mb-2">
                         <div class="   ">
                           <img
                           src="${comment.author.profile_image ? comment.author.profile_image : "../images/user.jpeg"}"
                           class="user-icon rounded-circle img-thumbnail"
                           alt=""
                           />
                         </div>
                         <div class="card card-body h-50">
                           ${comment.body}
                         </div>
                       </div>
                     `).join("");
                   }})()}

                  </div>
    ${token && token.logedin ? `
          <div class="mb-3 mt-3 d-flex align-items-center gap-2">
            <label for="commentaire" class="form-label ">
              <img
                src="${user ? user.data.profile_image : '../images/user.jpeg'}"
                class="user-icon rounded-circle img-thumbnail"
                alt=""
              />
            </label>
             <textarea class="form-control" id="commentaire" rows="1" placeholder="Add a comment..."></textarea>
             <button class="btn" id="addComment" data-id="${post.data.id}" type="button">
               <i class="fa-solid fa-paperclip fa-lg"></i>
             </button>
        </div>
        </main>`
      :``}
  `;
  handleAddComment();
}

export function handleAddComment() {
  const addCommentButton = document.getElementById("addComment");
  const commentaireInput = document.getElementById("commentaire");

  addCommentButton.addEventListener("click", () => {
    const commentBody = commentaireInput.value.trim();
    const postId = addCommentButton.dataset.id;

    if (commentBody) {
      // Call the API to add the comment
      commentaireInput.value = ""; // Clear the input
      addCommentToPost(postId, commentBody);
    }
  });
}