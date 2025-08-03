import { getpost } from "./api/api.js";




export default function render(posts = []) {
    const ROOT = document.getElementById('root');

    const BarHTML = `<!-- start nav bar -->
      <header
        class="col-8 mx-auto shadow mt-3 mb-4 bg-body rounded sticky-top rounded-3"
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
              <form class="d-flex align-items-center justify-content-start">
                <i class="fas fa-user text-dark fs-5 me-2"></i>
                <label class="me-2 fw-bold fs-6" for="">Yarab</label>
                <button class="btn btn-outline-success" type="submit">
                  logout
                </button>
              </form>
              <!-- end user info login and register -->

              <!-- register and login buttons -->
              <form
                class="d-none d-flex align-items-center justify-content-start"
              >
                <button class="btn btn-outline-success me-2">register</button>
                <button class="btn btn-outline-success">login</button>
              </form>
              <!-- end register and login buttons -->
            </div>
          </div>
        </nav>
      </header>
      <!-- end nav bar -->`
    

    let HTML = `
    ${BarHTML}
    <main class="container">
      ${posts.map(post => `
        <div class="card col-8 mx-auto shadow rounded bg-body mb-4">
          <div class="card-header p-1 bg-light">
            <img
              src="${post.author.profile_image || '../images/user.jpeg'}"
              class="user-icon rounded-circle img-thumbnail"
              alt=""
              onerror="this.src='../images/user.jpeg'"
            />
            <span class="fw-bold text-dark fs-5">@ ${post.author.username || 'yarab'}</span>
          </div>
          <img
            src="${post.image || '../images/Kung-Fu-Panda.jpg'}"
            class="card-img-top img-thumbnail"
            alt="..."
            onerror="this.src='../images/Kung-Fu-Panda.jpg'"
          />
          <div class="card-body bg-light">
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
            </p>
          </div>
        </div>
      `).join('')}
    </main>
    `;
    ROOT.innerHTML = HTML;  // Inject the HTML content into the root element
    HTML = '';  // Clear the HTML variable to free up memory

}

// Fetch posts and render them
Promise.all([
    getpost()  // Fetch posts from the API
]).then(([posts]) => {
    render(posts);  // Render the main content of the app after fetching posts
}).catch(error => {
    console.error('Error during initialization:', error);
});