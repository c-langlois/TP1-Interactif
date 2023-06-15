

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