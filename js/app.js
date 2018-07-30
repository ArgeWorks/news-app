// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Init Auth
const auth = new Auth();
// Init Favorites
const favs = new Favorites();
// Init news storage
const newsStore = NewsStore.getInstance();
// Api Key
const apiKey = 'a44bc10446094baea789d794200786eb';
// Login status
let isLogined = false;

// Init elements
const selectCountry = document.getElementById('country');
const selectCategory = document.getElementById('categories');
const selectResources = document.getElementById('resources');
const searchForm = document.getElementById('searchForm');
const btnLogIn = document.getElementById('btn-login');
const btnLogOut = document.getElementById('btn-logout');
const btnFavorites = document.querySelector('.btn-favorites');
const newsContainer = document.querySelector('.news-container');

// Check auth state
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        isLogined = true;
        btnLogOut.style.display = 'block';
        btnLogIn.style.display = 'none';
        btnFavorites.style.display = 'block';
    }
    else {
        isLogined = false;
        btnLogIn.style.display = 'block';
        btnLogOut.style.display = 'none';
        btnFavorites.style.display = 'none';
    }
});

// Init resources
const resources = (function () {
    // Make get request for all resources
    http.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
        .then(data => {
            // Add resources to markup
            data.sources.forEach(source => ui.addOptionToSelect(selectResources, new Option(source.name, source.id)));
            // Update select
            ui.updateMaterializeForms('#resources');
        })
        .catch((err) => { throw new Error(err) });
}());

// All events
selectCountry.addEventListener('change', onChangeCountryOrCategory);
selectCategory.addEventListener('change', onChangeCountryOrCategory);
selectResources.addEventListener('change', onChangeResources);
searchForm.addEventListener('submit', onSearch);
btnLogOut.addEventListener('click', onLogOut);
newsContainer.addEventListener('click', addFavorite);

// Event handlers
function onChangeCountryOrCategory(e) {
    // Show preloader
    ui.showLoader();
    // Reset resources select
    ui.resetSelect('#resources');
    // Enable category select
    ui.disabledSelect(false, '#categories');
    // Make get request and handle results
    newsHandler(`https://newsapi.org/v2/top-headlines?country=${selectCountry.value}&category=${selectCategory.value}&apiKey=${apiKey}`);
}

function onChangeResources(e) {
    // Show preloader
    ui.showLoader();
    // Reset country and categories selects
    ui.resetSelect('#country');
    ui.resetSelect('#categories');
    // Disable category select
    ui.disabledSelect(true, '#categories');
    // Make get request and handle results
    newsHandler(`https://newsapi.org/v2/top-headlines?sources=${selectResources.value}&apiKey=${apiKey}`);
}

// Search for news by keywords
function onSearch(e) {
    // Stop default action
    e.preventDefault();
    // Show preloader
    ui.showLoader();
    // Reset country and categories selects
    ui.resetSelect('#country');
    ui.resetSelect('#categories');
    // Disable category select
    ui.disabledSelect(true, '#categories');
    // Reset resources select
    ui.resetSelect('#resources');
    // Save search words for get request
    let searchWords = searchForm.elements.searchInput.value;
    // Clear input
    searchForm.reset();
    // Make get request and handle results
    newsHandler(`https://newsapi.org/v2/top-headlines?q=${searchWords}&apiKey=${apiKey}`);
}

// News handler
function newsHandler(url) {
    // Make get request for news
    http.get(url)
        .then(data => {
            // Check total results
            if (data.totalResults) {
                // Clear container
                ui.clearContainer();
                // Add news to markup
                data.articles.forEach((news, index) => ui.addNews(news, index, isLogined));
                // Add news to storage
                newsStore.setNews(data.articles);
                // Init tooltips
                $('.tooltipped').tooltip();
            } else {
                // Clear container
                ui.clearContainer();
                // Show info
                ui.showInfo('No news found on your request.');
            }
        })
        .catch((err) => ui.showError(err));
}

// LogOut
function onLogOut() {
    auth.logout()
        .then(() => M.toast({ html: 'You have successfully logged out!' }))
        .catch(err => console.log(err));
}

// Add news to favorites
function addFavorite(e) {
    if (e.target.classList.contains('add-favorite')) {
        const index = e.target.dataset.index;
        const oneNews = newsStore.getNews()[index];

        favs.addFavorite(oneNews)
            .then(data => M.toast({ html: 'Added to favorites!' }))
            .catch(err => ui.showError(err));
    }
}