import sequelize from "./src/config/config.js";
import Produto from "./src/models/produtosModel.js";

import { listaJSON } from "./produtos.js";


sequelize.authenticate().then(() => {
    console.log("Conectado com sucesso!");
}).catch((erro) => {
    console.log("Falha ao se conectar:", erro);
});



await sequelize.sync({ force: true });

listaJSON.forEach(async input =>{
   await Produto.create(input);
});

