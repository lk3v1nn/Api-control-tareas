const sql = require("mssql");

require('dotenv').config()

const sqlConfig = {
    user: process.env.DBuser,
    password: process.env.DBpassword,
    database: process.env.DBdatabase,
    server: process.env.DBserver,
    port: parseInt(process.env.DBPort),
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
};

async function DBConnetion (query) {
    console.log(query);
    
    try {
        await sql.connect(sqlConfig);
        const DBresultado = await sql.query(query)
        return DBresultado.recordset
    } catch (error) {
        console.log("error al conectarse a la base de datos");
        console.log(error);
    }
};

DBConnetion(`SELECT * FROM TB_TAREAS`).then((e) =>{console.log(e)})
