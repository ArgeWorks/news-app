// Init UI
const ui = new UI();
// Init Auth
const auth = new Auth();

// Init Forms
const form = document.forms['login-form'];
const email = form.elements['email'];
const password = form.elements['password'];

// Check auth state
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // If user is signed in goto index.html
        setTimeout(() => {
            window.location = 'index.html';
        }, 3000);
    }
});

// Events
form.addEventListener('submit', onLogIn);

// LogIn
function onLogIn(e) {
    e.preventDefault();

    if (email.value && password.value) {
        auth.login(email.value, password.value)
            .then(() => {
                ui.showInfo('Login successful! Redirecting...');
            })
            .catch(err => ui.showError(err.message));
    }
}