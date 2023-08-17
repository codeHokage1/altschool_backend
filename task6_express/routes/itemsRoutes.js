const express = require("express");
const itemsRoutes = express.Router();

const itemsController = require("../controllers/itemsController");

itemsRoutes
	.get("/", itemsController.getAllItems)
	.get("/:id", itemsController.getOneItem)
	.post("/", itemsController.createItem)
	.put("/:id", itemsController.updateItem)
	.delete("/:id", itemsController.deleteItem);

module.exports = itemsRoutes;
