import express from "express";
import produtosController from "../controllers/produtosController.js";

const rotinaEstoque = express.Router();


const nomeRota = "produtosQuantidadeMinima";

rotinaEstoque.route(`/${nomeRota}/`)  
  .get(produtosController.listarProdutosComQuantidadeMinima);


  export default rotinaEstoque;