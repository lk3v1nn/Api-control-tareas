const { config } = require ("dotenv")
config();

console.log(process.env.name);
const port = process.env.port;

module.exports = {
    port: port || "3500",
};
