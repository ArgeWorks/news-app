// Класс для общения с сервером (Ajax)
class Http {
    // Запрос данных с сервера
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(resp => {
                    if (resp.status === 200) {
                        resp.json()
                            .then(data => resolve(data));
                    } else {
                        reject(resp.status);
                    }
                })
                .catch(err => reject(err));
        });
    }

    // Передача данных на сервер
    post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(resp => {
                    if (resp.status === 200 || resp.status === 201) {
                        resp.json()
                            .then(data => resolve(data));
                    } else {
                        reject(resp.status);
                    }
                })
                .catch(err => reject(err));
        });
    }

    // Обновление данных на сервер
    put(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(resp => {
                    if (resp.status === 200 || resp.status === 201) {
                        resp.json()
                            .then(data => resolve(data));
                    } else {
                        reject(resp.status);
                    }
                })
                .catch(err => reject(err));
        });
    }

    // Удаление данных на сервер
    delete(url) {
        return new Promise((resolve, reject) => {
            fetch(url, { method: "DELETE" })
                .then(resp => {
                    if (resp.status === 200) {
                        resolve("Deleted");
                    } else {
                        reject(resp.status);
                    }
                })
                .catch(err => reject(err));
        });
    }
}