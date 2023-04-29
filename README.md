# API de cadastro de produtos
API desenvolvida em Node.js com Express e banco de dados MySQL, utilizando a biblioteca Sequelize para ORM.

## CheckList

## Dependências
### Blibliotecas & FrameWorks
- express
- mysql2
- sequelize
- nodemon (somente para desenvolvimento)

### Bando de dados
- MySQL

  
## Instalação
Clone este repositório.
Na pasta raiz do projeto, execute o comando **npm install** para instalar as dependências.
Configure as variáveis de ambiente no arquivo **config.js** com as informações do banco de dados.
Execute o comando **npm start** para rodar a aplicação.

## Banco de Dados 
Para configurar corretamente o banco de dados é necessario alterar as variáveis no arquivo **src/config/config.js**.
```javascript
const DB = "NomeDoBanco"; // somente letras e numeros 
const usuario = "root";
const senha = "123";
```
Para criar um banco de dados para teste execute o comando **"node criarBaseDadosTeste.js"** , para criar 46 itens. 

## Rotas
A API possui as seguintes rotas:

### POST /cadastroProdutos
Cria um novo produto.

Exemplo de requisição:

```json

{
  "nome": "Produto A",
  "marca": "Marca A",  
  "qtd": 10
}
```

### GET /cadastroProdutos
Retorna uma lista de produtos.

### GET /cadastroProdutos/pagina?itensPorPagina=10&pagina=1
Retorna uma lista de produtos paginados. É possível passar os parâmetros **itensPorPagina** e **pagina** para definir a quantidade de itens por página e a página desejada.

### GET /cadastroProdutos/busca?nome=&marca=&qtd=
Retorna uma lista de produtos filtrados por **nome**, **marca** e **quantidade**. Passando os parâmetros **nome**, **marca** e **qtd** para realizar a busca.

### GET /cadastroProdutos/:id
Retorna um produto específico pelo seu **ID**.

### PUT /cadastroProdutos/:id
Atualiza um produto existente.

Exemplo de requisição:

```json

{
  "nome": "Produto B",
  "marca": "Marca B",  
  "qtd": 5
}
```


### DELETE /cadastroProdutos/:id
Deleta um produto existente.

