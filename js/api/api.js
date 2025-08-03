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

export { getpost };