import chalk from "chalk";
import Todo from "./models/Todo.js";
import { ytid } from "ytid";

const list = async () => {
	const allTasks = await Todo.find({});

	if (allTasks.length === 0) {
		console.log("No Tasks found");
		process.exit(0);
	}

	console.log("Listing all todos.....");

	for (let task of allTasks) {
		if (task.isCompleted) {
			console.log(`---> (${task.taskID})`, chalk.strikethrough.yellow(task.text));
		} else {
			console.log(`---> (${task.taskID})`, chalk.blueBright(task.text));
		}
	}
	process.exit(0);
};

const add = async (todo) => {
	const newTask = await Todo.create({ text: todo, taskID: ytid() });
	console.log("Adding a task: ", todo);
	console.log(chalk.green("Added a new task!"));

	process.exit(0);
};

const complete = async (todoID) => {
	const foundTask = await Todo.findOne({ taskID: todoID });
	if (!foundTask) {
		console.log(chalk.red(`Task <${todoID}> not found!`));
		process.exit(0);
	}

   console.log("Completing task....");
   foundTask.isCompleted = true;
   await foundTask.save();
   console.log(chalk.green(`Task <${todoID}> completed!`));

	process.exit(0);
};

const commands = {
	add,
	list,
   complete
};

export default commands;
