let newPosts = '';
function showPosts(counter) {
    let liked;
    if (counter) {
        let offset = counter * 3;
        url = 'https://insta-api-api.0vxq7h.easypanel.host/posts?limit=3&offset=' + offset;
    } else {
        url = 'https://insta-api-api.0vxq7h.easypanel.host/posts?limit=3';
    }
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then(response => {
            response.map((post) => {
                liked = post.liked ? ' post-icon-heart-red' : '';
                fetch(`https://insta-api-api.0vxq7h.easypanel.host/users/${post.userId}`)
                    .then((response) => {
                        return response.json()
                    })
                    .then(response => {
                        let allComments = `<ul id=postId-${post.id}>`;
                        post.comments.forEach(element => {
                            allComments += `<li>${element.content}</li>`;
                        });
                        allComments +='</ul>'
                        newPosts += `
                            <div class="post">
                                <div class="post-header">
                                    <div class="post-user">
                                        <a class="post-username" href="profile.html?user=${post.userId}">
                                            <img class="post-pfp" src="${response.avatarUrl}" alt="" srcset="">
                                            <span >${response.username}</span>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <img class="post-image" src="${post.pictureUrl}" alt="" srcset="">
                                </div>
                                <span class="post-description bold-text">${post.description}</span>
                                <div class="post-icons">
                                  <div class="post-icon-left">
                                 
                                    <svg class="post-icon-heart${liked}" id="likeBtnId-${post.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                                    </svg>
                                    <span id="postLikesId-${post.id}">${post.likes.length}</span>
                                    <!-- Trigger/Open The Modal -->
                                    <button class="myBtn" id="myBtn-${post.id}">
                                        <img id="comment-${post.id}" class="post-comment-img" src="icons/comment-regular-inverse.svg" alt="" srcset="">
                                    </button>
                                        <!-- The Modal -->
                                        <div id="myModal" class="modal">

                                        <!-- Modal content -->
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <span>Ajouter un commentaire</span>
                                                    <span class="close">&times;</span>
                                                </div>
                                                <div class="modal-body">
                                                    <label for="add-comment">
                                                    <textarea name="add-comment" id="add-comment" class="add-comment"placeholder="Vous devez écrire pour pouvoir soumettre."></textarea>
                                                    <button id="add-comment-btn">Soumettre</button>
                                                    <div class="modal-comment"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                </div>
                                <div class="post-comment">
                                   
                                </div> 
                                <div class="post-comment">${allComments}
                                 
                                </div>
                            </div>
                        `
                        let showPosts = document.getElementById('post-section');
                        showPosts.innerHTML = newPosts;
                        const likeBtns = document.querySelectorAll('.post-icon-heart');
                        for (let i = 0; i < likeBtns.length; i++) {
                            const likeBtn = likeBtns[i];
                            likeBtn.addEventListener('click', () => {
                                const postId = likeBtn.id.split('-')[1];
                                const isLiked = likeBtn.classList.contains('post-icon-heart-red');
                                if (!isLiked) {
                                    // Ajouter un like
                                    fetch(`https://insta-api-api.0vxq7h.easypanel.host/likes`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'  
                                        },
                                        body: JSON.stringify({
                                            "postId": `${postId}`
                                        }) 
                                    })
                                    .then(() => {
                                        // Mettre à jour l'apparence de l'icône du cœur
                                        likeBtn.classList.add('post-icon-heart-red');
                                        const likesCounter = document.getElementById('postLikesId-' + postId)
                                        likesCounter.innerText++;
                                    })
                                } 
                            })
                        }    
                        // Get the modal
                        const modal = document.getElementById("myModal");

                        // Get the button that opens the modal
                        const btn = document.querySelectorAll(".myBtn");

                        // Get the <span> element that closes the modal
                        const span = document.getElementsByClassName("close")[0];

                        // When the user clicks on the button, open the modal
                        let commentClicked = '';
                        for (button of btn) {
                            button.addEventListener('click', (evt) => {
                               
                                commentClicked = evt.target.id;
                                const array = commentClicked.split('-');
                                commentClicked = array[1];
                                modal.style.display = "block";
                            }, false)
                        }

                        // When the user clicks on <span> (x), close the modal
                        //span.onclick = function() {
                        span.addEventListener('click', () => {
                            modal.style.display = "none";
                        })

                        // When the user clicks anywhere outside of the modal, close it
                        // window.onclick = function(event) {
                        window.addEventListener('click', (evt) => {
                            if (evt.target == modal) {
                                modal.style.display = "none";
                            }
                        }, false)
                        const addCommentBtn = document.getElementById('add-comment-btn');
                        addCommentBtn.addEventListener('click', () => {
                            const addComment = document.getElementById('add-comment').value;
                                if (addComment !=''){
                                    fetch('https://insta-api-api.0vxq7h.easypanel.host/comments', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            "postId": commentClicked,
                                            "content": `${addComment}`,
                                        })
                                    })
                                    const postComment = document.getElementById('postId-' + commentClicked)
                                    postComment.innerHTML += '<li>' + addComment + '</li>';
                                    modal.style.display = "none";
                                }

                        })
                    })
                })
            })
    
    setTimeout(() => {
        i++;
        if (i <= 9) {
            showPosts(i);
        }
    }, 3000);
}
let i = 0;
let url = '';
showPosts();