const { dbConsultQuery } = require("../database/connection");

const getTareasController = (req, res) => {
    try {
        dbConsultQuery("EXEC PRC_MOSTRAR_TAREAS").then((request) =>
            res.json(request)
        );
    } catch (error) {
        res.json({ Error: "Ocurrio un error" });
    }
};

const getTareasCompletadasController = (req, res) => {
    try {
        dbConsultQuery("SELECT * FROM VW_MOSTRAR_TAREAS_COMPLETADAS").then((request) =>
            res.json(request)
        );
    } catch (error) {
        res.json({ Error: "Ocurrio un error" });
    }
};

const getTareasPendientesController = (req, res) => {
    try {
        dbConsultQuery("SELECT * FROM VW_MOSTRAR_TAREAS_PENDIENTES").then((request) =>
            res.json(request)
        );
    } catch (error) {
        res.json({ Error: "Ocurrio un error" });
    }
};

const createTareaController = async (req, res) => {
    const { pTarea, pAsignacion } = req.body;
    if (!pTarea || !pAsignacion) {
        return res.status(400).json({ Mensaje: "Campos incompletos" });
    }
    try {
        await dbConsultQuery(
            `EXEC PRC_INSERTAR_TAREA "${pTarea}", "${pAsignacion}"`
        );
        res.status(200).json({ Mensaje: "Tarea creada" });
    } catch (error) {
        res.status(500).json({ Error: "Ocurrio un error al guardar la tarea" });
    }
};

const updateTareaController = (req, res) => {
    const { pId, pTarea } = req.body;
    if (pId == null || pTarea == null) {
        return res.status(400).json({ Mensaje: "Campos incompletos" });
    }
    try {
        dbConsultQuery(`EXEC PRC_ACTUALIZAR_TAREA "${pTarea}", ${pId}`);
        res.status(200).json({ Mensaje: "Tarea actualizada" });
    } catch (error) {
        res.status(500).json({ Error: "No se pudo actualizar la tarea" });
    }
};

const deleteTareaController = (req, res) => {
    const { pId } = req.body;
    if (pId == null) {
        return res.status(400).json({ Mensaje: "Campos incompletos" });
    }
    try {
        dbConsultQuery(`EXEC PRC_ELIMINAR_TAREA ${pId}`);
        res.json({ Mensaje: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ Error: "No se pudo eliminar la tarea" });
    }
};

module.exports = {
    getTareasController,
    getTareasCompletadasController,
    getTareasPendientesController,
    createTareaController,
    updateTareaController,
    deleteTareaController,
    
};
