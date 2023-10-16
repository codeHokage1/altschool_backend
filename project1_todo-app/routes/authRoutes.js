const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const {checkLogin, checkNewUser} = require("../middlewares/validateRequest");

const {isLoggedIn} = require("../middlewares/checkToken");

router
    .get("/signup", (req, res) => {
        res.render("register");
    })
    .post("/signup", checkNewUser, authControllers.signup)
    .get("/signin", (req, res) => {
        res.render("signin");
    })
    .post("/signin", checkLogin, authControllers.signin)
    .get("/signout", isLoggedIn, authControllers.signout)
    .get('/users', isLoggedIn, authControllers.getAllUsers)

module.exports = router;