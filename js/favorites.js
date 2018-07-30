class Favorites {
    constructor() {
        this.db = FirestoreInit.getInstance().getDb();
        this.dbName = 'favorite-news';
    }

    getFavorites() {
        return new Promise((resolve, reject) => {
            this.db.collection(this.dbName).get()
                .then(querySnapshot => resolve(querySnapshot))
                .catch(err => reject(err));
        });
    }

    addFavorite(oneNews) {
        return new Promise((resolve, reject) => {
            this.db.collection(this.dbName).add(oneNews)
                .then(docRef => resolve(docRef))
                .catch(err => reject(err));
        });
    }

    removeFavorite(newsId) {
        return new Promise((resolve, reject) => {
            this.db.collection(this.dbName).doc(newsId).delete()
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }
}