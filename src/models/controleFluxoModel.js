import { Sequelize } from "sequelize";
import sequelize from "../config/config.js";
import Produto from "./produtosModel.js";

 //** Definição do modelo de Entrada */ 
 const Entrada = sequelize.define('Entrada', {
    qtd_in: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    data_in: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  //** Definição do modelo de Saída */ 
  const Saida = sequelize.define('Saida', {
    qtd_out: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    data_out: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  //** Associação entre Produto e Entrada */ 
  Produto.hasMany(Entrada, {
    onDelete: 'cascade',
    hooks: true,
    foreignKey: {
      name: 'produto_id',
      allowNull: false
    }
  });

  Entrada.belongsTo(Produto, {
    foreignKey: {
      name: 'produto_id',
      allowNull: false
    }
  });

  //** Associação entre Produto e Saída */ 
  Produto.hasMany(Saida, {
    onDelete: 'cascade',
    hooks: true,
    foreignKey: {
      name: 'produto_id',
      allowNull: false
    }
  });

  Saida.belongsTo(Produto, {
    foreignKey: {
      name: 'produto_id',
      allowNull: false
    }
  });

export {Entrada,Saida};
