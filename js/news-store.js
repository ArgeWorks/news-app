const NewsStore = (function () {
    let news, instance;

    function getNews() {
        return news.slice();
    }

    function setNews(newsArr) {
        news = newsArr;
        return news.slice();
    }

    function createInstance() {
        return {
            getNews,
            setNews
        }
    }

    return {
        getInstance() {
            return instance || (instance = createInstance());
        }
    }
}());