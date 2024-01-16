#!/usr/bin/env node
const { program } = require("commander");
const {add, list} = require("./commands")

program.command("list").description("List all todos").action(list);

program.command("add <todo>").description("Add new todo").action(add);

program.parse();