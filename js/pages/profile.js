import { header } from "./index.js";
import { deletePost , updatePost} from "../api/api.js";
import { UpdateProfilePost,logout} from "../api/Modal.js";
import { showAlert } from "../utils/alert.js";
import { updateUI } from "../utils/updateUi.js";
export function renderProfilePage(posts, user,currentUser) {
    const root = document.getElementById("root-profile");
    let HTML = `
    ${header(currentUser)}
    ${detailUser(user,posts)}
    ${post(posts, user)}
  `;
  root.innerHTML = HTML;
  handleDeletePost();
  handleUpdatePost();
  logout(); // Attach logout event after rendering
  HTML='';
}
function post(posts = [], user) {
    const token = JSON.parse(localStorage.getItem("token")) || {
        logedin: false,
        id: "",
    };
    let indexPosts = `
      
      <main class="container">
      ${posts
            .map(
                (post) => `
       
        <div class="card col-8 mx-auto shadow rounded bg-body mb-4">
          <div class="card-header row bg-light">
            <div class="col-1">
              <img
                src="${post.author && post.author.profile_image
                        ? post.author.profile_image
                        : "../images/user.jpeg"
                    }"
                class="user-icon rounded-circle img-thumbnail"
                alt=""
                onerror="this.src='../images/user.jpeg'
               "
              />
            </div>
              <div class="col-4">
              <span class="fw-bold text-dark fs-5">@ ${post.author && post.author.username
                        ? post.author.username
                        : "yarab"
                    }</span>
            </div>
            <div class="col-2 offset-5 d-flex justify-content-end align-items-center flex-direction-column gap-3">
              <button class="btn " type="button" data-bs-toggle="collapse" data-bs-target="#showoptions${post.id}" aria-expanded="false" aria-controls="collapseExample">
                <i class="fa-solid fa-ellipsis fa-lg"></i>
              </button>
              <div class="collapse" id="showoptions${post.id}">
                <div class="d-flex gap-3">
                    <div class="updatePost" data-update="${post.id}" >
                    <button class="btn btn-info" type="button">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    </div>
                    <div class="deletePost" data-delete="${post.id}">
                    <button class="btn btn-danger" type="button">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    </div>
                </div>
              </div>
            </div>
          </div>

            <div class="card-body bg-light">
          <div class=" tagImg" data-id="${post.id}">
            <img
              src="${post.image || "../images/Kung-Fu-Panda.jpg"}"
              class="card-img-top img-thumbnail tagImg btn"
              alt="..."
              onerror="this.src='../images/Kung-Fu-Panda.jpg'"
             
            />
          </div>
              <p class="card-text mt-0">
                <span class="fw-lighter text-dark-50">${post.created_at || "3 min ago"
                    }</span>
              </p>
              <h5 class="card-title">${post.title || "title of post"}</h5>
              <p class="card-text">
                ${post.body ||
                    "Some quick example text to build on the card title and make up the bulk of the card's content."
                    }
              </p>
              <hr />
             <div class=" btn card-text mt-3 d-flex justify-content-around align-items-center mb-3">
               <button class="btn">
                 <i class="fa-solid fa-thumbs-up"></i>
                 <span class="fw-bold">${" "} likes</span>
               </button>

            
                <button class="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCommentaire${post.id
                    }" aria-expanded="false" aria-controls="collapseCommentaire${post.id
                    }"><i class="fas fa-comments me-2">
                </i>
                 <span class="fw-bold"> ${post.comments_count || 0
                    } comments</span>

               </button>
                 <button class="btn">
                 <i class="fa-solid fa-share"></i>
                  <span class="fw-bold"> shares </span>
                </button>
              
              </div>
                 
                  </div>
    
        </div>
        </main>
      `
            )
            .join("")}
  `;
    return indexPosts;
}

  // profile details
  function detailUser(user, posts){
    const html=`
      <div class="card col-8 mx-auto shadow rounded bg-body mb-4">
          <div class="card-img row bg-light">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${user.data.profile_image ? user.data.profile_image : '../images/user.jpeg'} " alt="User Image" class="img-fluid rounded-start">
    </div>
    <div class="col-md-8">
      <div class="card-body ms-4">
        <h5 class="card-title">Profile ${user.data.name}</h5>
        <div class="mt-4 mb-5 ">
        <p class="card-text">
        <b>Email:</b> ${user.data.email}
        </p>
        <p class="card-text">
        <b>Number of comments:</b> ${user.data.comments_count || 0}
        </p>
        <p class="card-text">
        <b>Number of posts:</b> ${user.data.posts_count || 0}
        </p>
        </div>
        <p class="card-text float-end text-dark-50"><small class="text-body-secondary">Last action ${posts && posts[0] ? posts[0].created_at
 : 'N/A'} </small></p>
      </div>
    </div>
  </div>
          </div>
      </div>
    `;
    return html;
  }

 function handleDeletePost() {
  const btnDelete = document.querySelectorAll(`.deletePost`);
  btnDelete.forEach(btn => {
    btn.addEventListener("click", async (e) => {
        let idPost = e.currentTarget.dataset.delete;
        let modal = new bootstrap.Modal(document.getElementById('validateDeleteModal'));
        modal.show();
        document.querySelector('.delete-post-btn').addEventListener("click", async () => {
          await deletePost(idPost);
          modal.hide();
          showAlert('Post deleted successfully!', 'success');
        });
    });
  });
}

export  function handleUpdatePost() {
  const btnUpdate = document.querySelectorAll(`.updatePost`);
  btnUpdate.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      let modal = new bootstrap.Modal(document.getElementById('editPostModal'));
      modal.show();
      let idPost = e.currentTarget.dataset.update;
      let data = await UpdateProfilePost();
      if (!data) {
        modal.hide();
        return;
      }
      // Close the modal
      modal.hide();
      showAlert('loading ...', 'info',false);
     
      try {
        await updatePost(idPost, data);
       
          updateUI(),
            showAlert('Post updated successfully!', 'success');
      } catch (e) {
        console.error('UpdatePost error:', e);
        showAlert(e.response.data.message || 'Update post failed!', 'danger');
      }
    });
  });
}