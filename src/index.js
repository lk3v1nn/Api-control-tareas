const Express = require("express");
const routerTareas = require("./routes/tareas");
const config = require('./configEnv')

const app = Express();

app.use(Express.json());
app.use(routerTareas);

app.get("", (req, res) => {
    res.send("esuchando");
});

app.listen(config.port, () => {
    console.log(`escuchando en puerto ${config.port}`);
});
