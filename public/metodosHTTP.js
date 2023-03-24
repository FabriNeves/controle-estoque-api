// Revisar todos os itens !!! 

class ProdutosAPI {
    baseURL = "http://localhost:3000/cadastroProdutos";
  
    async getItem() {
      try {
        const response = await fetch(this.baseURL);
        return response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async createItem(item) {
      try {
        const response = await fetch(this.baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        return response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async updateItem(id, item) {
      try {
        const response = await fetch(`${this.baseURL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        return response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async deleteItem(id) {
      try {
        const response = await fetch(`${this.baseURL}/${id}`, {
          method: "DELETE",
        });
        return response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async searchItems({ nome, marca, qtd }) {
      const params = new URLSearchParams({
        nome: nome || "",
        marca: marca || "",
        qtd: qtd || "",
      });
  
      const url = `${this.baseURL}/busca?${params.toString()}`;
  
      try {
        const response = await fetch(url);
        return response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async getItensPagination({ itensPorPagina = 10, pagina = 1 }) {
      const params = new URLSearchParams({
        itensPorPagina: itensPorPagina,
        pagina: pagina,
      });
  
      const url = `${this.baseURL}/pagina?${params.toString()}`;
  
      try {
        const response = await fetch(url);
        return response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
    async getItensById(id) {
      try {
        const response = await fetch(`${this.baseURL}/${id}`);
        return response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
  