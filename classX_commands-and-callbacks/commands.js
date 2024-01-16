import chalk from "chalk";
import Todo from "./models/Todo.js";

const list = async () => {
	const allTasks = await Todo.find({});

	if (allTasks.length === 0) {
		console.log("No Tasks found");
		process.exit(0);
	}

	console.log("Listing all todos.....");

	for (let task of allTasks) {
		if (task.isCompleted) {
			console.log("--->", chalk.strikethrough.yellow(task));
		} else {
			console.log("--->", chalk.green(task));
		}
	}
	process.exit(0);
};

const add = (todo) => {
	console.log("Adding a task: ", todo);
	process.exit(0);
};
const commands = {
   add, list
}

export default commands