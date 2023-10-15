const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const {checkLogin, checkNewUser} = require("../middlewares/validateRequest")

router
    .get("/signup", (req, res) => {
        res.send("GET Sign up")
    })
    .post("/signup", checkNewUser, authControllers.signup)
    .post("/signin", checkLogin, authControllers.signin)
    .get('/users', authControllers.getAllUsers)

module.exports = router;