import express from "express";
import produtosRouter from "./routes/produtosRoutes.js";
import cors from 'cors';



const app = express();

// add o middleware Json
app.use(express.json());

//habilita CORS
app.use(cors({
    origin: '*'
}));

app.get("/",(req,res) => {
    res.status(200).send(html)
})

// add rotas
app.use(produtosRouter);



export default app;



const html = `<table>
<tr>
  <th>Método HTTP</th>
  <th>Rota da API</th>
  <th>Descrição</th>
</tr>
<tr>
  <td>POST</td>
  <td>/cadastroProdutos</td>
  <td>Cria um novo produto</td>
</tr>
<tr>
  <td>GET</td>
  <td>/cadastroProdutos</td>
  <td>Lista todos os produtos</td>
</tr>
<tr>
  <td>GET</td>
  <td>/cadastroProdutos/pagina</td>
  <td>Lista produtos paginados</td>
</tr>
<tr>
  <td>GET</td>
  <td>/cadastroProdutos/busca</td>
  <td>Procura produtos com base em parâmetros de busca</td>
</tr>
<tr>
  <td>PUT</td>
  <td>/cadastroProdutos/:id</td>
  <td>Atualiza um produto existente com base no ID</td>
</tr>
<tr>
  <td>DELETE</td>
  <td>/cadastroProdutos/:id</td>
  <td>Remove um produto existente com base no ID</td>
</tr>
<tr>
  <td>GET</td>
  <td>/cadastroProdutos/:id</td>
  <td>Lista um produto específico com base no ID</td>
</tr>
</table>
`