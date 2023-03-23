import express from "express";
import produtosRouter from "./routes/produtosRoutes.js";

const app = express();

// add o middleware Json
app.use(express.json());
// add rotas
app.use(produtosRouter);



export default app;

