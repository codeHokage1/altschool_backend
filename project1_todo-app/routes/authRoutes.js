const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const {checkLogin, checkNewUser} = require("../middlewares/validateRequest");

const {isLoggedIn} = require("../middlewares/checkToken");

router
    .get("/signup", (req, res) => {
        res.send("GET Sign up")
    })
    .post("/signup", checkNewUser, authControllers.signup)
    .post("/signin", checkLogin, authControllers.signin)
    .get('/users', isLoggedIn, authControllers.getAllUsers)

module.exports = router;