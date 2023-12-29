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
router.post("/tareascompletadas", getTareasCompletadasController);
router.post("/tareaspendientes", getTareasPendientesController);

router.post("/tareas", createTareaController);

router.put("/tareas", updateTareaController);

router.delete("/tareas/:id", deleteTareaController);

module.exports = router;
