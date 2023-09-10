// CREATE AND USE DATABASE
// USE x_inventory;

/// A. CREATION OF ALL ENTITIES ///
db.createCollection("users"); // create users entity
db.createCollection("admin"); // create admin entity
db.createCollection("customers"); // create customers entity
db.createCollection("categories"); // create categories entity
db.createCollection("items"); // create items entity
db.createCollection("orders"); // create orders entity
db.createCollection("items_orders"); // create items_orders entity

/// B. INSERTION OF RECORDS INTO ENTITIES ///
// Insert into Users entity
db.users.insertOne({
	_id: 1,
	name: "Farhan",
	email: "farhansodiq360@gmail.com",
	password: "test1234",
	phone_number: "+2347013578199",
	gender: "Male",
	created_at: Date()
});
db.users.insertOne({
	_id: 2,
	name: "Sodiq",
	email: "sodiqfarhan360@gmail.com",
	password: "test1234",
	phone_number: "+2348077751182",
	gender: "Male",
	created_at: Date()
});

// Insert into Admin entity
db.admin.insertOne({
	_id: 1,
	name: "Farhan",
	email: "farhansodiq360@gmail.com",
	user_id: 1,
	created_at: Date()
});

// Insert into Customers entity
db.customers.insertOne({
	_id: 1,
	name: "Sodiq",
	email: "sodiqfarhan360@gmail.com",
	password: "test1234",
	phone_number: "+2348077751182",
	user_id: 2,
	created_at: Date()
});

// Insert into Categories entity
db.categories.insertOne({
	_id: 1,
	name: "Shoes",
	description: "Everything that makes your feet comfortable",
	active: true,
	created_at: Date()
});

// Insert into items entity
db.items.insertOne({
	_id: 1,
	name: "Lebron XX",
	description: "A beast. That's all you need to know",
	price: 300,
	size: "L",
	discount: 5,
	in_stock: true,
	created_at: Date()
});

// Insert into orders entity
db.orders.insertOne({
	_id: 1,
	name: "Lebron XX (x2)",
	status: "Approved",
	total_price: 600,
	delivery_location: "Oshodi, Lagos, Nigeria",
	created_at: Date(),
	customer_id: 1
});

// Insert into items_orders entity
db.items_orders.insertOne({ _id: 1, item_id: 1, order_id: 1 });

/// C. GETTING RECORDS FROM TWO OR MORE ENTITIES ///
db.users.find();
db.items.find({ _id: 1 });

/// D. UPDATING RECORDS IN TWO OR MORE ENTITIES ///
db.users.update({ _id: 1 }, { $set: { name: "Farhan S." } });
db.items.update({ _id: 1 }, { $set: { price: 250 } });

/// E. DELETING RECORDS FROM TWO OR MORE ENTITIES ///
db.users.deleteOne({ _id: 1 });
db.orders.deleteOne({ _id: 1 });
