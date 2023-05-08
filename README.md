# API de cadastro de produtos
API desenvolvida em Node.js com Express e banco de dados MySQL, utilizando a biblioteca Sequelize para ORM. Permite o registro de entrada e saída de produtos, atualizando a quantidade total em estoque e registrando tambem as movimentações de produtos.

## ♻ Atualização 

Foram adicionadas novas funcionalidades à API. Para ter acesso às novidades, utilize o comando "git pull" em seu repositório. Entre as atualizações, destacam-se:
- Registro de entrada e saída de mercadorias.
- Inclusão de método e modelo no banco para definir valores máximos e mínimos de produtos no estoque.
  
  OBS: Como não foi criado um arquivo de migração, e este projeto esta em constante aprimoramento. Considere recriar as tabelas usando o comando **"node criarBaseDadosTeste.js"** , agora com 46 itens.


## 🏃‍♂️ Motivações e Objetivos 
Esta API foi desenvolvida para atender as especificaçoes do cliente [Pedro Marins](https://github.com/pedromarins). Que tem como a demanda de funcionalidades :

### ⚙ Lista de funcionalidades

#### Básico
-   Ter uma lista de produtos com um identificador para cada item.
-   Ler a lista de produtos.
-   Poder adicionar um item na lista de produtos.   
-   Poder remover um item da lista de produtos.
-   Adicionar quantidade de itens na lista de produtos.
-   Poder alterar a quantidade de itens de um produto específico.
-   Consultar um item na lista de produtos para saber a quantidade disponível.

#### Avançado
- Poder adicionar um limite mínimo e máximo para cada item da lista de produtos.
- Rotina para verificar se alguma quantidade de itens está abaixo do limite mínimo.

#### Extra
- Armazenar cada transação na lista de produtos.
## 📚 Dependências
### Blibliotecas & FrameWorks
- express
- mysql2
- sequelize
- nodemon (somente para desenvolvimento)

### Banco de dados
- MySQL
  
## 🏗 Instalação
Clone este repositório.
Na pasta raiz do projeto, execute o comando **npm install** para instalar as dependências.
Configure as variáveis de ambiente no arquivo **config.js** com as informações do banco de dados.
Execute o comando **npm start** para rodar a aplicação.

## 🎲 Banco de Dados 
Para configurar corretamente o banco de dados é necessario alterar as variáveis no arquivo **src/config/config.js**.
```javascript
const DB = "NomeDoBanco"; // somente letras e numeros 
const usuario = "root";
const senha = "123";
```
Para criar um banco de dados para teste execute o comando **"node criarBaseDadosTeste.js"** , para criar 46 itens. 

## 🔀 Rotas de produtos
A API possui as seguintes rotas:

### POST /cadastroProdutos
Cria um novo produto.

Exemplo de requisição:

```json
{
  "nome": "Produto A",
  "marca": "Marca A",  
  "qtd": 10,
  "min_qtd" : 30,
  "max_qtd" : 999
}
```
 <span style="color:orange">* Usando esse método automaticamente registra a quantidade como entrada.</span>


### GET /cadastroProdutos
Retorna todos os produtos.

### GET /cadastroProdutos/pagina?itensPorPagina=10&pagina=1
Retorna uma lista de produtos paginados. É possível passar os parâmetros **itensPorPagina** e **pagina** para definir a quantidade de itens por página e a página desejada.

### GET /cadastroProdutos/busca?nome=&marca=
Retorna uma lista de produtos filtrados por **nome**, **marca**, Passando os parâmetros **nome**, **marca** para realizar a busca.

### GET /cadastroProdutos/:id
Retorna um produto específico pelo seu **ID**.

### PUT /cadastroProdutos/:id
Atualiza um produto existente.

Exemplo de requisição:

```json
{
  "nome": "Produto B",
  "marca": "Marca B",    
  "min_qtd" : 30,
  "max_qtd" : 999
}
```
<span style="color:orange">* Quantidade não pode ser atualizada por esta rota.</span>

### DELETE /cadastroProdutos/:id
Deleta um produto existente.

 <span style="color:orange">* Usando esse método automaticamente registra toda a quantidade desse item como saída.</span>

### GET  /produtosQuantidadeMinima
Retorna uma lista de produtos com quantidade abaixo do limite mínimo definido no cadastro do produto.

## 🛒 Rotas de entrada e saída de mercadorias.

### POST /fluxo/entrada/:id

 Registra a entrada de um determinado produto no estoque. O parâmetro **:id** corresponde ao ID do produto que será atualizado. O corpo da requisição deve conter um objeto JSON com as chaves **qtd_in** (quantidade que será adicionada ao estoque) e **data** (data e hora da entrada no formato "YYYY-MM-DD HH:mm:ss").

```json
{     
  "qtd_in" : 30,
  "data" : "YYYY-MM-DD HH:mm:ss"
}
```

### POST /fluxo/saida/:id

Registra a saída de um determinado produto no estoque. O parâmetro **:id** corresponde ao ID do produto que será atualizado. O corpo da requisição deve conter um objeto JSON com as chaves **qtd_out** (quantidade que será retirada do estoque) e **data** (data e hora da saída no formato "YYYY-MM-DD HH:mm:ss").

```json
{     
  "qtd_in" : 30,
  "data" : "YYYY-MM-DD HH:mm:ss"
}
```

### GET /fluxo

Retorna uma lista de todas as movimentações registradas.
### GET /fluxo/:produto_id 

Retorna uma lista de movimentações de um produto específico com base no seu id.

## 💻 Postman

Dentro da pasta **Postman Collection** está salvo o arquivo JSON usado para testar essa API usando o programa [Postman](https://www.postman.com/downloads/)