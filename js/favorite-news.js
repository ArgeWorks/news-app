// Init UI
const ui = new UI();
// Init Auth
const auth = new Auth();
// Init Favorites
const favs = new Favorites();
// Init news storage
const newsStore = NewsStore.getInstance();

// Init elements
const btnLogIn = document.getElementById('btn-login');
const btnLogOut = document.getElementById('btn-logout');
const btnFavorites = document.querySelector('.btn-favorites');
const newsContainer = document.querySelector('.news-container');

// All events
newsContainer.addEventListener('click', removeFavorite);
btnLogOut.addEventListener('click', onLogOut);

window.addEventListener('load', onLoad);

function onLoad(e) {
    // Show preloader
    ui.showLoader();

    // Check auth state
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            btnLogOut.style.display = 'block';
            btnLogIn.style.display = 'none';
            btnFavorites.style.display = 'block';

            favs.getFavorites()
                .then(favoriteNews => {
                    if (favoriteNews.docs.length) {
                        // Clear container
                        ui.clearContainer();
                        // Add news to markup
                        favoriteNews.forEach((news) => ui.addFavoriteNews(news.data(), news.id));
                        // Init tooltips
                        $('.tooltipped').tooltip();
                    } else {
                        // Clear container
                        ui.clearContainer();
                        // Show info
                        ui.showInfo('You dont have favorite news.');
                    }
                })
                .catch(error => ui.showError(error));
        }
        else {
            btnLogIn.style.display = 'block';
            btnLogOut.style.display = 'none';
            btnFavorites.style.display = 'none'; 
            ui.clearContainer();
            ui.showError('You need login first!')
        }
    });
}

// Remove news from favorites
function removeFavorite(e) {
    if (e.target.classList.contains('remove-favorite')) {
        const id = e.target.dataset.id;

        favs.removeFavorite(id)
            .then(() => {
                e.target.closest('.col').remove();
                M.toast({ html: 'Removed from favorites!' })
            })
            .catch(err => ui.showError(err));
    }
}

// LogOut
function onLogOut() {
    auth.logout()
        .then(() => M.toast({ html: 'You have successfully logged out!' }))
        .catch(err => console.log(err));
}