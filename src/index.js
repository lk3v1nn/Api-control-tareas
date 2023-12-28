const Express = require("express");
const cors = require('cors')
const routerTareas = require("./routes/tareas");
const config = require('./configEnv')
require('./database/connection')

const app = Express();

// const corsOptions =
// {
//     "origin": "http://localhost:3000/",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
// }

app.use(Express.json());
app.use(cors())
app.use(routerTareas);

app.get("", (req, res) => {
    res.send("esuchando");
});

app.listen(config.port, () => {
    console.log(`escuchando en puerto ${config.port}`);
});
