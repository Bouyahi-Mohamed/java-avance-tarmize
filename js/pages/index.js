
import { indexlastPage,getPostById } from '../api/api.js';
import { updateUI } from '../utils/updateUi.js';
import { renderDetailPost } from './detailPost.js';
let currentPage = window.currentPage || 1;
let lastPage;
(async () => {
  lastPage = await indexlastPage();
})();
export function header(user = {}) {
  const token = JSON.parse(localStorage.getItem('token')) || { logedin: false, id: '' };
    return `<!-- start nav bar -->
      <header
        class="col-8 mx-auto shadow mt-3 mb-4 bg-body rounded sticky-top rounded-3 headerApp"
      >
        <nav class="navbar navbar-expand-lg navbar-light bg-light rounded-3">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">tarmize</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#"
                    >Home</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="#">profile</a>
                </li>
              </ul>
              <!-- user info login and register -->
              <div class="user-info ${token.logedin ? 'd-flex' : 'd-none'} align-items-center">
                <img
                  src="${user ? user.data.profile_image : '../images/user.jpeg'}"
                  class="user-icon rounded-circle img-thumbnail me-2"
                  alt=""
                  onerror="this.src='../images/user.jpeg'"
                />
                <label class="me-2 fw-bold fs-6" for="">${user ? user.data.username : 'error'}</label>
                <button class="btn btn-outline-success logout" type="button">
                  logout
                </button>
              </div>
              <!-- end user info login and register -->

              <!-- register and login buttons -->
              <form
                class=" ${token.logedin ? 'd-none' : 'd-flex'} align-items-center justify-content-start"
              >
                <button type="button" class="btn btn-outline-success me-2" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-whatever="@mdo">login</button>
                <button type="button" class="btn btn-outline-success me-2" data-bs-toggle="modal" data-bs-target="#registerModal" data-bs-whatever="@mdo">register</button>

              </form>
              <!-- end register and login buttons -->
            </div>
          </div>
        </nav>
      </header>

      <!-- end nav bar -->
     
  `
}

export function post(posts = []) {
  let indexPosts =  `
      <main class="container">
      ${posts.map(post => `
        <div class='alert'>
        </div>

        <div class="card col-8 mx-auto shadow rounded bg-body mb-4">
          <div class="card-header p-1 bg-light">
              <img
                src="${post.author && post.author.profile_image ? post.author.profile_image : '../images/user.jpeg'}"
                class="user-icon rounded-circle img-thumbnail"
                alt=""
                onerror="this.src='../images/user.jpeg'
               "
              />
              <span class="fw-bold text-dark fs-5">@ ${post.author && post.author.username ? post.author.username : 'yarab'}</span>
            </div>
            <div class="card-body bg-light">
          <a href="../html/detailPost.html" class=" tagImg" data-id="${post.id}">
            <img
              src="${post.image || '../images/Kung-Fu-Panda.jpg'}"
              class="card-img-top img-thumbnail tagImg btn"
              alt="..."
              onerror="this.src='../images/Kung-Fu-Panda.jpg'"
             
            />
          </a>
              <p class="card-text mt-0">
                <span class="fw-lighter text-dark-50">${post.created_at || '3 min ago'}</span>
              </p>
              <h5 class="card-title">${post.title || 'title of post'}</h5>
              <p class="card-text">
                ${post.body || 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'}
              </p>
              <hr />
              <p class="card-text mt-3">
                <i class="fas fa-pen me-2"></i>
                <span class="fw-bold">${post.comments_count || 0} comments</span>
                ${(() => {
                  let tags = post.tags.length > 0 ? post.tags : ['dev', 'frontend', 'backend'];
                  return tags.map(tag => `
                    <span class="fw-bold"><button class="btn btn-outline-primary rounded-pill" type="button">${tag}</button></span>
                  `).join('');
                })()}
              </p>
            </div>
          </div>
        `).join('')}
      </main>`;
  return indexPosts;
}

export function navPagination() {
  // Create the pagination UI
  const paginationHTML = `
     <nav aria-label="Page navigation example" class="text-center d-flex align-items-center justify-content-center ">
  <ul class="pagination pagination-lg">
${ lastPage > 5 ? `
    <li class="page-item"><a class="page-link" id="prevPage" href="#">Previous</a></li>
<li class="page-item"><a class="page-link page-num" data-page="1" href="#">${currentPage}</a></li>
    <li class="page-item"><a class="page-link page-num" data-page="2" href="#">${currentPage + 1}</a></li>
    <li class="page-item"><a class="page-link page-num" data-page="3" href="#">${currentPage + 2}</a></li>
    <li class="page-item"><a class="page-link page-num" data-page="4" href="#">${currentPage + 3}</a></li>
    <li class="page-item"><a class="page-link page-num" data-page="5" href="#">${currentPage + 4}</a></li>
    <li class="page-item"><a class="page-link" id="nextPage" href="#">Next</a></li>
` : 
    (() => {
      let html = '';
      for (let i = 0; i < lastPage; i++) {
        html += `<li class="page-item"><a class="page-link page-num" data-page="${i+1}" href="#">${i+1}</a></li>`;
      }
      return html;
    })()
}
  </ul>
</nav>
  `;
  return paginationHTML;
}

export function footer() {
  // Your footer code here
}


// function index

export function handlePagination() {
  // Pagination event handlers
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const pageNums = document.querySelectorAll(".page-num");
  // You need to define currentPage somewhere in your code, or pass it as a parameter

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        updateUI(currentPage);
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage < lastPage) {
        currentPage++;
        updateUI(currentPage);
      }
    });
  }
  pageNums.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const page = parseInt(btn.getAttribute("data-page"));
      currentPage = page;
      console.log(page);
      console.log(lastPage);
      updateUI(page);
    });
  });

}


export function detailPost() {
  const listItems = document.querySelectorAll('.tagImg');
  listItems.forEach(item => {
    item.addEventListener('click',  (e) => {
      e.preventDefault();
      const postId = e.currentTarget.dataset.id;
      console.log(postId);
      window.location.href='../html/detailPost.html';
      localStorage.setItem('postId', postId);

    });
  });
}
