const FirestoreInit = (function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAf9scmfMos1YWQHw_l94kwz5DFi5aSEJA",
        authDomain: "arge-news-app.firebaseapp.com",
        databaseURL: "https://arge-news-app.firebaseio.com",
        projectId: "arge-news-app",
        storageBucket: "arge-news-app.appspot.com",
        messagingSenderId: "1044708333456"
    };
    firebase.initializeApp(config);
}());