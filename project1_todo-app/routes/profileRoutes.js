const router = require("express").Router();

router
    .get("/profile", (req, res) => {
        res.send("My Profile")
    })

module.exports = router;