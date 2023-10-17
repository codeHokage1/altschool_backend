const router = require("express").Router();
const taskController = require("../controllers/taskControllers");
const { isLoggedIn } = require("../middlewares/checkToken");
const {checkNewTask} = require("../middlewares/validateRequest");

router
	.use(isLoggedIn)
	.get("/", taskController.getAllTasks)
	.get("/queries", (req, res) => {
		res.send(req.query)
	})
	.post("/", checkNewTask, taskController.createTask)
	.put("/:id", taskController.updateTask)
	.delete("/:id", (req, res) => {
		res.send("DLETE Delete One task");
	});

module.exports = router;
