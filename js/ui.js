class UI {
    constructor() {
        this.container = document.querySelector('.news-container .container .row');
        this.bannersContainer = document.querySelector('.banners-container');
        this.bannersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('icon-close')) {
                this.bannersContainer.innerHTML = '';
            }
        });
    }

    addNews(news) {
        const template = `
            <div class="col s12 m6">
                <div class="card left-align">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${news.urlToImage}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                        <p><a href="${news.url}">Read more</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                        <p>${news.description}</p>
                    </div>
                </div>
            </div>
        `;

        this.container.insertAdjacentHTML('beforeend', template);
    }

    addOptionToSelect(select, option) {
        select.insertAdjacentElement('beforeEnd', option);
    }

    resetSelect(selector) {
        $(selector).prop('selectedIndex', 0);
        this.updateMaterializeForms(selector);
    }

    disabledSelect(status, selector) {
        $(selector).formSelect("destroy")
        document.querySelector(selector).disabled = status;
        this.updateMaterializeForms(selector);
    }

    updateMaterializeForms(selector) {
        $(selector).formSelect();
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    showLoader() {
        this.clearContainer();

        const template = `
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        `;

        this.container.insertAdjacentHTML("beforeend", template);
    }

    showInfo(msg) {
        //this.clearContainer();

        const template = `
            <div class="card blue lighten-4 banner-info">
                <div class="card-content">
                    <p>${msg}</p>
                </div>
                <i class="material-icons icon-close">close</i>
            </div>
        `;

        this.bannersContainer.insertAdjacentHTML("beforeend", template);
    }

    showError(err) {
        //this.clearContainer();

        const template = `
            <div class="card red lighten-1 banner-info">
                <div class="card-content">
                    <span class="card-title">Error:</span>
                    <p>${err}</p>
                </div>
                <i class="material-icons icon-close">close</i>
            </div>
        `;

        this.bannersContainer.insertAdjacentHTML("beforeend", template);
    }
}