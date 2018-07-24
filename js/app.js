// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api Key
const apiKey = 'a44bc10446094baea789d794200786eb';

// Init elements
const selectCountry = document.getElementById('country');
const selectCategory = document.getElementById('categories');
const selectResources = document.getElementById('resources');
const searchForm = document.getElementById('searchForm');

// Init resources
(function () {
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
                data.articles.forEach(news => ui.addNews(news));
            } else {
                ui.showInfo('По вашему запросу новостей не найдено.');
            }
        })
        .catch((err) => ui.showError(err));
}