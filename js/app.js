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
    http.get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`, (err, resp) => {
        // Check error
        if (err) return;
        // Deserialize json object
        const respone = JSON.parse(resp);
        // Add news to markup
        respone.sources.forEach(source => ui.addOptionToSelect(selectResources, new Option(source.name, source.id)));
        // Update select
        ui.updateMaterializeForms('#resources');
    });
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

    // Make get request for news
    http.get(`https://newsapi.org/v2/top-headlines?country=${selectCountry.value}&category=${selectCategory.value}&apiKey=${apiKey}`, (err, resp) => {
        // Check error
        if (err) return ui.showError(err);
        // Deserialize json object
        const respone = JSON.parse(resp);
        // Clear container
        ui.clearContainer();
        // Add news to markup
        respone.articles.forEach(news => ui.addNews(news));
    });
}

function onChangeResources(e) {
    // Show preloader
    ui.showLoader();

    // Reset country and categories selects
    ui.resetSelect('#country');
    ui.resetSelect('#categories');

    // Disable category select
    ui.disabledSelect(true, '#categories');

    // Make get request for news
    http.get(`https://newsapi.org/v2/top-headlines?sources=${selectResources.value}&apiKey=${apiKey}`, (err, resp) => {
        // Check error
        if (err) return ui.showError(err);
        // Deserialize json object
        const respone = JSON.parse(resp);
        // Clear container
        ui.clearContainer();
        // Add news to markup
        respone.articles.forEach(news => ui.addNews(news));
    });
}

function onSearch(e) {
    // Stop default action
    e.preventDefault();

    // Make get request for search news
    http.get(`https://newsapi.org/v2/top-headlines?q=${searchForm.elements.searchInput.value}&apiKey=${apiKey}`, (err, resp) => {
        // Clear input
        searchForm.reset();
        // Check error
        if (err) return ui.showError(err);
        // Deserialize json object
        const respone = JSON.parse(resp);
        if (respone.totalResults) {
            // Clear container
            ui.clearContainer();
            // Add news to markup
            respone.articles.forEach(news => ui.addNews(news));
        } else {
            ui.showInfo('По вашему запросу новостей не найдено.');
        }
    });
}
