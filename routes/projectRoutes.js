const router = require("express").Router();
const auth = require("../middleware/auth");
const { createProject, getProjects, addMember } = require("../controllers/projectController");

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.post("/:id/members", auth, addMember);

module.exports = router;
