import { Sequelize } from "sequelize";
import sequelize from "../config/config.js";
import Produto from "./produtosModel.js";

const Movimentacao = sequelize.define('Movimentacao', {
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    produto_id:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    tipo: {
        type: Sequelize.ENUM('entrada', 'saida'),
        allowNull: false
    },
    qtd: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

// Produto.hasMany(Movimentacao, {
//     onDelete: 'cascade',
//     hooks: true,
//     foreignKey: {
//         name: 'produto_id',
//         allowNull: false
//     }
// });

// Movimentacao.belongsTo(Produto, {
//     foreignKey: {
//         name: 'produto_id',
//         allowNull: false
//     }
// });

export default Movimentacao;
