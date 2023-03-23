import { Sequelize } from "sequelize";
import sequelize from "../config/config.js";


// Esquema Produtos 
const Produto = sequelize.define("produtosTable", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
       type : Sequelize.STRING,
       allowNull: false,       
    },
    marca:{
        type : Sequelize.STRING,
        allowNull: false,       
     },
    qtd: {
        type : Sequelize.INTEGER,
        allowNull: false,       
     },
})


export default Produto;