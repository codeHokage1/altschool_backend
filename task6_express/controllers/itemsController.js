const fs = require("fs").promises;

// Get all items
exports.getAllItems = async (req, res) => {
	try {
		const items = await fs.readFile("./data/items.json", "utf8");
		return res.status(200).json({
			message: "All Items",
			data: JSON.parse(items)
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: null
		});
	}
};

// Get one items
exports.getOneItem = async (req, res) => {
	const id = req.params.id;
	try {
		const items = JSON.parse(await fs.readFile("./data/items.json", "utf8"));
		const foundItem = items.find((item) => item.id === Number(id));
		if (!foundItem) {
			return res.status(404).json({
				message: "Item not found",
				data: null
			});
		}

		return res.status(200).json({
			message: "Item found",
			data: foundItem
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: null
		});
	}
};

// Create new student
exports.createItem = async (req, res) => {
	const newItem = {
		id: Math.floor(Math.random() * 100) + 1,
		...req.body
	};
	try {
		const items = JSON.parse(await fs.readFile("./data/items.json", "utf8"));
		items.push(newItem);
		await fs.writeFile("./data/items.json", JSON.stringify(items), (err) => {
			if (err) {
				return res.status(500).json({
					message: err.message,
					data: null
				});
			}

			console.log("New items added to the database");
		});

		return res.status(201).json({
			message: "New item added",
			data: newItem
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: null
		});
	}
};

// Update a student
exports.updateItem = async (req, res) => {
	const id = req.params.id;
	try {
		const items = JSON.parse(await fs.readFile("./data/items.json", "utf8"));
		const foundItem = items.find((item) => item.id === Number(id));
		if (!foundItem) {
			return res.status(404).json({
				message: "Item not found",
				data: null
			});
		}

		items.map((item) => {
			if (item.id === Number(id)) {
				Object.entries(req.body).map((info) => (item[info[0]] = info[1]));
			}
		});
		await fs.writeFile("./data/items.json", JSON.stringify(items), (err) => {
			if (err) {
				return res.status(500).json({
					message: err.message,
					data: null
				});
			}

			console.log("Item data updated");
		});

		return res.status(201).json({
			message: "Item updated",
			data: null
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: null
		});
	}
};

// Delete a student
exports.deleteItem = async (req, res) => {
	const id = req.params.id;
	try {
		const items = JSON.parse(await fs.readFile("./data/items.json", "utf8"));
		const foundItem = items.find((item) => item.id === Number(id));
		if (!foundItem) {
			return res.status(404).json({
				message: "Student not found",
				data: null
			});
		}

		items.splice(
			items.findIndex((item) => item.id === id),
			1
		);
		await fs.writeFile("./data/items.json", JSON.stringify(items), (err) => {
			if (err) {
				return res.status(500).json({
					message: err.message,
					data: null
				});
			}

			console.log("Item deleted");
		});

		return res.status(201).json({
			message: "Item deleted",
			data: null
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message,
			data: null
		});
	}
};
