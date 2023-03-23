import Sequelize from "sequelize";
import createDataBase from "./createDB.js";

const DB = "estoquedatabase";// Cuidado ao escolher o nome do banco ! 
const usuario = "root";
const senha = "meusql";

const sequelize = new Sequelize(DB, usuario, senha, {
  host: "localhost",
  dialect: "mysql",
});


let dbStatusCreate = true;
console.log(dbStatusCreate);

if (dbStatusCreate) {
  await createDataBase(DB,usuario,senha);
  dbStatusCreate = false; 
  console.log(dbStatusCreate);
 
}


export default sequelize;


