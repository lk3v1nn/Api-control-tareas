const sql = require("mssql");
require("dotenv").config();

const sqlConfig = {
    user: process.env.DBuser || '',
    password: process.env.DBpassword || '',
    database: process.env.DBdatabase || '',
    server: process.env.DBserver || '',
};

async () => {
    try {
        await sql.connect(sqlConfig);
    } catch (error) {
        console.log('error al conectarse a la base de datos')
    }
};
