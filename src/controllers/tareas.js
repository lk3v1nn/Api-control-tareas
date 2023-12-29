const { dbConsultQuery } = require("../database/connection");

const getTareasController = (req, res) => {
    const {pEquipo} = req.body
    try {
        dbConsultQuery(`EXEC PRC_MOSTRAR_TAREAS ${pEquipo}`).then((request) => {
            res.json(request);
            console.log("GET: Tareas entregadas");
        });
    } catch (error) {
        res.json({ Error: "Ocurrio un error" });
    }
};

const getTareasCompletadasController = (req, res) => {
    const {pEquipo} = req.body;
    try {
        dbConsultQuery(`EXEC PRC_MOSTRAR_TAREAS_COMPLETADAS ${pEquipo}`).then(
            (request) => {
                res.json(request);
                console.log("GET: Tareas entregadas");
            }
        );
    } catch (error) {
        res.json({ Error: "Ocurrio un error" });
    }
};

const getTareasPendientesController = (req, res) => {
    const {pEquipo} = req.body;
    try {
        dbConsultQuery(`EXEC PRC_MOSTRAR_TAREAS_PENDIENTES ${pEquipo}`).then((request) =>
        {
            res.json(request);
            console.log("GET: Tareas entregadas");
        }
        );
    } catch (error) {
        res.json({ Error: "Ocurrio un error" });
    }
};

const createTareaController = async (req, res) => {
    const {
        pTarea,
        pEstado,
        pFecha,
        pImportante,
        pCategoria,
        pUsuarioCreador,
        pAsignacion,
        pEquipo
    } = req.body;
    console.log(req.body);
    if (
        pTarea == null ||
        pEstado == null ||
        pFecha == null ||
        pImportante == null ||
        pCategoria == null ||
        pUsuarioCreador == null ||
        pAsignacion == null ||
        pEquipo == null
    ) {
        console.log("ss");
        return res.status(400).json({ Mensaje: "Campos incompletos" });
    }
    try {
        await dbConsultQuery(
            `EXEC PRC_INSERTAR_TAREA '${pTarea}' ,${pEstado}, '${pFecha}', ${pImportante}, ${pCategoria}, ${pUsuarioCreador}, ${pAsignacion}, ${pEquipo}`
        );
        res.status(200).json({ Mensaje: "Tarea creada" });
        console.log('POST: Tarea creada');
        
    } catch (error) {
        res.status(500).json({ Error: "Ocurrio un error al guardar la tarea" });
    }
};

const updateTareaController = async (req, res) => {
    let {
        pId,
        pTarea,
        pEstado,
        pFecha,
        pImportante,
        pCategoria,
        pUsuarioCreador,
        pAsignacion,
        pEquipo
    } = req.body;
    pTarea = pTarea === null ? null : JSON.stringify(pTarea);
    pFecha = pFecha === null ? null : JSON.stringify(pFecha);
    try {
        await dbConsultQuery(
            `EXEC PRC_ACTUALIZAR_TAREA ${pId}, ${pTarea} ,${pEstado}, ${pFecha}, ${pImportante}, ${pCategoria}, ${pUsuarioCreador}, ${pAsignacion}, ${pEquipo}`
        );
        console.log(
            `EXEC PRC_ACTUALIZAR_TAREA ${pId}, '${pTarea}' ,${pEstado}, '${pFecha}', ${pImportante}, ${pCategoria}, ${pUsuarioCreador}, ${pAsignacion}, ${pEquipo}`
        );
        res.status(200).json({ Mensaje: "Tarea actualizada" });
    } catch (error) {
        res.status(500).json({ Error: "No se pudo actualizar la tarea" });
    }
};

const deleteTareaController = async (req, res) => {
    const { id } = req.params;
    if (id == null) {
        return res.status(400).json({ Mensaje: "Campos incompletos" });
    }
    try {
        await dbConsultQuery(`EXEC PRC_ELIMINAR_TAREA ${id}`);
        res.json({ Mensaje: "Tarea eliminada" });
        console.log('DELETE: Tarea eliminada');
    } catch (error) {
        res.status(500).json({ Error: "No se pudo eliminar la tarea" });
    }
};

function validarParametrosVacios(variables) {
    const arreglo = variables || [];
    arreglo.map((a) => {
        if (a == null) return true;
    });
}

module.exports = {
    getTareasController,
    getTareasCompletadasController,
    getTareasPendientesController,
    createTareaController,
    updateTareaController,
    deleteTareaController,
};
