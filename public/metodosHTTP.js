
class metodosHTTP {

    async getData() {
        try {
            const response = await fetch(baseURL);
            return response.json();
        } catch (e) {
            console.error(e);
        };
    };


    async createItem(item) {
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        } catch (e) {
            console.error(e);
        }
    }

    async deleteItem(id) {
        try {
            const response = await fetch(`${baseURL}/${id}`, {
                method: 'DELETE'
            });
            return response.json();
        } catch (e) {
            console.error(e);
        }
    }

    async updateItem(id, data) {
        try {
            const response = await fetch(`${baseURL}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.json();
        } catch (e) {
            console.error(e);
        }
    }
}