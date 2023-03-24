import express from "express";
import produtosController from "../controllers/produtosController.js";

const produtosRouter = express.Router();

const nomeRota = "cadastroProdutos";

produtosRouter.route(`/${nomeRota}`)
  .post(produtosController.create)
  .get(produtosController.read);

//http://localhost:3000/cadastroProdutos/pagina?itensPorPagina=10&pagina=1
produtosRouter.route(`/${nomeRota}/pagina`)
  .get(produtosController.readQuery);

// http://localhost:3000/cadastroProdutos/busca?nome=&marca=&qtd=

produtosRouter.route(`/${nomeRota}/busca`)
  .get(produtosController.find);

produtosRouter.route(`/${nomeRota}/:id`)
  .put(produtosController.update)
  .delete(produtosController.delete)
  .get(produtosController.readById);

export default produtosRouter;