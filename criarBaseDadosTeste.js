import sequelize from "./src/config/config.js";
import Produto from "./src/models/produtosModel.js";
import { Entrada, Saida } from "./src/models/controleFluxoModel.js"

import { listaJSONplus } from "./produtos.js";


sequelize.authenticate().then(() => {
    console.log("Conectado com sucesso!");
}).catch((erro) => {
    console.log("Falha ao se conectar:", erro);
});



await sequelize.sync({ force: true });

listaJSONplus.forEach(async input => {

    const produto = await Produto.create(input);
    await Entrada.create({
        produto_id:produto.id,
        qtd_in: produto.qtd,
        data_in: new Date()
      })
});

