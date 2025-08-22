import { updateUI } from "../utils/updateUi.js";
async function getpost(page=1) {
  try {
    const response = await axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=10&page=${page}`);
    let posts = response.data.data;  // Extract the posts data from the response
    window.currentPage = page;  // Update the current page globally
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

async function postLogin(info) {
  try {
    const response = await axios.post('https://tarmeezacademy.com/api/v1/login', info);
    let params = {
      token: response.data.token,
      id: response.data.user.id,
      logedin: true
    };
    localStorage.setItem('token', JSON.stringify(params));
    // Re-render the app after successful login
    await updateUI();  // Fetch posts and user data after login
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
// postRegistration
async function postRegistration(info) {
  try {
    // Send a formdata 
    const response = await axios.post('https://tarmeezacademy.com/api/v1/register', info);
    // update token
    let params = {
      token: response.data.token,
      id: response.data.user.id,
      logedin: true
    };
    localStorage.setItem('token', JSON.stringify(params));
    // Re-render the app after successful registration
    updateUI();
    return response;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
}


// add post 
async function AddPost(info) {
  try {
    const header = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
    };
    const response = await axios.post('https://tarmeezacademy.com/api/v1/posts', info, { headers: header });
    // Re-render the app after successful post
    updateUI();
    return response;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
}

// get user by id
async function getUserById(id) {
  try {
    const response = await axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}
async function indexlastPage() {
  try {
    const response = await axios.get('https://tarmeezacademy.com/api/v1/posts/?limit=10');
    let lastPage = response.data.meta.last_page;  // Extract the last page number from the response
    return lastPage;
  } catch (error) {
    console.error('Error fetching last page:', error);
    throw error;
  }
}

export { getpost, postLogin, postRegistration, AddPost, getUserById, indexlastPage };