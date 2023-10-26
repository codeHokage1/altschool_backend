const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const {checkLogin, checkNewUser} = require("../middlewares/validateRequest");

const {isLoggedIn} = require("../middlewares/checkToken");

const User = require("../models/User");

router
    // .get("/signup", (req, res) => {
    //     res.render("register", {error: null});
    // })
    .post("/signup", checkNewUser, authControllers.signup)
    // .get("/signin", (req, res) => {
    //     res.render("signin", {error: null});
    // })
    .post("/signin", checkLogin, authControllers.signin)
    .get("/signout", isLoggedIn, authControllers.signout)
    .get("/users", async(req, res) => {
        res.json({
            message: "All users",
            data: await User.find()
        })
    })

module.exports = router;