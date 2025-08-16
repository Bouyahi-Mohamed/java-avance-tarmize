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

function postLogin(info) {
  axios.post('https://tarmeezacademy.com/api/v1/login', info)
  .then(response => {
    console.log('Login successful:', response.data);
    // change the userToken object
    let params = {token : '',
                  username: info.username,  
                  logedin: false
}
    params.token = response.data.token;
    params.username = response.data.user.username;  
    params.logedin = true;
    console.log('userToken:', params);
    // Save the userToken object to localStorage
    localStorage.setItem('token', JSON.stringify(params));
    getpost();  // Fetch posts after login
    render();  // Re-render the app to reflect the login state

  })
  .catch(error => {
    console.error('Error logging in:', error);
  });
}
// postRegistration
function postRegistration(info) {
  axios.post('https://tarmeezacademy.com/api/v1/register', info)
  .then(response => {
    console.log('Registration successful:', response.data);
    // You can handle the response as needed
  })
  .catch(error => {
    console.error('Error registering:', error);

  });
}

export { getpost, postLogin, postRegistration };