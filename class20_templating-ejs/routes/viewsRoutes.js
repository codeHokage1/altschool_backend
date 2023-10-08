const express = require("express");
const router = express.Router();

const { checkToken } = require("../middlewares/checkToken");
const controller = require("../controllers/viewsController");

router
    .get("/success", checkToken, controller.renderHome)
    .get("/logout", checkToken, controller.logout);

module.exports = router;
