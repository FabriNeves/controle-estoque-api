import express from 'express';
import fs from 'fs';
import cors from 'cors';
// eslint-disable-next-line import/extensions
import produtosRouter from './routes/produtosRoutes.js';
// eslint-disable-next-line import/extensions
import rotinaEstoque from './routes/rotinaVerificacaoEstoque.js';
// eslint-disable-next-line import/extensions
import fluxoRoutes from './routes/fluxoRoutes.js';

/** Add arquivo de index.js */
const html = fs.readFileSync('./src/index/index.html', 'utf8');

const app = express();

/** add o middleware Json */
app.use(express.json());

/** habilita CORS */
app.use(cors({
  origin: '*',
}));

app.get('/', (req, res) => {
  res.status(200).send(html);
});

/** Add Rotas */
app.use(produtosRouter);
app.use(rotinaEstoque);
app.use(fluxoRoutes);

export default app;
