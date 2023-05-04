import sequelize from "./src/config/config.js";
import Produto from "./src/models/produtosModel.js";
import Movimentacao from "./src/models/controleFluxoModel.js";

import { listaJSONplus } from "./produtos.js";


sequelize.authenticate().then(() => {
    console.log("Conectado com sucesso!");
}).catch((erro) => {
    console.log("Falha ao se conectar:", erro);
});



await sequelize.sync({ force: true });

listaJSONplus.forEach(async input => {

    const produto = await Produto.create(input);
    await Movimentacao.create({
        nome:produto.nome,
        tipo:"entrada",        
        produto_id:produto.id,
        qtd: produto.qtd,
        data: new Date()
      })
});

