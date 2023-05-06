import express from "express";
import controleFluxo from "../controllers/fluxoController.js";
const fluxoRoutes = express.Router();


const nomeRota = "fluxo";

fluxoRoutes.route(`/${nomeRota}/entrada/:id`)
    .post(controleFluxo.registrarEntrada);

fluxoRoutes.route(`/${nomeRota}/saida/:id`)
    .post(controleFluxo.registrarSaida);

fluxoRoutes.route(`/${nomeRota}/`).get(controleFluxo.read);

fluxoRoutes.route(`/${nomeRota}/:produto_id`).get(controleFluxo.read_produto_id);

export default fluxoRoutes;