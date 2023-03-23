import express from "express";
import produtosController from "../controllers/produtosController.js";

const produtosRouter = express.Router();

const nomeRota = "cadastroProdutos";

produtosRouter.route(`/${nomeRota}`)
  .post(produtosController.create)
  .get(produtosController.read);

  // /busca?escola=&nome=&idade=&genero=&situacaoFinal=
produtosRouter.route(`/${nomeRota}/busca`)
  .get(produtosController.find);

produtosRouter.route(`/${nomeRota}/:id`)
  .put(produtosController.update)
  .delete(produtosController.delete)
  .get(produtosController.readById);

export default produtosRouter;