/* 1)	CSS : Faire un clone de la page d’accueil Instagram sur mobile (4 stories, 3 posts). Une fois que le visuel est présent :
a.	Ajouter la fonction like. Quand le cœur est cliqué, il doit devenir rouge seulement pour le post correspondant.
b.	Quand une story est cliquée, vous devez afficher la vidéo correspondante en popup. Une fois que le popup est fermé, le cercle de 
couleur autour de la story doit disparaître.
c.	Faire le visuel pour la page recherche, reel et profil. */

class Affichage {
    constructor (page) {
        this.page = page;

        this.postInfo = [
            {'id': 1, 'liked': true, 'username': 'username1', 'photo': 'alan-king-KZv7w34tluA-unsplash.jpg', 'description': 'description1'}, 
            {'id': 2, 'liked': false,  'username': 'username2', 'photo': 'helena-lopes-e3OUQGT9bWU-unsplash.jpg', 'description': 'description2'}, 
            {'id': 3, 'liked': false,  'username': 'username1', 'photo': 'mi-pham-FtZL0r4DZYk-unsplash.jpg', 'description': 'description3'}, 
            {'id': 4, 'liked': true,  'username': 'username4', 'photo': 'scott-webb-IZmPdbnb-3I-unsplash.jpg', 'description': 'description4'}
        ];

        this.storiesInfo = [
            {'id': 1, 'username': 'username6', 'seen': false, 'video': 'https://youtube.com/embed/ErHtcLZGoOI?feature=share'}, 
            {'id': 2, 'username': 'username5', 'seen': false, 'video': 'https://youtube.com/embed/Q1A5A8Xe22s?feature=share'}, 
            {'id': 3, 'username': 'username2', 'seen': true, 'video': 'https://youtube.com/embed/Dm70tunHPQM?feature=share'}, 
            {'id': 4, 'username': 'username4', 'seen': false, 'video': 'https://youtube.com/embed/3gNOoYzarNo?feature=share'}, 
            {'id': 5, 'username': 'username3', 'seen': false, 'video': 'https://youtube.com/embed/4FvtIigT27g?feature=share'}
        ];

        this.currentPage = this.page === undefined ? 'home' : this.page;
        

        this.htmlElement = document.createElement('div');
        this.htmlElement.setAttribute('id', 'root');
        this.htmlElement.innerHTML = this.makeHtml(this.currentPage);

        let homeBtn = this.htmlElement.querySelector('#bottom-button-home');
        homeBtn.addEventListener('click', () => {
            this.currentPage = 'home';
            this.htmlElement.remove();
            const display = new Affichage('home');
            document.body.append(display.render());
        })

        let searchBtn = this.htmlElement.querySelector('#bottom-button-search');
        searchBtn.addEventListener('click', () => {
            this.currentPage = 'search';
            this.htmlElement.remove();
            const display = new Affichage('search');
            document.body.append(display.render());
        })

        let reelBtn = this.htmlElement.querySelector('#bottom-button-reel');
        reelBtn.addEventListener('click', () => {
            this.currentPage = 'reel';
            this.htmlElement.remove();
            const display = new Affichage('reel');
            document.body.append(display.render());
        })

        let profileBtn = this.htmlElement.querySelector('#bottom-button-profile');
        profileBtn.addEventListener('click', () => {
            this.currentPage = 'profile';
            this.htmlElement.remove();
            const display = new Affichage('profile');
            document.body.append(display.render());
        })

        let btn;

        this.likeBtn = this.htmlElement.querySelectorAll('.post-icon-heart');
        for (btn of this.likeBtn) {
            btn.addEventListener('click', (evt) => {
                const element = evt.target;
                this.like(element);
            }, false)
        }
        
        this.storiesBtn = this.htmlElement.querySelectorAll('.stories-img');
        for (btn of this.storiesBtn) {
            btn.addEventListener('click', (evt) => {
                const element = evt.target;
                this.showStory(element);
            }, false)
        }
    }

    showNewStories() {
        let newStories = '';

        return newStories;
    };

