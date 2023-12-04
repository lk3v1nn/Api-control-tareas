const {Router} = require ('express')

const router = Router();

router.get("/tareas", (req, res) => {
    res.json({ Tareas: "tareas" });
});

module.exports = router
