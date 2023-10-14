const router = require("express").Router();
const authControllers = require("../controllers/authControllers");

router
    .get("/signup", (req, res) => {
        res.send("GET Sign up")
    })
    .post("/signup", authControllers.signup)
    .post("/signin", authControllers.signin)
    .get('/users', authControllers.getAllUsers)

module.exports = router;