    showNewPosts() {
        // TODO: ajouter l'affichade des commentaires
        // Et le nombre de like
        let newPosts = '';
        let liked;
        fetch ('https://insta-api-api.0vxq7h.easypanel.host/posts?limit=3')
        .then((response) => {
            return response.json()
        })
        .then(response => {
            response.map((post) => {
                liked = post.liked ? ' post-icon-heart-red' : '';
                console.log(post);
                newPosts += `
                    <div class="post">
                        <div class="post-header">
                            <div class="post-user">
                                <img class="post-pfp" src="images/user/" alt="" srcset="">
                                <span class="post-username">${post.user}</span>
                            </div>
                            <img class="post-ellipsis" src="icons/ellipsis-solid.svg" alt="" srcset="">
                        </div>
                        <div>
                            <img class="post-image" src="${post.pictureUrl}" alt="" srcset="">
                        </div>
                        <div class="post-icons">
                            <div class="post-icon-left">
                            <svg class="post-icon-heart${liked}" id="likeBtnId-${post.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                            </svg>
                                <img class="post-ellipsis" src="icons/comment-regular-inverse.svg" alt="" srcset="">
                            </div>
                            <img class="post-ellipsis" src="icons/bookmark-regular.svg" alt="" srcset="">
                        </div>
                        <div class="post-likes-container">
                **** TODO Ajouter la quantité de Likes ****
                            <span class="post-likes-text"></span>
                        </div>
                        <div class="post-comment">
                            <span class="bold-text"></span> ${post.description}
                        </div>
                    </div>
                `
            })
            this.showPosts = document.getElementById('post-section');
            this.showPosts.innerHTML = newPosts;
        })
        return newPosts;
    }

    topContainer() {
        return `
            <div class="gradient-box">
            <div id="container">
        `
    }

    top() {
        return `
            <div id="header">
                <a href="index.html" class="logo">Instagram</a>
                <div>
                    <svg id="svg-header-buttons" height="30" width="100" viewBox="0 -12 100 100" style="background-color:transparent; margin: 0; padding: 0">
                        <image x="-120" y="-5" width="70" height="70" xlink:href="icons/square-plus-regular.svg"></image>
                        <image x="0" y="-5" width="70" height="70" xlink:href="icons/heart-regular.svg"></image>
                        <image x="120" y="-5" width="70" height="70" xlink:href="icons/comment-regular.svg"></image>
                        <circle stroke="transparent" cx="60" cy="10" r="10" stroke-width="0" fill="red"></circle>
                    </svg>
                </div>
            </div>
        `
    }

    stories() {
        return `
            <div id="stories">
                ${this.showNewStories()}
            </div>
        `
    }

    post() {
        return `
            <div id="post-section">
                ${this.showNewPosts()}
            </div>
        `
    }

    bottom() {
        return `
                    <div id="bottom-buttons">
                        <img id="bottom-button-home" class="bottom-buttons-icons" src="icons/house-solid.svg" alt="" srcset="">
                        <img id="bottom-button-search" class="bottom-buttons-icons" src="icons/magnifying-glass-solid.svg" alt="" srcset="">
                        <img id="bottom-button-reel"class="bottom-buttons-icons" src="icons/film-solid.svg" alt="" srcset="">
                        <img class="bottom-buttons-icons" src="icons/cafe.svg" alt="" srcset="">
                        <img id="bottom-button-profile" class="bottom-buttons-icons" src="icons/circle-user-regular.svg" alt="" srcset="">
                    </div>
        `
    }

    bottomContainer() {
        return `
            </div>
            </div>
        `
    }

    like(element) {
        element.classList.toggle('post-icon-heart-red');
        //todo: le fetch au serveur
    }

    comment(element) {
        //todo: page d'ajout de commentaire et quand on fait le Envoyer, ça fait le fetch au serveur
    }

    showStory(element) {
        let storyId = element.id;
        const myArray = storyId.split("-");
        storyId = myArray[1];
        let video = this.storiesInfo.find((value) => {
            return value.id === parseInt(storyId)
        })
        let dialogContenu = `
            <iframe width="315" height="560" src="${video.video}"></iframe>
            <form method="dialog">
                <button>X</button>
            </form>
        `
        const dialog = document.createElement('dialog');
        dialog.innerHTML = dialogContenu;
        document.body.appendChild(dialog);
        dialog.showModal();
        dialog.querySelector('button').addEventListener('click', () => {
            dialog.remove();
            let storyContainer = document.getElementById(`storiesContainer-${storyId}`);
            storyContainer.classList.remove('stories-border-red');
            storyContainer.classList.add('stories-border-gray');
        })
    }

