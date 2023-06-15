const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const searchResultContainer = document.querySelector('#search-result');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    search(searchTerm);
  }
});

function search(searchTerm) {
  fetch(`https://insta-api-api.0vxq7h.easypanel.host/posts?search=${encodeURIComponent(searchTerm)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(posts => {
      searchResultContainer.innerHTML = '';
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <img class="post-image" src="${post.pictureUrl}" alt="Post Image">
          <div class="post-description">${post.description}</div>
        `;
        searchResultContainer.appendChild(postElement);
      });
    })
}
