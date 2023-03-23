


// Cria uma bando de dados se o mesmo nao existir
import mysql from "mysql2";


async function createDataBase(dbName,dbUser,dbPassword) {

    
    const connection = mysql.createConnection({
        host: "localhost",
        user: dbUser,
        password: dbPassword,
    });

    
    connection.query(
        `CREATE DATABASE IF NOT EXISTS ${dbName}`,
        function (err, results) {
            console.log(results);
            console.log(err||"None");
        }
    );

   
    connection.end();
}

export default createDataBase;