const { Router } = require("express");
const {
    getTareasController,
    getTareasCompletadasController,
    getTareasPendientesController,
    createTareaController,
    updateTareaController,
    deleteTareaController,
} = require("../controllers/tareas");

const router = Router();

router.post("/tareas", getTareasController);
router.post("/tareas/completadas", getTareasCompletadasController);
router.post("/tareas/pendientes", getTareasPendientesController);

router.post("/tareas/agregar", createTareaController);

router.put("/tareas", updateTareaController);

router.delete("/tareas/:id", deleteTareaController);

module.exports = router;
