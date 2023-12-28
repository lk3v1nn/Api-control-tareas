const sql = require("mssql");

require("dotenv").config();

const sqlConfig = {
    user: process.env.DBuser,
    password: process.env.DBpassword,
    database: process.env.DBdatabase,
    server: process.env.DBserver,
    options: {
        // encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
        connectTimeout: 30000,
    },
};

async function dbConsultQuery(query) {
    try {
        await sql.connect(sqlConfig);
        const dbResponse = await sql.query(query);
        return dbResponse.recordsets;
    } catch (error) {
        console.log("error al conectarse a la base de datos tratnado de ver que pdo");
        console.log(error);
        return;
    }
}

module.exports = { dbConsultQuery };