    search() {
        // TODO: faire la recherche sur le serveur et afficher la réponse
        return `
            <div id="search-container">
                <input class="search-input" type="text" value="Rechercher"></input>

            </div>
        `
    }

    cafe() {
        return `
            <div id="cafe-container">
                to do -> Affiche des cafés
                    button ajouter
                    button effacer
            </div>
        `
    }

    profile() {
        //Todo: le fetch pour aller le chercher au serveur
        return `
            <div id="profile-container">
                <div class="profile-header">
                    <span class="profile-username">user.name.1</span>
                    <div class="profile-header-icons">
                        <img class="profile-icons" src="icons/square-plus-regular.svg">
                        <img class="profile-icons" src="icons/bars-solid.svg">
                    </div>
                </div>
                <div class="profile-pfp-container">
                    <div class="profile-pfp">
                        <img class="profile-pfp-img" src='images/user/jake-nackos-IF9TK5Uy-KI-unsplash.jpg'>
                    </div>
                    <div class="profile-stats">
                        <span class="profile-stats-text-top">171</span>
                        <span class="profile-stats-text-bottom">Publications</span>
                    </div>
                </div>
                <div>
                    <span>Username</span><br>
                    <span>Description</span>
                </div>
                <div class="profile-buttons-container">
                    <div class="profile-buttons">Modifier</div>
                    <div class="profile-buttons">Partager profil</div>
                    <div class="profile-buttons-icon"><img src="icons/user-plus-regular.svg"></div>
                </div>
                <div class="profile-posts-container">
                    <div class="profile-posts">
                        <img class="profile-posts-img" src="images/post/helena-lopes-e3OUQGT9bWU-unsplash.jpg">
                    </div>
                    <div class="profile-posts">
                        <img class="profile-posts-img" src="images/post/mi-pham-FtZL0r4DZYk-unsplash.jpg">
                    </div>
                    <div class="profile-posts">
                        <img class="profile-posts-img" src="images/post/scott-webb-IZmPdbnb-3I-unsplash.jpg">
                    </div>
                    <div class="profile-posts">
                        <img class="profile-posts-img" src="images/post/helena-lopes-e3OUQGT9bWU-unsplash.jpg">
                    </div>
                    <div class="profile-posts">
                        <img class="profile-posts-img" src="images/post/mi-pham-FtZL0r4DZYk-unsplash.jpg">
                    </div>
                    <div class="profile-posts">
                        <img class="profile-posts-img" src="images/post/scott-webb-IZmPdbnb-3I-unsplash.jpg">
                    </div>
                    <div class="profile-posts">
                        <img class="profile-posts-img" src="images/post/helena-lopes-e3OUQGT9bWU-unsplash.jpg">
                    </div>
                    <div class="profile-posts">
                        <img class="profile-posts-img" src="images/post/mi-pham-FtZL0r4DZYk-unsplash.jpg">
                    </div>
                    <div class="profile-posts">
                        <img class="profile-posts-img" src="images/post/scott-webb-IZmPdbnb-3I-unsplash.jpg">
                    </div>
                </div>
            </div>
        `
    }

    makeHtml(page) {
        if (page === 'home') {
            return this.topContainer() + this.top() + this.stories() + this.post() + this.bottom() + this.bottomContainer();
        } else if (page === 'search') {
            return this.topContainer() + this.search() + this.bottom() + this.bottomContainer();
        } else if (page === 'reel') {
            return this.topContainer() + this.reel() + this.bottom() + this.bottomContainer();
        } else if (page === 'profile') {
            return this.topContainer() + this.profile() + this.bottom() + this.bottomContainer();
        }
    }

    render() {
        return this.htmlElement;
    }
}

const display = new Affichage();
document.body.append(display.render());