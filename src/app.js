import express from "express";
import produtosRouter from "./routes/produtosRoutes.js";
import cors from 'cors';
import rotinaEstoque from "./routes/rotinaVerificacaoEstoque.js";
import fluxoRoutes from "./routes/fluxoRoutes.js";



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
app.use(rotinaEstoque);
app.use(fluxoRoutes);

export default app;



