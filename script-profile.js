function showProfile() {

    const urlParams = window.location.search;
    userId = urlParams.split('=');
    let url = 'https://insta-api-api.0vxq7h.easypanel.host/users/' + userId[1]

    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then(response => {
            let postsImg = '';
            response.posts.map((post) => { 
                postsImg += `<div class="profile-posts">
                                <img class="profile-posts-img" src="${post.pictureUrl}">
                            </div>`;

            })
            profile = `
                <div class="profile-header">
                    <span class="profile-username">${response.username}</span>
                </div>
                <div class="profile-pfp-container">
                    <div class="profile-pfp">
                        <img class="profile-pfp-img" src='${response.avatarUrl}'>
                    </div>
                    <div class="profile-stats">
                        <span class="profile-stats-text-top">${response.posts.length}</span>
                        <span class="profile-stats-text-bottom">Publications</span>
                    </div>
                </div>
                <div>
                    <span>${response.description}</span>
                </div>
                <div class="profile-posts-container">
                    ${postsImg}
                </div>
            `
            let profileContainer = document.getElementById('profile-container');
            profileContainer.innerHTML = profile;
        })
}

let profile = '';
showProfile();