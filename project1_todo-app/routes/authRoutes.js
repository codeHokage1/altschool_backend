const router = require("express").Router();

router
    .get("/signup", (req, res) => {
        res.send("GET Sign up")
    })
    .post("/signup", (req, res) => {
        res.send("POST Sign up")
    })
    .get("/signin", (req, res) => {
        res.send("Sign in")
    })

module.exports = router;