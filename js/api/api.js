import render from '../App.js';  

function getpost() {
  // Fetch posts from the API
  axios.get('https://tarmeezacademy.com/api/v1/posts?limit=50')
    .then(response => {
      let posts = response.data.data;  // Extract the posts data from the response

      return render(posts);  // Call the render function with the fetched posts
      
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}

async function postLogin(info) {
  try {
    const response = await axios.post('https://tarmeezacademy.com/api/v1/login', info);
    let params = {
      token: response.data.token,
      username: response.data.user.username,
      logedin: true
    };
    localStorage.setItem('token', JSON.stringify(params));
    // Re-render the app after successful login
    await getpost();  // Fetch posts again to update the UI
    render();  // Re-render the main content of the app
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
// postRegistration
async function postRegistration(info) {
  try {
    const response = await axios.post('https://tarmeezacademy.com/api/v1/register', info);
    return response;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
}

export { getpost, postLogin, postRegistration };