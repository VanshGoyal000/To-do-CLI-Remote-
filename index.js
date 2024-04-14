#!/usr/bin/env node

import addTask from "./Commands/addTask.js";
import deleteTask from "./Commands/deleteTask.js";
import readTask from "./Commands/readTask.js";
import updateTask from "./Commands/updateTask.js";

import { Command } from "commander";

const  program = new Command();

program
.name('todo')
.description('Your Task Manager Remote')
.version(1.0)

program
.command("add")
.description('Add  a task to the list')
.action(addTask)

program
.command("read")
.description('Read  a task to the list')
.action(readTask)

program
.command("Delete")
.description('Delete a task ')
.action(deleteTask)

program
.command("Update")
.description('Update a task to the list')
.action(updateTask)

program.parse()