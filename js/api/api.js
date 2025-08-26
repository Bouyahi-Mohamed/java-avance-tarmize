import { updateUI } from '../utils/updateUi.js';
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
async function getAllpost() {
  try {
    const response = await axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=100`);
    let posts = response.data.data;  // Extract the posts data from the response
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
    console.log('Fetched user:', response.data);
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
 function getPostById() {
  const url = window.location.href; 
  const params = new URLSearchParams(new URL(url).search);
  const postId = params.get("postId");
  return axios.get(`https://tarmeezacademy.com/api/v1/posts/${postId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching post by ID:', error);
      throw error;
    });
}
function addCommentToPost(postId, commentBody) {
  const token = JSON.parse(localStorage.getItem('token')).token;
  return axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}/comments`, { body: commentBody }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error('Error adding comment:', error);
      throw error;
    });
}

// get posts user
 async function getPostsUser(iduser) {
  try {
    const response = await axios.get(`https://tarmeezacademy.com/api/v1/users/${iduser}/posts`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
      }
    });
    let posts = response.data.data;  // Extract the posts data from the response
    return posts;
  } catch (error) {
    console.error('Error fetching posts by user ID:', error);
    throw error;
  }
}
// delete post 
export function deletePost(postId) {
  const token = JSON.parse(localStorage.getItem('token')).token;
  return axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      updateUI();
      return response.data;
    })
    .catch(error => {
      console.error('Error deleting post:', error);
      throw error;
    });
}
// update post
async function updatePost(postId, updatedData) {
  try {
    const token = JSON.parse(localStorage.getItem('token')).token;
    const response = await axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export { getpost, postLogin, postRegistration, AddPost, getUserById, indexlastPage, getPostById, addCommentToPost, getPostsUser ,updatePost};