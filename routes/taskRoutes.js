const router = require("express").Router();
const auth = require("../middleware/auth");
const { createTask, getTasks, getAllTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/all/me", auth, getAllTasks);
router.get("/:projectId", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
