const { config } = require ("dotenv")
config();

const port = process.env.port;

module.exports = {
    port: port || "3500",
};
