const express = require("express");
const itemsRoutes = express.Router();

const itemsController = require("../controllers/itemsController");
const auth = require("../middlewares/auth");

itemsRoutes.use(auth.apiAuth);

itemsRoutes
	.get("/", itemsController.getAllItems)
	.get("/:id", itemsController.getOneItem)
	.post("/", auth.checkAdmin, itemsController.createItem)
	.put("/:id", auth.checkAdmin, itemsController.updateItem)
	.delete("/:id", auth.checkAdmin, itemsController.deleteItem);

module.exports = itemsRoutes;
