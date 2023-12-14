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

router.get("/tareas", getTareasController);
router.get("/tareascompletadas", getTareasCompletadasController);
router.get("/tareaspendientes", getTareasPendientesController);

router.post("/tareas", createTareaController);

router.put("/tareas", updateTareaController);

router.delete("/tareas", deleteTareaController);

module.exports = router;
