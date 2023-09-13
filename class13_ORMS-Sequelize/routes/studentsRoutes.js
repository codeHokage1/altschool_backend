const express = require("express");
const router = express.Router();

const studentsControllers = require("../controllers/studentsControllers");
const auth = require("../middlewares/auth");

// router.use(auth.basicAuth);
router.use(auth.apiAuth);

router
    .get("/", studentsControllers.getAllStudents)
    .post("/", auth.checkAdmin ,studentsControllers.createNewStudent)

module.exports = router;
