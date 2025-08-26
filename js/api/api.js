import { updateUI } from '../utils/updateUi.js';
import {showLoader,hideLoader} from '../utils/loader.js';

async function getpost(page=1) {
  try {
    showLoader();
    const response = await axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=10&page=${page}`);
    let posts = response.data.data;  // Extract the posts data from the response
    window.currentPage = page;  // Update the current page globally
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    hideLoader();
  }
}
async function getAllpost() {
  try {
    showLoader();
    const response = await axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=100`);
    let posts = response.data.data;  // Extract the posts data from the response
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    hideLoader();
  }
}

async function postLogin(info) {
  try {
    showLoader();
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
  } finally {
    hideLoader();
  }
}
// postRegistration
async function postRegistration(info) {
  try {
    showLoader();
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
  } finally {
    hideLoader();
  }
}


// add post 
async function AddPost(info) {
  try {
    showLoader();
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
  } finally {
    hideLoader();
  }
}

// get user by id
async function getUserById(id) {
  try {
    showLoader();
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
  } finally {
    hideLoader();
  }
}
async function indexlastPage() {
  try {
    showLoader();
    const response = await axios.get('https://tarmeezacademy.com/api/v1/posts/?limit=10');
    let lastPage = response.data.meta.last_page;  // Extract the last page number from the response
    return lastPage;
  } catch (error) {
    console.error('Error fetching last page:', error);
    throw error;
  } finally {
    hideLoader();
  }
}
async function getPostById() {
  try {
    showLoader();
    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const postId = params.get("postId");
    const response = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  } finally {
    hideLoader();
  }
}
async function addCommentToPost(postId, commentBody) {
  try {
    showLoader();
    const token = JSON.parse(localStorage.getItem('token')).token;
    const response = await axios.post(
      `https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,
      { body: commentBody },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  } finally {
    hideLoader();
  }
}

// get posts user
 async function getPostsUser(iduser) {
  try {
    showLoader();
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
  }finally {
    hideLoader();
  }
}
// delete post 
export async function deletePost(postId) {
  try {
    showLoader();
    const token = JSON.parse(localStorage.getItem('token')).token;
    const response = await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    updateUI();
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  } finally {
    hideLoader();
  }
}
// update post
async function updatePost(postId, updatedData) {
  try {
    showLoader();
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
  } finally {
    hideLoader();
  }
}

export { getpost, postLogin, postRegistration, AddPost, getUserById, indexlastPage, getPostById, addCommentToPost, getPostsUser ,updatePost};