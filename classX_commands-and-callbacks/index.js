#!/usr/bin/env node

import { program } from "commander";
import commands from "./commands.js";
import connectDB from "./config/dbConfig.js";

connectDB();

program.command("list").description("List all todos").action(commands.list);

program.command("add <todo>").description("Add new todo").action(commands.add);

program.command("complete <todoID>").description("Complete a task").action(commands.complete)

program.parse();
